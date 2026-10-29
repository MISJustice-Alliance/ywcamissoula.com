import { classifyRoute, isPassThroughPath, routeFields } from "./routes.js";
import { canonicalUrl, decodeEntities } from "./page.js";
import { articleNode, breadcrumbNode, datasetNode, organizationNode, toJsonLd } from "./schema.js";

export const SCRIPT_ID = "structured-data-worker-jsonld";
export const AHREFS_VERIFICATION = "694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30";
// GitBook publishes this machine-readable site overview. No API catalog or OpenAPI description exists.
export const DISCOVERY_LINK = '</llms.txt>; rel="describedby"; type="text/markdown"';

const clean = (text) => decodeEntities(text).replace(/\s+/g, " ").trim();

// Collects the values the schema needs while the HTML streams past.
// Nothing is buffered: each handler keeps only short strings.
function collector() {
  const state = { canonical: null, hasJsonLd: false, hasAhrefsMeta: false, crumbs: [], h1: null, inH1: false };
  let crumb = null;
  const handlers = {
    canonical: { element(el) { state.canonical ??= el.getAttribute("href"); } },
    jsonLd: { element() { state.hasJsonLd = true; } },
    ahrefsMeta: { element() { state.hasAhrefsMeta = true; } },
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
    headers: { "content-type": new URL(request.url).pathname === "/auth.md" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}

// fetchOrigin is the global fetch in production (GitBook origin behind the route).
export async function handle(request, fetchOrigin, config) {
  const fixed = staticText(request, config);
  if (fixed) return fixed;

  const { pathname } = new URL(request.url);
  if (!["GET", "HEAD"].includes(request.method) || isPassThroughPath(pathname)) return fetchOrigin(request);

  const types = classifyRoute(pathname, config);
  if (types.length === 0) return fetchOrigin(request);

  const response = await fetchOrigin(request);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200 || !contentType.toLowerCase().startsWith("text/html")) return response;

  // Add discovery metadata to the homepage only, preserving any origin Link values.
  // HEAD must expose the same metadata as GET without running the HTML rewriter.
  if (request.method === "HEAD") {
    if (pathname !== "/") return response;
    const out = new Response(null, response);
    out.headers.append("Link", DISCOVERY_LINK);
    return out;
  }

  const { state, handlers } = collector();
  const out = new Response(response.body, response);
  out.headers.set("X-Structured-Data", types.join(","));
  if (pathname === "/") out.headers.append("Link", DISCOVERY_LINK);

  return new HTMLRewriter()
    .on('link[rel="canonical"]', handlers.canonical)
    .on('script[type="application/ld+json"]', handlers.jsonLd)
    .on('meta[name="ahrefs-site-verification"]', handlers.ahrefsMeta)
    .on("head", {
      element(head) {
        if (pathname !== "/") return;
        head.onEndTag((end) => {
          if (!state.hasAhrefsMeta) end.before(`<meta name="ahrefs-site-verification" content="${AHREFS_VERIFICATION}">`, { html: true });
        });
      },
    })
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
