import { describe, it, expect, vi } from "vitest";
import {
  classifyPresence,
  classifySample,
  filterAndDedupeQueries,
  textMentionsName,
  detectBrandMention,
  extractVerifiedCompetitors,
  deriveCategoryKeywords,
  normalizeDomain,
  TtlCache,
} from "./brand-visibility";

describe("classifyPresence", () => {
  it("maps 5-successful denominator percentages (0/20/40/60/80/100)", () => {
    expect(classifyPresence(0)).toBe("not_visible");
    expect(classifyPresence(20)).toBe("low");
    expect(classifyPresence(40)).toBe("medium");
    expect(classifyPresence(60)).toBe("medium");
    expect(classifyPresence(80)).toBe("high");
    expect(classifyPresence(100)).toBe("high");
  });

  it("maps 4-successful denominator percentages (0/25/50/75/100)", () => {
    expect(classifyPresence(0)).toBe("not_visible");
    expect(classifyPresence(25)).toBe("low");
    expect(classifyPresence(50)).toBe("medium");
    expect(classifyPresence(75)).toBe("medium");
    expect(classifyPresence(100)).toBe("high");
  });
});

describe("classifySample", () => {
  it("floors at 4 successful for a 'limited' snapshot, <=3 is insufficient regardless of attempted", () => {
    expect(classifySample(5)).toBe("full");
    expect(classifySample(4)).toBe("limited");
    expect(classifySample(3)).toBe("insufficient");
    expect(classifySample(2)).toBe("insufficient");
    expect(classifySample(0)).toBe("insufficient");
  });
});

describe("textMentionsName — ambiguity handling", () => {
  const categoryKeywords = ["software", "engineering", "projects"];

  it("does not count 'linear regression' as a mention of the brand Linear", () => {
    expect(
      textMentionsName("Many analysts use linear regression to model trends.", "Linear", categoryKeywords)
    ).toBe(false);
  });

  it("counts 'Linear' as a mention when accompanied by category context in the same sentence", () => {
    expect(
      textMentionsName("Linear is a popular project-management software for engineering teams.", "Linear", categoryKeywords)
    ).toBe(true);
  });

  it("does not count 'clay materials' as a mention of the brand Clay", () => {
    expect(
      textMentionsName("The pottery uses clay materials sourced locally.", "Clay", categoryKeywords)
    ).toBe(false);
  });

  it("counts 'Clay' as a mention when the sentence has a company-signal word", () => {
    expect(
      textMentionsName("Clay is a popular sales enablement platform for outbound teams.", "Clay", ["sales", "enablement"])
    ).toBe(true);
  });

  it("does not count 'ramp up operations' as a mention of the brand Ramp", () => {
    expect(
      textMentionsName("The factory plans to ramp up operations next quarter.", "Ramp", categoryKeywords)
    ).toBe(false);
  });

  it("counts 'Ramp' as a mention when paired with category context", () => {
    expect(
      textMentionsName("Ramp is a corporate card and spend management software.", "Ramp", ["spend", "management", "corporate"])
    ).toBe(true);
  });

  it("does not count 'the notion of automation' as a mention of the brand Notion", () => {
    expect(
      textMentionsName("Many teams embrace the notion of automation in their workflows.", "Notion", categoryKeywords)
    ).toBe(false);
  });

  it("counts 'Notion' as a mention when paired with category context", () => {
    expect(
      textMentionsName("Notion is a flexible workspace and note-taking software tool.", "Notion", ["workspace", "note-taking"])
    ).toBe(true);
  });

  it("treats unambiguous names as a plain token-boundary match regardless of context", () => {
    expect(textMentionsName("I love using Salesforce for CRM.", "Salesforce", [])).toBe(true);
    expect(textMentionsName("Nothing about this unrelated topic.", "Salesforce", [])).toBe(false);
  });
});

describe("detectBrandMention", () => {
  it("matches on the registrable domain as a distinct token", () => {
    expect(detectBrandMention("Check out ramp.com for expense management.", "Ramp", [], "ramp.com", ["expense"])).toBe(true);
  });

  it("does not false-positive on an unrelated domain-like substring", () => {
    expect(detectBrandMention("This has nothing to do with the brand.", "Ramp", [], "ramp.com", [])).toBe(false);
  });
});

describe("extractVerifiedCompetitors", () => {
  // "Northwind" is long/uncommon enough to be unambiguous, so these tests
  // isolate the verification/dedup logic from the ambiguity-safeguard rule
  // (covered separately in the textMentionsName suite above).
  it("only counts a competitor if verifiable in that answer's own text", () => {
    const answers = [
      { answer: "Popular tools include Northwind and Foo.", competitorsNamed: ["Northwind", "Bar"] }, // Bar not in text -> dropped
      { answer: "Northwind is widely used in this space.", competitorsNamed: ["Northwind"] },
    ];
    const result = extractVerifiedCompetitors(answers, "TargetBrand", [], []);
    expect(result).toEqual([{ name: "Northwind", count: 2 }]);
  });

  it("excludes the target brand and dedupes within a single answer", () => {
    const answers = [
      { answer: "TargetBrand and Northwind and Northwind again.", competitorsNamed: ["TargetBrand", "Northwind", "Northwind"] },
    ];
    const result = extractVerifiedCompetitors(answers, "TargetBrand", ["TB"], []);
    expect(result).toEqual([{ name: "Northwind", count: 1 }]);
  });
});

describe("filterAndDedupeQueries", () => {
  it("drops candidates that leak the brand, alias, or domain", () => {
    const candidates = [
      "What is the best project management tool?",
      "Is Acme good for project management?",
      "What do people use acme.com for?",
      "How do teams evaluate task tracking software?",
    ];
    const result = filterAndDedupeQueries(candidates, "Acme", [], "acme.com", 5);
    expect(result).toEqual([
      "What is the best project management tool?",
      "How do teams evaluate task tracking software?",
    ]);
  });

  it("collapses near-identical questions, keeping the first of each duplicate pair", () => {
    const candidates = [
      "What is the best CRM software for small teams?",
      "What is the best CRM software for small businesses?",
      "How do I migrate data between CRM platforms?",
    ];
    const result = filterAndDedupeQueries(candidates, "Brand", [], "brand.com", 5);
    expect(result).toEqual([
      "What is the best CRM software for small teams?",
      "How do I migrate data between CRM platforms?",
    ]);
  });

  it("caps at maxCount even when more than maxCount valid distinct queries are supplied", () => {
    const candidates = [
      "How do teams evaluate CRM software options?",
      "What are the top accounting tools for startups?",
      "How does email marketing software get chosen?",
      "What should buyers look for in a help desk platform?",
      "How do companies compare project management apps?",
      "What features matter most in analytics dashboards?",
      "How do teams pick a customer support ticketing system?",
    ];
    const result = filterAndDedupeQueries(candidates, "Brand", [], "brand.com", 5);
    expect(result).toHaveLength(5);
  });
});

describe("deriveCategoryKeywords", () => {
  it("strips stopwords and short tokens", () => {
    expect(deriveCategoryKeywords("an AI-powered CRM for sales teams")).toEqual(
      expect.arrayContaining(["aipowered", "crm", "sales", "teams"])
    );
  });
});

describe("normalizeDomain", () => {
  it("strips protocol, www, and lowercases", () => {
    expect(normalizeDomain("https://WWW.Example.com/page")).toBe("example.com");
    expect(normalizeDomain("http://example.com")).toBe("example.com");
  });
});

describe("TtlCache", () => {
  it("returns a fresh computed value on first call, then the cached value without recomputing", async () => {
    const cache = new TtlCache<string>(1000 * 60);
    const compute = vi.fn().mockResolvedValue("result-1");

    const first = await cache.getOrCompute("domain.com", compute);
    expect(first.fromCache).toBe(false);
    expect(first.data).toBe("result-1");

    const second = await cache.getOrCompute("domain.com", compute);
    expect(second.fromCache).toBe(true);
    expect(second.data).toBe("result-1");
    expect(second.generatedAt).toBe(first.generatedAt);
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it("shares a single in-flight computation across concurrent callers for the same key", async () => {
    const cache = new TtlCache<string>(1000 * 60);
    let resolveCompute: (v: string) => void;
    const compute = vi.fn(
      () => new Promise<string>((resolve) => { resolveCompute = resolve; })
    );

    const call1 = cache.getOrCompute("domain.com", compute);
    const call2 = cache.getOrCompute("domain.com", compute);

    resolveCompute!("shared-result");
    const [r1, r2] = await Promise.all([call1, call2]);

    expect(compute).toHaveBeenCalledTimes(1);
    expect(r1.data).toBe("shared-result");
    expect(r2.data).toBe("shared-result");
  });

  it("expires entries after the TTL", async () => {
    const cache = new TtlCache<string>(10); // 10ms TTL
    const compute = vi.fn().mockResolvedValue("v1").mockResolvedValueOnce("v1").mockResolvedValue("v2");

    await cache.getOrCompute("domain.com", compute);
    await new Promise((r) => setTimeout(r, 30));
    const second = await cache.getOrCompute("domain.com", compute);

    expect(second.fromCache).toBe(false);
    expect(compute).toHaveBeenCalledTimes(2);
  });
});
