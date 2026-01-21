---
description: One JSON-LD @graph bundle for all datasets and the dataset catalog.
---

# Structured data bundle (single file)

## Structured data bundle (single file)

This is a **single JSON-LD bundle** you can paste into your site `<head>`.

If you prefer a file, copy the block into `structured-data.jsonld`.

{% hint style="info" %}
This bundle uses the base URL `https://www.ywcaofmissoula.com`.

If your published URLs differ, update `@id`, `url`, and `contentUrl` values.
{% endhint %}

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.ywcaofmissoula.com/#website",
      "url": "https://www.ywcaofmissoula.com/",
      "name": "MisJustice Alliance documentation"
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/ABKxTfNgmLZjWKlsIOV7",
      "url": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/ABKxTfNgmLZjWKlsIOV7",
      "name": "Dataset catalog",
      "description": "Dataset-style landing pages for Google indexing and evidence reuse.",
      "isPartOf": { "@id": "https://www.ywcaofmissoula.com/#website" },
      "hasPart": [
        { "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/DUyAJzGrQXHs3mITDkjD" },
        { "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/Ct3JEtwF0P3wgoyivkoi" },
        { "@id": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/HgpgKcwkNxDlrhtIgtk2" }
      ]
    },
    {
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
    },
    {
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
    },
    {
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
  ]
}
```

### How to turn this into a zip

1. Copy the JSON block into `structured-data.jsonld`.
2. Zip it locally.

GitBook can’t attach a zip directly in this workspace.
