#!/usr/bin/env python3
"""Validate the GitBook content tree and, optionally, the published site.

Usage:
    python3 tools/validate_site.py gitbook-export
    python3 tools/validate_site.py gitbook-export --live tools/smoke_endpoints.txt

Prints one line per issue: "ERROR <code> <file>: <message>" or "WARN ...".
Exits 1 if there is at least one ERROR.
"""
import argparse
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

import yaml

DEFAULT_BASE = "https://www.ywcaofmissoula.com"
FRONTMATTER = re.compile(r"\A---\n(.*?)\n---\n", re.S)
CODE_BLOCK = re.compile(r"^(```|~~~).*?^\1", re.S | re.M)
LINK = re.compile(r"\]\(([^)\s]+)")
# Any absolute URL: inside [text](url), <url>, or bare text (GitBook links all three).
ABSOLUTE_URL = re.compile(r"https?://[^\s<>()\[\]\"'`]+")
INCLUDE = re.compile(r'\{%\s*include\s+"([^"]+)"\s*%\}')
# A placeholder that a template left empty, e.g. "hub for , with".
UNFILLED_TEMPLATE = re.compile(r"\b(for|of|on|about)\s+[,.;]")
USER_AGENT = "Mozilla/5.0 (compatible; ywca-site-validator/1.0)"


class Report:
    def __init__(self):
        self.errors = 0

    def error(self, code, where, message):
        self.errors += 1
        print(f"ERROR {code} {where}: {message}")

    def warn(self, code, where, message):
        print(f"WARN {code} {where}: {message}")


def summary_entries(root: Path):
    """(navigation label, file) pairs. GitBook publishes the label as the page title."""
    text = (root / "SUMMARY.md").read_text(encoding="utf-8")
    return re.findall(r"^\s*\* \[(.*?)\]\(([^)]+\.md)\)", text, re.M)


def check_page(root: Path, rel: str, report: Report, descriptions, absolute_links):
    path = root / rel
    text = path.read_text(encoding="utf-8")
    meta, body = {}, text
    match = FRONTMATTER.match(text)
    if match:
        body = text[match.end():]
        try:
            meta = yaml.safe_load(match.group(1)) or {}
        except yaml.YAMLError as exc:
            report.error("frontmatter", rel, f"YAML does not parse ({str(exc).splitlines()[0]})")
            meta = {}

    description = " ".join(str(meta.get("description") or "").split())
    if not description:
        report.error("description-missing", rel, "frontmatter description is empty")
    elif UNFILLED_TEMPLATE.search(description):
        report.error("description-template", rel, f"description has an unfilled placeholder: {description[:80]!r}")
    else:
        descriptions[description].append(rel)

    prose = CODE_BLOCK.sub("", body)
    for target in INCLUDE.findall(prose):
        if not (path.parent / target).exists():
            report.error("include", rel, f"include target does not exist: {target}")
    absolute_links.extend((rel, url.rstrip(".,;:")) for url in ABSOLUTE_URL.findall(prose))
    for link in LINK.findall(prose):
        if link.startswith(("http://", "https://", "mailto:", "#")):
            continue
        local = urllib.parse.unquote(link.split("#")[0].split("?")[0])
        if local and not (path.parent / local).exists():
            report.error("relative-link", rel, f"link target does not exist: {link}")


def check_redirects(root: Path, report: Report):
    config = root / ".gitbook.yaml"
    if not config.exists():
        return
    data = yaml.safe_load(config.read_text(encoding="utf-8")) or {}
    for source, target in (data.get("redirects") or {}).items():
        if not (root / str(target)).exists():
            report.error("redirect-target", ".gitbook.yaml", f"{source} -> {target} (file does not exist)")


def check_tree(root: Path, report: Report):
    """Check the content tree. Returns (page, url) for every absolute link."""
    titles, descriptions, absolute_links = defaultdict(list), defaultdict(list), []
    for label, rel in summary_entries(root):
        if not (root / rel).exists():
            report.error("summary-target", "SUMMARY.md", f"entry points to a missing file: {rel}")
            continue
        if label.strip():
            titles[label.strip()].append(rel)
        else:
            report.error("title-missing", rel, "SUMMARY.md label (the published title) is empty")
        check_page(root, rel, report, descriptions, absolute_links)
    for kind, groups in (("duplicate-title", titles), ("duplicate-description", descriptions)):
        for value, pages in groups.items():
            if len(pages) > 1:
                report.warn(kind, ", ".join(pages), f"same text on {len(pages)} pages: {value[:70]!r}")
    check_redirects(root, report)
    return absolute_links


def is_challenge(status: int, headers, body: str) -> bool:
    """True when Cloudflare served a challenge instead of the page.

    Real pages on this site contain "challenge-platform" (Cloudflare's
    JavaScript-detection script) and "Just a moment…" (a GitBook UI string),
    so those strings alone prove nothing. A challenge carries the
    cf-mitigated header, or a non-2xx status with the challenge bootstrap.
    """
    if (headers.get("cf-mitigated") or "").lower() == "challenge":
        return True
    return status >= 400 and "_cf_chl_opt" in body


def fetch(url: str):
    """(status, headers, body) of the final response after redirects; raises URLError if unreachable."""
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.headers, response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.headers, exc.read().decode("utf-8", "replace")


def canonical(url: str) -> str:
    return url.split("#")[0].split("?")[0].rstrip("/")


def check_absolute_links(absolute_links, base: str, routes, report: Report):
    """Warn on links to this site that are not published URLs (they redirect or 404).

    Published = the pages in sitemap-pages.xml plus the checked endpoint routes.
    """
    status, _, body = fetch(base.rstrip("/") + "/sitemap-pages.xml")
    if status != 200:
        report.error("live-status", "/sitemap-pages.xml", f"HTTP {status}")
        return
    site = canonical(base)
    published = {canonical(loc) for loc in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)}
    published |= {canonical(site + route) for route in routes}
    for rel, link in absolute_links:
        target = canonical(link)
        if (target == site or target.startswith(site + "/")) and target not in published:
            report.warn("non-canonical-link", rel, f"{link} is not in sitemap-pages.xml (redirect or 404)")


def read_routes(endpoints_file: Path):
    lines = endpoints_file.read_text(encoding="utf-8").splitlines()
    return [route for route in (line.split("#")[0].strip() for line in lines) if route]


def check_live(routes, base: str, report: Report):
    for route in routes:
        try:
            status, headers, body = fetch(base.rstrip("/") + route)
        except urllib.error.URLError as exc:
            report.error("live-unreachable", route, str(exc.reason))
            continue
        if is_challenge(status, headers, body):
            report.error("live-challenge", route, f"HTTP {status}: Cloudflare challenge instead of content")
        elif status != 200:
            report.error("live-status", route, f"HTTP {status}")
        else:
            print(f"OK live {route}: HTTP 200 {headers.get('Content-Type', '')}")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("root", type=Path, help="GitBook content root (directory with SUMMARY.md)")
    parser.add_argument("--live", type=Path, metavar="FILE", help="file with one public path per line to fetch")
    parser.add_argument("--base", default=DEFAULT_BASE, help=f"base URL for --live (default {DEFAULT_BASE})")
    args = parser.parse_args(argv)

    report = Report()
    absolute_links = check_tree(args.root, report)
    if args.live:
        routes = read_routes(args.live)
        check_live(routes, args.base, report)
        check_absolute_links(absolute_links, args.base, routes, report)
    print(f"{report.errors} error(s)")
    return 1 if report.errors else 0


if __name__ == "__main__":
    sys.exit(main())
