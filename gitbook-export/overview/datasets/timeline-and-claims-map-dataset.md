---
description: A time-ordered dataset of events, relationships, and actionable claims.
---

# Timeline & claims map dataset

## Timeline & claims map dataset

Time-ordered events, relationship context, and actionable claims framing for the Nuno case record (with pointers into underlying primary sources).

{% include "../../.gitbook/includes/dataset-metadata-checklist-for-google-indexing.md" %}

### Structured data (JSON-LD)

If you don’t have `<head>` access, this can live in the page body. Add a code block, switch it to HTML mode, then paste:

{% hint style="info" %}
If your GitBook plan/editor strips `<script>` tags, use the [Structured data bundle (single file)](structured-data-bundle-single-file.md) in `<head>` instead.
{% endhint %}

```html
<script type="application/ld+json">
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
  "creator": { "@type": "Organization", "name": "MisJustice Alliance", "url": "https://www.ywcaofmissoula.com/" },
  "publisher": { "@type": "Organization", "name": "MisJustice Alliance", "url": "https://www.ywcaofmissoula.com/" },
  "license": "Unspecified",
  "isAccessibleForFree": true,
  "distribution": [
    {
      "@type": "DataDownload",
      "name": "Comprehensive Timeline, Relationship Diagram, & Actionable Claims",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/fSV2kSDyE0mE7B2tcO5O"
    },
    {
      "@type": "DataDownload",
      "name": "Nuno case system overview and full article index",
      "contentUrl": "https://www.ywcaofmissoula.com/spaces/1wVVtf6V5BVc7mbV09eH/pages/6KRycT2nywSuKc9tXWXY"
    }
  ]
}
</script>
```

### Access

* [Comprehensive Timeline, Relationship Diagram, & Actionable Claims](../../comprehensive-timeline,-relationship-diagram,-actionable-claims.md)
* [Nuno case system overview and full article index](../nuno-case-system-overview-and-full-article-index.md)

### Coverage

* **Temporal:** 2014–2025 (plus supporting context going earlier)
* **Geographic:** Missoula, Montana; Seattle and Edmonds, Washington

### How to use it

* Start with the timeline to identify decision points.
* Jump from an event to the linked filings and exhibits.
* Use the claims framing to find the most legally relevant evidence.

### Limitations

This is a curated investigative timeline. It is not a complete court docket.
