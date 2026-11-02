import { EnvironmentalBaselines } from "@/lib/calculator/types";

/**
 * Environmental baseline coefficients derived from peer-reviewed research
 * and corporate environmental disclosures.
 *
 * Strict Separation:
 * 1. Research Baseline: Li et al. (UC Riverside / UT Arlington, 2023), de Vries (Joule, 2023)
 * 2. Provider Baseline: Microsoft 2024 Environmental Sustainability Report & Google 2024 Environmental Report
 */
export const ENVIRONMENTAL_BASELINES: EnvironmentalBaselines = {
  research: {
    sourceName: "Academic Research Consensus (Li et al., UC Riverside; de Vries, Joule)",
    citationId: "li-2023-thirsty",
    waterMlPerPrompt: {
      direct: 10.0,   // On-site evaporative cooling towers
      indirect: 15.0, // Off-site thermoelectric utility generation cooling
      total: 25.0,
    },
    electricityKWhPerPrompt: 0.003, // 3 Wh per prompt (Luccioni / de Vries)
    uncertaintyFactor: 0.35,        // +/- 35% variance based on climate and data center cooling design
  },
  provider: {
    sourceName: "Corporate Provider Disclosures (Microsoft & Google 2024 Environmental Reports)",
    citationId: "msft-google-2024-reports",
    waterMlPerPrompt: {
      direct: 6.2,    // Hyperscaler reported average global WUE (~0.49 L/kWh)
      indirect: 9.8,  // Grid thermoelectric generation factor
      total: 16.0,
    },
    electricityKWhPerPrompt: 0.0022, // Optimized enterprise fleet median
    uncertaintyFactor: 0.25,
  },
  carbonGramsPerKWh: {
    // US Average grid intensity (~385 g CO2e / kWh)
    average: 385.0,
    // Coal-heavy region (e.g. US Midwest, Australia, parts of Asia) (~750 g CO2e / kWh)
    coalHeavy: 750.0,
    // Renewable/Hydro-dominant region (e.g. Pacific Northwest, Nordic) (~50 g CO2e / kWh)
    clean: 50.0,
  },
  modelMultipliers: {
    // Lightweight models (e.g. Gemini 1.5 Flash, Llama 3 8B, GPT-4o-mini)
    lightweight: 0.35,
    // Standard flagship models (e.g. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)
    standard: 1.0,
    // Complex reasoning / multi-turn chain-of-thought (e.g. o1, o3, Gemini Thinking)
    reasoning: 2.8,
  },
};

/**
 * Physical comparison equivalencies
 */
export const EQUIVALENCE_FACTORS = {
  // Liters in a standard plastic water bottle
  bottle500mlLiters: 0.5,
  // kWh required to charge a modern smartphone battery (approx 12 Wh)
  smartphoneChargeKWh: 0.012,
  // kg CO2e emitted per mile driven by average gasoline passenger car (EPA standard)
  carKgCO2ePerMile: 0.39,
  // Standard residential bathtub capacity in Liters
  bathtubCapacityLiters: 150.0,
  // Standard 5-gallon commercial water cooler bottle in Liters
  waterCoolerJugLiters: 18.9271,
};
