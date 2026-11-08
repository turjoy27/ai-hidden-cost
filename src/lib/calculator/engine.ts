/**
 * AI — The Hidden Cost: Pure Environmental Calculation Engine
 *
 * Strict Requirement: Keep calculations separate from UI components.
 * Rule 4 & Transparency Compliance.
 */

import {
  CalculatorInputs,
  CalculatorOutputs,
} from "./types";
import { ENVIRONMENTAL_BASELINES, EQUIVALENCE_FACTORS } from "@/data/baselines";
import {
  sanitizePromptInput,
  getTimeHorizonMultiplier,
  computeWaterVolumeLiters,
  computeElectricityKWh,
  computeCarbonKgCO2e,
  resolveContainerTier,
} from "./formulas";
import { LITERS_TO_GALLONS } from "./units";

export function calculateEnvironmentalImpact(inputs: CalculatorInputs): CalculatorOutputs {
  const cleanDailyPrompts = sanitizePromptInput(inputs.promptsPerDay);
  const timeMultiplier = getTimeHorizonMultiplier(inputs.timeHorizon);
  const promptsCount = cleanDailyPrompts * timeMultiplier;

  // Select baseline dataset (Academic Research vs Corporate Provider Disclosures)
  const baseline = inputs.dataSource === "provider"
    ? ENVIRONMENTAL_BASELINES.provider
    : ENVIRONMENTAL_BASELINES.research;

  const modelMultiplier = ENVIRONMENTAL_BASELINES.modelMultipliers[inputs.modelTier] ?? 1.0;
  const gridIntensity = ENVIRONMENTAL_BASELINES.carbonGramsPerKWh[inputs.gridType] ?? 385.0;

  // Zero-input short-circuit
  if (cleanDailyPrompts === 0) {
    return {
      promptsCount: 0,
      waterDirectLiters: 0,
      waterIndirectLiters: 0,
      waterTotalLiters: 0,
      waterTotalGallons: 0,
      electricityKWh: 0,
      carbonKgCO2e: 0,
      ranges: {
        waterLitersMin: 0,
        waterLitersMax: 0,
        carbonKgMin: 0,
        carbonKgMax: 0,
      },
      equivalents: {
        bottles500ml: 0,
        smartphonesCharged: 0,
        drivingMilesEquivalent: 0,
        bathtubPercentage: 0,
        containerClass: "droplet",
        containerMultiplier: 0,
        containerLabel: "0 Liters (Zero Prompt Activity)",
      },
      sourceMetadata: {
        sourceName: baseline.sourceName,
        citationId: baseline.citationId,
        isEstimate: true,
        disclaimer: "Estimates represent statistical modeling and life-cycle accounting, not real-time telemetry.",
      },
    };
  }

  // 1. Water Consumption (Direct and Indirect)
  const waterDirectLiters = computeWaterVolumeLiters(
    promptsCount,
    baseline.waterMlPerPrompt.direct,
    modelMultiplier
  );

  const waterIndirectLiters = computeWaterVolumeLiters(
    promptsCount,
    baseline.waterMlPerPrompt.indirect,
    modelMultiplier
  );

  const waterTotalLiters = waterDirectLiters + waterIndirectLiters;
  const waterTotalGallons = waterTotalLiters * LITERS_TO_GALLONS;

  // 2. Electricity Demand (kWh)
  const electricityKWh = computeElectricityKWh(
    promptsCount,
    baseline.electricityKWhPerPrompt,
    modelMultiplier
  );

  // 3. Carbon Emissions (kg CO2e)
  const carbonKgCO2e = computeCarbonKgCO2e(electricityKWh, gridIntensity);

  // 4. Uncertainty Estimation Ranges (+/- uncertainty factor)
  const uncertainty = baseline.uncertaintyFactor;
  const waterLitersMin = Math.max(0, waterTotalLiters * (1 - uncertainty));
  const waterLitersMax = waterTotalLiters * (1 + uncertainty);
  const carbonKgMin = Math.max(0, carbonKgCO2e * (1 - uncertainty));
  const carbonKgMax = carbonKgCO2e * (1 + uncertainty);

  // 5. Annualized Container Tier (always calculated on annual volume for consistent visual metaphor)
  const annualWaterLiters = computeWaterVolumeLiters(
    cleanDailyPrompts * 365,
    baseline.waterMlPerPrompt.total,
    modelMultiplier
  );
  const containerInfo = resolveContainerTier(annualWaterLiters);

  // 6. Real-World Equivalents
  const bottles500ml = Math.round(waterTotalLiters / EQUIVALENCE_FACTORS.bottle500mlLiters);
  const smartphonesCharged = Math.round(electricityKWh / EQUIVALENCE_FACTORS.smartphoneChargeKWh);
  const drivingMilesEquivalent = Number((carbonKgCO2e / EQUIVALENCE_FACTORS.carKgCO2ePerMile).toFixed(1));
  const bathtubPercentage = Number(((waterTotalLiters / EQUIVALENCE_FACTORS.bathtubCapacityLiters) * 100).toFixed(1));

  return {
    promptsCount: Math.round(promptsCount),
    waterDirectLiters: Number(waterDirectLiters.toFixed(2)),
    waterIndirectLiters: Number(waterIndirectLiters.toFixed(2)),
    waterTotalLiters: Number(waterTotalLiters.toFixed(2)),
    waterTotalGallons: Number(waterTotalGallons.toFixed(2)),
    electricityKWh: Number(electricityKWh.toFixed(3)),
    carbonKgCO2e: Number(carbonKgCO2e.toFixed(3)),
    ranges: {
      waterLitersMin: Number(waterLitersMin.toFixed(2)),
      waterLitersMax: Number(waterLitersMax.toFixed(2)),
      carbonKgMin: Number(carbonKgMin.toFixed(3)),
      carbonKgMax: Number(carbonKgMax.toFixed(3)),
    },
    equivalents: {
      bottles500ml,
      smartphonesCharged,
      drivingMilesEquivalent,
      bathtubPercentage,
      containerClass: containerInfo.tier,
      containerMultiplier: containerInfo.multiplier,
      containerLabel: containerInfo.label,
    },
    sourceMetadata: {
      sourceName: baseline.sourceName,
      citationId: baseline.citationId,
      isEstimate: true,
      disclaimer: "Estimates represent statistical modeling and life-cycle accounting, not real-time telemetry.",
    },
  };
}
