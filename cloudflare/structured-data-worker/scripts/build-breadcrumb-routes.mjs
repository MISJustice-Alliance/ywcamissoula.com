// Builds the BreadcrumbList route allowlist from SUMMARY.md and the live site.
//
// A page qualifies only if:
//   1. it is nested under a parent page in gitbook-export/SUMMARY.md, and
//   2. its live rendered page shows a breadcrumb (<nav aria-label="Breadcrumb">)
//      with at least one link other than "/", and every breadcrumb link
//      returns HTTP 200 without a redirect.
//
// Usage: node scripts/build-breadcrumb-routes.mjs [--write]
// Without --write it prints the result; with --write it updates
// config/schema-routes.json (breadcrumb.routes only).
import { readFile, writeFile } from "node:fs/promises";

const ORIGIN = "https://www.ywcaofmissoula.com";
const SUMMARY = new URL("../../../gitbook-export/SUMMARY.md", import.meta.url);
const CONFIG = new URL("../config/schema-routes.json", import.meta.url);
const UA = { "User-Agent": "Mozilla/5.0 (compatible; structured-data-worker-allowlist/1.0)" };

const summary = await readFile(SUMMARY, "utf8");
const nestedLabels = [...summary.matchAll(/^[ \t]+\* \[(.*?)\]\([^)]+\.md\)/gm)].map((m) => m[1]);

const llms = await (await fetch(`${ORIGIN}/llms.txt`, { headers: UA })).text();
const byTitle = new Map();
for (const m of llms.matchAll(/^- \[(.*?)\]\((https:\/\/www\.ywcaofmissoula\.com\/[^)]+?)\.md\)/gm)) {
  byTitle.set(m[1], new URL(m[2]).pathname);
}

const crumbStatus = new Map();
async function crumbOk(path) {
  if (!crumbStatus.has(path)) {
    const r = await fetch(ORIGIN + path, { headers: UA, redirect: "manual" });
    crumbStatus.set(path, r.status === 200);
  }
  return crumbStatus.get(path);
}

const routes = [];
const skipped = [];
for (const label of nestedLabels) {
  const path = byTitle.get(label);
  if (!path) { skipped.push([label, "no URL in llms.txt"]); continue; }
  const html = await (await fetch(ORIGIN + path, { headers: UA })).text();
  const nav = html.match(/<nav aria-label="Breadcrumb".*?<\/nav>/s)?.[0];
  const hrefs = nav ? [...nav.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((m) => m[1]) : [];
  if (!hrefs.some((h) => h !== "/")) { skipped.push([path, "no breadcrumb link other than /"]); continue; }
  const checks = await Promise.all(hrefs.map(crumbOk));
  if (checks.includes(false)) { skipped.push([path, "a breadcrumb link does not return 200"]); continue; }
  routes.push(path);
}

routes.sort();
console.log(`nested pages in SUMMARY.md: ${nestedLabels.length}`);
console.log(`qualifying routes: ${routes.length}`);
for (const [what, why] of skipped) console.log(`skipped: ${what} (${why})`);

if (process.argv.includes("--write")) {
  const config = JSON.parse(await readFile(CONFIG, "utf8"));
  config.breadcrumb.routes = routes;
  await writeFile(CONFIG, JSON.stringify(config, null, 2) + "\n");
  console.log(`wrote ${CONFIG.pathname}`);
}
