import { describe, it, expect } from "vitest";
import { ENVIRONMENTAL_BASELINES, EQUIVALENCE_FACTORS } from "../src/data/baselines";
import { RESEARCH_PAPERS } from "../src/data/research-papers";
import { CONTAINER_THRESHOLDS } from "../src/data/container-thresholds";

describe("Data Integrity & Scientific Baselines", () => {
  it("should have positive non-zero baseline water and energy coefficients for research and provider", () => {
    // Research
    expect(ENVIRONMENTAL_BASELINES.research.waterMlPerPrompt.direct).toBeGreaterThan(0);
    expect(ENVIRONMENTAL_BASELINES.research.waterMlPerPrompt.indirect).toBeGreaterThan(0);
    expect(ENVIRONMENTAL_BASELINES.research.waterMlPerPrompt.total).toEqual(
      ENVIRONMENTAL_BASELINES.research.waterMlPerPrompt.direct + ENVIRONMENTAL_BASELINES.research.waterMlPerPrompt.indirect
    );
    expect(ENVIRONMENTAL_BASELINES.research.electricityKWhPerPrompt).toBeGreaterThan(0);

    // Provider
    expect(ENVIRONMENTAL_BASELINES.provider.waterMlPerPrompt.direct).toBeGreaterThan(0);
    expect(ENVIRONMENTAL_BASELINES.provider.waterMlPerPrompt.indirect).toBeGreaterThan(0);
    expect(ENVIRONMENTAL_BASELINES.provider.waterMlPerPrompt.total).toEqual(
      ENVIRONMENTAL_BASELINES.provider.waterMlPerPrompt.direct + ENVIRONMENTAL_BASELINES.provider.waterMlPerPrompt.indirect
    );
    expect(ENVIRONMENTAL_BASELINES.provider.electricityKWhPerPrompt).toBeGreaterThan(0);
  });

  it("should verify all research papers have valid metadata and DOIs", () => {
    expect(RESEARCH_PAPERS.length).toBeGreaterThanOrEqual(6);

    RESEARCH_PAPERS.forEach((paper) => {
      expect(paper.id).toBeTruthy();
      expect(paper.title.length).toBeGreaterThan(10);
      expect(paper.authors.length).toBeGreaterThan(0);
      expect(paper.doiOrUrl).toMatch(/^https?:\/\//);
      expect(paper.keyFinding.length).toBeGreaterThan(20);
      expect(paper.limitationsDisclosed.length).toBeGreaterThan(10);
      expect(paper.verified).toBe(true);
    });
  });

  it("should have ascending threshold limits for water container tiers", () => {
    expect(CONTAINER_THRESHOLDS.length).toBe(5);
    for (let i = 1; i < CONTAINER_THRESHOLDS.length; i++) {
      expect(CONTAINER_THRESHOLDS[i].maxLitersAnnual).toBeGreaterThan(
        CONTAINER_THRESHOLDS[i - 1].maxLitersAnnual
      );
    }
  });

  it("should define standard physical equivalence conversion factors", () => {
    expect(EQUIVALENCE_FACTORS.bottle500mlLiters).toBe(0.5);
    expect(EQUIVALENCE_FACTORS.bathtubCapacityLiters).toBe(150);
  });
});
