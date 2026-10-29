import { describe, expect, it } from "vitest";
import { handle } from "../src/worker.js";
import nestedPage from "./fixtures/gitbook-nested-page.html?raw";
import productionConfig from "../config/schema-routes.json";

const ORIGIN = "https://www.ywcaofmissoula.com";
const NESTED = "/research-reports-legal-advocacy-and-analysis/missoula-police-department/mpd-civilian-complaint-scorecard-analysis";

const config = {
  site: { origin: ORIGIN },
  publisher: { name: "MISJustice Alliance", url: ORIGIN },
  organization: { routes: ["/"] },
  breadcrumb: { routes: [NESTED] },
  article: { routes: [] },
  dataset: { routes: [] },
  staticTextFiles: { "/s7cwab25byeh3hge7nw15jzaee6qjtxm.txt": "s7cwab25byeh3hge7nw15jzaee6qjtxm" },
};

// The origin is GitBook in production. Tests serve fixed responses instead,
// and record whether the origin was called.
function origin(body, init = {}) {
  const calls = [];
  const fetchOrigin = async (request) => {
    calls.push(new URL(request.url).pathname);
    return new Response(body, {
      status: init.status ?? 200,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate", ...init.headers },
    });
  };
  return { fetchOrigin, calls };
}

const get = (path, method = "GET") => new Request(ORIGIN + path, { method });

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json" id="structured-data-worker-jsonld">(.*?)<\/script>/gs)]
    .map((m) => JSON.parse(m[1]));
}

const simplePage = (extraHead = "", h1 = "Home") =>
  `<!DOCTYPE html><html><head><title>t</title><link rel="canonical" href="${ORIGIN}"/>${extraHead}</head>` +
  `<body><main><h1>${h1}</h1></main></body></html>`;

describe("BreadcrumbList injection on a real GitBook page", () => {
  it("builds the trail from the visible breadcrumb and H1, before </body>", async () => {
    const { fetchOrigin } = origin(nestedPage);
    const res = await handle(get(NESTED), fetchOrigin, config);
    const html = await res.text();

    const [doc] = jsonLdBlocks(html);
    expect(doc["@context"]).toBe("https://schema.org");
    expect(doc["@graph"]).toEqual([{
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Research Reports, Legal Advocacy, and Analysis",
          item: `${ORIGIN}/research-reports-legal-advocacy-and-analysis/research-reports-legal-advocacy-and-analysis` },
        { "@type": "ListItem", position: 2, name: "Missoula Police Department",
          item: `${ORIGIN}/research-reports-legal-advocacy-and-analysis/missoula-police-department` },
        { "@type": "ListItem", position: 3, name: "MPD Civilian Complaint Scorecard & Accountability Analysis (2016–2022)",
          item: ORIGIN + NESTED },
      ],
    }]);
    expect(html.indexOf("structured-data-worker-jsonld")).toBeLessThan(html.indexOf("</body>"));
    expect(html.indexOf("structured-data-worker-jsonld")).toBeGreaterThan(html.indexOf("</h1>"));
    expect(res.headers.get("x-structured-data")).toBe("breadcrumb");
  });

  it("keeps the origin status and headers", async () => {
    const { fetchOrigin } = origin(nestedPage);
    const res = await handle(get(NESTED), fetchOrigin, config);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(res.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");
  });

  it("injects nothing when the page shows no breadcrumb", async () => {
    const { fetchOrigin } = origin(simplePage("", "Child"));
    const html = await (await handle(get(NESTED), fetchOrigin, config)).text();
    expect(jsonLdBlocks(html)).toHaveLength(0);
  });
});

describe("Organization injection", () => {
  it("advertises the published machine-readable overview from GET and HEAD /", async () => {
    for (const method of ["GET", "HEAD"]) {
      const { fetchOrigin } = origin(method === "GET" ? simplePage() : null, {
        headers: { link: '</sitemap.xml>; rel="alternate"' },
      });
      const res = await handle(get("/", method), fetchOrigin, config);
      expect(res.status).toBe(200);
      expect(res.headers.get("link")).toContain('</llms.txt>; rel="describedby"; type="text/markdown"');
      expect(res.headers.get("link")).toContain('</sitemap.xml>; rel="alternate"');
      if (method === "HEAD") expect(await res.text()).toBe("");
    }
  });

  it("does not advertise homepage discovery links on other pages or error responses", async () => {
    for (const [path, status] of [[NESTED, 200], ["/", 404]]) {
      const { fetchOrigin } = origin(simplePage(), { status });
      const res = await handle(get(path), fetchOrigin, config);
      expect(res.headers.has("link")).toBe(false);
    }
  });

  it("puts one Ahrefs verification meta tag inside the homepage head", async () => {
    const { fetchOrigin } = origin(simplePage());
    const html = await (await handle(get("/"), fetchOrigin, config)).text();
    const tag = '<meta name="ahrefs-site-verification" content="694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30">';
    expect(html.match(/<meta name="ahrefs-site-verification"/g)).toHaveLength(1);
    expect(html.indexOf(tag)).toBeGreaterThan(html.indexOf("<head>"));
    expect(html.indexOf(tag)).toBeLessThan(html.indexOf("</head>"));
    expect(html.indexOf(tag)).toBeLessThan(html.indexOf("<body>"));
  });

  it("does not duplicate an existing Ahrefs verification meta tag", async () => {
    const existing = '<meta name="ahrefs-site-verification" content="694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30">';
    const { fetchOrigin } = origin(simplePage(existing));
    const html = await (await handle(get("/"), fetchOrigin, config)).text();
    expect(html.match(/ahrefs-site-verification/g)).toHaveLength(1);
  });

  it("does not inject the Ahrefs tag into other pages", async () => {
    const { fetchOrigin } = origin(nestedPage);
    const html = await (await handle(get(NESTED), fetchOrigin, config)).text();
    expect(html).not.toContain('name="ahrefs-site-verification"');
  });

  it("adds one Organization block on an allowlisted route", async () => {
    const { fetchOrigin } = origin(simplePage());
    const res = await handle(get("/"), fetchOrigin, config);
    const blocks = jsonLdBlocks(await res.text());
    expect(blocks).toHaveLength(1);
    expect(blocks[0]["@graph"]).toEqual([{ "@type": "Organization", name: "MISJustice Alliance", url: ORIGIN }]);
    expect(res.headers.get("x-structured-data")).toBe("organization");
  });

  it("does not inject when the page already carries any JSON-LD", async () => {
    for (const existing of [
      '<script type="application/ld+json" id="structured-data-worker-jsonld">{}</script>',
      '<script type="application/ld+json">{"@type":"WebSite"}</script>',
    ]) {
      const { fetchOrigin } = origin(simplePage(existing));
      const html = await (await handle(get("/"), fetchOrigin, config)).text();
      expect(html.match(/application\/ld\+json/g)).toHaveLength(1);
    }
  });
});

describe("pass-through", () => {
  it("returns unknown routes byte-for-byte without a debug header", async () => {
    const body = simplePage("", "Other");
    const { fetchOrigin } = origin(body);
    const res = await handle(get("/some/other/page"), fetchOrigin, config);
    expect(await res.text()).toBe(body);
    expect(res.headers.has("x-structured-data")).toBe(false);
  });

  it("does not rewrite non-HTML responses on an allowlisted route", async () => {
    const body = "# Markdown for AI agents";
    const { fetchOrigin } = origin(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
    expect(await (await handle(get(NESTED), fetchOrigin, config)).text()).toBe(body);
  });

  it("does not rewrite errors or redirects", async () => {
    for (const status of [404, 500]) {
      const { fetchOrigin } = origin(simplePage(), { status });
      const res = await handle(get("/"), fetchOrigin, config);
      expect(res.status).toBe(status);
      expect(jsonLdBlocks(await res.text())).toHaveLength(0);
    }
    const { fetchOrigin } = origin(null, { status: 307, headers: { location: `${ORIGIN}/x` } });
    const res = await handle(get("/"), fetchOrigin, config);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe(`${ORIGIN}/x`);
  });

  it("does not rewrite sitemap, robots, llms, assets, or .md even if listed", async () => {
    const listed = { ...config, organization: { routes: ["/sitemap.xml", "/robots.txt", "/llms.txt", "/~gitbook/image", "/page.md"] } };
    for (const path of listed.organization.routes) {
      const body = simplePage();
      const { fetchOrigin } = origin(body);
      expect(await (await handle(get(path), fetchOrigin, listed)).text(), path).toBe(body);
    }
  });

  it("does not rewrite non-GET requests", async () => {
    const { fetchOrigin } = origin(simplePage());
    const res = await handle(get("/", "POST"), fetchOrigin, config);
    expect(jsonLdBlocks(await res.text())).toHaveLength(0);
  });
});

describe("static verification file", () => {
  const path = "/s7cwab25byeh3hge7nw15jzaee6qjtxm.txt";

  it("serves the key as UTF-8 plain text without calling the origin", async () => {
    const { fetchOrigin, calls } = origin("should not be used");
    const res = await handle(get(path), fetchOrigin, config);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await res.text()).toBe("s7cwab25byeh3hge7nw15jzaee6qjtxm");
    expect(calls).toEqual([]);
  });

  it("answers HEAD with headers and no body", async () => {
    const { fetchOrigin } = origin("unused");
    const res = await handle(get(path, "HEAD"), fetchOrigin, config);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });
  it("serves the Ahrefs root path exactly, without fetching GitBook", async () => {
    const path = "/ahrefs_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30";
    const expected = "ahrefs-site-verification_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30";
    const { fetchOrigin, calls } = origin("should not be used");
    const res = await handle(get(path), fetchOrigin, productionConfig);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await res.text()).toBe(expected);
    const head = await handle(get(path, "HEAD"), fetchOrigin, productionConfig);
    expect(head.status).toBe(200);
    expect(await head.text()).toBe("");
    expect(calls).toEqual([]);
  });
});

describe("public agent access manifest", () => {
  it("serves Markdown at /auth.md without advertising nonexistent registration", async () => {
    const { fetchOrigin, calls } = origin("GitBook not found");
    const res = await handle(get("/auth.md"), fetchOrigin, productionConfig);
    const body = await res.text();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(body).toMatch(/^# auth\.md\b/);
    expect(body).toContain("No agent registration or provisioning endpoint is offered");
    expect(body).toContain("unauthenticated HTTP GET");
    const head = await handle(get("/auth.md", "HEAD"), fetchOrigin, productionConfig);
    expect(head.status).toBe(200);
    expect(head.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await head.text()).toBe("");
    expect(calls).toEqual([]);
  });
});
