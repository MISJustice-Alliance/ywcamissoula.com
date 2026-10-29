import { classifyRoute, isPassThroughPath, routeFields } from "./routes.js";
import { canonicalUrl, decodeEntities } from "./page.js";
import { articleNode, breadcrumbNode, datasetNode, organizationNode, toJsonLd } from "./schema.js";

export const SCRIPT_ID = "structured-data-worker-jsonld";
export const AHREFS_VERIFICATION = "694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30";
// GitBook publishes this machine-readable site overview. No API catalog or OpenAPI description exists.
export const DISCOVERY_LINK = '</llms.txt>; rel="describedby"; type="text/markdown"';

// A bounded, read-only A2A directory for public site resources. It does not
// answer legal questions, read private data, create tasks, or call GitBook APIs.
const A2A_ORIGIN = "https://www.ywcaofmissoula.com";
const A2A_TEXT = `This is a public-documentation directory, not a legal advice or question-answering agent. Read the published site overview at ${A2A_ORIGIN}/llms.txt, browse page URLs at ${A2A_ORIGIN}/sitemap-pages.xml, and check the publisher and corrections policy at ${A2A_ORIGIN}/overview/about-this-site-publisher-and-corrections. The site is published by MISJustice Alliance, not YWCA of Missoula. Verify claims against linked primary sources.`;
export const AGENT_CARD = {
  name: "MISJustice Alliance Public Site Directory",
  description: "Read-only A2A directory that returns verified links to the public GitBook overview, page sitemap, and publisher/corrections policy. It does not answer substantive legal questions or act on users' behalf.",
  version: "1.0.0",
  supportedInterfaces: [{ url: `${A2A_ORIGIN}/a2a/v1`, protocolBinding: "JSONRPC", protocolVersion: "1.0" }],
  provider: { organization: "MISJustice Alliance", url: A2A_ORIGIN },
  capabilities: { streaming: false, pushNotifications: false, extendedAgentCard: false },
  defaultInputModes: ["text/plain"],
  defaultOutputModes: ["text/plain"],
  skills: [{ id: "public-site-directory", name: "Public site directory", description: "Returns links to the public site overview, page sitemap, and publisher/corrections policy. Does not research or authenticate users.", tags: ["public documentation", "site navigation"] }],
};

function a2aJson(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "access-control-allow-origin": "*" } });
}

async function a2aEndpoint(request) {
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { allow: "POST" } });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return a2aJson({ error: "Content-Type must be application/json" }, 415);
  if (Number(request.headers.get("content-length")) > 16384) return a2aJson({ error: "Request too large" }, 413);
  let payload;
  try {
    const reader = request.body?.getReader();
    if (!reader) return a2aJson({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    const decoder = new TextDecoder();
    let raw = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      raw += decoder.decode(value, { stream: true });
      if (raw.length > 16384) { await reader.cancel(); return a2aJson({ error: "Request too large" }, 413); }
    }
    payload = JSON.parse(raw + decoder.decode());
  } catch { return a2aJson({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }); }
  const id = payload?.id ?? null;
  const error = (code, message) => a2aJson({ jsonrpc: "2.0", id, error: { code, message } });
  if (!payload || Array.isArray(payload) || payload.jsonrpc !== "2.0" || (typeof payload.id !== "string" && typeof payload.id !== "number")) return error(-32600, "Invalid Request");
  if (payload.method !== "SendMessage") return error(-32601, "Method not found");
  const message = payload.params?.message;
  if (message?.role !== "ROLE_USER" || typeof message.messageId !== "string" || !Array.isArray(message.parts) || !message.parts.length || !message.parts.every(p => typeof p?.text === "string")) return error(-32602, "Expected a ROLE_USER message with text parts and a messageId");
  if (message.taskId || message.contextId || payload.params?.configuration?.returnImmediately || payload.params?.configuration?.taskPushNotificationConfig) return error(-32602, "This stateless directory does not accept tasks, context, or push notifications");
  const contextId = crypto.randomUUID();
  return a2aJson({ jsonrpc: "2.0", id, result: { message: { messageId: crypto.randomUUID(), contextId, role: "ROLE_AGENT", parts: [{ text: A2A_TEXT }] } } });
}

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
  const { pathname } = new URL(request.url);
  if (pathname === "/.well-known/agent-card.json" && ["GET", "HEAD"].includes(request.method)) {
    return new Response(request.method === "HEAD" ? null : JSON.stringify(AGENT_CARD), { status: 200, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=3600" } });
  }
  if (pathname === "/a2a/v1") return a2aEndpoint(request);
  const fixed = staticText(request, config);
  if (fixed) return fixed;

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
