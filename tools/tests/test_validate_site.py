"""Behavior tests for tools/validate_site.py.

Each test builds a small GitBook content tree and runs the CLI on it.
"""
import http.server
import subprocess
import sys
import textwrap
import threading
from pathlib import Path

import pytest

SCRIPT = Path(__file__).resolve().parents[1] / "validate_site.py"


def page(title="A page", description="Describes a page.", body="# A page\n"):
    return f"---\ntitle: {title}\ndescription: {description}\n---\n\n{body}"


def make_site(root: Path, files: dict, summary: str | None = None):
    for rel, text in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(textwrap.dedent(text), encoding="utf-8")
    if summary is None:
        summary = "# Table of contents\n\n" + "".join(
            f"* [{rel}]({rel})\n" for rel in files if rel.endswith(".md") and not rel.startswith(".gitbook")
        )
    (root / "SUMMARY.md").write_text(summary, encoding="utf-8")
    return root


def run(*args):
    proc = subprocess.run([sys.executable, str(SCRIPT), *map(str, args)], capture_output=True, text=True)
    return proc.returncode, proc.stdout


def test_clean_site_passes(tmp_path):
    make_site(tmp_path, {
        "README.md": page(body="# Home\n\nSee [b](sub/b.md#part).\n"),
        "sub/b.md": page(title="B", description="Second page.",
                         body='# B\n\n{% include "../.gitbook/includes/note.md" %}\n'),
        ".gitbook/includes/note.md": "Shared note.\n",
    })
    code, out = run(tmp_path)
    assert code == 0, out
    assert "ERROR" not in out


def test_summary_entry_to_missing_file_is_an_error(tmp_path):
    make_site(tmp_path, {"README.md": page()},
              summary="# Table of contents\n\n* [Home](README.md)\n* [Gone](gone.md)\n")
    code, out = run(tmp_path)
    assert code == 1
    assert "gone.md" in out and "ERROR" in out


def test_broken_relative_link_is_an_error(tmp_path):
    make_site(tmp_path, {"README.md": page(body="# Home\n\n[x](../missing.md#a)\n")})
    code, out = run(tmp_path)
    assert code == 1
    assert "../missing.md" in out


def test_links_inside_code_blocks_are_ignored(tmp_path):
    make_site(tmp_path, {"README.md": page(body="# Home\n\n```md\n[x](missing.md)\n```\n")})
    code, out = run(tmp_path)
    assert code == 0, out


def test_missing_include_is_an_error(tmp_path):
    make_site(tmp_path, {"README.md": page(body='# Home\n\n{% include ".gitbook/includes/nope.md" %}\n')})
    code, out = run(tmp_path)
    assert code == 1
    assert "nope.md" in out


def test_markdown_footnotes_warn_because_gitbook_drops_them(tmp_path):
    make_site(tmp_path, {
        "README.md": page(body="# Home\n\nA claim.[^1]\n\n[^1]: Source.\n"),
        "b.md": page(description="No notes.", body="# B\n\n```md\nA claim.[^1]\n```\n"),
    })
    code, out = run(tmp_path)
    assert code == 0, out
    warns = [line for line in out.splitlines() if line.startswith("WARN")]
    assert len(warns) == 1 and "README.md" in warns[0] and "footnote" in warns[0]


def test_unparseable_frontmatter_is_an_error(tmp_path):
    make_site(tmp_path, {"README.md": "---\ntitle: [unclosed\n---\n\n# Home\n"})
    code, out = run(tmp_path)
    assert code == 1
    assert "README.md" in out


def test_unfilled_description_template_is_an_error(tmp_path):
    make_site(tmp_path, {
        "README.md": page(description="Record-first hub for , with primary evidence links."),
    })
    code, out = run(tmp_path)
    assert code == 1
    assert any("description" in line for line in out.splitlines() if line.startswith("ERROR"))


def test_title_comes_from_navigation_label_not_frontmatter(tmp_path):
    # GitBook publishes the SUMMARY.md link text as the page title.
    make_site(tmp_path, {"README.md": page(title=""), "b.md": page(title="Kept")},
              summary="# Table of contents\n\n* [Home](README.md)\n* [](b.md)\n")
    code, out = run(tmp_path)
    assert code == 1
    errors = [line for line in out.splitlines() if line.startswith("ERROR")]
    assert len(errors) == 1 and "b.md" in errors[0]


def test_duplicate_navigation_labels_warn_without_failing(tmp_path):
    make_site(tmp_path, {"README.md": page(), "b.md": page(description="Other.")},
              summary="# Table of contents\n\n* [Same](README.md)\n* [Same](b.md)\n")
    code, out = run(tmp_path)
    assert code == 0, out
    assert "WARN" in out and "b.md" in out


def test_duplicate_descriptions_warn_without_failing(tmp_path):
    make_site(tmp_path, {
        "README.md": page(title="One", description="Same words."),
        "b.md": page(title="Two", description="Same words."),
    })
    code, out = run(tmp_path)
    assert code == 0, out
    assert "WARN" in out and "b.md" in out


def test_redirect_to_missing_file_is_an_error(tmp_path):
    make_site(tmp_path, {
        "README.md": page(),
        ".gitbook.yaml": "root: ./\nredirects:\n  old-path: README.md\n  older-path: not-here.md\n",
    })
    code, out = run(tmp_path)
    assert code == 1
    assert "not-here.md" in out
    assert "old-path" not in out


# --- live smoke test against a local server --------------------------------

REAL_PAGE = (
    "<html><head><title>Sources</title></head><body>"
    "<script>var a='/cdn-cgi/challenge-platform/scripts/jsd/main.js'</script>"
    '<script>{"ai_chat_hold_message_2":"Just a moment…"}</script>'
    "<h1>Sources</h1></body></html>"
)
CHALLENGE_PAGE = (
    "<!DOCTYPE html><html><head><title>Just a moment...</title></head><body>"
    "<script>window._cf_chl_opt={cvId:'3'}</script></body></html>"
)


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/real":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(REAL_PAGE.encode())
        elif self.path == "/llms.txt":
            self.send_response(200)
            self.send_header("Content-Type", "text/markdown")
            self.end_headers()
            self.wfile.write(b"# Index\n")
        elif self.path == "/sitemap-pages.xml":
            host = self.headers["Host"]
            self.send_response(200)
            self.send_header("Content-Type", "application/xml")
            self.end_headers()
            self.wfile.write(f"<urlset><url><loc>http://{host}/real</loc></url></urlset>".encode())
        elif self.path == "/challenged":
            self.send_response(403)
            self.send_header("Content-Type", "text/html")
            self.send_header("cf-mitigated", "challenge")
            self.end_headers()
            self.wfile.write(CHALLENGE_PAGE.encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):  # silence request logging
        pass


@pytest.fixture
def server():
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{httpd.server_address[1]}"
    httpd.shutdown()


def live(tmp_path, server, paths):
    make_site(tmp_path / "site", {"README.md": page()})
    endpoints = tmp_path / "endpoints.txt"
    endpoints.write_text("# comment\n" + "\n".join(paths) + "\n")
    return run(tmp_path / "site", "--live", endpoints, "--base", server)


def test_real_page_with_cloudflare_and_gitbook_strings_is_content(tmp_path, server):
    code, out = live(tmp_path, server, ["/real"])
    assert code == 0, out
    assert "challenge" not in out.lower()


def test_cloudflare_challenge_is_reported_as_challenge(tmp_path, server):
    code, out = live(tmp_path, server, ["/challenged"])
    assert code == 1
    assert "challenge" in out.lower() and "/challenged" in out


def test_absolute_links_to_unpublished_urls_warn(tmp_path, server):
    make_site(tmp_path / "site", {
        "README.md": page(body=(
            f"# Home\n\n[ok]({server}/real) [old]({server}/old-path#x) [ext](https://example.org/a)\n"
            f"[txt]({server}/llms.txt)\n\n[^1]: Source, <{server}/old-footnote>.\n"
            f"- Bare: {server}/old-bare.\n"
        )),
    })
    endpoints = tmp_path / "endpoints.txt"
    endpoints.write_text("/real\n/llms.txt\n")
    code, out = run(tmp_path / "site", "--live", endpoints, "--base", server)
    assert code == 0, out
    warns = [line for line in out.splitlines() if line.startswith("WARN non-canonical-link")]
    assert len(warns) == 3
    for stale in ("/old-path", "/old-footnote", "/old-bare"):
        assert any(f"{stale} " in w or f"{stale}#" in w for w in warns), stale


def test_missing_endpoint_is_reported_with_status(tmp_path, server):
    code, out = live(tmp_path, server, ["/real", "/gone"])
    assert code == 1
    assert "404" in out and "/gone" in out
