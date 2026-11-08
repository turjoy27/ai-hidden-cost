/**
 * AI — The Hidden Cost: Core Domain Types
 */

export type ModelTier = "lightweight" | "standard" | "reasoning";

export type GridType = "average" | "coalHeavy" | "clean";

export type TimeHorizon = "day" | "month" | "year";

export type UnitSystem = "metric" | "imperial";

export type DataSourceMode = "research" | "provider";

export type ContainerTier = "droplet" | "bottle" | "jug" | "bathtub" | "cistern";

export interface WaterCoefficients {
  direct: number;   // On-site data center cooling tower evaporation (mL)
  indirect: number; // Off-site power plant generation cooling (mL)
  total: number;    // direct + indirect (mL)
}

export interface EnvironmentalBaselines {
  // Academic peer-reviewed research estimates (e.g. Li et al., UC Riverside)
  research: {
    sourceName: string;
    citationId: string;
    waterMlPerPrompt: WaterCoefficients;
    electricityKWhPerPrompt: number;
    uncertaintyFactor: number; // e.g. 0.3 for +/- 30% range
  };
  // Corporate provider-disclosed sustainability estimates (e.g. Microsoft / Google averages)
  provider: {
    sourceName: string;
    citationId: string;
    waterMlPerPrompt: WaterCoefficients;
    electricityKWhPerPrompt: number;
    uncertaintyFactor: number;
  };
  // Grid carbon intensity in grams CO2 equivalent per kWh
  carbonGramsPerKWh: {
    average: number;
    coalHeavy: number;
    clean: number;
  };
  // Multipliers for model sizes relative to standard flagship (GPT-4o / Claude 3.5 Sonnet)
  modelMultipliers: Record<ModelTier, number>;
}

export interface CalculatorInputs {
  promptsPerDay: number;
  modelTier: ModelTier;
  gridType: GridType;
  dataSource: DataSourceMode;
  timeHorizon: TimeHorizon;
  unitSystem: UnitSystem;
}

export interface CalculatorOutputs {
  promptsCount: number;
  // Water
  waterDirectLiters: number;
  waterIndirectLiters: number;
  waterTotalLiters: number;
  waterTotalGallons: number;
  // Energy
  electricityKWh: number;
  // Carbon
  carbonKgCO2e: number;
  // Scientific estimation range (estimates are not actual sensor measurements)
  ranges: {
    waterLitersMin: number;
    waterLitersMax: number;
    carbonKgMin: number;
    carbonKgMax: number;
  };
  // Real-world physical equivalence anchors
  equivalents: {
    bottles500ml: number;
    smartphonesCharged: number;
    drivingMilesEquivalent: number;
    bathtubPercentage: number;
    containerClass: ContainerTier;
    containerMultiplier: number;
    containerLabel: string;
  };
  // Source metadata
  sourceMetadata: {
    sourceName: string;
    citationId: string;
    isEstimate: true;
    disclaimer: string;
  };
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  year: number;
  doiOrUrl: string;
  category: "water" | "energy" | "carbon" | "creativity" | "infrastructure";
  keyFinding: string;
  methodologySummary: string;
  limitationsDisclosed: string;
  verified: boolean;
}
