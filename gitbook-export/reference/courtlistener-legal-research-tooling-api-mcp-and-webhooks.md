---
title: >-
  Research Tooling: CourtListener Case-Law API, MCP Server, and Webhooks
description: >-
  Reference documentation for CourtListener's case-law API, its Model Context
  Protocol (MCP) server for AI-assisted legal research, and its webhook system
  — the primary tooling used to verify case law and docket citations on this
  site.
tags:
  - Reference
  - CourtListener
  - Legal Research
  - API
  - MCP
  - Methodology
---

# Research Tooling: CourtListener Case-Law API, MCP Server, and Webhooks

### Executive snapshot

This page documents the CourtListener tooling — the REST case-law API, the Model Context Protocol (MCP) server, and the webhook/alerting system — that MISJustice Alliance researchers use to locate, verify, and monitor case law, dockets, and citations referenced throughout this site. It is technical reference material, not case content; for the underlying Nuno-case record, start at the [Sources & record index](https://www.ywcaofmissoula.com/overview/sources-and-record-index).

{% include "../.gitbook/includes/analysis-page-disclaimer-seo-geo-standard.md" %}

CourtListener is operated by the nonprofit [Free Law Project](https://free.law/) and provides free public access to millions of federal and state court opinions, PACER-sourced docket data, oral arguments, and judge records. The material below is reproduced from CourtListener's own documentation for researcher convenience.

***

## Case Law APIs

For collection coverage, data sources, and daily additions, see [case law coverage](https://www.courtlistener.com/help/coverage/opinions/).

The data model centers on four main objects:

| Object | Purpose | Relationship |
|---|---|---|
| `Court` | Information about courts, including name, abbreviation, founding date, and other metadata | Every docket belongs to a court |
| `Docket` | Case-level metadata such as initiation/termination dates and docket number | Every cluster belongs to a docket |
| `Cluster` | Groups related opinions in a case, such as a majority opinion, concurrence, or dissent | Every opinion belongs to a cluster |
| `Opinion` | The text and decision-level metadata for an individual opinion | Linked to a cluster |

In short: a docket is filed in a court, a docket has clusters, and clusters contain opinions. Metadata is stored at the lowest appropriate level to avoid duplication — for example, docket numbers belong on docket records, while opinion text belongs on opinion records.

Two additional case-law objects are available:

- **Citation** objects connect opinions that cite one another; see the [Citation API help](https://wiki.free.law/c/courtlistener/help/api/rest/v4/citations).
- **Parenthetical** objects capture explanatory parentheticals extracted from opinion text; they are available in bulk data but not yet through the API.

### API Endpoints

#### Dockets

Endpoint: [`/api/rest/v4/dockets/`](https://www.courtlistener.com/api/rest/v4/dockets/)

Dockets sit at the top of the hierarchy:

- In PACER data, they connect docket entries, parties, and attorneys.
- In case-law data, they sit above opinion clusters.
- In oral-argument data, they sit above audio objects.

Inspect field definitions, available filters, ordering, and serialization options with an HTTP `OPTIONS` request:

```bash
curl -v \
  -X OPTIONS \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/dockets/"
```

Retrieve an individual docket by numeric ID:

```bash
curl -v \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/dockets/4214664/"
```

The docket response includes broad case metadata, but not all docket entries, parties, or attorneys, because embedding those collections would not scale.

{% hint style="info" %}
A case name can change at the docket level after filing — for example, when an officeholder is replaced — while the names associated with previously issued decision clusters remain unchanged. For case-law work, use the case-name fields on **cluster** objects. See [advanced case-name guidance](https://wiki.free.law/c/courtlistener/help/api/rest/v4/field-help#case-names).
{% endhint %}

#### Clusters

Endpoint: [`/api/rest/v4/clusters/`](https://www.courtlistener.com/api/rest/v4/clusters/)

Clusters expose millions of CourtListener opinion clusters. Use `OPTIONS` on the endpoint to inspect field descriptions, filtering, ordering, and rendering options.

Important fields include:

- `id`: Used in CourtListener opinion URLs.
- `sub_opinions`: URLs for opinions associated with the cluster.
- `citations`: Parallel citations for the cluster; see the [Citation API](https://wiki.free.law/c/courtlistener/help/api/rest/v4/citations).
- Judge-related fields: Includes fields such as `judges`, `panel`, and `non_participating_judges`; some are raw strings and others link to records in the [Judge API](https://wiki.free.law/c/courtlistener/help/api/rest/v4/american-judge-and-justice-api).

When CourtListener can normalize a judge's name to a judge-database record, it does so; otherwise, the name is retained in a string field for later normalization.

#### Opinions

Endpoint: [`/api/rest/v4/opinions/`](https://www.courtlistener.com/api/rest/v4/opinions/)

This endpoint contains individual decision text and associated metadata. Use `OPTIONS` to inspect its supported fields, filters, ordering, and rendering options.

{% hint style="info" %}
**Preferred text field:** Use `html_with_citations` instead of `plain_text` when retrieving opinion text. It contains the raw decision text with identified and linked citations and is the most reliable option for most uses.
{% endhint %}

CourtListener website opinion URLs use a **cluster ID**, not an `opinion_id`. To resolve a case from such a URL, query the Cluster API.

Useful opinion fields:

- `type`: Indicates a concurrence, lead opinion, dissent, or other type; numeric prefixes make sorting follow priority order. "Combined Opinion" is commonly used for unclassified or multi-type opinions.
- `download_url`: Original location from which the decision was scraped; it may be unreliable because many court sites do not maintain stable URLs.
- `local_path`: Location of the binary decision file, when available; see [file-download field help](https://wiki.free.law/c/courtlistener/help/api/rest/v4/field-help#file-download-fields).
- `opinions_cited`: Other opinions cited by the current opinion.
- `ordering_key`: Opinion order within a cluster, populated only for Harvard- or Columbia-ingested material.

Underlying source fields that may contribute to `html_with_citations` include `html_columbia`, `html_lawbox`, `xml_harvard`, `html_anon_2020`, `html`, and `plain_text`. Use [field selection](https://wiki.free.law/c/courtlistener/help/api/rest/v4/query-refinement#field-selection) to omit unused fields, improving client performance and reducing service load.

#### Courts

Endpoint: [`/api/rest/v4/courts/`](https://www.courtlistener.com/api/rest/v4/courts/)

The Courts API provides metadata about courts in the database and links into much of the broader dataset, such as events and judge records. It changes infrequently and can generally be cached.

### API Examples

#### Filter Opinions by Court

Because the relationship chain is `Court -> Docket -> Cluster -> Opinion`, you can filter opinions through related objects using Django-style double-underscore traversal:

```bash
curl -v \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/opinions/?cluster__docket__court=scotus"
```

If you need the related docket and cluster data too, retrieve dockets first, then follow their `clusters` links, then follow each cluster's `sub_opinions` links:

```bash
# 1. Find SCOTUS dockets
curl -v \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/dockets/?court=scotus"

# 2. Retrieve a cluster URL returned in the docket's "clusters" array
curl -v \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/clusters/9502621/"

# 3. Retrieve an opinion URL returned in the cluster's "sub_opinions" array
curl -v \
  --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/opinions/9969234/"
```

#### Filter by Docket Number

If you know a docket number, query at any hierarchy level:

```bash
# Docket
curl -v --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/dockets/?docket_number=23A994"

# Cluster
curl -v --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/clusters/?docket__docket_number=23A994"

# Opinion
curl -v --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/opinions/?cluster__docket__docket_number=23A994"
```

Docket numbers are not globally unique, so add a court filter when possible:

| Resource | Add this parameter |
|---|---|
| Dockets | `&court=scotus` |
| Clusters | `&docket__court=scotus` |
| Opinions | `&cluster__docket__court=scotus` |

The [Search API](https://wiki.free.law/c/courtlistener/help/api/rest/v4/search) can also perform fuzzy docket-number searches.

#### Build a Case-Law Corpus

For empirical research or topic-specific collection building: (1) use the [Search API](https://wiki.free.law/c/courtlistener/help/api/rest/v4/search) to identify relevant cases; (2) use the Dockets, Clusters, and Opinions APIs to retrieve the corresponding structured records and decision text.

#### Find a Case by URL

CourtListener case URLs contain a cluster ID — for example, `https://www.courtlistener.com/opinion/2812209/obergefell-v-hodges/`. Query the Cluster API with that same ID:

```bash
curl -v --header 'Authorization: Token <TOKEN>' \
  "https://www.courtlistener.com/api/rest/v4/clusters/2812209/"
```

An `opinion_id` does not reliably match its related `cluster_id`.

***

## Using the CourtListener MCP in Claude, ChatGPT, and Other AI Assistants

AI tools and agents such as Claude and ChatGPT can connect to CourtListener's legal-research capabilities through its Model Context Protocol (MCP) server. MCP is an open standard that lets AI applications access external tools and live data rather than relying only on model training data.

CourtListener's MCP server gives assistants direct access to legal materials and platform functions, enabling more current, grounded research across case law, PACER data, judge information, citations, and related sources.

### Available Tools

An AI assistant connected to the CourtListener MCP can use:

- **Case law and opinions** — Millions of federal and state court decisions spanning centuries.
- **PACER data** — Federal cases, parties, attorneys, and documents from an open repository.
- **Citation network** — Information about which cases cite other cases.
- **Oral arguments** — Searchable federal appellate-court audio and transcripts.
- **Judges and financial disclosures** — Biographical and analytical judiciary data, including assets and debts that could indicate potential conflicts.
- **Keyword and semantic search** — Traditional keyword search and natural-language search across CourtListener archives.
- **Alerts** — Monitoring for newly filed documents, citations, and saved queries.
- **Citation verification** — Grounded citation checking intended to reduce hallucinated or unknown citations.

These capabilities are backed by the CourtListener APIs documented above and its legal-data collections.

### Sample Prompts

```text
Find recent opinions on qualified immunity and identify splits.
```

```text
Pull the latest filings on docket XYZ and explain what's happening.
```

```text
Find the PACER fees class action, tell me the current status, and sign me up
for email alerts at the appellate and district level.
```

```text
Make me an alert any time that Miranda v. Arizona is cited by the supreme court.
```

```text
Verify every citation in this brief and flag any unknown citations.
```

```text
Review the news article at this link and find the case that's being discussed:
https://local-news-example.com/legal-article
```

The MCP is designed for both read-oriented research tasks and actions such as creating monitoring alerts, subject to the connected account's permissions.

### Prerequisites

You need a [CourtListener account](https://www.courtlistener.com/register/) before connecting the MCP server. Installation steps differ by client, but OAuth-based authorization is the common authentication flow.

### Claude

The CourtListener connector is available through Anthropic's MCP Connector Directory:

1. Open Claude on web, desktop, or mobile.
2. Navigate to **Settings > Customize > Browse**.
3. Find and add the CourtListener MCP connector.
4. Grant Claude access to your CourtListener account.
5. Start a conversation or use one of the sample prompts above.

### Claude Code

Add the remote MCP server from the Claude Code CLI:

```bash
claude mcp add --transport http courtlistener https://mcp.courtlistener.com/
```

The first CourtListener tool invocation opens a browser for OAuth authorization. Run `/mcp` in Claude Code to inspect the MCP connection state.

### ChatGPT

CourtListener's MCP server is listed in OpenAI's Plugin Directory:

1. Go to **Settings > Plugins > Browse**.
2. Add the CourtListener MCP plugin.
3. Grant ChatGPT access to your CourtListener account.
4. Begin a new conversation and submit a research or monitoring request.

### Google Enterprise

The MCP server is available in Gemini Enterprise for Legal and through the Google Enterprise connector directory:

1. Open the CourtListener connector page.
2. Authorize Gemini to access your CourtListener account.
3. Start a conversation or use a sample research prompt.

### Other MCP Clients

Any MCP-compatible application — including Cursor and VS Code — can use CourtListener's server. Add a custom connector or MCP server in the client's settings and configure the endpoint `https://mcp.courtlistener.com/`. Choose **OAuth** when prompted, then sign in with your CourtListener account.

### Access and Usage

The MCP server uses standard CourtListener API authentication, and API access is automatically available to CourtListener users. Higher usage access is available through a Free Law Project membership or a commercial agreement.

Useful links: [check API access and usage](https://www.courtlistener.com/profile/api-usage/) · [join Free Law Project](https://free.law/membership/) · [discuss a commercial partnership](https://free.law/contact/?issue_type=partnerships).

***

## Webhook API

CourtListener's webhook system pushes JSON event data to a URL you operate, allowing bidirectional integrations without polling. Configure a server endpoint, and CourtListener will `POST` an event whenever a supported activity occurs.

Supported events include docket updates, search-alert hits, stale docket-alert notifications, RECAP Fetch completion, and granted Pray and Pay requests.

### Pricing

CourtListener is operated by the nonprofit Free Law Project. Advanced features such as webhooks and API usage may require an agreement and fees for organizations beginning a new webhook-based project. Contact CourtListener to discuss a project or commercial arrangement via its [contact page](https://www.courtlistener.com/contact/).

### Getting Started

Creating a webhook can be complex; CourtListener recommends reviewing its webhook setup guide before implementation. At a high level:

1. Create an HTTPS endpoint on infrastructure you control.
2. Register that endpoint as a CourtListener webhook.
3. Receive and validate incoming `POST` requests.
4. Deduplicate deliveries using the supplied idempotency key.
5. Return a 2xx response within one second.
6. Process the event asynchronously where possible.

### Event Envelope

Every event is a JSON object with two top-level keys:

```json
{
  "payload": {},
  "webhook": {
    "version": 1,
    "event_type": 1,
    "date_created": "2025-01-01T00:00:00Z",
    "deprecation_date": null
  }
}
```

`payload` contains data specific to the event, while `webhook` carries endpoint metadata intended for operational maintenance and compatibility tracking.

#### Standard headers

| Header | Meaning |
|---|---|
| `Content-Type` | Currently always `application/json` |
| `Idempotency-Key` | A unique 128-bit UUID for the event; use it to prevent duplicate processing |

CourtListener may resend an event after a delivery failure, so receivers should persist and check each `Idempotency-Key` before applying side effects.

#### Webhook metadata

| Field | Type | Description |
|---|---|---|
| `version` | Integer | Version of the webhook event format |
| `event_type` | Integer | Numeric event type |
| `date_created` | ISO 8601 string | Timestamp when the webhook endpoint was created |
| `deprecation_date` | ISO 8601 string or `null` | Planned deprecation timestamp, if any |

Event-type values are:

```text
DOCKET_ALERT            = 1
SEARCH_ALERT            = 2
RECAP_FETCH             = 3
OLD_DOCKET_ALERTS_REPORT = 4
PRAY_AND_PAY            = 5
```

### Security Model

CourtListener sends webhook events from these IP addresses:

```text
34.210.230.218
54.189.59.91
```

CourtListener recommends allowlisting those addresses and verifying source IPs at the network edge. It also recommends using a long, randomly generated, secret endpoint URL rather than a predictable route.

{% hint style="warning" %}
The webhook system does not currently provide a request-signature or other application-layer authentication mechanism proving that a request originated at CourtListener. Treat IP filtering, unguessable URLs, TLS, replay protection, and strict JSON validation as core compensating controls.
{% endhint %}

### Delivery and Retries

A delivery is considered unsuccessful if the receiving application does not return a 2xx status code within one second. CourtListener retries a failed event up to seven times after the initial failed delivery, with an exponential backoff beginning at about three minutes and using a 3x multiplier.

| Attempt | New delay | Elapsed time | Failure email |
|---|---:|---:|---|
| Initial delivery | N/A | 0:00 | No |
| Retry 1 | 0:03 | 0:03 | Yes |
| Retry 2 | 0:09 | 0:12 | No |
| Retry 3 | 0:27 | 0:39 | No |
| Retry 4 | 1:21 | 2:00 | No |
| Retry 5 | 4:03 | 6:03 | Yes |
| Retry 6 | 12:09 | 18:12 | No |
| Retry 7 | 36:27 | 54:39 | Yes |

After eight total failed delivery attempts, CourtListener disables the endpoint and stops sending new or pending events to it, sending endpoint-level warning emails rather than one email per failed event. After fixing the receiving service, re-enable the endpoint in the webhook panel; CourtListener resumes attempts for undelivered events that occurred within the preceding two days.

### Docket Alert Events

Docket Alert events are sent when a subscribed docket receives new filings. Subscribe through the CourtListener UI, the Docket Alert API, or automatically through `@recap.email` settings when PACER-notification auto-subscription is enabled.

A Docket Alert payload contains a `results` array:

```json
{
  "payload": {
    "results": [
      { "id": 123456, "docket": 7890 }
    ]
  },
  "webhook": {}
}
```

Each item follows the Docket Entry API schema, except that `resource_uri` and `tags` are omitted and `docket` is an ID rather than a URL.

Example subscription workflow:

```bash
# Find the docket
curl --silent \
  --url 'https://www.courtlistener.com/api/rest/v4/search/?type=d&docket_number=22-cv-81294&case_name=trump' \
  --header 'Authorization: Token <TOKEN>' \
| jq '.results[0].docket_id'

# Create a docket alert
curl -X POST \
  --url 'https://www.courtlistener.com/api/rest/v4/docket-alerts/' \
  --header 'Authorization: Token <TOKEN>' \
  --data 'docket=<DOCKET_ID>'
```

### Search Alert Events

Search alerts notify your endpoint when a saved CourtListener query receives new results — citations, legal keywords, new opinions, or other search conditions.

```json
{
  "payload": {
    "results": [],
    "alert": {}
  },
  "webhook": {}
}
```

`results` follows the Search API response structure, and `alert` follows the Search Alert endpoint schema with `resource_uri` omitted.

Example: create a weekly alert for decisions mentioning *Obergefell v. Hodges*:

```bash
curl -X POST \
  --url 'https://www.courtlistener.com/api/rest/v4/alerts/' \
  --header 'Authorization: Token <TOKEN>' \
  --data 'name=My Obergefell Alert' \
  --data 'query=q=Obergefell+v.+Hodges&type=o&order_by=score+desc&stat_Precedential=on&docket_number=14-556' \
  --data 'rate=wly'
```

### Stale Docket Alerts

CourtListener automatically disables docket alerts for terminated or dormant cases. It issues a weekly warning before disabling alerts tied to terminated cases that have had no updates for roughly 180 days.

```json
{
  "payload": {
    "old_alerts": [],
    "disabled_alerts": []
  },
  "webhook": {}
}
```

`old_alerts` contains alerts nearing automatic disablement; `disabled_alerts` contains alerts CourtListener has already disabled after prolonged inactivity.

```bash
# Extend monitoring for another six months
curl -X PATCH --data 'alert_type=1' \
  --header 'Authorization: Token <TOKEN>' \
  'https://www.courtlistener.com/api/rest/v4/docket-alerts/<ID>/'

# Disable a docket alert programmatically
curl -X PATCH --data 'alert_type=0' \
  --header 'Authorization: Token <TOKEN>' \
  'https://www.courtlistener.com/api/rest/v4/docket-alerts/<ID>/'
```

### RECAP Fetch Events

The RECAP Fetch API lets a client request PACER items through CourtListener's infrastructure. The initial API request returns an ID and queues the download; the webhook removes the need to poll for completion. A RECAP Fetch webhook is emitted when the request terminates with either success or failure.

### Pray and Pay Events

The Pray and Pay system lets users request PACER documents not yet present in the RECAP Archive. A webhook is emitted when a requested document becomes available and the request changes to the granted state:

```json
{
  "payload": {
    "id": 1,
    "date_created": "2025-04-16T21:24:18.879312-07:00",
    "status": 2,
    "recap_document": 436149610
  },
  "webhook": {}
}
```

| Payload field | Meaning |
|---|---|
| `id` | Unique identifier of the prayer/request |
| `date_created` | Original request timestamp |
| `status` | `1` = waiting; `2` = granted |
| `recap_document` | ID of the requested RECAP document |

Events are sent only when status becomes `GRANTED` (`2`).

### Maintenance Window

Major CourtListener maintenance is scheduled for Thursdays from 21:00 PT through 23:59 PT. API crawling, scheduled jobs, and webhook-related dependencies may experience downtime during that window.

### Change Log

- **v1:** Initial webhook-event release.
- **v2:** Adds nested documents to Case Law Search Alert results; most other event payloads remain unchanged. For Search Alerts, oral-argument responses remain the same between v1 and v2. Case Law and RECAP v2 responses include nested results aligned with updates in v4 of the Search API.

***

### Related

{% include "../.gitbook/includes/related-links-global (1).md" %}
