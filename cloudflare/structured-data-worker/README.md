# Structured-data Worker

A Cloudflare Worker for `www.ywcaofmissoula.com`. It does two things:

1. It adds a small, route-specific JSON-LD block to GitBook-rendered HTML, on an **allowlist of exact paths**, and an Ahrefs verification meta tag to the homepage head. All other paths pass through unchanged.
2. It serves fixed UTF-8 text files that GitBook cannot host (for example a site-verification key).
3. It advertises GitBook's existing `/llms.txt` machine-readable site overview using a `Link: </llms.txt>; rel="describedby"; type="text/markdown"` header on successful HTML homepage GET and HEAD responses. This site does not publish an API catalog or service description; do not advertise nonexistent API resources.
4. It serves `/auth.md` as Markdown describing public, unauthenticated reading. There is no agent registration, OAuth provider, or protected API; do not publish fake OAuth discovery metadata just to satisfy a scanner.
5. It serves a minimal read-only A2A JSON-RPC directory at `/a2a/v1` and its Agent Card at `/.well-known/agent-card.json`. The only implemented method is `SendMessage`, which returns fixed links to the public overview, sitemap, and publisher/corrections page. It does not answer legal questions, access private material, accept tasks, stream, or send push notifications. The card advertises only this behavior.

The JSON-LD facts come only from what the page shows: the visible GitBook breadcrumb, the visible H1, the page's own canonical link, and publisher facts that the site states. Schema is never a substitute for the evidence, attribution, or methodology on the page.

> **Valid schema does not guarantee a Google rich result**, a knowledge panel, Dataset Search listing, or any AI-search feature. Google decides what to show.

## Ownership boundary

| Layer | Owns |
| --- | --- |
| GitBook (`gitbook-export/`) | Content, navigation, rendered HTML, titles, descriptions, canonical URLs, sitemaps, `robots.txt`, `llms.txt` |
| This Worker | Route-specific JSON-LD, and fixed text files listed in config |
| Page content | The source of truth for every JSON-LD fact |

## Enabled schema types

| Type | Status | Routes | Values come from | Required on the page |
| --- | --- | --- | --- | --- |
| `Organization` | On | `/`, `/overview/about-this-site-publisher-and-corrections` | `publisher` in config: name `MISJustice Alliance`, url `https://www.ywcaofmissoula.com` | Visible statement that MISJustice Alliance publishes the site (home: shared disclaimer; About page: "Who publishes this site") |
| `BreadcrumbList` | On | 65 exact paths in `breadcrumb.routes` (pages nested under a parent page in `SUMMARY.md`) | The page's visible `<nav aria-label="Breadcrumb">` links and text, the visible H1, and the canonical link | A visible breadcrumb with at least one link other than `/`, and an H1. If either is missing, nothing is injected. |
| `Article` | Off (`article.routes` is empty) | none | Per-route fields in config | A visible author or accountable publisher and a visible publication or modification date next to the headline. No page shows a byline and date today. |
| `Dataset` | Off (`dataset.routes` is empty) | none | Per-route fields in config | A real dataset landing page: title, description of 50+ characters, publisher, provenance, date, and a working download URL. The current `datasets/` pages are allegation indexes, and the MPD statistics in `data/` are not published (see `DATA_ISSUES.md`). |

Every route that is not in an allowlist gets **no** JSON-LD.

Decisions behind the table (confirmed by the site owner on 2026-10-20):

- No `logo`: the visible logo is served from a signed `~gitbook/image` URL, which is not stable.
- No email in `Organization`: the address is protected by Cloudflare Email Obfuscation on purpose.
- `url` is `https://www.ywcaofmissoula.com` because `misjusticealliance.org` currently redirects (301) to this site.
- `BreadcrumbList` includes pages whose titles name people (for example the criminal-investigation referral pages). The schema repeats only titles that the page already shows in `<title>` and in its breadcrumb.

## How it works

- Only `GET` requests for allowlisted paths are processed. `HEAD`, other methods, and these paths always pass through: `/~gitbook/*`, `/cdn-cgi/*`, `/sitemap*`, `/llms*`, `/robots.txt`, `/_next/*`, `/api/*`, and file extensions such as `.md`, `.txt`, `.xml`, `.pdf`, images, CSS, and JS. Page slugs that contain dots (for example `…-4.28.2026`) are pages, not files.
- Only `200` responses with `content-type: text/html` are rewritten. Redirects, errors, Markdown served to AI agents (`text/markdown`, `text/plain`), and all other types pass through.
- `HTMLRewriter` streams the page. It does not buffer the document. While the page streams, it notes the canonical link, any existing `application/ld+json`, the breadcrumb links, and the first H1. At `</body>` it inserts one block:
  `<script type="application/ld+json" id="structured-data-worker-jsonld">…</script>`
  The block goes at the end of `<body>` because the breadcrumb and H1 appear after `<head>`. Google reads JSON-LD in `<body>`.
- **No duplicates.** If the page already contains any `application/ld+json` block (including this Worker's own `id`), nothing is added.
- **Escaping.** Values go through `JSON.stringify`; then `<`, U+2028, and U+2029 are escaped, so text cannot close the `<script>` element.
- **Canonical URL.** The page's `<link rel="canonical">` is used if it is on the same host. Otherwise the URL is origin + path, without query or fragment, and without a trailing slash (except `/`).
- **Header.** Rewritten responses carry `X-Structured-Data: organization` or `breadcrumb` (the planned type). The header is set before the body streams, so it does not prove that a block was inserted: view the source to confirm. Unprocessed responses do not get the header. The header does not affect caching (GitBook pages are `cf-cache-status: DYNAMIC`).
- **CSP.** GitBook sends `script-src 'self' 'unsafe-inline' …`, so the inline JSON-LD is allowed. JSON-LD is data and is not executed. The Worker does not change any CSP header.
- **Static text files.** Each `staticTextFiles` entry is served as `text/plain; charset=utf-8` with `cache-control: public, max-age=3600`, without calling GitBook. `HEAD` gets the headers only.

## Files

| Path | Purpose |
| --- | --- |
| `config/schema-routes.json` | Publisher facts, allowlists per schema type, fixed text files |
| `src/index.js` | Worker entry point |
| `src/worker.js` | Request handling and HTML rewriting |
| `src/routes.js` | Pass-through rules and route classification |
| `src/page.js` | Canonical URL and HTML-entity decoding |
| `src/schema.js` | Schema.org node factories and safe serialization |
| `scripts/build-breadcrumb-routes.mjs` | Rebuilds `breadcrumb.routes` from `SUMMARY.md` and the live site |
| `test/` | Tests in the real Workers runtime; `fixtures/` holds real GitBook markup |

## Local commands

```bash
cd cloudflare/structured-data-worker
npm ci                       # install dev dependencies (wrangler, vitest, @cloudflare/vitest-plugin)
npm test                     # run all tests in workerd
npx wrangler deploy --dry-run --outdir /tmp/sdw   # bundle only, no upload

# Run locally against the live site (no deploy). Use any free port.
npx wrangler dev --port 8790 --ip 127.0.0.1 --local-protocol https --local-upstream www.ywcaofmissoula.com
curl -sk --compressed https://127.0.0.1:8790/ | grep structured-data-worker-jsonld
```

`--local-protocol https` is needed: the Worker fetches the request URL, and the live site redirects `http` to `https`. Use `curl --compressed`, because the response is Brotli- or gzip-encoded.

## Maintaining the allowlists

- **Breadcrumbs:** after pages are added, moved, or renamed in `SUMMARY.md`, and GitBook has published, run:
  ```bash
  npm run build-breadcrumb-routes            # print the result
  npm run build-breadcrumb-routes -- --write # update config/schema-routes.json
  ```
  A page qualifies only if it is nested under a parent page in `SUMMARY.md`, and its live breadcrumb has a link other than `/` whose targets all return 200 without a redirect.
- **Organization:** change `publisher` only when the visible publisher statement on the site changes.
- **Article / Dataset:** add an object `{ "path": "...", ...fields }` to `routes` only after the page visibly shows the required values in the table above. Copy the values exactly as shown.

## Deployment (not done by this repository)

1. Authenticate: `npx wrangler login`.
2. Deploy: `npx wrangler deploy`. `workers_dev` is `false`, so the Worker has no public `workers.dev` URL.
3. In the Cloudflare dashboard → zone `ywcaofmissoula.com` → Workers Routes → **Add route**:
   - Route: `www.ywcaofmissoula.com/*`
   - Worker: `ywcaofmissoula-structured-data`
   - Failure mode: **Fail open (proceed)**, so the site keeps working if the Worker fails.
4. For the verification file on the apex host (`https://ywcaofmissoula.com/<key>.txt`): the existing apex-to-`www` redirect (301, path kept) sends it to the `www` route above. Add a second route `ywcaofmissoula.com/*` only if the verifier does not follow redirects.
5. Do not change DNS, the GitBook custom domain, or bot and firewall settings for this Worker.

## Production checks after deploy

- [ ] `curl -s --compressed https://www.ywcaofmissoula.com/ | grep -o '<script type="application/ld+json" id="structured-data-worker-jsonld">[^<]*'` shows one Organization block.
- [ ] Same check on a breadcrumb route, for example `/research-reports-legal-advocacy-and-analysis/missoula-police-department/mpd-civilian-complaint-scorecard-analysis`: one BreadcrumbList whose names match the visible breadcrumb and H1.
- [ ] `curl -sI https://www.ywcaofmissoula.com/<allowlisted path> | grep -i x-structured-data` shows the header; a non-allowlisted page does not.
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and a `.md` URL are unchanged (no header, no block).
- [ ] `curl -s https://www.ywcaofmissoula.com/s7cwab25byeh3hge7nw15jzaee6qjtxm.txt` returns exactly the key, with `content-type: text/plain; charset=utf-8`.
- [ ] `curl -s https://www.ywcaofmissoula.com/ahrefs_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30` returns exactly `ahrefs-site-verification_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30`, with `content-type: text/plain; charset=utf-8`.
- [ ] Homepage HTML source contains exactly one `<meta name="ahrefs-site-verification" content="694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30">` inside `<head>`; other pages have no added Ahrefs tag.
- [ ] `curl -sSI https://www.ywcaofmissoula.com/` and a GET response show the `describedby` Link to the working `/llms.txt`; a non-homepage page has no added Link header. The scanner at `isitagentready.com/api/scan` reports `checks.discoverability.linkHeaders.status` as `pass`.
- [ ] `/auth.md` GET returns an H1 beginning `# auth.md` as `text/markdown`, and HEAD returns the same MIME type and no body. The external scanner's `checks.discovery.authMd.status` remains `fail` ("does not describe agent registration") because this public site has no registration service. OAuth discovery checks also fail for the same reason; do not add fictitious metadata to make them pass.
- [ ] `/.well-known/agent-card.json` returns a valid JSON Agent Card whose JSON-RPC interface `/a2a/v1` answers a `SendMessage` request with public directory links. Unsupported methods return JSON-RPC errors. Scan `https://ywcaofmissoula.com` and confirm `checks.discovery.a2aAgentCard.status` is `pass`.
- [ ] Browser: View Source (not the DevTools Elements panel, which shows the DOM after scripts run) shows the block before `</body>`.
- [ ] [Schema.org Validator](https://validator.schema.org/): no errors for both types.
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results): BreadcrumbList is detected on a breadcrumb route. Organization is not a rich-result type there; use the Schema.org Validator for it.
- [ ] Run `python3.11 tools/validate_site.py gitbook-export --live tools/smoke_endpoints.txt` from the repository root: 0 errors.

## Rollback

- Fastest: Cloudflare dashboard → Workers Routes → delete the `www.ywcaofmissoula.com/*` route. Traffic goes straight to GitBook again.
- Or deploy a pass-through version: set `organization.routes` and `breadcrumb.routes` to `[]` and run `npx wrangler deploy`. The verification file keeps working.
