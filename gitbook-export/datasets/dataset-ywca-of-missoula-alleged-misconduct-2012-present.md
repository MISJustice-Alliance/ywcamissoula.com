---
description: >-
  Curated index of alleged YWCA of Missoula misconduct and supporting primary
  records (2012–present).
---

# Dataset: YWCA of Missoula alleged misconduct (2012–present)

This dataset collects **allegations** involving **YWCA of Missoula**, with links to the supporting primary record.

Use it as a canonical crawl target and a human navigation hub.

### Scope

* **Timeframe:** 2012–present
* **Geography:** Missoula, Montana
* **Entities:** YWCA of Missoula; related staff, governance, and partner workflows
* **Record types:** complaints, correspondence, court filings, reports, public documents, and published evidence packets

### Canonical entry points

* YWCA hub: [YWCA Missoula: conflicts of interest, MPD integration, and evidence index](../overview/ywca-missoula-conflicts-of-interest-mpd-integration-and-evidence-index.md)
* Board conflicts index: [YWCA of Missoula board conflicts (investigative index)](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/ywca-of-missoula-board-conflicts-investigative-index.md)
* Institutional capture overview: [YWCA of Missoula: captured system overview](../ywca-of-missoula-a-captured-system-operating-through-coordinated-institutional-f.md)

### Primary published packets (downloadable)

These external packets are the densest “dataset-like” artifacts right now:

* [CR-2025-001 — Case files index](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/cr-2025-001-case-files-index.md)
* [MisJustice Alliance case file: d81209a2](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/misjustice-alliance-case-file-d81209a2....md)

### Suggested data model (for a spreadsheet or JSON export)

Recommended fields:

* `event_date` (ISO)
* `actor` (person/organization)
* `role` (YWCA staff, board member, contractor, partner agency)
* `allegation_type` (conflict-of-interest, confidentiality breach, retaliation, obstruction, etc.)
* `jurisdiction`
* `source_type` (complaint, filing, email, report)
* `source_url` (direct link)
* `summary`
* `notes`

### Structured data (Schema.org Dataset)

To get Google Dataset Search coverage, emit Schema.org **Dataset** JSON-LD on this page’s URL via site-level header injection.

Minimum fields:

* `name`: Dataset name
* `description`: Brief description
* `url`: This page
* `sameAs`: Direct download URL(s) if available

{% hint style="warning" %}
This project publishes allegations and supporting records. Avoid posting personal addresses, phone numbers, or other sensitive identifiers.
{% endhint %}

**See also:** [Dataset catalog (Google indexing)](dataset-catalog-indexes.md)
