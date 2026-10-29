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

  it("serves the Ahrefs file at its exact root path", () => {
    expect(config.staticTextFiles["/ahrefs_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30"])
      .toBe("ahrefs-site-verification_694a01b0d4b596393288ec408a9343d679b676c48499c304919128d77326df30");
  });

  it("keeps static text routes rooted and their content nonempty", () => {
    for (const [file, content] of Object.entries(config.staticTextFiles)) {
      expect(file).toMatch(/^\/[a-zA-Z0-9_.-]+$/);
      expect(content.length).toBeGreaterThan(0);
    }
  });
});
