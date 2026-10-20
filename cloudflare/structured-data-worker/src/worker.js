import { classifyRoute, isPassThroughPath, routeFields } from "./routes.js";
import { canonicalUrl, decodeEntities } from "./page.js";
import { articleNode, breadcrumbNode, datasetNode, organizationNode, toJsonLd } from "./schema.js";

export const SCRIPT_ID = "structured-data-worker-jsonld";

const clean = (text) => decodeEntities(text).replace(/\s+/g, " ").trim();

// Collects the values the schema needs while the HTML streams past.
// Nothing is buffered: each handler keeps only short strings.
function collector() {
  const state = { canonical: null, hasJsonLd: false, crumbs: [], h1: null, inH1: false };
  let crumb = null;
  const handlers = {
    canonical: { element(el) { state.canonical ??= el.getAttribute("href"); } },
    jsonLd: { element() { state.hasJsonLd = true; } },
    crumb: {
      element(el) {
        crumb = { href: el.getAttribute("href"), text: "" };
        state.crumbs.push(crumb);
      },
      text(chunk) { if (crumb) crumb.text += chunk.text; },
    },
    h1: {
      element(el) {
        if (state.h1 !== null) return;
        state.h1 = "";
        state.inH1 = true;
        el.onEndTag(() => { state.inH1 = false; });
      },
      text(chunk) { if (state.inH1) state.h1 += chunk.text; },
    },
  };
  return { state, handlers };
}

function buildJsonLd(types, state, request, config) {
  const url = canonicalUrl(state.canonical, request.url);
  const origin = new URL(url).origin;
  const { pathname } = new URL(request.url);
  const nodes = types.map((type) => {
    switch (type) {
      case "organization":
        return organizationNode(config.publisher);
      case "breadcrumb": {
        const crumbs = state.crumbs
          .filter((c) => c.href && c.href !== "/")
          .map((c) => ({ name: clean(c.text), url: new URL(c.href, origin).href }));
        return breadcrumbNode(crumbs, { name: clean(state.h1 ?? ""), url });
      }
      case "article":
        return articleNode({ ...routeFields("article", pathname, config), url }, config.publisher);
      case "dataset":
        return datasetNode({ ...routeFields("dataset", pathname, config), url, creator: config.publisher });
      default:
        return null;
    }
  });
  return toJsonLd(nodes);
}

function staticText(request, config) {
  const content = config.staticTextFiles?.[new URL(request.url).pathname];
  if (content === undefined || !["GET", "HEAD"].includes(request.method)) return null;
  return new Response(request.method === "HEAD" ? null : content, {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}

// fetchOrigin is the global fetch in production (GitBook origin behind the route).
export async function handle(request, fetchOrigin, config) {
  const fixed = staticText(request, config);
  if (fixed) return fixed;

  const { pathname } = new URL(request.url);
  if (request.method !== "GET" || isPassThroughPath(pathname)) return fetchOrigin(request);

  const types = classifyRoute(pathname, config);
  if (types.length === 0) return fetchOrigin(request);

  const response = await fetchOrigin(request);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200 || !contentType.toLowerCase().startsWith("text/html")) return response;

  const { state, handlers } = collector();
  const out = new Response(response.body, response);
  out.headers.set("X-Structured-Data", types.join(","));

  return new HTMLRewriter()
    .on('link[rel="canonical"]', handlers.canonical)
    .on('script[type="application/ld+json"]', handlers.jsonLd)
    .on('nav[aria-label="Breadcrumb"] a', handlers.crumb)
    .on("h1", handlers.h1)
    .on("body", {
      element(body) {
        body.onEndTag((end) => {
          if (state.hasJsonLd) return;
          const json = buildJsonLd(types, state, request, config);
          if (json) end.before(`<script type="application/ld+json" id="${SCRIPT_ID}">${json}</script>`, { html: true });
        });
      },
    })
    .transform(out);
}
