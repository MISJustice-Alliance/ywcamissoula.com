---
title: Dataset structured data (Schema.org) guidance
---

## Structured data (Schema.org Dataset)

Emit Schema.org **Dataset** JSON-LD on the dataset landing page URL via site-level header injection.

Minimum fields:

* `name`
* `description`
* `url`

Recommended semantics:

* Use `distribution` for **downloadable files** (PDF, zip, CSV/JSON, Arweave gateway pages).
* Use `sameAs` for **equivalent copies / mirrors** of the same dataset.

## Canonical URL and registry values

Copy-paste Dataset values from:

* [Structured data registry (Dataset values)](../../datasets/structured-data-registry-dataset-values.md)

Keep Schema.org `url` aligned with the public canonical URL.

{% hint style="warning" %}
If Schema.org `url` doesn’t match the public canonical URL, dataset indexing can be flaky.
{% endhint %}
