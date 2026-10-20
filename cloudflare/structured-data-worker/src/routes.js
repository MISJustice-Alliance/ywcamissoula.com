// Route rules. Only exact, allowlisted paths get schema; everything else passes
// through untouched.

const PASS_THROUGH_PREFIXES = ["/~gitbook/", "/cdn-cgi/", "/sitemap", "/llms", "/robots.txt", "/_next/", "/api/"];

// File extensions only. Page slugs on this site can contain dots
// ("...-4.28.2026", "2016-dr.-marta-..."), so "has a dot" is not a test.
const FILE_EXTENSION = /\.(md|txt|xml|json|pdf|png|jpe?g|gif|svg|webp|avif|ico|css|js|mjs|map|woff2?|ttf)$/i;

export function normalizePath(pathname) {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.replace(/\/+$/, "") : pathname;
}

export function isPassThroughPath(pathname) {
  return PASS_THROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || FILE_EXTENSION.test(pathname);
}

const SCHEMA_TYPES = ["organization", "breadcrumb", "article", "dataset"];

function routePath(entry) {
  return typeof entry === "string" ? entry : entry.path;
}

// Returns the schema types allowlisted for this exact path, in a fixed order.
export function classifyRoute(pathname, config) {
  const path = normalizePath(pathname);
  return SCHEMA_TYPES.filter((type) => (config[type]?.routes ?? []).some((entry) => routePath(entry) === path));
}

// Per-route fields for Article and Dataset come from config, because the
// rendered page does not expose them as structured values.
export function routeFields(type, pathname, config) {
  const path = normalizePath(pathname);
  const entry = (config[type]?.routes ?? []).find((e) => routePath(e) === path);
  return entry && typeof entry === "object" ? entry : null;
}
