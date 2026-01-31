---
description: >-
  Curated index of alleged misconduct by Missoula Police and Missoula County
  prosecutors, with links to primary records.
---

# Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)

This dataset collects **allegations** involving **Missoula Police (MPD)** and **Missoula County prosecutors**, with links to underlying records.

### Scope

* **Timeframe:** 2012–present (heavy density: 2015–2025)
* **Geography:** Missoula County, Montana
* **Entities:** MPD, Missoula County Attorney/Prosecutor decision-making, related units and partner workflows
* **Record types:** police reports, warrants, charging documents, motions/orders, correspondence, agency complaints

### Canonical entry points

* MPD hub: [Missoula Police (MPD): misconduct allegations, retaliation evidence, and primary-record index](../overview/missoula-police-mpd-misconduct-allegations-retaliation-evidence-and-primary-record-index.md)
* §1983 framing: [Missoula §1983 misconduct: civil rights violations and related claims (2015-2025)](../civil-rights-violations-and-related-claims-2015-2025.md)
* Prosecutor evidence index: [Prosecutorial misconduct and Brady issues (evidence index)](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/prosecutorial-misconduct-and-brady-issues-evidence-index.md)
* Primary record router: [Police Reports, Court Docs, and Correspondence Index](../police-reports,-court-docs,-and-correspondence-index.md)

### Primary published packets (downloadable)

* [CR-2025-002 — Case files index](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-002-case-files-index.md)
* [MisJustice Alliance case file: daf82b62](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-daf82b62....md)

### Suggested data model

Recommended fields:

* `event_date`
* `agency` (MPD, prosecutor’s office, court)
* `actor` (officer/prosecutor/judge where public)
* `incident_or_case_id` (if available)
* `allegation_type` (retaliation, fabricated evidence, Brady issues, unlawful search, malicious prosecution)
* `source_type`
* `source_url`
* `summary`

### Structured data (Schema.org Dataset)

Emit Schema.org **Dataset** JSON-LD on this page’s URL via site-level header injection.

Minimum fields:

* `name`
* `description`
* `url`
* `sameAs` (direct packet or download URLs)

{% hint style="info" %}
When possible, link to court orders, filings, and agency correspondence instead of summaries.
{% endhint %}

**See also:** [Dataset catalog (Google indexing)](dataset-catalog-indexes.md)
