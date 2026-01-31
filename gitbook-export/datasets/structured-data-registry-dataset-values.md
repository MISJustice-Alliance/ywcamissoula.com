---
description: >-
  Copy-paste registry of Schema.org Dataset fields (name, description, url,
  sameAs) for each dataset landing page.
---

# Structured data registry (Dataset values)

This page is the **single source of truth** for Dataset structured-data values.

Use it when adding site-level Dataset JSON-LD via theme/header injection.

### One required input

To make `url` values absolute, define a base URL:

* **`PUBLIC_BASE_URL`**: your published docs base (custom domain or gitbook.io)

Then set each dataset `url` to:

* `PUBLIC_BASE_URL` + the dataset page path listed below

{% hint style="warning" %}
GitBook’s internal page paths work for linking inside GitBook.

If your public site uses different slugs, update the `url` values to match the public canonical URLs.
{% endhint %}

### Dataset registry

#### Dataset: Nuno case civil-rights violations and timeline (2014–2025)

* **name:** Dataset: Nuno case civil-rights violations and timeline (2014–2025)
* **description:** Canonical dataset landing page for the Nuno case timeline and alleged civil-rights violations (2014–2025).
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/BjSFamAeU9CSR4FZl0P9`
* **sameAs (direct downloads / packets):**
  * https://cr-2025-002-brief-2\_misjusticealliance.arweave.net/
  * https://doc11\_evidentiary\_documentation\_misjusticealliance.arweave.net/
  * https://cr-2025-001-brief-2\_misjusticealliance.arweave.net/

#### Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)

* **name:** Dataset: Missoula Police + prosecutors alleged misconduct (2012–present)
* **description:** Curated index of alleged misconduct by Missoula Police and Missoula County prosecutors, with links to primary records.
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/GqcrUUPzBzjrI0GbvQPg`
* **sameAs (direct downloads / packets):**
  * https://cr-2025-002-brief-2\_misjusticealliance.arweave.net/
  * https://doc11\_evidentiary\_documentation\_misjusticealliance.arweave.net/
  * https://doc11\_ywca\_supplemental\_misjusticealliance.arweave.net/
  * https://cr-2025-002-complaint-18\_misjusticealliance.arweave.net/

#### Dataset: YWCA of Missoula alleged misconduct (2012–present)

* **name:** Dataset: YWCA of Missoula alleged misconduct (2012–present)
* **description:** Curated index of alleged YWCA of Missoula misconduct and supporting primary records (2012–present).
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/epCZPlfrCClE1PDJ4NgM`
* **sameAs (direct downloads / packets):**
  * https://cr-2025-001-other-4\_misjusticealliance.arweave.net/
  * https://cr-2025-001-other-3\_misjusticealliance.arweave.net/
  * https://cr-2025-001-other-2\_misjusticealliance.arweave.net/
  * https://cr-2025-001-brief-2\_misjusticealliance.arweave.net/

#### Dataset: Bryan Tipp alleged legal malpractice (2017–2025)

* **name:** Dataset: Bryan Tipp alleged legal malpractice (2017–2025)
* **description:** Curated index of alleged malpractice by attorney Bryan Tipp, with links to filings and correspondence.
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/8YVFnDJlo08hIiXhIQaM`
* **sameAs (direct downloads / packets):**
  * https://arweave.net/LtpoZ8c2hBC4r3ihxMTjdwHCEKk5fdKy31QDhuX92Sk
  * https://cr-2025-003-ruling-2\_misjusticealliance.arweave.net/
  * https://cr-2025-003-other-23\_misjusticealliance.arweave.net/
  * https://cr-2025-003-evidence-21\_misjusticealliance.arweave.net/

#### Dataset: E’Lise Michelle Chard / Hall alleged criminal actions (2015–2025)

* **name:** Dataset: E’Lise Michelle Chard / Hall alleged criminal actions (2015–2025)
* **description:** Curated index of alleged criminal actions by E’Lise Michelle Chard / Hall, with links to published packets and primary records.
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/spbKHrdNOD0GD9Si7lse`
* **sameAs (direct downloads / packets):**
  * https://cr-2025-002-other-2\_misjusticealliance.arweave.net/

#### Dataset: Danielle Christine Chard / Bemis alleged criminal actions (2015–2025)

* **name:** Dataset: Danielle Christine Chard / Bemis alleged criminal actions (2015–2025)
* **description:** Curated index of alleged criminal actions by Danielle Christine Chard / Bemis, with links to published packets and primary records.
* **url path:** `/spaces/1wVVtf6V5BVc7mbV09eH/pages/ChAMnJLP1mxhGHHbFqYF`
* **sameAs (direct downloads / packets):**
  * https://doc9\_danielle\_chard\_criminal\_report\_misjusticealliance.arweave.net/

### Notes

* `sameAs` should point to **direct downloads** (PDF, zip, CSV/JSON, Arweave gateway pages).
* Keep `name` stable. Treat it like a dataset identifier.
* Keep descriptions short and factual. Avoid adding new allegations in the description line.

{% hint style="warning" %}
This registry is for discovery and indexing. It does not replace careful redaction and privacy review.
{% endhint %}
