---
description: >-
  Canonical dataset landing page for the Nuno case timeline and alleged
  civil-rights violations (2014–2025).
---

# Dataset: Nuno case civil-rights violations and timeline (2014–2025)

This dataset is the **timeline + record index** for the Nuno case.

It is the main evidence spine for the broader Missoula system analysis.

### Scope

* **Timeframe:** 2014–2025
* **Geography:** Washington and Montana
* **Topics:** First, Fourth, and Fourteenth Amendment claims; §1983 theories; retaliation; unlawful search/seizure; malicious prosecution
* **Record types:** filings, orders, police reports, correspondence, published complaint packets

### Canonical entry points

* Timeline spine: [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](../comprehensive-timeline,-relationship-diagram,-actionable-claims.md)
* Claims framing: [Missoula §1983 misconduct: civil rights violations and related claims (2015-2025)](../civil-rights-violations-and-related-claims-2015-2025.md)
* Evidence map: [Evidence of Civil Rights Violations, Misconduct, YWCA RICO Predicates, et al](../additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/evidence-related-to-civil-rights-violations-of-mr-nuno-2015-2025/)
* Primary record router: [Sources & record index](../overview/sources-and-record-index.md)

### Suggested data model

Recommended fields:

* `event_date`
* `event_type` (arrest, filing, hearing, complaint, escalation)
* `jurisdiction`
* `actors`
* `case_or_agency`
* `source_type`
* `source_url`
* `summary`

### Structured data (Schema.org Dataset)

Emit Schema.org **Dataset** JSON-LD on this page’s URL via site-level header injection.

Minimum fields:

* `name`
* `description`
* `url`
* `sameAs` (direct packet/download URLs)

{% hint style="info" %}
For search engines, treat this page as the canonical landing page. Keep the timeline page as the canonical “row-level” navigation.
{% endhint %}

**See also:** [Dataset catalog (Google indexing)](dataset-catalog-indexes.md)
