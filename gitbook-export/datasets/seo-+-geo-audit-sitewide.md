---
title: >-
  Dataset SEO/GEO Audit: YWCA of Missoula GitBook Indexing and Crawler
  Optimization
description: >-
  Sitewide audit dataset for YWCA of Missoula GitBook pages, covering
  crawlability, Dataset JSON-LD readiness, internal linking, canonical URL
  placement, and AI-search citation structure.
---


# Dataset SEO/GEO Audit: YWCA of Missoula GitBook Indexing and Crawler Optimization

### Executive snapshot

This page is the public audit dataset for search, Dataset Search, and AI crawler readiness across the YWCA of Missoula GitBook site. It tracks page-level SEO/GEO standards, Dataset metadata readiness, internal-link coverage, index placement, and crawler-facing access signals. The audit is intended for documentation maintenance, metadata stewardship, and external discovery review. It does not create new factual allegations; it evaluates how existing record-linked pages are structured for retrieval, citation, and verification.

{% include "../.gitbook/includes/analysis-page-disclaimer-seo-geo-standard.md" %}

### Dataset identity

| Field | Value |
|-------|-------|
| **Dataset name** | Dataset SEO/GEO Audit: YWCA of Missoula GitBook Indexing and Crawler Optimization |
| **Site** | YWCA of Missoula Accountability Documentation |
| **Public canonical URL** | https://www.ywcaofmissoula.com/datasets/seo-+-geo-audit-sitewide |
| **Internal export path** | `datasets/seo-+-geo-audit-sitewide.md` |
| **Scope** | Sitewide GitBook SEO, GEO, crawler access, Dataset metadata, and internal-link structure |
| **Geography** | Missoula, Montana; Washington/Montana legal record context |
| **Temporal coverage** | 2012-present record set; audit maintained from 2026-01-31 forward |
| **Last reviewed** | 2026-07-05 |
| **Steward** | MisJustice Alliance / site documentation maintainer |

### Verify first

* Dataset catalog: [Dataset Catalog Indexes](https://www.ywcaofmissoula.com/datasets/dataset-catalog-indexes)
* Structured-data source of truth: [Structured data registry (Dataset values)](https://www.ywcaofmissoula.com/datasets/structured-data-registry-dataset-values)
* Dataset CSV export: [Dataset CSV export](https://www.ywcaofmissoula.com/datasets/dataset-csv-export)
* Source/citation hub: [Sources & record index](https://www.ywcaofmissoula.com/overview/sources-and-record-index)
* Timeline spine: [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](https://www.ywcaofmissoula.com/comprehensive-timeline,-relationship-diagram,-actionable-claims)
* AI crawler map: [llms.txt](https://www.ywcaofmissoula.com/llms.txt)

### What this audit measures

This audit evaluates whether important GitBook pages are discoverable, internally linked, clearly described, and ready for search-engine and AI-assisted citation. The minimum page standard is:

1. Clear title and description.
2. Executive snapshot with who, where, when, what, and verification path.
3. “Verify first” links to primary records and canonical hubs.
4. Stable internal links from at least one hub page.
5. Public canonical URL selected for Dataset JSON-LD.
6. Dataset registry row when the page represents a dataset, catalog, structured export, or audit record.
7. Sitemap, table-of-contents, and `llms.txt` inclusion when the page is intended for indexing.

### Current priority findings

* This audit page is now public-facing and should remain listed in [Dataset Catalog Indexes](https://www.ywcaofmissoula.com/datasets/dataset-catalog-indexes), [Structured data registry (Dataset values)](https://www.ywcaofmissoula.com/datasets/structured-data-registry-dataset-values), [Dataset CSV export](https://www.ywcaofmissoula.com/datasets/dataset-csv-export), `SUMMARY.md`, and `llms.txt`.
* Dataset canonical URLs should use one hostname consistently: `https://www.ywcaofmissoula.com`.
* External packets are classified as `distribution` values in the structured-data registry; reserve `sameAs` for equivalent copies or mirrors of a dataset landing page.
* The repo now includes `llms.txt`, `robots.txt`, and `sitemap.xml`. Confirm after deployment that the published GitBook domain serves all three files from the public root.

### Related dataset pages

* [Dataset: YWCA of Missoula alleged misconduct (2012-present)](https://www.ywcaofmissoula.com/datasets/dataset-ywca-of-missoula-alleged-misconduct-2012-present)
* [Dataset: Missoula Police + prosecutors alleged misconduct (2012-present)](https://www.ywcaofmissoula.com/datasets/dataset-missoula-police-+-prosecutors-alleged-misconduct-2012-present)
* [Dataset: Nuno case civil-rights violations and timeline (2014-2025)](https://www.ywcaofmissoula.com/datasets/dataset-nuno-case-civil-rights-violations-and-timeline-2014-2025)
* [Structured data registry (Dataset values)](https://www.ywcaofmissoula.com/datasets/structured-data-registry-dataset-values)

### External Dataset JSON-LD draft

{% code title="seo-geo-audit-dataset.jsonld" %}
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Dataset SEO/GEO Audit: YWCA of Missoula GitBook Indexing and Crawler Optimization",
  "description": "Sitewide audit dataset for YWCA of Missoula GitBook pages, covering crawlability, Dataset JSON-LD readiness, internal linking, canonical URL placement, and AI-search citation structure.",
  "url": "https://www.ywcaofmissoula.com/datasets/seo-+-geo-audit-sitewide",
  "identifier": "ywcaofmissoula-seo-geo-audit-sitewide",
  "creator": {
    "@type": "Organization",
    "name": "MisJustice Alliance"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MisJustice Alliance"
  },
  "isAccessibleForFree": true,
  "dateModified": "2026-07-05",
  "temporalCoverage": "2012/..",
  "spatialCoverage": {
    "@type": "Place",
    "name": "Missoula, Montana"
  },
  "keywords": [
    "GitBook SEO",
    "Dataset JSON-LD",
    "Google Dataset Search",
    "AI crawler optimization",
    "YWCA of Missoula",
    "Missoula civil rights records"
  ],
  "isPartOf": {
    "@type": "DataCatalog",
    "name": "YWCA of Missoula Accountability Documentation Dataset Catalog",
    "url": "https://www.ywcaofmissoula.com/datasets/dataset-catalog-indexes"
  }
}
```
{% endcode %}

### Public indexing checklist

* Keep this page public in GitBook navigation.
* Keep the canonical URL synchronized across the page, registry, CSV export, sitemap, and `llms.txt`.
* Confirm that the published page is not blocked by robots rules or page-level `noindex`.
* Validate the JSON-LD with Google Rich Results Test after site-level header injection.
* Inspect the canonical URL in Google Search Console after publication.

{% hint style="info" %}
This is an SEO/GEO audit of a site that publishes **allegations** and links to **primary records**.

Indexing gains come from better structure, clearer provenance, and safer phrasing.
{% endhint %}

### Working assumptions

* The site is published on a public domain (or gitbook.io) with stable canonical URLs.
* Pages are intended to rank for:
  * entity queries (people/orgs)
  * event + year queries
  * claim-type queries (e.g., “§1983 malicious prosecution”, “Brady violation”)
  * record-type queries (complaint, motion, order, packet)
* Readers include journalists, researchers, attorneys, and LLM-based research tools.

### Sitewide success criteria

#### SEO (search engines)

* Clear, consistent titles and descriptions.
* Strong internal linking to canonical hubs and primary records.
* Hub pages that summarize and route.
* Reduced duplicate/near-duplicate “analysis” pages.

#### GEO (generative / LLM indexing)

* Each page starts with a factual 3–6 sentence snapshot.
* Snapshot includes:
  * **who** (entities)
  * **where** (jurisdiction)
  * **when** (timeframe)
  * **what** (allegations / issues)
  * **verify** (primary citations)
* Consistent “Verify first” blocks and stable anchor terms.

***

### Legal Analysis

Legal Analysis pages should win high-intent queries (“§1983 Monell claim Missoula”, “Fourteenth Amendment class-of-one”), but only if they read like **legal research memos with citations**, not advocacy copy.

#### Priority 0 standards (applied)

Use this as the default “first screen” for every Legal Analysis page.

* **Executive snapshot** (3–6 sentences)
  * include **who / where / when / what**
  * say “alleged” early when needed
  * avoid conclusions in the first paragraph
* **Standard disclaimer block**
  * include the reusable “analysis disclaimer” block on every analysis page
* **Verify first (primary artifacts)** (5–12 links)
  * start with the **index** pages and **packet** links that prove the narrative
  * prefer stable packet URLs (Arweave) and canonical internal hubs
* **Scope** (optional, but recommended)
  * timeframe, jurisdiction, doctrines

#### Progress log (historical record)

**2026-01-31**

Legal Analysis pages updated for Priority 0:

* ✅ [Bryan Tipp malpractice (2017–2025)](https://www.ywcaofmissoula.com/2017-2025-bryan-tipps-malpractice-its-devastating-impact-on-civil-rights-account)
* ✅ [Full Analysis of Fourteenth Amendment Equal Protection and Due Process Violations (2015-2025)](https://www.ywcaofmissoula.com/full-analysis-of-fourteenth-amendment-equal-protection-and-due-process-violation)
* ✅ [Intentional Infliction of Extreme Psychological Trauma (2015-2025)](https://www.ywcaofmissoula.com/intentional-infliction-of-extreme-psychological-trauma-2015-2025)
* ✅ [Missoula Needs & Gaps analysis: homelessness funding and institutional capture](https://www.ywcaofmissoula.com/legal-red-flags-the-missoula-needs-gaps-analysis-as-evidence-of-institutional-co)
* ✅ [YWCA of Missoula conflict of interest: board conflicts and police integration](https://www.ywcaofmissoula.com/legal-analysis-ywca-of-missoula,-board-conflicts,-and-police-integration)
* ✅ [YWCA of Missoula: captured system overview](https://www.ywcaofmissoula.com/ywca-of-missoula-a-captured-system-operating-through-coordinated-institutional-f)
* ✅ [YWCA of Missoula's Role in First Amendment Violations Against Mr Nuno (2018-2025)](https://www.ywcaofmissoula.com/ywca-of-missoulas-role-in-first-amendment-violations-against-mr-nuno-2018-2025)
* ✅ [Update: Analysis of YWCA Misconduct and LifeGuard Group Investigation](https://www.ywcaofmissoula.com/update-analysis-of-ywca-misconduct-and-lifeguard-group-investigation)

Supporting work:

* ✅ Added reusable “Analysis page disclaimer (SEO/GEO standard)” block and included it across Legal Analysis pages.
* ✅ Updated Bryan Tipp hub page in Overview to match the same verification-first pattern.

Overview hubs updated for Priority 0:

* ✅ [Missoula law enforcement and victim-advocacy ecosystem misconduct (2012–present)](https://www.ywcaofmissoula.com)
* ✅ [Nuno case system overview and full article index](https://www.ywcaofmissoula.com/overview/nuno-case-system-overview-and-full-article-index)
* ✅ [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](https://www.ywcaofmissoula.com/comprehensive-timeline,-relationship-diagram,-actionable-claims)
* ✅ [Missoula §1983 misconduct: civil rights violations and related claims (2015-2025)](https://www.ywcaofmissoula.com/civil-rights-violations-and-related-claims-2015-2025)
* ✅ [Sources & record index](https://www.ywcaofmissoula.com/overview/sources-and-record-index)
* ✅ [Police Reports, Court Docs, and Correspondence Index](https://www.ywcaofmissoula.com/police-reports,-court-docs,-and-correspondence-index)
* ✅ [YWCA Missoula: conflicts of interest, MPD integration, and evidence index](https://www.ywcaofmissoula.com/overview/ywca-missoula-conflicts-of-interest-mpd-integration-and-evidence-index)
* ✅ [Missoula Police (MPD): misconduct allegations, retaliation evidence, and primary-record index](https://www.ywcaofmissoula.com/overview/missoula-police-mpd-misconduct-allegations-retaliation-evidence-and-primary-record-index)
* ✅ [Washington/Montana Legal Cases Index](https://www.ywcaofmissoula.com/washington-montana-legal-cases-index)
* ✅ [Federal and State Department Complaints](https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-and-state-department-complaints)
* ✅ [CR-2025-001 — Case files index](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-001-case-files-index)
* ✅ [CR-2025-002 — Case files index](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-002-case-files-index)

Dataset catalog + dataset landing pages updated for Priority 0:

* ✅ [Dataset Catalog Indexes](https://www.ywcaofmissoula.com/datasets/dataset-catalog-indexes)
* ✅ [Dataset: Nuno case civil-rights violations and timeline (2014–2025)](https://www.ywcaofmissoula.com/datasets/dataset-nuno-case-civil-rights-violations-and-timeline-2014-2025)
* ✅ [Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)](https://www.ywcaofmissoula.com/datasets/dataset-missoula-police-+-prosecutors-alleged-misconduct-2012-present)
* ✅ [Dataset: YWCA of Missoula alleged misconduct (2012–present)](https://www.ywcaofmissoula.com/datasets/dataset-ywca-of-missoula-alleged-misconduct-2012-present)
* ✅ [Dataset: Bryan Tipp alleged legal malpractice (2017–2025)](https://www.ywcaofmissoula.com/datasets/dataset-bryan-tipp-alleged-legal-malpractice-2017-2025)
* ✅ [Dataset: E’Lise Michelle Chard / Hall alleged criminal actions (2015–2025)](https://www.ywcaofmissoula.com/datasets/dataset-elise-michelle-chard-hall-alleged-criminal-actions-2015-2025)
* ✅ [Dataset: Danielle Christine Chard / Bemis alleged criminal actions (2015–2025)](https://www.ywcaofmissoula.com/datasets/dataset-danielle-christine-chard-bemis-alleged-criminal-actions-2015-2025)

MisJustice Alliance internal case-file index pages updated for Priority 0:

* ✅ [MisJustice Alliance case file: d81209a2](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-d81209a2...)
* ✅ [MisJustice Alliance case file: daf82b62](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-daf82b62...)
* ✅ [MisJustice Alliance case file: 2df48ac7](https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/misjustice-alliance-case-file-2df48ac7...)

Montana + Washington case index pages updated for Priority 0:

* ✅ [Montana Legal Cases](https://www.ywcaofmissoula.com/montana-legal-cases)
* ✅ [Washington Legal Cases Index](https://www.ywcaofmissoula.com/washington-legal-cases-index)

Discipline + evidence router pages updated for Priority 0:

* ✅ [ODC 25-147 (Bryan Tipp) — Montana Bar Complaint index](https://www.ywcaofmissoula.com/montana-bar-complaints/odc-25-147-bryan-tipp-montana-bar-complaint-index)
* ✅ [Evidence of Civil Rights Violations, Misconduct, YWCA RICO Predicates, et al](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/)

Evidence sub-index pages updated for Priority 0:

* ✅ [Fourth Amendment evidence (entry, seizure, and digital search)](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/fourth-amendment-evidence-entry-seizure-and-digital-search)
* ✅ [Fabricated evidence and false reporting](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/fabricated-evidence-and-false-reporting)
* ✅ [MPD retaliation and escalation after complaints (evidence index)](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/mpd-retaliation-and-escalation-after-complaints-evidence-index)
* ✅ [First Amendment retaliation evidence (protected speech → escalation)](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/first-amendment-retaliation-evidence-protected-speech-escalation)
* ✅ [Prosecutorial misconduct, Brady/Giglio, and abuse-of-process evidence index](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/prosecutorial-misconduct-and-brady-issues-evidence-index)
* ✅ [Prosecutorial misconduct, Brady/Giglio, and abuse-of-process evidence](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/prosecutorial-misconduct-evidence)
* ✅ [Damages evidence (quantified and non-economic)](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/damages-evidence-quantified-and-non-economic)
* ✅ [YWCA institutional liability evidence](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ywca-institutional-liability-evidence)
* ✅ [Ongoing harassment and RICO predicate framing](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ongoing-harassment-and-rico-predicate-framing)
* ✅ [Scope and primary evidence types](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/scope-and-primary-evidence-types)
* ✅ [Legal malpractice evidence (Bryan Tipp)](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/legal-malpractice-evidence-bryan-tipp/)
* ✅ [YWCA of Missoula board conflicts (investigative index)](https://www.ywcaofmissoula.com/additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ywca-of-missoula-board-conflicts-investigative-index)

#### Primary goals for this section

* Own **claim-type** and **doctrine** queries.
* Route readers to:
  * the timeline spine
  * the record indexes
  * the relevant dataset landing pages

#### Issues observed (section-level)

* **Titles are often too long** and inconsistent in format.
* Some pages use **rhetorical framing** (“captured system”, “template for retaliation”) high up.
*   Many pages mix:

    * analysis
    * damages modeling
    * calls for reform

    That muddies search intent.
* “Verify first” exists on some pages, but it is not standardized.

#### Recommended page template (use everywhere in Legal Analysis)

Keep this order.

1. **Executive snapshot** (3–6 sentences)
2. **Verify first (primary artifacts)** (5–12 links)
3. **Claim map** (bullets, not walls of text)
4. **Application to the record** (short sections)
5. **Limits and uncertainty** (immunities, missing facts)
6. **Related pages** (2–8 internal links)

#### Keyword model (what to target)

For each analysis page, explicitly include (early) the terms people search:

* `42 U.S.C. § 1983` (and the words “Section 1983”)
* “Monell municipal liability”
* “malicious prosecution”
* “Brady violation” and “Giglio” (if applicable)
* “First Amendment retaliation”
* “Fourth Amendment unlawful search and seizure”
* “Fourteenth Amendment due process / equal protection”

Don’t bury these in the middle.

#### GEO hardening (quoteability)

Add one short “Definition” sentence when you first use a doctrine.

Example pattern:

* “A **Brady violation** is suppression of material exculpatory evidence by prosecutors.”

That makes LLM quotes more accurate.

#### Concrete fixes for the highest-traffic candidates

**Missoula §1983 misconduct hub**

Target page: [Missoula §1983 misconduct: civil rights violations and related claims (2015-2025)](https://www.ywcaofmissoula.com/civil-rights-violations-and-related-claims-2015-2025)

* Add a **one-screen** “Claim index” near the top.
* Replace “Estimated Total Damages” language with:
  * “damages estimates used in this analysis”
  * “assumes liability is proven”
* Move “Institutional reform requirements” to a **separate page** (or at least below the fold).

**Fourteenth Amendment analysis**

Target page: [Full Analysis of Fourteenth Amendment Equal Protection and Due Process Violations (2015-2025)](https://www.ywcaofmissoula.com/full-analysis-of-fourteenth-amendment-equal-protection-and-due-process-violation)

* Tighten the title to the query:
  * “Fourteenth Amendment (Due Process + Equal Protection) — WA/MT (2015–2025)”
* Add a short section on **defenses**:
  * qualified immunity
  * absolute prosecutorial immunity
  * Heck / favorable termination (where relevant)

**Tipp malpractice analysis**

Target page: [Bryan Tipp malpractice (2017–2025)](https://www.ywcaofmissoula.com/2017-2025-bryan-tipps-malpractice-its-devastating-impact-on-civil-rights-account)

* Fix the header numbering (it jumps from III to VI).
* Split “damages model” into a clearly labeled subsection.
* Add a “Verify first” link to the **case file index**:
  * [ODC 25-147 (Bryan Tipp) — Montana Bar Complaint index](https://www.ywcaofmissoula.com/montana-bar-complaints/odc-25-147-bryan-tipp-montana-bar-complaint-index)

**YWCA institutional capture overview**

Target page: [YWCA of Missoula: captured system overview](https://www.ywcaofmissoula.com/ywca-of-missoula-a-captured-system-operating-through-coordinated-institutional-f)

* Move “RICO” and “criminal activity” language lower.
* Add a “What this page alleges” bullet list.
* Add a “What this page does not claim” bullet list.

***

### Montana Cases

Montana case pages should rank for **event + year + county** queries.

#### Primary goals for this section

* Own queries like:
  * “Missoula warrantless arrest August 2018”
  * “Missoula stalking charges 2018 dismissed with prejudice”
  * “Facebook data dump warrant Missoula 2018”

#### Issues observed

* Descriptions are inconsistent.
* Several pages start with strong conclusions.
* Some pages have generic openings that don’t match search intent.

#### Recommendations

* Standardize titles:
  * `YYYY–YYYY: Event — location — claim type`
* Make the first paragraph include:
  * date range
  * venue (Missoula County, MT)
  * the key procedural posture (charged, dismissed, etc.)
* Add a small “Primary records” block on every page.

#### Quick link targets

* Montana hub: [Montana Legal Cases](https://www.ywcaofmissoula.com/montana-legal-cases)
* High-signal pages:
  * [Aug 2018: warrantless arrest and false imprisonment](https://www.ywcaofmissoula.com/home-invasion,-warrantless-arrest,-false-imprisonment;-lost-in-missoula-county-j)
  * [Fishing Expedition via Facebook Account Data Dump Search Warrant (2018)](https://www.ywcaofmissoula.com/fishing-expedition-via-facebook-account-data-dump-search-warrant-2018)
  * [2017–2019 stalking charges (MT): civil-rights violations](https://www.ywcaofmissoula.com/2017-2019-misdemeanor-felony-stalking-charges-civil-rights-violations,-false-imp)

***

### Washington Cases

Washington case pages should rank for **city + year + case posture** queries.

#### Primary goals for this section

* Own queries like:
  * “Edmonds plea withdrawal ineffective assistance 2016”
  * “Seattle OPA complaint 2016OPA-1167”
  * “forensic psychologist fabricated evaluation HIPAA 2016”

#### Issues observed

* There is overlap between “index”, “hub”, and “analysis” pages.
* Some pages look like filings, others like analysis, but the title doesn’t always say which.

#### Recommendations

* Make page type explicit in the first line:
  * “This page is an analysis.”
  * “This page publishes a filing.”
  * “This page is an index.”
* Add a consistent **jurisdiction line** near the top:
  * “Jurisdiction: Washington State (Edmonds / Seattle).”

#### Quick link targets

* WA index: [Washington Legal Cases Index](https://www.ywcaofmissoula.com/washington-legal-cases-index)
* High-signal pages:
  * [WA (2015–2017): plea withdrawal and ineffective assistance](https://www.ywcaofmissoula.com/2015-2017-ineffective-assistance-of-counsel-and-plea-withdrawal-in-washington-st)
  * [2016 Seattle OPA Complaint - 2016OPA-1167 - Post Mortem / Legal Analysis](https://www.ywcaofmissoula.com/2016-seattle-opa-complaint-2016opa-1167-post-mortem-legal-analysis)
  * [Seattle OPA Complaint - 2016OPA-1167 (2016)](https://www.ywcaofmissoula.com/seattle-opa-complaint-2016opa-1167-2016)

***

### State & Federal Complaints

These pages are “document SEO” gold. People search the exact filing type.

#### Primary goals for this section

* Own queries like:
  * “DOJ Civil Rights Division complaint receipt 658793-SKB”
  * “Montana POST complaint dismissal”
  * “Washington DOH complaint forensic psychologist”

#### Issues observed

* Some complaint pages are very thin.
* Many don’t state what’s inside, early.

#### Recommendations

* Add a consistent top block:
  * filing date
  * agency
  * tracking number
  * what’s included (receipt, cover letter, exhibits)
* Cross-link to:
  * case packet index pages
  * dataset landing pages

#### Quick link targets

* Complaints index: [Federal and State Department Complaints](https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-and-state-department-complaints)
* DOJ filing: [Federal DoJ Civil Rights Division Filing - 658793-SKB (August 2025)](../state-and-federal-complaints/federal-doj-civil-rights-division-filing-658793-skb-august-2025/)
* FBI follow-up: [FBI referral request (Nov 2025)](https://www.ywcaofmissoula.com/state-and-federal-complaints/federal-doj-civil-rights-division-filing-658793-skb-august-2025/fbi-report-filing-pattern-of-cross-jurisdictional-civil-rights-violations-insti)

***

### Montana Bar Complaints

This section should rank for **attorney name + ODC number** queries.

#### Primary goals for this section

* Own queries like:
  * “ODC 25-147 Tipp”
  * “Montana Office of Disciplinary Counsel complaint Bryan Tipp”

#### Issues observed

* There are multiple similarly titled pages for the same filing.
* Some titles repeat verbatim.

#### Recommendations

* Make one canonical “case file index” page the main entry point.
* Ensure each child page title includes the differentiator:
  * “Complaint”, “Supplement #1”, “ODC ruling”, “Response”, “Request for review”.

#### Quick link targets

* Canonical index: [ODC 25-147 (Bryan Tipp) — Montana Bar Complaint index](https://www.ywcaofmissoula.com/montana-bar-complaints/odc-25-147-bryan-tipp-montana-bar-complaint-index)
* Complaint packet: [MT Bar Complaint ODC No. 25-147 - Bryan Tipp of Tipp, Colburn, Lockwood, P.C. (July 2025)](../montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-bryan-tipp-of-tipp-colburn-lockwood-p.c.-july/)
* ODC ruling: [MT Bar Complaint ODC No. 25-147: ODC Ruling (November 2025)](https://www.ywcaofmissoula.com/montana-bar-complaints/mt-bar-complaint-odc-no.-25-147-response-to-bryan-tipp-bar-complaint-answer-octo/mt-bar-complaint-odc-no.-25-147-odc-ruling-november-2025)

***

### Washington State Complaints

Treat this as a “filing library”. Filing libraries do well when they’re consistent.

#### Recommendations

* Start each page with:
  * “This page publishes a complaint filed with \[agency].”
  * a direct link to the PDF/packet.
* Add “Related analysis” links at the bottom.

#### Quick link targets

* [WA State Bar Complaint: Patricia Fulton (2016)](https://www.ywcaofmissoula.com/wa-state-bar-complaint-patricia-fulton-2016)
* [WA State Dept. of Health Complaint: Dr. Marta Miranda (2016)](https://www.ywcaofmissoula.com/wa-state-dept.-of-health-complaint-dr.-marta-miranda-2016)

***

### YWCA complaints and public reviews

This content is high-risk for defamation issues and low-quality rater triggers.

#### Recommendations

* Tighten the page framing:
  * “compiles allegations and public statements”
  * “links to sources; does not assert adjudicated facts”
* Avoid doxxing risk:
  * no addresses
  * no phone numbers
  * no private email headers

#### Quick link target

* [YWCA Complaint & Google Reviews; Other Victims of YWCA Misconduct (2018-2020)](https://www.ywcaofmissoula.com/ywca-complaint-google-reviews;-other-victims-of-ywca-misconduct-2018-2020)

***

### Additional Evidence & Documentation

These are the “evidence routers”. They should be the most internally linked pages.

#### Recommendations

* Put an “Evidence map” link block at the top of every major narrative page.
* Ensure each evidence sub-page has:
  * 5–15 links to primary artifacts
  * a one-paragraph explanation of why the artifact matters

#### Quick link targets

* Expanded history: [Missoula §1983 misconduct: MPD, prosecutors, YWCA of Missoula (Expanded history)](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/)
* Evidence map hub: [Evidence of Civil Rights Violations, Misconduct, YWCA RICO Predicates, et al](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/)

***

### Priority implementation plan

#### Priority 0 (biggest indexing uplift)

* Standardize **Executive snapshot** + **Verify first** blocks across Legal Analysis.
* Make canonical hubs link to:
  * [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](https://www.ywcaofmissoula.com/comprehensive-timeline,-relationship-diagram,-actionable-claims)
  * [Sources & record index](https://www.ywcaofmissoula.com/overview/sources-and-record-index)
  * [Police Reports, Court Docs, and Correspondence Index](https://www.ywcaofmissoula.com/police-reports,-court-docs,-and-correspondence-index)

#### Priority 1 (reduce quality/risk flags)

* Move loaded language down-page.
* Replace absolute statements with attributed framing.
* Separate “analysis” from “advocacy / reform wishlist”.

#### Priority 2 (site architecture)

* Create a glossary page for:
  * key doctrines
  * key agencies
  * recurring entities
* Ensure every leaf page has a “Related” block.

Progress:

* ✅ [Glossary (doctrines, agencies, entities)](https://www.ywcaofmissoula.com/reference/glossary-doctrines-agencies-entities)

{% hint style="warning" %}
Nothing here is legal advice.

Avoid publishing sensitive personal data, even if it appears in records.
{% endhint %}

### Related

{% include "../.gitbook/includes/related-links-global (1).md" %}
