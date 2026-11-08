/**
 * AI — The Hidden Cost: Pure Mathematical Formulas
 *
 * All functions are deterministic, side-effect free, and framework-agnostic.
 */

import { ContainerTier, TimeHorizon } from "./types";
import { CONTAINER_THRESHOLDS } from "@/data/container-thresholds";
import { EQUIVALENCE_FACTORS } from "@/data/baselines";

/**
 * Normalizes user prompt input into a validated, non-negative integer.
 * Clamps input between 0 and 100,000 prompts/day.
 */
export function sanitizePromptInput(input: unknown): number {
  if (typeof input !== "number" || isNaN(input) || !isFinite(input)) {
    return 0;
  }
  return Math.max(0, Math.min(100000, Math.round(input)));
}

/**
 * Converts a daily prompt count to the target time horizon.
 */
export function getTimeHorizonMultiplier(horizon: TimeHorizon): number {
  switch (horizon) {
    case "day":
      return 1;
    case "month":
      return 30.4375; // Average days per month (365.25 / 12)
    case "year":
      return 365;
    default:
      return 1;
  }
}

/**
 * Computes water evaporation in Liters.
 *
 * Equation: V_water (L) = (N_prompts * Water_ml_per_prompt * Multiplier_model) / 1000
 */
export function computeWaterVolumeLiters(
  promptsCount: number,
  mlPerPrompt: number,
  modelMultiplier: number
): number {
  if (promptsCount <= 0 || mlPerPrompt <= 0 || modelMultiplier <= 0) {
    return 0;
  }
  return (promptsCount * mlPerPrompt * modelMultiplier) / 1000;
}

/**
 * Computes electricity consumption in Kilowatt-Hours (kWh).
 *
 * Equation: E_total (kWh) = N_prompts * Electricity_per_prompt * Multiplier_model
 */
export function computeElectricityKWh(
  promptsCount: number,
  kwhPerPrompt: number,
  modelMultiplier: number
): number {
  if (promptsCount <= 0 || kwhPerPrompt <= 0 || modelMultiplier <= 0) {
    return 0;
  }
  return promptsCount * kwhPerPrompt * modelMultiplier;
}

/**
 * Computes greenhouse gas emissions in Kilograms CO2 equivalent (kg CO2e).
 *
 * Equation: Carbon (kg CO2e) = (E_total (kWh) * Grid_intensity_g_per_kWh) / 1000
 */
export function computeCarbonKgCO2e(
  electricityKWh: number,
  gridGramsPerKWh: number
): number {
  if (electricityKWh <= 0 || gridGramsPerKWh <= 0) {
    return 0;
  }
  return (electricityKWh * gridGramsPerKWh) / 1000;
}

/**
 * Determines the visual container tier and multiplier based on annual water volume.
 */
export function resolveContainerTier(volumeLitersAnnual: number): {
  tier: ContainerTier;
  multiplier: number;
  label: string;
} {
  if (volumeLitersAnnual <= 0) {
    return {
      tier: "droplet",
      multiplier: 0,
      label: "Zero Consumption",
    };
  }

  if (volumeLitersAnnual < CONTAINER_THRESHOLDS[0].maxLitersAnnual) {
    return {
      tier: "droplet",
      multiplier: Number((volumeLitersAnnual / 0.05).toFixed(1)),
      label: "Discrete Freshwater Droplets",
    };
  }

  if (volumeLitersAnnual < CONTAINER_THRESHOLDS[1].maxLitersAnnual) {
    const bottles = volumeLitersAnnual / EQUIVALENCE_FACTORS.bottle500mlLiters;
    return {
      tier: "bottle",
      multiplier: Math.round(bottles),
      label: `${Math.round(bottles)} Reusable Water Bottles (500 mL)`,
    };
  }

  if (volumeLitersAnnual < CONTAINER_THRESHOLDS[2].maxLitersAnnual) {
    const jugs = volumeLitersAnnual / EQUIVALENCE_FACTORS.waterCoolerJugLiters;
    return {
      tier: "jug",
      multiplier: Number(jugs.toFixed(1)),
      label: `${jugs.toFixed(1)} Office Water Cooler Jugs (5-Gal / 19 L)`,
    };
  }

  if (volumeLitersAnnual < CONTAINER_THRESHOLDS[3].maxLitersAnnual) {
    const tubs = volumeLitersAnnual / EQUIVALENCE_FACTORS.bathtubCapacityLiters;
    return {
      tier: "bathtub",
      multiplier: Number(tubs.toFixed(1)),
      label: `${tubs.toFixed(1)} Full Household Bathtubs (~150 L)`,
    };
  }

  const cisterns = volumeLitersAnnual / 5000;
  return {
    tier: "cistern",
    multiplier: Number(cisterns.toFixed(2)),
    label: `${cisterns.toFixed(1)} Municipal Storage Cisterns (~5,000 L)`,
  };
}
