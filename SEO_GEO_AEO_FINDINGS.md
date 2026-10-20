# SEO / GEO / AEO findings — www.ywcaofmissoula.com

> This file is outside `gitbook-export/`, so GitBook does not publish it.

- **Date of tests:** 2026-10-20, about 02:00–02:30 UTC (2026-10-19 evening MDT).
- **Repository state:** branch `seo-geo-aeo-hardening`, from `main` at `8ebc995`.
- **Test client:** one macOS workstation, `curl` 8.x, residential IP. No Cloudflare, GitBook, or Search Console account access was available (see §3 and §7).
- **Input audit:** six Perplexity exports in `~/Downloads/*.pdf` (same questions as the Perplexity thread; the thread URL renders only in a logged-in browser and returned no text to a fetch). Treated as hypotheses.

Labels used below: **Confirmed** = observed in this session with the command shown in §2 or in `SEO_GEO_AEO_VALIDATION.md`. **Likely** = best explanation of confirmed facts, not directly observed. **Unverified** = not tested, or not testable without account access.

---

## Executive findings

1. **Confirmed — the "Cloudflare challenge" finding in the input audit does not reproduce.** Every tested route returned HTTP 200 with real content for ten user agents (browser, none, curl, python, Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot). No response had `cf-mitigated` or a challenge page.
   - The HTML contains the strings `Just a moment…` and `/cdn-cgi/challenge-platform/scripts/jsd/main.js`. The first is a GitBook AI-assistant UI string (`ai_chat_hold_message_2`). The second is the Cloudflare JavaScript-detections script, which Cloudflare adds to normal 200 pages. **A naive string match on these produces a false "challenge" result.** This is the **likely** cause of part of the input audit's finding.
   - The 403 responses in the input audit are **unverified** for their client. They can come from IP reputation, rate limits, or a rule that changed since. They are not reproducible from here.
2. **Confirmed — the repository-root discovery files are not deployed.** `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `entities.json` at the repository root differ from the live files. GitBook generates the live `robots.txt`, `sitemap.xml` (a sitemap index), `sitemap-pages.xml` (169 URLs), `llms.txt`, and `llms-full.txt` (paginated). The root `sitemap.xml` (103 URLs, `lastmod` 2026-07-05) and root `llms.txt` contain old URLs. They mislead future editors.
3. **Confirmed — GitBook already supplies the core technical SEO.** Each tested HTML page has a self-referencing `<link rel="canonical">`, `<meta name="robots" content="index, follow">`, `x-robots-tag: index, follow`, title, description, Open Graph, and Twitter tags. AI-crawler user agents, `Accept: text/markdown`, and a `.md` suffix get a Markdown version of the page. No custom sitemap, canonical, or AI-text system is necessary.
4. **Confirmed — internal links are the main technical defect.** The content has 1,657 absolute links to the site. Of 169 distinct targets, 6 return **404** and 15 go through a GitBook **307** (temporary) redirect, including the homepage "Verify first" links and many hub links. Plus 1 broken relative link.
5. **Confirmed — one published page has broken metadata.** `additional-evidence-and-documentation/README.md` has `title:` empty and description `Record-first hub for , with primary evidence links…`. The live page serves that broken description.
6. **Confirmed — the site does not say who publishes it, whether the publisher is affiliated with YWCA of Missoula, or how to send a correction.** The domain name resembles the name of an organization that the site criticizes. For trust and for search intent, this is the highest-value content gap.
7. **Confirmed — data-definition conflicts exist and are repeated in prose.** See §5. Several pages state "16% sustain rate" without the rate-vs-count qualifier that the scorecard page itself documents.
8. **Confirmed — no JSON-LD is deployed.** No tested HTML response has `application/ld+json`. The Dataset JSON-LD in `datasets/seo-+-geo-audit-sitewide.md` and `datasets/dataset-brian-lowney-…md` is visible example code in a fenced block only.

---

## 1. Repository and deployment map

| Item | Finding | Status |
| --- | --- | --- |
| Content root | `gitbook-export/` (Git Sync project directory). `gitbook-export/.gitbook.yaml` sets `root: ./`, `README.md`, `SUMMARY.md`. | Confirmed (redirects in this file work live, so the file is active) |
| `.gitbook.yaml` validity | Valid YAML. All 6 `redirects:` entries return 307 to the intended page in production. | Confirmed |
| `SUMMARY.md` | 169 entries, all files exist, no duplicates, no `.md` file under the content root is outside `SUMMARY.md`. Published URLs follow GitBook's group/parent slugs, **not** file paths. Example: file `comprehensive-timeline,-relationship-diagram,-actionable-claims.md` → URL `/overview/comprehensive-timeline-relationship-diagram-actionable-claims`. | Confirmed |
| `book.json` | `{"plugins": ["filecoin"]}` — legacy GitBook v1 file, not used by current GitBook. | Likely inert |
| robots | Owner: GitBook (and possibly Cloudflare for the `Content-Signal:` line, which is Cloudflare's Content Signals format). Live file allows `/` for `*` and lists `Sitemap: https://www.ywcaofmissoula.com/sitemap.xml`. Repository `robots.txt` is not deployed. | Content confirmed; exact owner of `Content-Signal` line unverified |
| Sitemap | Owner: GitBook. `/sitemap.xml` = index → `/sitemap-pages.xml` (169 URLs, matches `SUMMARY.md` count). Repository `sitemap.xml` is not deployed. | Confirmed |
| Canonical | Owner: GitBook. Self-referencing on every tested page. Homepage canonical is `https://www.ywcaofmissoula.com` (no slash); the sitemap uses the same form. | Confirmed |
| Redirects | Two layers. (a) Cloudflare/edge: apex `ywcaofmissoula.com` → `www` 301 with path kept; `http` → `https` 301. (b) GitBook: `.gitbook.yaml` redirects and automatic page-move redirects, all **307**. | Confirmed |
| Metadata | Owner: page frontmatter `title`/`description` + GitBook site title. | Confirmed |
| Structured data | None deployed. GitBook has no per-page JSON-LD field in Markdown; a fenced JSON block renders as visible code. | Confirmed (no `ld+json` in responses) |
| `llms.txt` / `llms-full.txt` | Owner: GitBook (auto-generated, paginated: `/llms-full.txt` = part 1, `/llms-full.txt/1` = part 2). Repository copies are not deployed. | Confirmed |
| `entities.json` | Not deployed; content is placeholder (`"people": []`, generic words). | Confirmed not deployed |
| `data/*.csv` | Outside `gitbook-export/`, so not published. | Confirmed |
| CI | No `.github/` directory in this repository. 46 pages have `<!-- AUTO_UPDATE -->` markers and past "Daily legal research update" commits, so an external automation wrote here earlier. | Confirmed; automation source unverified |

## 2. Live technical validation

All with a Chrome user agent unless noted. "Interstitial" = page contains `cf_chl_opt` or `<title>Just a moment`.

| URL | Final URL / chain | Status | Content type | Interstitial | Robots | Canonical | In sitemap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | none | 200 | text/html | No | meta `index, follow` | `https://www.ywcaofmissoula.com` | Yes |
| `/robots.txt` | none | 200 | text/plain | No | — | — | n/a |
| `/sitemap.xml` | none | 200 | application/xml (sitemap index) | No | — | — | n/a |
| `/sitemap-pages.xml` | none | 200 | application/xml, 169 `<loc>` | No | — | — | n/a |
| `/llms.txt` | none | 200 | text/markdown | No | — | — | n/a |
| `/llms-full.txt` | none | 200 | text/markdown (part 1) | No | — | — | n/a |
| `/llms-full.txt/1` | none | 200 | text/markdown (part 2, pages 101–169) | No | — | — | n/a |
| `/overview/nuno-case-system-overview-and-full-article-index` (overview hub) | none | 200 | text/html | No | meta `index, follow` | self | Yes |
| `/overview/sources-and-record-index` (record index) | none | 200 | text/html | No | meta + header `index, follow` | self | Yes |
| `/datasets/dataset-catalog-indexes` (dataset page) | none | 200 | text/html | No | meta `index, follow` | self | Yes |
| `https://ywcaofmissoula.com/` | 301 → `https://www.ywcaofmissoula.com/` | 200 | text/html | No | — | — | — |
| `http://www.ywcaofmissoula.com/` | 301 → `https://…/` | 200 | text/html | No | — | — | — |

User-agent matrix (`/`, `/sitemap-pages.xml`, `/overview/sources-and-record-index`, `/llms-full.txt/1`): 40/40 requests returned 200, 0 interstitials, 0 `cf-mitigated`. AI-crawler user agents get `text/markdown` (30–39 KB) instead of HTML (1.2–1.4 MB). **Limit:** spoofed user agents from one residential IP do not prove what a verified crawler from its own IP range receives. Only Cloudflare Security Events and Search Console can prove that (§3, §7).

## 3. Crawler and edge-security diagnosis

- **Account access:** none. Cloudflare plugin needs an interactive login; Search Console credentials file is missing. All Cloudflare statements below are **unverified** and go to the runbook in §7.
- **Confirmed:** the zone runs Cloudflare JavaScript detections (the `jsd/main.js` injection). That injection is used by Bot Fight Mode / Super Bot Fight Mode / Bot Management. Bot Fight Mode cannot be bypassed by custom rules and can challenge some automated clients. **Likely** source of intermittent 403s for non-verified automated clients such as the input audit's fetcher.
- **Confirmed:** robots rules and observed edge behavior agree at this time — robots allows all, and the edge served all tested routes.
- **Confirmed:** sitemap and HTML routes behave the same for all tested user agents.
- **Unverified:** WAF custom rules, rate limits, geo rules, and how verified bots (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot) are treated from their real IP ranges.
- **Recommendation:** do not add user-agent allow rules. If Security Events show challenges against verified bots, use Cloudflare's "Verified Bots" category (`cf.client.bot` / `cf.verified_bot_category`) in a skip rule, not a user-agent match.

## 4. Content and metadata audit (169 pages in `SUMMARY.md`)

| Check | Result |
| --- | --- |
| YAML frontmatter parse | 169/169 parse. |
| Missing title | 1: `additional-evidence-and-documentation/README.md` (`title:` empty). |
| Missing / broken description | 0 missing; 1 broken template: same README (`Record-first hub for , with…`). Served live. |
| Duplicate titles / descriptions | 0 exact duplicates. |
| H1 anomalies | 5 pages: `mt-bar-complaint-odc-no.-25-147-supplemental-submission-4-may-2026.md` (10 H1s — document sections use `#`); `tyrone-nuno-supporting-witness-grievance-odc-25-147-may-2026.md` (2 H1s); `eleanor-ellie-nuno-independent-odc-grievance-odc-25-147-may-2026.md` (0 H1, bold line instead); `public-article-odc-25-147-what-the-ruling-means-and-why-it-warrants-review.md` (0 H1); evidence README (0 H1). GitBook renders the frontmatter `title` as the page heading, so the impact is low; the 10-H1 page is the only one that harms outline clarity. |
| Title vs navigation label | `public-article-odc-25-147-…md`: SUMMARY label "What the ODC's Ruling … Means" vs title "What the Available Record Shows — and Doesn't Show". Not harmful; editorial choice. |
| Broken relative links | 1: `transparency-and-public-understanding-attorney-discipline.md` → `../institutional-willful-blindness-pattern-analysis.md#…` (wrong `../`). |
| Absolute links → 404 (live) | 6: `/.gitbook/assets/sworn-declaration-elvis-nuno-2026.pdf`, `/forced-to-move-twice-…`, `/motion-to-seal-or-redact-court-record-…`, `/mt-doj-public-safety-officer-standards-training-post-complaint-august-2025`, `/open-letter-to-washington-unpaid-debt-unserved-purpose`, `/structural-failure-and-the-civil-rights-gap`. Sources: `README.md`, `a-deal-without-a-finish-line-…md` (4), `additional-evidence-and-documentation/connie-brueckner-investigative-report.md`. |
| Absolute links → 307 | 15 distinct targets (file-path-style URLs that GitBook redirects to group slugs), including the homepage and hub "Verify first" links to the timeline and the police/court index, and the shared include `odc-25-147-related-misjustice-alliance-case-file.md` used on 18 pages. 307 is temporary; linking the canonical URL avoids an extra hop and a weaker signal. |
| Section-root redirects | `/additional-evidence-and-documentation` and `/odc-lowney-grievance-2026` 307 to nested duplicate-slug pages (`…/additional-evidence-and-documentation/additional-evidence-and-documentation`). Fix needs GitBook UI page moves. Already noted in `SEO-index-summaries-REVIEW.md`. |
| Orphans | 0 files outside `SUMMARY.md`. |
| Publisher / affiliation / corrections | Absent sitewide. |
| Loaded or conclusory wording | Flag only (no change without review): homepage H1 "…ecosystem misconduct" states misconduct without "alleged" (site title says "Alleged"); `ywca-of-missoula-a-captured-system-…` nav label "captured system overview"; `the-shelter-and-the-storm-…` "Engine of Retaliation"; "Generally disinclined" page description states causation as fact (already flagged in `SEO-index-summaries-REVIEW.md`). These are analysis/opinion pages; a record-type label next to the title reduces the risk that a reader or an answer engine treats them as findings. |
| Record-type labels | Hubs mix filings, analyses, and correspondence in one list with no type label. The ODC 25-147 index is the strongest (it has a status section). |

## 5. Dataset and structured-data validation

| Item | Finding |
| --- | --- |
| Dataset landing pages (7) | Each is an index of **allegations and records** about named parties, not a tabular dataset with a downloadable file. They have description and scope; publisher, license, update date, and a machine-readable file are absent or only in prose. Schema.org `Dataset` markup would not match the visible content for most of them. **Recommendation: do not add Dataset schema to these pages.** |
| Real tabular data | `data/*.csv` (6 files) — MPD complaint statistics. Not published. The only genuine dataset candidate. |
| `mpd_annual_complaints_2016_2022.csv` | (a) Column `complaints_filed` holds allegation counts for 2021 (78) and 2022 (90) — the `source` cell says "allegations, not complaint count". Different unit in one column. (b) 2016 (46) and 2020 (53) are both "derived" from one residual: 349 − (24+32+26+78+90) = 99. One equation cannot set two unknowns, so the 46/53 split has no stated basis. (c) The residual uses the 2021–2022 allegation counts as if they were complaint counts. |
| `mpd_complaint_categories.csv` | `Other/General Misconduct` sustained = 56, marked "derived". 56 = 16% × 349, so this row assumes the "16% is a rate" reading. |
| `Interpretation-SustainedCount-SustainRate-Narrativ.csv` | Two scenarios: 16% rate (~56 findings) vs 16 count (4.6%). Unresolved by any primary source in the repository. |
| Prose that repeats the number | Qualified: `mpd-civilian-complaint-scorecard-analysis.md`, `oversight-evaluation-report-…md`, `missoula-police-oversight-students-guide-…md`. **Unqualified "16%":** `Structural_Failure_of_Police_Accountability_in_Montana_From_MPD_to_POST.md`, `policy-analysis-memorandum-…md`, `institutional-willful-blindness-pattern-analysis.md`, `additional-evidence-and-documentation/missoula-1983-misconduct-…/README.md`. |
| JSON-LD | Not deployed anywhere. The two `@context` blocks are visible code samples. |

## 6. Prioritized changes (proposed scope for this branch)

| # | Priority | Change | Evidence |
| --- | --- | --- | --- |
| 1 | P0 | Add `DEPLOYMENT.md` ownership map; mark root `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `entities.json` as not deployed (move to `ARCHIVE/` or delete — owner decision). No new sitemap/robots system. | §1, §2 |
| 2 | P0 | Cloudflare / Search Console human runbook with acceptance tests. | §3 |
| 3 | P0 | Fix 6 live 404 links, 1 broken relative link; repoint 307 links in the homepage, the five hubs, and the shared include to canonical URLs. | §4 |
| 4 | P0 | Fix evidence README empty title and broken description. | §4 |
| 5 | P1 | Shared "About this site / publisher / corrections / record types" page plus a one-line pointer in the existing disclaimer include. **Needs owner facts** (publisher name, affiliation statement, contact). | §4 |
| 6 | P1 | Five hubs: short direct answer, scope/jurisdiction/timeframe, "records show / alleged / unresolved", direct record links. No duplicated overview text. | §4 |
| 7 | P1 | `data/README.md` methodology: units, reported vs derived vs unconfirmed, the 16% ambiguity. Rename `complaints_filed` → keep values, add an explicit `measure` column. Open issues for each ambiguity. No value changes. | §5 |
| 8 | P1 | `tools/validate_site.py` + tests: frontmatter, SUMMARY targets, relative links, includes, missing/duplicate/template-broken metadata, `.gitbook.yaml` redirect targets, configurable live smoke test that tells a challenge from content. GitHub Actions workflow for the offline checks. | §4 |

**Not proposed:** new `llms.txt`, FAQ schema, Dataset schema on allegation index pages, keyword pages, H1 restructuring of filed documents (they reproduce filings), wording changes to allegations (flag only).

## 7. Human action required

1. **Cloudflare (dashboard → zone `ywcaofmissoula.com`):**
   - Security → Events: filter last 30 days by `Action = Managed Challenge / JS Challenge / Block`, group by user agent and by "Verified bot". Record any hit on Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot.
   - Security → Bots: record which mode is on (Bot Fight Mode / Super Bot Fight Mode / Bot Management) and whether "Verified bots" is set to Allow. Bot Fight Mode cannot be skipped by custom rules; if it challenges verified crawlers, change to Super Bot Fight Mode with "Verified bots: Allow" or turn it off.
   - Security → WAF → Custom rules and Rate limiting: record any rule on `/sitemap*`, `*.md`, `/llms*`. If needed, add a skip rule on `cf.client.bot` (verified bots), never on user agent.
   - Rules → Redirect Rules: confirm the apex → `www` rule is 301 and keeps path and query (confirmed live).
   - **Acceptance:** zero challenge/block actions on verified-bot traffic to public paths over 7 days.
2. **Google Search Console** (`sc-domain:ywcaofmissoula.com` or `https://www.ywcaofmissoula.com/`): submit `https://www.ywcaofmissoula.com/sitemap.xml`; inspect the three sample URLs in §2; record "Google-selected canonical" and "Crawled as". Also set up Bing Webmaster Tools and import from Search Console.
3. **GitBook UI:** move the nested duplicate pages up to the section roots for `/additional-evidence-and-documentation` and `/odc-lowney-grievance-2026`; confirm the site's custom domain is `www` and that "Allow search engines to index" is on.
4. **Owner decisions:** publisher statement wording, affiliation statement, corrections contact; whether to delete or archive the root discovery files.
