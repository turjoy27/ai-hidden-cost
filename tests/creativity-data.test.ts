import { describe, it, expect } from "vitest";
import { IDEA_COMPARISONS, COGNITIVE_PILLARS } from "../src/data/creativity-data";
import { RESEARCH_PAPERS } from "../src/data/research-papers";

describe("Creativity Research Data Integrity", () => {
  const paperIds = new Set(RESEARCH_PAPERS.map((p) => p.id));

  it("should contain at least 3 empirical comparison scenarios", () => {
    expect(IDEA_COMPARISONS.length).toBeGreaterThanOrEqual(3);
  });

  it("should verify every comparison scenario has valid structure and citations", () => {
    IDEA_COMPARISONS.forEach((scenario) => {
      expect(scenario.id).toBeTruthy();
      expect(scenario.promptTitle).toBeTruthy();
      expect(scenario.promptDescription.length).toBeGreaterThan(20);

      // Human response
      expect(scenario.humanResponse.title).toBeTruthy();
      expect(scenario.humanResponse.description.length).toBeGreaterThan(20);
      expect(scenario.humanResponse.semanticVarianceScore).toBeGreaterThanOrEqual(0.7);
      expect(scenario.humanResponse.semanticVarianceScore).toBeLessThanOrEqual(1.0);
      expect(scenario.humanResponse.traits.length).toBeGreaterThanOrEqual(2);

      // AI response
      expect(scenario.aiResponse.title).toBeTruthy();
      expect(scenario.aiResponse.description.length).toBeGreaterThan(20);
      expect(scenario.aiResponse.semanticVarianceScore).toBeGreaterThanOrEqual(0.1);
      expect(scenario.aiResponse.semanticVarianceScore).toBeLessThanOrEqual(0.6);
      expect(scenario.aiResponse.traits.length).toBeGreaterThanOrEqual(2);

      // Human variance must exceed AI cluster variance
      expect(scenario.humanResponse.semanticVarianceScore).toBeGreaterThan(
        scenario.aiResponse.semanticVarianceScore
      );

      // Citation verification
      expect(paperIds.has(scenario.citationId)).toBe(true);
    });
  });

  it("should have 3 balanced cognitive pillars with both benefits and risks", () => {
    expect(COGNITIVE_PILLARS.length).toBe(3);

    COGNITIVE_PILLARS.forEach((pillar) => {
      expect(pillar.phase).toBeTruthy();
      expect(pillar.title).toBeTruthy();
      expect(pillar.subtitle).toBeTruthy();
      expect(pillar.body.length).toBeGreaterThan(50);
      expect(pillar.benefit.length).toBeGreaterThan(15);
      expect(pillar.risk.length).toBeGreaterThan(15);
      expect(paperIds.has(pillar.citationId)).toBe(true);
    });
  });
});
