# Deployment and ownership map

> This file is outside `gitbook-export/`, so GitBook does not publish it.

GitBook Git Sync publishes only `gitbook-export/` (configured by `gitbook-export/.gitbook.yaml`). Files outside that directory are repository-only. Verified live on 2026-10-20; see `SEO_GEO_AEO_FINDINGS.md`.

| Concern | Owner | Where to change it | Notes |
| --- | --- | --- | --- |
| Page content, titles, descriptions | Repository | `gitbook-export/**/*.md` frontmatter `title`, `description` | GitBook renders `title` as the page heading and `<title>`. |
| Navigation and published URLs | Repository + GitBook | `gitbook-export/SUMMARY.md` | URLs follow GitBook group/parent slugs, not file paths. Use the live `sitemap-pages.xml` as the source of a page's URL. |
| Redirects for removed paths | Repository | `gitbook-export/.gitbook.yaml` `redirects:` | GitBook serves these as HTTP 307. Applies only to paths that no longer resolve. |
| Automatic page-move redirects | GitBook | GitBook UI (moving pages) | HTTP 307. |
| Apex → `www`, `http` → `https` | Cloudflare | Cloudflare dashboard → Rules → Redirect Rules / SSL | HTTP 301, path kept. |
| `robots.txt` | GitBook (`Content-Signal:` line possibly Cloudflare) | GitBook site settings; Cloudflare → Security → Bots / AI Crawl Control | Not editable from this repository. |
| `sitemap.xml`, `sitemap-pages.xml` | GitBook | Generated from published pages | Do not add a custom sitemap. |
| Canonical URLs, `meta robots`, Open Graph | GitBook | GitBook site settings (custom domain, indexing, social preview) | Self-referencing canonical on every page. |
| `llms.txt`, `llms-full.txt`, Markdown page variants | GitBook | Generated | AI user agents, `Accept: text/markdown`, and `.md` URLs get Markdown. |
| Structured data (JSON-LD) | Nobody (not deployed) | Would need GitBook custom code / an integration | A fenced JSON block in Markdown is visible text, not structured data. |
| Bot and WAF rules | Cloudflare | Cloudflare → Security | See the runbook in `SEO_GEO_AEO_FINDINGS.md` §7. |
| Data files `data/*.csv` | Repository only | `data/` | Not published. See `data/README.md`. |

Archived (never deployed, kept for history): `ARCHIVE/robots.txt`, `ARCHIVE/sitemap.xml`, `ARCHIVE/llms.txt`, `ARCHIVE/llms-full.txt`, `ARCHIVE/entities.json`.

## Checks

Run before you push:

```bash
python3 tools/validate_site.py gitbook-export
```

Run after GitBook publishes:

```bash
python3 tools/validate_site.py gitbook-export --live tools/smoke_endpoints.txt
```
