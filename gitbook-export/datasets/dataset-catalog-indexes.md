---
description: >-
  Crawlable index of the most important datasets and their canonical entry
  points.
---

# Dataset Catalog Indexes

This section creates crawlable, stable entry points for the highest-signal record sets.

If you’re coming from Google, start here.

### Priority datasets

* [Dataset: Nuno case civil-rights violations and timeline (2014–2025)](dataset-nuno-case-civil-rights-violations-and-timeline-2014-2025.md)
* [Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)](dataset-missoula-police-+-prosecutors-alleged-misconduct-2012-present.md)
* [Dataset: YWCA of Missoula alleged misconduct (2012–present)](dataset-ywca-of-missoula-alleged-misconduct-2012-present.md)
* [Dataset: Bryan Tipp alleged legal malpractice (2017–2025)](dataset-bryan-tipp-alleged-legal-malpractice-2017-2025.md)
* [Dataset: E’Lise Michelle Chard / Hall alleged criminal actions (2015–2025)](dataset-elise-michelle-chard-hall-alleged-criminal-actions-2015-2025.md)
* [Dataset: Danielle Christine Chard / Bemis alleged criminal actions (2015–2025)](dataset-danielle-christine-chard-bemis-alleged-criminal-actions-2015-2025.md)

### Canonical hubs (high traffic)

These pages are the best “routers” into the underlying primary records:

* [Missoula law enforcement and victim-advocacy ecosystem misconduct (2012–present)](../)
* [Nuno case system overview and full article index](../overview/nuno-case-system-overview-and-full-article-index.md)
* [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](../comprehensive-timeline,-relationship-diagram,-actionable-claims.md)
* [Sources & record index](../overview/sources-and-record-index.md)

### Structured data (Schema.org Dataset)

Google’s Dataset Search is driven by **Dataset structured data** (JSON-LD).

Copy-paste field values from: [Structured data registry (Dataset values)](structured-data-registry-dataset-values.md)

GitBook pages typically do not allow arbitrary script injection inside page body.

Use a **site-level header injection / theme customization** so the Dataset JSON-LD is emitted on the dataset page URL.

Recommended Dataset fields (minimum):

* `@context`: `https://schema.org`
* `@type`: `Dataset`
* `name`
* `description`
* `url` (this GitBook page URL)
* `sameAs` (direct download URL(s), if available)

{% hint style="info" %}
These pages are documentation and indexing. They summarize **allegations** and link to underlying records.
{% endhint %}
