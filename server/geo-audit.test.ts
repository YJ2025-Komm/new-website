import { describe, it, expect } from "vitest";
import {
  detectHeadingStructure,
  detectFaqPresence,
  detectNumericalData,
  detectTrustSignalLevel,
  detectCategoryMentioned,
  computeScore,
  sortByImpact,
  normalizeAuditUrl,
  cacheKeyForAudit,
  type GeoAuditChecks,
} from "./geo-audit";

describe("detectHeadingStructure", () => {
  it("is strong only for exactly one H1 with 2+ H2s", () => {
    expect(detectHeadingStructure(1, 2)).toBe("strong");
    expect(detectHeadingStructure(1, 5)).toBe("strong");
  });

  it("is moderate for one H1 with at least one H2", () => {
    expect(detectHeadingStructure(1, 1)).toBe("moderate");
  });

  it("is weak when there's no H1, multiple H1s, or no H2s at all", () => {
    expect(detectHeadingStructure(0, 3)).toBe("weak");
    expect(detectHeadingStructure(2, 3)).toBe("weak");
    expect(detectHeadingStructure(1, 0)).toBe("weak");
    expect(detectHeadingStructure(0, 0)).toBe("weak");
  });
});

describe("detectFaqPresence", () => {
  it("is true when FAQPage schema is present, regardless of text", () => {
    expect(detectFaqPresence("", "nothing relevant here", ["FAQPage"])).toBe(true);
  });

  it("is true when a heading says FAQ, or body text has the full phrase", () => {
    expect(detectFaqPresence("Frequently Asked Questions", "", [])).toBe(true);
    expect(detectFaqPresence("FAQ", "", [])).toBe(true);
    expect(detectFaqPresence("", "See our frequently asked questions for details.", [])).toBe(true);
  });

  it("is false for a bare 'FAQ' mention in body text that isn't a real FAQ section", () => {
    // Regression case found on a live page: marketing/demo copy that merely
    // *talks about* FAQs as a topic ("Add FAQ schema to your pricing page")
    // was being counted as "this page has an FAQ section," which it doesn't.
    expect(detectFaqPresence("", "Quick win: Add structured FAQ to your pricing page.", [])).toBe(false);
  });

  it("is false when neither schema nor text indicates an FAQ section", () => {
    expect(detectFaqPresence("Pricing Plans", "Choose the plan that fits your team.", ["Organization"])).toBe(false);
  });
});

describe("detectNumericalData", () => {
  it("detects percentages, prices, large comma-separated numbers, and customer-count phrasing", () => {
    expect(detectNumericalData("We improved retention by 25%.")).toBe(true);
    expect(detectNumericalData("Plans start at $49/month.")).toBe(true);
    expect(detectNumericalData("Trusted by 10,000 companies worldwide.")).toBe(true);
    expect(detectNumericalData("Used by 500+ customers globally.")).toBe(true);
  });

  it("is false for plain text with no numeric signal", () => {
    expect(detectNumericalData("Our platform helps teams move faster and work smarter.")).toBe(false);
  });
});

describe("detectTrustSignalLevel", () => {
  it("is missing with zero keyword hits", () => {
    expect(detectTrustSignalLevel("A great product for everyone.")).toBe("missing");
  });

  it("is partial with exactly one keyword hit", () => {
    expect(detectTrustSignalLevel("We are SOC 2 compliant.")).toBe("partial");
  });

  it("is present with two or more distinct keyword hits", () => {
    expect(detectTrustSignalLevel("We are SOC 2 and GDPR compliant, trusted by Fortune 500 companies.")).toBe("present");
  });
});

describe("detectCategoryMentioned", () => {
  it("is true when a significant category word appears in title/H1/meta", () => {
    expect(detectCategoryMentioned("customer engagement platform", "Acme | Customer Engagement Software", "", "")).toBe(true);
  });

  it("is false when none of the category's significant words appear anywhere", () => {
    expect(detectCategoryMentioned("customer engagement platform", "Acme | Home", "Welcome to Acme", "The best tool around")).toBe(false);
  });
});

describe("computeScore", () => {
  it("sums to 100 when every check is maximally positive", () => {
    const checks: GeoAuditChecks = {
      categoryMentioned: true,
      faqsPresent: true,
      headingStructure: "strong",
      trustSignals: "present",
      schemaMarkup: true,
      clearValueProp: true,
      authoritySignals: true,
      numericalData: true,
    };
    expect(computeScore(checks)).toBe(100);
  });

  it("sums to 0 when every check is maximally negative", () => {
    const checks: GeoAuditChecks = {
      categoryMentioned: false,
      faqsPresent: false,
      headingStructure: "weak",
      trustSignals: "missing",
      schemaMarkup: false,
      clearValueProp: false,
      authoritySignals: false,
      numericalData: false,
    };
    expect(computeScore(checks)).toBe(0);
  });

  it("gives partial credit for moderate heading structure and partial trust signals", () => {
    const checks: GeoAuditChecks = {
      categoryMentioned: false,
      faqsPresent: false,
      headingStructure: "moderate",
      trustSignals: "partial",
      schemaMarkup: false,
      clearValueProp: false,
      authoritySignals: false,
      numericalData: false,
    };
    expect(computeScore(checks)).toBe(8 + 8);
  });
});

describe("sortByImpact", () => {
  it("orders high before medium before low, regardless of input order", () => {
    const fixes = [
      { fix: "a", impact: "low" as const },
      { fix: "b", impact: "high" as const },
      { fix: "c", impact: "medium" as const },
    ];
    expect(sortByImpact(fixes).map((f) => f.fix)).toEqual(["b", "c", "a"]);
  });

  it("does not mutate the original array", () => {
    const fixes = [{ fix: "a", impact: "low" as const }, { fix: "b", impact: "high" as const }];
    const original = [...fixes];
    sortByImpact(fixes);
    expect(fixes).toEqual(original);
  });
});

describe("normalizeAuditUrl / cacheKeyForAudit", () => {
  it("keeps the path distinct, unlike a domain-only cache key", () => {
    expect(normalizeAuditUrl("https://www.example.com/pricing")).toBe("example.com/pricing");
    expect(normalizeAuditUrl("https://example.com/features/")).toBe("example.com/features");
    expect(normalizeAuditUrl("https://www.example.com/")).toBe("example.com");
  });

  it("produces different cache keys for different pages on the same domain", () => {
    const pricingKey = cacheKeyForAudit("https://example.com/pricing");
    const featuresKey = cacheKeyForAudit("https://example.com/features");
    expect(pricingKey).not.toBe(featuresKey);
  });
});
