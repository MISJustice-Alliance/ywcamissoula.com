# SEO / GEO / AEO validation — branch `seo-geo-aeo-hardening`

> This file is outside `gitbook-export/`, so GitBook does not publish it.

- **Run date:** 2026-10-20 (UTC). Production still serves `main`; this branch is not published. "After" live results therefore test production against the branch's content tree.
- **Findings:** `SEO_GEO_AEO_FINDINGS.md`. **Data issues:** `DATA_ISSUES.md`. **Ownership map:** `DEPLOYMENT.md`.

## Commands

```bash
python3 -m pytest -q tools/tests                                              # validator behavior tests
python3 tools/validate_site.py gitbook-export                                 # offline checks (CI runs this)
python3 tools/validate_site.py gitbook-export --live tools/smoke_endpoints.txt  # plus live endpoints and canonical links
```

User-agent matrix (ad hoc, not in the repository): `curl` with no UA, curl, python-requests, Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot UA strings against `/`, `/sitemap-pages.xml`, `/overview/sources-and-record-index`, `/llms-full.txt/1`.

## URLs tested

`tools/smoke_endpoints.txt`: `/`, `/robots.txt`, `/sitemap.xml`, `/sitemap-pages.xml`, `/llms.txt`, `/llms-full.txt`, `/llms-full.txt/1`, the five hubs, `/datasets/dataset-catalog-indexes`, and `/overview/sources-and-record-index.md`. Also apex and `http` redirects, six `.gitbook.yaml` redirect sources, and every absolute internal link in the content (against `sitemap-pages.xml`).

## Before / after

| Check | Before (`main` @ `8ebc995`) | After (this branch) |
| --- | --- | --- |
| Validator tests | n/a (no validator) | 15 passed |
| Offline errors | 2 (1 broken relative link, 1 unfilled description template) | 0 |
| Broken descriptions served live | 2 (evidence README, MPD hub) | 0 in content (live after publish) |
| Live endpoints 200, no challenge | 14/14 | 14/14 |
| User-agent matrix | 40/40 × 200, 0 challenges | 40/40 × 200, 0 challenges |
| Absolute links → live 404 | 6 distinct targets, 8 occurrences | 0 |
| Absolute links → 307 (all pages) | 15 distinct targets, 275 occurrences | 0 (PR #7 fixed the homepage and hubs; branch `seo-canonical-internal-links` fixed the other 223 in 73 files, URL-only diff) |
| Absolute links → 307 in homepage and 5 hubs | 53 occurrences (+1 in the shared ODC include, which the validator does not scan) | 0 |
| Links to pages not yet published | 0 | 2 (new About page; resolves after publish) |
| Duplicate published titles | 1 (warning) | 1 (warning, unchanged — editorial) |
| Publisher / independence / corrections statement | absent | About page + pointer in shared disclaimer (78 pages) |
| JSON-LD deployed | none | none (deliberate; see findings §5) |

## Known limitations

1. **Spoofed user agents prove only UA-based behavior.** Verified crawlers come from their own IP ranges. Only Cloudflare Security Events and Search Console show what they receive.
2. **No account access.** Cloudflare (plugin needs interactive login) and Search Console (no credentials file) were not inspected. All edge-rule statements are unverified.
3. **The validator does not check `#anchor` names.** The two new in-page anchors were checked by hand against live heading IDs.
4. **The unfilled-template rule is narrow.** It catches "for , with"-style gaps. The MPD hub's "and primary, with" gap is not detectable by a pattern and was found by reading.
5. **URL extraction strips trailing `.,;:`.** A URL that really ends in dots (the old `…2df48ac7...` links) is read without them.
6. **Live link check depends on the current sitemap.** A page renamed in GitBook changes its URL; rerun the live check after every publish.
7. **The hub answer blocks and About page are new public text about named parties.** They were limited to facts already on the hub or in the linked record, but they still need human review before merge (see checklist).

## Post-deployment checklist

- [ ] **Review before merge:** read the About page and the five "Short answer" blocks for legal accuracy and tone.
- [ ] Merge to `main`; confirm GitBook Git Sync published (new About page returns 200 at `/overview/about-this-site-publisher-and-corrections`).
- [ ] Run `python3 tools/validate_site.py gitbook-export --live tools/smoke_endpoints.txt`; expect 0 errors and no About-page warning.
- [ ] **Search Console:** submit `https://www.ywcaofmissoula.com/sitemap.xml`; confirm status "Success" and discovered-URL count ≈ 170.
- [ ] **Search Console URL Inspection** on `/`, `/overview/sources-and-record-index`, `/datasets/dataset-catalog-indexes`: record "Page is indexed", "User-declared canonical" = "Google-selected canonical", "Crawl allowed: Yes", "Page fetch: Successful".
- [ ] Validate rendered canonicals and robots: `curl -s URL | grep -E 'rel="canonical"|name="robots"'` on the same three URLs.
- [ ] Structured data: none deployed. If any is added later, test the rendered page with the Rich Results Test, not the Markdown source.
- [ ] **Cloudflare → Security → Events**, last 7 days: zero Managed Challenge / Block actions on verified-bot traffic to public paths (see findings §7).
- [ ] **Bing Webmaster Tools:** import the Search Console property; submit the sitemap.
- [ ] Monitor monthly in Search Console: Pages (indexed / not indexed reasons), Crawl stats (host status, response codes), Performance by page for the five hubs. Do not attribute changes to this branch without a before/after comparison of those reports.
