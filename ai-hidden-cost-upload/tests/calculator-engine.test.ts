import { describe, it, expect } from "vitest";
import { calculateEnvironmentalImpact } from "../src/lib/calculator/engine";
import {
  sanitizePromptInput,
  getTimeHorizonMultiplier,
  computeWaterVolumeLiters,
  computeElectricityKWh,
  computeCarbonKgCO2e,
  resolveContainerTier,
} from "../src/lib/calculator/formulas";
import {
  convertVolume,
  convertMass,
  convertDistance,
  formatVolume,
  formatCarbon,
  formatEnergy,
  LITERS_TO_GALLONS,
} from "../src/lib/calculator/units";
import { CalculatorInputs } from "../src/lib/calculator/types";

describe("Calculator Formulas & Sanitization", () => {
  it("should sanitize and clamp prompt inputs correctly", () => {
    expect(sanitizePromptInput(0)).toBe(0);
    expect(sanitizePromptInput(-15)).toBe(0);
    expect(sanitizePromptInput(25.7)).toBe(26);
    expect(sanitizePromptInput(NaN)).toBe(0);
    expect(sanitizePromptInput("invalid" as unknown as number)).toBe(0);
    expect(sanitizePromptInput(200000)).toBe(100000); // Max clamp
  });

  it("should return accurate time horizon multipliers", () => {
    expect(getTimeHorizonMultiplier("day")).toBe(1);
    expect(getTimeHorizonMultiplier("month")).toBeCloseTo(30.4375, 4);
    expect(getTimeHorizonMultiplier("year")).toBe(365);
  });

  it("should compute pure water volume without negative numbers", () => {
    expect(computeWaterVolumeLiters(100, 25, 1.0)).toBe(2.5); // 100 * 25ml = 2500ml = 2.5L
    expect(computeWaterVolumeLiters(0, 25, 1.0)).toBe(0);
    expect(computeWaterVolumeLiters(-10, 25, 1.0)).toBe(0);
  });

  it("should compute electricity and carbon accurately", () => {
    const kwh = computeElectricityKWh(1000, 0.003, 1.0); // 3.0 kWh
    expect(kwh).toBe(3.0);
    const carbonKg = computeCarbonKgCO2e(kwh, 385); // 3 * 385g = 1155g = 1.155 kg
    expect(carbonKg).toBeCloseTo(1.155, 4);
  });
});

describe("Container Tier Resolution", () => {
  it("should map annual volume to correct container tiers", () => {
    expect(resolveContainerTier(0).tier).toBe("droplet");
    expect(resolveContainerTier(20).tier).toBe("droplet");
    expect(resolveContainerTier(80).tier).toBe("bottle");
    expect(resolveContainerTier(300).tier).toBe("jug");
    expect(resolveContainerTier(1200).tier).toBe("bathtub");
    expect(resolveContainerTier(10000).tier).toBe("cistern");
  });
});

describe("Unit Conversion & Formatting", () => {
  it("should convert Liters to Gallons accurately", () => {
    const result = convertVolume(100, "imperial");
    expect(result.value).toBeCloseTo(100 * LITERS_TO_GALLONS, 4);
    expect(result.unit).toBe("gal");
  });

  it("should convert Mass kg to lbs", () => {
    const result = convertMass(10, "imperial");
    expect(result.value).toBeCloseTo(22.0462, 3);
    expect(result.unit).toBe("lbs");
  });

  it("should convert Distance miles to km", () => {
    const result = convertDistance(10, "metric");
    expect(result.value).toBeCloseTo(16.0934, 3);
    expect(result.unit).toBe("km");
  });

  it("should format strings with clear units", () => {
    expect(formatVolume(25.5, "metric")).toBe("25.5 L");
    expect(formatCarbon(1.234, "metric")).toBe("1.23 kg CO₂e");
    expect(formatEnergy(4.567)).toBe("4.57 kWh");
  });
});

describe("Environmental Calculation Engine Integration", () => {
  const baseInput: CalculatorInputs = {
    promptsPerDay: 25,
    modelTier: "standard",
    gridType: "average",
    dataSource: "research",
    timeHorizon: "year",
    unitSystem: "metric",
  };

  it("should gracefully handle zero prompts", () => {
    const zeroInput: CalculatorInputs = { ...baseInput, promptsPerDay: 0 };
    const output = calculateEnvironmentalImpact(zeroInput);

    expect(output.promptsCount).toBe(0);
    expect(output.waterTotalLiters).toBe(0);
    expect(output.electricityKWh).toBe(0);
    expect(output.carbonKgCO2e).toBe(0);
    expect(output.equivalents.bottles500ml).toBe(0);
    expect(output.ranges.waterLitersMin).toBe(0);
    expect(output.ranges.waterLitersMax).toBe(0);
    expect(output.sourceMetadata.isEstimate).toBe(true);
  });

  it("should calculate correct annual water and energy for 25 prompts/day", () => {
    const output = calculateEnvironmentalImpact(baseInput);

    // 25 prompts * 365 days = 9,125 prompts
    expect(output.promptsCount).toBe(9125);
    // Water: 9,125 * 25 mL = 228,125 mL = 228.13 L
    expect(output.waterTotalLiters).toBeCloseTo(228.13, 1);
    expect(output.waterDirectLiters).toBeCloseTo(91.25, 1);
    expect(output.waterIndirectLiters).toBeCloseTo(136.88, 1);

    // Electricity: 9,125 * 0.003 kWh = 27.375 kWh
    expect(output.electricityKWh).toBeCloseTo(27.38, 1);

    // Carbon: 27.375 * 385g = 10,539.375g = ~10.54 kg
    expect(output.carbonKgCO2e).toBeCloseTo(10.54, 1);

    // Equivalence: 228.13 L / 0.5 L = ~456 bottles
    expect(output.equivalents.bottles500ml).toBe(456);

    // Container class: 228L falls into 'jug' tier (120 - 500L)
    expect(output.equivalents.containerClass).toBe("jug");
  });

  it("should yield lower consumption under Provider baseline than Research baseline", () => {
    const researchOutput = calculateEnvironmentalImpact({ ...baseInput, dataSource: "research" });
    const providerOutput = calculateEnvironmentalImpact({ ...baseInput, dataSource: "provider" });

    expect(providerOutput.waterTotalLiters).toBeLessThan(researchOutput.waterTotalLiters);
    expect(providerOutput.electricityKWh).toBeLessThan(researchOutput.electricityKWh);
    expect(providerOutput.sourceMetadata.sourceName).toContain("Corporate Provider");
    expect(researchOutput.sourceMetadata.sourceName).toContain("Academic Research");
  });

  it("should scale with model multipliers", () => {
    const standard = calculateEnvironmentalImpact({ ...baseInput, modelTier: "standard" });
    const lightweight = calculateEnvironmentalImpact({ ...baseInput, modelTier: "lightweight" });
    const reasoning = calculateEnvironmentalImpact({ ...baseInput, modelTier: "reasoning" });

    expect(lightweight.waterTotalLiters).toBeLessThan(standard.waterTotalLiters);
    expect(reasoning.waterTotalLiters).toBeGreaterThan(standard.waterTotalLiters);
    expect(reasoning.waterTotalLiters / standard.waterTotalLiters).toBeCloseTo(2.8, 1);
  });

  it("should adjust carbon footprint according to regional grid intensity", () => {
    const avgGrid = calculateEnvironmentalImpact({ ...baseInput, gridType: "average" });
    const coalGrid = calculateEnvironmentalImpact({ ...baseInput, gridType: "coalHeavy" });
    const cleanGrid = calculateEnvironmentalImpact({ ...baseInput, gridType: "clean" });

    expect(coalGrid.carbonKgCO2e).toBeGreaterThan(avgGrid.carbonKgCO2e);
    expect(cleanGrid.carbonKgCO2e).toBeLessThan(avgGrid.carbonKgCO2e);
  });

  it("should include uncertainty ranges to indicate estimates rather than exact measurements", () => {
    const output = calculateEnvironmentalImpact(baseInput);

    expect(output.ranges.waterLitersMin).toBeLessThan(output.waterTotalLiters);
    expect(output.ranges.waterLitersMax).toBeGreaterThan(output.waterTotalLiters);
    expect(output.sourceMetadata.disclaimer).toBeTruthy();
  });
});
