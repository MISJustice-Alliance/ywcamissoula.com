import { describe, expect, it } from "vitest";
import { classifyRoute, isPassThroughPath, normalizePath } from "../src/routes.js";
import { canonicalUrl, decodeEntities } from "../src/page.js";
import { articleNode, breadcrumbNode, datasetNode, organizationNode, toJsonLd } from "../src/schema.js";

const config = {
  site: { origin: "https://www.ywcaofmissoula.com" },
  publisher: { name: "MISJustice Alliance", url: "https://www.ywcaofmissoula.com" },
  organization: { routes: ["/", "/overview/about"] },
  breadcrumb: { routes: ["/section/child"] },
  article: { routes: [] },
  dataset: { routes: [] },
  staticTextFiles: {},
};

describe("route classification", () => {
  it("returns the schema types allowlisted for a route", () => {
    expect(classifyRoute("/", config)).toEqual(["organization"]);
    expect(classifyRoute("/overview/about", config)).toEqual(["organization"]);
    expect(classifyRoute("/section/child", config)).toEqual(["breadcrumb"]);
  });

  it("returns no types for routes that are not allowlisted", () => {
    expect(classifyRoute("/section", config)).toEqual([]);
    expect(classifyRoute("/section/child/grandchild", config)).toEqual([]);
    expect(classifyRoute("/overview/about-something-else", config)).toEqual([]);
  });

  it("matches a trailing-slash variant of an allowlisted path", () => {
    expect(normalizePath("/section/child/")).toBe("/section/child");
    expect(normalizePath("/")).toBe("/");
    expect(classifyRoute("/section/child/", config)).toEqual(["breadcrumb"]);
  });

  it("passes through system, discovery, and file paths", () => {
    for (const path of [
      "/sitemap.xml", "/sitemap-pages.xml", "/robots.txt", "/llms.txt", "/llms-full.txt/1",
      "/~gitbook/image", "/cdn-cgi/l/email-protection", "/overview/sources-and-record-index.md",
      "/file.pdf", "/favicon.ico",
    ]) {
      expect(isPassThroughPath(path), path).toBe(true);
    }
  });

  it("does not treat dotted page slugs as files", () => {
    expect(isPassThroughPath("/odc-lowney-grievance-2026/grievance-to-montana-odc-brian-lowney-4.28.2026")).toBe(false);
    expect(isPassThroughPath("/washington-cases/2016-dr.-marta-j.l.-miranda-psy.d.-professional-misconduct-hipaa-violations-d")).toBe(false);
  });
});

describe("canonical URL", () => {
  const request = "https://www.ywcaofmissoula.com/section/child/?utm=x#top";

  it("uses an absolute canonical on the same host as given", () => {
    expect(canonicalUrl("https://www.ywcaofmissoula.com/section/child", request))
      .toBe("https://www.ywcaofmissoula.com/section/child");
    expect(canonicalUrl("https://www.ywcaofmissoula.com", request)).toBe("https://www.ywcaofmissoula.com");
  });

  it("resolves a relative canonical against the request", () => {
    expect(canonicalUrl("/section/child", request)).toBe("https://www.ywcaofmissoula.com/section/child");
  });

  it("falls back to origin plus normalized path without query or fragment", () => {
    expect(canonicalUrl(null, request)).toBe("https://www.ywcaofmissoula.com/section/child");
    expect(canonicalUrl("", "https://www.ywcaofmissoula.com/")).toBe("https://www.ywcaofmissoula.com/");
  });

  it("ignores a canonical that points to another host", () => {
    expect(canonicalUrl("https://evil.example/x", request)).toBe("https://www.ywcaofmissoula.com/section/child");
  });
});

describe("HTML entity decoding", () => {
  it("decodes the entities GitBook emits in visible text", () => {
    expect(decodeEntities("Scorecard &amp; Analysis &#x27;A&#x27; &quot;B&quot; &lt;C&gt; &#8212;"))
      .toBe("Scorecard & Analysis 'A' \"B\" <C> —");
  });
});

describe("schema factories", () => {
  it("builds an Organization with only the configured publisher facts", () => {
    expect(organizationNode(config.publisher)).toEqual({
      "@type": "Organization",
      name: "MISJustice Alliance",
      url: "https://www.ywcaofmissoula.com",
    });
  });

  it("builds a BreadcrumbList ending at the current page", () => {
    const node = breadcrumbNode(
      [{ name: "Section", url: "https://www.ywcaofmissoula.com/section" }],
      { name: "Child", url: "https://www.ywcaofmissoula.com/section/child" },
    );
    expect(node).toEqual({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Section", item: "https://www.ywcaofmissoula.com/section" },
        { "@type": "ListItem", position: 2, name: "Child", item: "https://www.ywcaofmissoula.com/section/child" },
      ],
    });
  });

  it("returns no BreadcrumbList without a parent crumb or a current name", () => {
    expect(breadcrumbNode([], { name: "Child", url: "https://x/c" })).toBeNull();
    expect(breadcrumbNode([{ name: "S", url: "https://x/s" }], { name: "", url: "https://x/c" })).toBeNull();
    expect(breadcrumbNode([{ name: "", url: "https://x/s" }], { name: "C", url: "https://x/c" })).toBeNull();
  });

  it("builds an Article only when headline, url, and a visible date exist", () => {
    const publisher = config.publisher;
    expect(articleNode({ headline: "H", url: "https://x/a", dateModified: "2026-10-01" }, publisher)).toEqual({
      "@type": "Article",
      headline: "H",
      mainEntityOfPage: "https://x/a",
      dateModified: "2026-10-01",
      publisher: { "@type": "Organization", name: "MISJustice Alliance", url: "https://www.ywcaofmissoula.com" },
    });
    expect(articleNode({ headline: "H", url: "https://x/a" }, publisher)).toBeNull();
    expect(articleNode({ url: "https://x/a", datePublished: "2026-10-01" }, publisher)).toBeNull();
  });

  it("builds a Dataset only with name, a 50+ character description, creator, and url", () => {
    const description = "Annual counts of civilian complaints filed with the department, by year.";
    const node = datasetNode({ name: "D", description, url: "https://x/d", creator: config.publisher });
    expect(node["@type"]).toBe("Dataset");
    expect(node.creator).toEqual({ "@type": "Organization", name: "MISJustice Alliance", url: "https://www.ywcaofmissoula.com" });
    expect(datasetNode({ name: "D", description: "too short", url: "https://x/d", creator: config.publisher })).toBeNull();
    expect(datasetNode({ name: "D", description, url: "https://x/d" })).toBeNull();
  });
});

describe("JSON-LD serialization", () => {
  it("returns null when there are no nodes", () => {
    expect(toJsonLd([])).toBeNull();
    expect(toJsonLd([null])).toBeNull();
  });

  it("produces valid JSON with a schema.org context and a graph", () => {
    const parsed = JSON.parse(toJsonLd([organizationNode(config.publisher)]));
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"]).toHaveLength(1);
  });

  it("escapes text that could close the script element", () => {
    const text = toJsonLd([breadcrumbNode(
      [{ name: "A </script><script>alert(1)</script> \"q\"", url: "https://x/s" }],
      { name: "B   line", url: "https://x/c" },
    )]);
    expect(text).not.toContain("</script");
    expect(text).not.toContain(" ");
    expect(JSON.parse(text)["@graph"][0].itemListElement[0].name)
      .toBe("A </script><script>alert(1)</script> \"q\"");
  });
});
