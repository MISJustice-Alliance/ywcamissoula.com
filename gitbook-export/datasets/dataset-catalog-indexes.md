---
description: >-
  Crawlable index of the most important datasets and their canonical entry
  points.
---

# Dataset Catalog Indexes

### Executive snapshot

This page is the dataset entry point for search engines and LLMs. It lists the canonical dataset landing pages (“one URL per record set”) and the supporting structured-data registry used for Schema.org Dataset / Google Dataset Search.

{% include "../.gitbook/includes/analysis-page-disclaimer-seo-geo-standard.md" %}

### Verify first (primary artifacts)

* Dataset structured-data values (single source of truth): [Structured data registry (Dataset values)](structured-data-registry-dataset-values.md)
* Source/citation hub: [Sources & record index](../overview/sources-and-record-index.md)
* Timeline spine (context): [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](../comprehensive-timeline,-relationship-diagram,-actionable-claims.md)

Related:

* [SEO + GEO audit (sitewide)](seo-+-geo-audit-sitewide.md)

### Canonical URL rule

For Schema.org Dataset `url`, use the **public canonical URL** you want indexed.

Keep internal GitBook paths for internal navigation only.

### Priority datasets

* [Dataset: Nuno case civil-rights violations and timeline (2014–2025)](dataset-nuno-case-civil-rights-violations-and-timeline-2014-2025.md)
* [Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)](dataset-missoula-police-+-prosecutors-alleged-misconduct-2012-present.md)
* [Dataset: YWCA of Missoula alleged misconduct (2012–present)](dataset-ywca-of-missoula-alleged-misconduct-2012-present.md)
* [Dataset: Bryan Tipp alleged legal malpractice (2017–2025)](dataset-bryan-tipp-alleged-legal-malpractice-2017-2025.md)
* [Dataset: E’Lise Michelle Chard / Hall alleged criminal actions (2015–2025)](dataset-elise-michelle-chard-hall-alleged-criminal-actions-2015-2025.md)
* [Dataset: Danielle Christine Chard / Bemis alleged criminal actions (2015–2025)](dataset-danielle-christine-chard-bemis-alleged-criminal-actions-2015-2025.md)

### Export dataset links

You usually want one of two exports:

* **Dataset landing pages only** (internal GitBook URLs).
* **Landing pages + direct downloads** (external packet URLs for `sameAs`).

Or just copy from a prebuilt export:

* [Dataset CSV export](dataset-csv-export.md)

#### Export landing-page URLs (quick)

Copy the **Priority datasets** list above.

If you need a “flat list” of URLs, open each dataset page and copy the address bar URL.

#### Export landing pages + direct download links (recommended)

Use the registry as the single source of truth:

* [Structured data registry (Dataset values)](structured-data-registry-dataset-values.md)

That page already stores:

* the dataset **landing page path** (`url path`)
* the dataset’s **direct downloads / packets** (`sameAs`)

#### Copy-paste CSV template

Use **one row per direct-download URL**.

If a dataset has multiple `sameAs` links, repeat the dataset name and landing path.

{% code title="datasets.csv (template)" %}
```
dataset_name,landing_page_url_or_path,direct_download_url
Dataset: Example,/path/to/dataset,https://example.com/file1.pdf
Dataset: Example,/path/to/dataset,https://example.com/file2.pdf
```
{% endcode %}

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
* `url` (the **public canonical URL** you want indexed)
* `sameAs` (equivalent copies / mirrors of the dataset landing page, if any)

Recommended for downloads:

* `distribution` (direct download URL(s))

### Maintenance checklist

When adding or renaming a dataset page:

* Update: [Structured data registry (Dataset values)](structured-data-registry-dataset-values.md)
* Update: [Dataset CSV export](dataset-csv-export.md)
* Ensure the dataset page links back here (so crawlers find the hub)

{% hint style="info" %}
These pages are documentation and indexing. They summarize **allegations** and link to underlying records.
{% endhint %}
