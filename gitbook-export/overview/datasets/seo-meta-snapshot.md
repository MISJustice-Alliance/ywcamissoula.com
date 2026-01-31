---
description: >-
  One-page snapshot of titles, descriptions, and target queries for core pages
  and datasets.
---

# SEO meta snapshot

## SEO meta snapshot

Use this as an exportable reference for search metadata.

Last updated: **2026-01-31**

### Sitemap (crawl entry point)

Sitemap entry point (submit this to Google Search Console):

* `https://www.ywcaofmissoula.com/sitemap.xml`

`sitemap.xml` is a **sitemap index**. The actual page URL list currently lives here:

* `https://www.ywcaofmissoula.com/sitemap-pages.xml`

<details>

<summary>sitemap.xml (current shape)</summary>

```xml
<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.ywcaofmissoula.com/sitemap-pages.xml</loc>
  </sitemap>
</sitemapindex>
```

</details>

Use the index + referenced sitemap(s) to sanity-check what Google can discover.

**Quick checks**

* The entry point loads as valid XML (`<sitemapindex>`).
* Each referenced sitemap loads as valid XML (`<urlset>`).
* URLs are all on the canonical host (`https://www.ywcaofmissoula.com/...`).
* Key hubs are present (Introduction, system index, timeline, MPD hub, YWCA hub).
* No sensitive or non-public material appears in the sitemap.
* No obvious duplicates exist (same page under multiple URL variants).

**Operational use**

* Submit the sitemap in Google Search Console.
* Use “Discovered URLs” vs “Indexed URLs” to spot gaps.
* If the sitemap looks stale or missing pages, suspect caching. Re-check with a cache-buster (e.g. `?v=2026-01-31`) or purge CDN caches if you control them.

#### Recommended sitemap.xml shape (practical defaults)

This format is easier to diff and less noisy for crawlers:

* Prefer **only** `<loc>` + `<lastmod>`.
* Omit `<priority>` and `<changefreq>`.
  * Google largely ignores them.
  * Most generators set them incorrectly (everything becomes `0.84`).
* Normalize `lastmod` to **date-only** (`YYYY-MM-DD`).
  * Avoids “fake changes” caused by rebuild timestamps.
* Spot-check any `<loc>` values that end mid-word.
  * That often means a slug/path got truncated by a generator.

<details>

<summary>Optimized sitemap.xml (copy/paste)</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ywcaofmissoula.com</loc>
    <lastmod>2026-01-30</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/community-response-to-police-misconduct-outreach-in-missoula</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-001-case-files-index</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-002-case-files-index</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/damages-evidence-quantified-and-non-economic</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/fabricated-evidence-and-false-reporting</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/first-amendment-retaliation-evidence-protected-speech-escalation</loc>
    <lastmod>2026-01-22</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/fourth-amendment-evidence-entry-seizure-and-digital-search</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-d81209a2</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-daf82b62</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/mpd-retaliation-and-escalation-after-complaints-evidence-index</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ongoing-harassment-and-rico-predicate-framing</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/prosecutorial-misconduct-and-brady-issues-evidence-index</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/prosecutorial-misconduct-evidence</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/scope-and-primary-evidence-types</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ywca-institutional-liability-evidence</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ywca-of-missoula-board-conflicts-investigative-index</loc>
    <lastmod>2026-01-21</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/legal-malpractice-evidence-bryan-tipp</loc>
    <lastmod>2026-01-22</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/legal-malpractice-evidence-bryan-tipp/2019-dr.-stratford-psychiatric-letter-gps-monitoring-harm-missoula-wa-prosecution-and-malpractice</loc>
    <lastmod>2026-01-30</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/legal-malpractice-evidence-bryan-tipp/generally-disinclined-legal-malpractice-and-first-amendment-retaliation-nuno-case</loc>
    <lastmod>2026-01-22</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/2017-2025-bryan-tipps-malpractice-its-devastating-impact-on-civil-rights-account</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/full-analysis-of-fourteenth-amendment-equal-protection-and-due-process-violation</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/intentional-infliction-of-extreme-psychological-trauma-2015-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/legal-analysis-ywca-of-missoula-board-conflicts-and-police-integration</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/legal-red-flags-the-missoula-needs-gaps-analysis-as-evidence-of-institutional-co</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/update-analysis-of-ywca-misconduct-and-lifeguard-group-investigation</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/ywca-of-missoula-a-captured-system-operating-through-coordinated-institutional-f</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/legal-analysis/ywca-of-missoulas-role-in-first-amendment-violations-against-mr-nuno-2018-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-25-147-right-to-request-review-november-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-25-147-right-to-request-review-november-2025/re-grievance-against-bryan-c.-tipp-request-for-review</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/misjustice-alliance-case-file-2df48ac7</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-1-august-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-1-august-2025/appendix-a-comparison-of-officer-smith-vs.-detective-brueckner-conflicts</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-1-august-2025/appendix-b-list-of-motions-that-should-have-been-filed</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-1-august-2025/appendix-c-constitutional-violations-identified-but-not-addressed</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-1-august-2025/appendix-d-documentation-of-lost-civil-claims-and-statute-of-limitations</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-3-cover-letter-september-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-3-cover-letter-september-2025/mt-bar-complaint-odc-no.-25-147-supplemental-submission-3-september-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/mt-bar-complaint-odc-no.-25-147-supplemental-submission-3-cover-letter-september-2025/mt-bar-complaint-odc-no.-25-147-supplemental-submission-3.1-september-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-response-to-bryan-tipp-bar-complaint-answer-octo</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-response-to-bryan-tipp-bar-complaint-answer-octo/mt-bar-complaint-odc-no.-25-147-odc-ruling-november-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-response-to-bryan-tipp-bar-complaint-answer-octo/mt-bar-complaint-odc-no.-25-147-response-to-bryan-tipp-bar-complaint-answer-october-4th-2025</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-bar-complaints/odc-25-147-bryan-tipp-montana-bar-complaint-index</loc>
    <lastmod>2026-01-31</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/2017-2019-misdemeanor-felony-stalking-charges-civil-rights-violations-false-imp</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/allegations-against-ywca-of-missoula-board-member-detective-connie-brueckner-pat</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/elise-chards-abuse-and-manipulation-of-the-protection-filing-system-june-2018</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/fishing-expedition-via-facebook-account-data-dump-search-warrant-2018</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/home-invasion-warrantless-arrest-false-imprisonment-lost-in-missoula-county-j</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/montana-legal-cases</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/remembering-when-mpd-county-prosecutors-and-the-ywca-allowed-missoula-to-becom</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/stalking-charging-documents-systemic-misconduct-and-evidentiary-failures-septemb</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-cases/threats-malicious-harassment-from-ywca-associates-2020-2022</loc>
    <lastmod>2026-01-19</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/montana-state-complaints/mt-doj-public-safety-officer-standards-training-post-complaint-august-2025</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/montana-state-complaints/post-mortem-of-mt-doj-post-complaint-dismissal-august-2025</loc>
    <lastmod>2026-01-19</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/overview/bryan-tipp-malpractice-allegations-missed-1983-deadlines-and-source-index</loc>
    <lastmod>2026-01-30</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/civil-rights-violations-and-related-claims-2015-2025</loc>
    <lastmod>2026-01-30</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/comprehensive-timeline-relationship-diagram-actionable-claims</loc>
    <lastmod>2026-01-22</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets</loc>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/dataset-catalog</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/official-complaints-dataset</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/primary-records-dataset</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/seo-meta-snapshot</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/structured-data-bundle-single-file</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/datasets/timeline-and-claims-map-dataset</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/missoula-police-mpd-misconduct-allegations-retaliation-evidence-and-primary-record-index</loc>
    <lastmod>2026-01-30</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/nuno-case-system-overview-and-full-article-index</loc>
    <lastmod>2026-01-22</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/police-reports-court-docs-and-correspondence-index</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/sources-and-record-index</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/washington-montana-legal-cases-index</loc>
    <lastmod>2026-01-18</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/overview/ywca-missoula-conflicts-of-interest-mpd-integration-and-evidence-index</loc>
    <lastmod>2026-01-30</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-and-state-department-complaints</loc>
    <lastmod>2026-01-31</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-doj-civil-rights-division-filing-658793-skb-august-2025</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-doj-civil-rights-division-filing-658793-skb-august-2025/fbi-report-filing-pattern-of-cross-jurisdictional-civil-rights-violations-insti</loc>
    <lastmod>2026-01-31</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2015-2016-seattle-case-related-civil-rights-violations</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2015-2017-ineffective-assistance-of-counsel-and-plea-withdrawal-in-washington-st</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2016-dr-marta-j.l.-miranda-medical-malpractice-executive-summary-for-legal-advoc</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2016-dr.-marta-j.l.-miranda-psy.d.-professional-misconduct-hipaa-violations-d</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2016-legal-analysis-of-washington-state-bar-complaint-in-re-patricia-fulton</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2016-seattle-opa-complaint-2016opa-1167-post-mortem-legal-analysis</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/2020-wa-cases-witness-tampering-coerced-pleas-and-the-impossible-catch-22-sit</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/edmonds-case-2015-2017</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-cases/washington-legal-cases-index</loc>
    <lastmod>2026-01-31</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/washington-state-complaints/motion-to-seal-or-redact-court-record-dr-marta-miranda-evaluation-edmonds-munici</loc>
    <lastmod>2026-01-17</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-state-complaints/seattle-opa-complaint-2016opa-1167-2016</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-state-complaints/wa-state-bar-complaint-patricia-fulton-2016</loc>
    <lastmod>2026-01-19</lastmod>
  </url>
  <url>
    <loc>https://www.ywcaofmissoula.com/washington-state-complaints/wa-state-dept.-of-health-complaint-dr.-marta-miranda-2016</loc>
    <lastmod>2026-01-19</lastmod>
  </url>

  <url>
    <loc>https://www.ywcaofmissoula.com/ywca-complaints/ywca-complaint-google-reviews-other-victims-of-ywca-misconduct-2018-2020</loc>
    <lastmod>2026-01-21</lastmod>
  </url>
</urlset>
```

</details>

### Site-level focus (search intent)

This documentation covers alleged misconduct and civil-rights issues involving:

* Missoula Police Department (MPD)
* Missoula County prosecutors
* YWCA of Missoula
* The Nuno case (2015–2025) as the evidence spine

Primary jurisdictions:

* Missoula, Montana
* Seattle and Edmonds, Washington

Core legal framing:

* First Amendment retaliation
* Fourth Amendment search/seizure
* Fourteenth Amendment due process / equal protection
* 42 U.S.C. § 1983

### Canonical entry points (recommended to index)

#### Introduction

* URL: [Introduction](../../)
* Title: `Introduction`
* Description: `Documentation focused on alleged misconduct by MPD, Missoula County prosecutors, and YWCA of Missoula (2012–present). The Nuno case is the core case study (2015–2025).`
* Target queries:
  * `Missoula police misconduct documentation`
  * `Missoula prosecutors civil rights violations`
  * `YWCA of Missoula conflict of interest`

#### Search hubs (exact-match queries)

These pages are designed to be the first click from common branded searches.

**YWCA Missoula**

* URL: [YWCA Missoula: conflicts of interest, MPD integration, and evidence index](../ywca-missoula-conflicts-of-interest-mpd-integration-and-evidence-index.md)
* Title: `YWCA Missoula: conflicts of interest, MPD integration, and evidence index`
* Description: `YWCA Missoula (YWCA of Missoula): allegations of conflict of interest, police/prosecutor integration signals, and a curated index of primary records and analysis.`
* Target queries:
  * `YWCA Missoula`
  * `YWCA of Missoula`
  * `YWCA Missoula conflict of interest`

**Bryan Tipp**

* URL: [Bryan Tipp: malpractice allegations, missed §1983 deadlines, and source index](../bryan-tipp-malpractice-allegations-missed-1983-deadlines-and-source-index.md)
* Title: `Bryan Tipp: malpractice allegations, missed §1983 deadlines, and source index`
* Description: `Bryan Tipp (Tipp, Colburn, Lockwood): malpractice allegations tied to missed statutes of limitations and lost §1983 claims, with links to bar-complaint filings and supporting records.`
* Target queries:
  * `Bryan Tipp`
  * `Tipp Colburn Lockwood`
  * `Montana Bar complaint Bryan Tipp`

**Missoula Police**

* URL: [Missoula Police (MPD): misconduct allegations, retaliation evidence, and primary-record index](../missoula-police-mpd-misconduct-allegations-retaliation-evidence-and-primary-record-index.md)
* Title: `Missoula Police (MPD): misconduct allegations, retaliation evidence, and primary-record index`
* Description: `Missoula Police Department (MPD): curated entry point for alleged misconduct, retaliation patterns, warrants/searches, and links into primary records and case timelines.`
* Target queries:
  * `Missoula Police`
  * `Missoula Police Department`
  * `MPD Missoula`

#### System overview / site map

* URL: [Nuno case system overview and full article index](../nuno-case-system-overview-and-full-article-index.md)
* Title: `Nuno case system overview and full article index`
* Description: `Site map of every article, organized around the Nuno case (2015–2025) as the evidence spine for investigating alleged misconduct and revictimization in Missoula’s MPD/prosecutor/YWCA ecosystem.`
* Target queries:
  * `Nuno case timeline index`
  * `Missoula MPD prosecutors YWCA evidence index`

#### Timeline & claims

* URL: [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](../../comprehensive-timeline,-relationship-diagram,-actionable-claims.md)
* Title: `Comprehensive Timeline, Relationship Diagram, & Actionable Claims`
* Description: `Master timeline and index (2014-2025) of filings, evidence, relationship diagrams, and actionable civil rights claims in Montana and Washington in regards to the Nuno case.`
* Target queries:
  * `Missoula civil rights timeline 2014 2025`
  * `Section 1983 Missoula timeline`

### High-value analysis pages (should index)

#### "Generally disinclined" malpractice analysis (Dec 23, 2020 correspondence)

* URL: ["Generally disinclined": Legal malpractice and First Amendment retaliation (Nuno case)](../../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/legal-malpractice-evidence-bryan-tipp/generally-disinclined-legal-malpractice-and-first-amendment-retaliation-nuno-case.md)
* Title: `"Generally disinclined": Legal malpractice and First Amendment retaliation (Nuno case)`
* Description: `How Bryan Tipp’s refusal to act on known First Amendment retaliation and harassment cost Elvis Nuno his civil rights claims.`
* Target queries:
  * `Bryan Tipp generally disinclined`
  * `Montana legal malpractice statute of limitations`
  * `First Amendment retaliation Missoula`
  * `Missoula Deputy County Attorney Brian Lowney letter December 23 2020`

#### Stratford psychiatric letter (Apr 10, 2019) + GPS monitoring harm

* URL: [2019 Dr. Stratford psychiatric letter: GPS monitoring harm, Missoula/WA prosecution, and malpractice](../../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/legal-malpractice-evidence-bryan-tipp/2019-dr.-stratford-psychiatric-letter-gps-monitoring-harm-missoula-wa-prosecution-and-malpractice.md)
* Title: `2019 Dr. Stratford psychiatric letter: GPS monitoring harm, Missoula/WA prosecution, and malpractice`
* Description: `April 10, 2019 psychiatric letter documenting harm during GPS monitoring and parallel MT/WA prosecutions; supports §1983, IIED, and malpractice analysis.`
* Target queries:
  * `Dr William Stratford letter April 10 2019`
  * `GPS ankle monitor pretrial release Missoula`
  * `Missoula stalking case dismissal with prejudice 2021`
  * `Bryan Tipp malpractice psychiatric letter`

### Dataset landing pages (collection-level SEO)

These are designed to rank as “collection” pages.

#### Dataset catalog

* URL: [Dataset catalog](dataset-catalog.md)
* Title: `Dataset catalog`
* Description: `Dataset-style landing pages for Google indexing and evidence reuse.`

#### Primary records dataset

* URL: [Primary records dataset](primary-records-dataset.md)
* Title: `Primary records dataset`
* Description: `Police reports, court filings, and correspondence tied to the Nuno case record.`
* Target queries:
  * `Missoula police reports court filings correspondence`
  * `Nuno case primary records`

#### Official complaints dataset

* URL: [Official complaints dataset](official-complaints-dataset.md)
* Title: `Official complaints dataset`
* Description: `DOJ/FBI filings and state-level complaints (bar, POST, health) connected to the record.`
* Target queries:
  * `DOJ civil rights complaint Missoula`
  * `Montana POST complaint`
  * `Montana Bar complaint Bryan Tipp`

#### Timeline & claims map dataset

* URL: [Timeline & claims map dataset](timeline-and-claims-map-dataset.md)
* Title: `Timeline & claims map dataset`
* Description: `A time-ordered dataset of events, relationships, and actionable claims.`
* Target queries:
  * `Missoula misconduct timeline dataset`
  * `civil rights claims map`

### Supporting hubs (link targets)

#### Sources index

* URL: [Sources & record index](../sources-and-record-index.md)
* Title: `Sources & record index`
* Description: `Primary record index (police reports, court filings, complaints, correspondence) plus a bibliography of secondary/public sources.`

#### Police reports / docs index

* URL: [Police Reports, Court Docs, and Correspondence Index](../../police-reports,-court-docs,-and-correspondence-index.md)
* Title: `Police Reports, Court Docs, and Correspondence Index`
* Description: `Index of police reports, court documents, correspondence, and federal/state complaints supporting the Mr. Nuno civil rights record.`

#### Complaints index

* URL: [Federal and State Department Complaints](../../state-and-federal-complaints/federal-and-state-department-complaints.md)
* Title: `Federal and State Department Complaints`
* Description: `Index of federal and state complaint filings: DOJ Civil Rights, FBI report, Washington Bar/DOH, Seattle OPA, Montana Bar, and POST complaints.`

### Notes

* This snapshot reflects what search engines can infer from page titles, descriptions, and internal links.
* If you later add machine-readable structured data, mirror these fields.

***

### Machine-readable export (structured data)

This section is designed for copy/paste into whatever layer controls your site `<head>`.

It is still useful as a canonical export, even if you cannot inject it yet.

Single-file bundle: [Structured data bundle (single file)](structured-data-bundle-single-file.md).

{% hint style="info" %}
This export is now built for the base URL: `https://www.ywcaofmissoula.com`.

If your dataset pages live on a different host/path, update the `url` and `@id` fields to match the **published** URLs.
{% endhint %}

#### JSON-LD: Dataset catalog (CollectionPage)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/ABKxTfNgmLZjWKlsIOV7",
  "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/ABKxTfNgmLZjWKlsIOV7",
  "name": "Dataset catalog",
  "description": "Dataset-style landing pages for Google indexing and evidence reuse.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "MisJustice Alliance documentation",
    "url": "https://www.ywcaofmissoula.com/"
  },
  "hasPart": [
    {
      "@type": "Dataset",
      "name": "Primary records dataset",
      "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/DUyAJzGrQXHs3mITDkjD"
    },
    {
      "@type": "Dataset",
      "name": "Official complaints dataset",
      "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/Ct3JEtwF0P3wgoyivkoi"
    },
    {
      "@type": "Dataset",
      "name": "Timeline & claims map dataset",
      "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/HgpgKcwkNxDlrhtIgtk2"
    }
  ]
}
```

#### JSON-LD: Primary records dataset

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/DUyAJzGrQXHs3mITDkjD",
  "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/DUyAJzGrQXHs3mITDkjD",
  "name": "Primary records dataset",
  "description": "Police reports, court filings, and correspondence tied to the Nuno case record.",
  "keywords": [
    "Missoula",
    "Montana",
    "Seattle",
    "Edmonds",
    "police reports",
    "court documents",
    "correspondence",
    "civil rights",
    "42 U.S.C. § 1983"
  ],
  "temporalCoverage": "2012/..",
  "spatialCoverage": [
    { "@type": "Place", "name": "Missoula, Montana, US" },
    { "@type": "Place", "name": "Seattle, Washington, US" },
    { "@type": "Place", "name": "Edmonds, Washington, US" }
  ],
  "creator": { "@type": "Organization", "name": "MisJustice Alliance" },
  "publisher": { "@type": "Organization", "name": "MisJustice Alliance" },
  "distribution": [
    {
      "@type": "DataDownload",
      "name": "Police Reports, Court Docs, and Correspondence Index",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/mv0hubQ7NR5exZd3f1E0"
    },
    {
      "@type": "DataDownload",
      "name": "Sources & record index",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/niiOqBHvxvYTUhGzfMf2"
    }
  ]
}
```

#### JSON-LD: Official complaints dataset

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/Ct3JEtwF0P3wgoyivkoi",
  "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/Ct3JEtwF0P3wgoyivkoi",
  "name": "Official complaints dataset",
  "description": "DOJ/FBI filings and state-level complaints (bar, POST, health) connected to the record.",
  "keywords": [
    "DOJ Civil Rights Division",
    "FBI",
    "Montana POST",
    "Montana Bar",
    "Washington State Bar",
    "Washington Department of Health",
    "Seattle OPA",
    "Missoula",
    "civil rights complaint"
  ],
  "temporalCoverage": "2016/..",
  "spatialCoverage": [
    { "@type": "Place", "name": "Missoula, Montana, US" },
    { "@type": "AdministrativeArea", "name": "Washington, US" }
  ],
  "creator": { "@type": "Organization", "name": "MisJustice Alliance" },
  "publisher": { "@type": "Organization", "name": "MisJustice Alliance" },
  "distribution": [
    {
      "@type": "DataDownload",
      "name": "Federal and State Department Complaints",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/97aNIb2VCSssvJzYWcbn"
    }
  ]
}
```

#### JSON-LD: Timeline & claims map dataset

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/HgpgKcwkNxDlrhtIgtk2",
  "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/HgpgKcwkNxDlrhtIgtk2",
  "name": "Timeline & claims map dataset",
  "description": "A time-ordered dataset of events, relationships, and actionable claims.",
  "keywords": [
    "timeline",
    "relationship diagram",
    "actionable claims",
    "Missoula",
    "civil rights",
    "42 U.S.C. § 1983"
  ],
  "temporalCoverage": "2014/2025",
  "spatialCoverage": [
    { "@type": "Place", "name": "Missoula, Montana, US" },
    { "@type": "Place", "name": "Seattle, Washington, US" },
    { "@type": "Place", "name": "Edmonds, Washington, US" }
  ],
  "creator": { "@type": "Organization", "name": "MisJustice Alliance" },
  "publisher": { "@type": "Organization", "name": "MisJustice Alliance" },
  "distribution": [
    {
      "@type": "DataDownload",
      "name": "Comprehensive Timeline, Relationship Diagram, & Actionable Claims",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/fSV2kSDyE0mE7B2tcO5O"
    }
  ]
}
```

#### If you can’t inject JSON-LD yet

Keep these blocks here as the “source of truth”.

When you later add structured data support, reuse them verbatim.
