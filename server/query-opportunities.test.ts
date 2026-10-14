import { describe, it, expect } from "vitest";
import { deriveOpportunity, cacheKeyForQueryOpportunities } from "./query-opportunities";

describe("deriveOpportunity", () => {
  it("is low whenever the brand is already mentioned, regardless of competitor count", () => {
    expect(deriveOpportunity(true, 0)).toBe("low");
    expect(deriveOpportunity(true, 3)).toBe("low");
  });

  it("is high when the brand is absent but 2+ competitors were verifiably named", () => {
    expect(deriveOpportunity(false, 2)).toBe("high");
    expect(deriveOpportunity(false, 5)).toBe("high");
  });

  it("is medium when the brand is absent and exactly 1 competitor was named", () => {
    expect(deriveOpportunity(false, 1)).toBe("medium");
  });

  it("is low when the brand is absent and no competitor was named either (weak evidence of a real opportunity)", () => {
    expect(deriveOpportunity(false, 0)).toBe("low");
  });
});

describe("cacheKeyForQueryOpportunities", () => {
  it("is per-domain, not per-page, since the query landscape is a site-wide concept", () => {
    expect(cacheKeyForQueryOpportunities("https://www.example.com/pricing")).toBe(
      cacheKeyForQueryOpportunities("https://example.com/features")
    );
  });

  it("differs between distinct domains", () => {
    expect(cacheKeyForQueryOpportunities("https://example.com")).not.toBe(
      cacheKeyForQueryOpportunities("https://other.com")
    );
  });
});
