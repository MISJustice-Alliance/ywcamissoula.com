import { normalizePath } from "./routes.js";

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

// HTMLRewriter passes text as it appears in the source, so entities are still
// encoded. Decode the ones that appear in visible text.
export function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return NAMED[code.toLowerCase()] ?? match;
  });
}

// The page's own <link rel="canonical"> wins when it is on the same host.
// Otherwise use origin + normalized path, without query or fragment.
export function canonicalUrl(href, requestUrl) {
  const request = new URL(requestUrl);
  if (href) {
    try {
      const resolved = new URL(href, request);
      if (resolved.host === request.host && (resolved.protocol === "https:" || resolved.protocol === "http:")) {
        resolved.hash = "";
        return href.startsWith("http") && !href.includes("#") ? href : resolved.href;
      }
    } catch {
      // Malformed canonical: fall through to the request URL.
    }
  }
  return request.origin + normalizePath(request.pathname);
}
