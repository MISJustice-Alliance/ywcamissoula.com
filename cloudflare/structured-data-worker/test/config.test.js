import { describe, expect, it } from "vitest";
import config from "../config/schema-routes.json";
import { isPassThroughPath, normalizePath } from "../src/routes.js";

const path = (entry) => (typeof entry === "string" ? entry : entry.path);

describe("config/schema-routes.json", () => {
  it("names the publisher and its site URL only", () => {
    expect(config.publisher).toEqual({ name: "MISJustice Alliance", url: "https://www.ywcaofmissoula.com" });
  });

  it("uses normalized, unique, rewritable paths for every schema route", () => {
    for (const type of ["organization", "breadcrumb", "article", "dataset"]) {
      const paths = config[type].routes.map(path);
      expect(new Set(paths).size, type).toBe(paths.length);
      for (const p of paths) {
        expect(p.startsWith("/"), p).toBe(true);
        expect(normalizePath(p), p).toBe(p);
        expect(isPassThroughPath(p), p).toBe(false);
      }
    }
  });

  it("keeps Article and Dataset off until a page shows the required metadata", () => {
    expect(config.article.routes).toEqual([]);
    expect(config.dataset.routes).toEqual([]);
  });

  it("serves each static text file with its own name as content (verification-key format)", () => {
    for (const [file, content] of Object.entries(config.staticTextFiles)) {
      expect(file).toBe(`/${content}.txt`);
      expect(content).toMatch(/^[a-z0-9]+$/);
    }
  });
});
