import { ContainerTier } from "@/lib/calculator/types";

export interface ContainerThreshold {
  tier: ContainerTier;
  maxLitersAnnual: number;
  name: string;
  unitEquivalent: string;
  description: string;
}

export const CONTAINER_THRESHOLDS: ContainerThreshold[] = [
  {
    tier: "droplet",
    maxLitersAnnual: 40,
    name: "Freshwater Droplet",
    unitEquivalent: "Drops of Water",
    description: "Low-frequency usage equivalent to discrete drops and minor municipal withdrawals.",
  },
  {
    tier: "bottle",
    maxLitersAnnual: 120,
    name: "500 mL Reusable Bottle",
    unitEquivalent: "Standard 500 mL Water Bottles",
    description: "Sustained daily queries equivalent to hundreds of standard drinking water bottles.",
  },
  {
    tier: "jug",
    maxLitersAnnual: 500,
    name: "5-Gallon Office Water Cooler Jug",
    unitEquivalent: "19-Liter Commercial Water Cooler Jugs",
    description: "Professional knowledge-worker prompt frequency evaporating dozens of heavy cooler jugs.",
  },
  {
    tier: "bathtub",
    maxLitersAnnual: 2500,
    name: "Residential Bathtub (~150 L)",
    unitEquivalent: "Full Household Bathtubs",
    description: "Heavy coding or iterative enterprise workflows evaporating entire bathtubs of water.",
  },
  {
    tier: "cistern",
    maxLitersAnnual: Infinity,
    name: "Municipal Water Cistern",
    unitEquivalent: "Municipal Tankers / Storage Cisterns",
    description: "Large-scale continuous enterprise usage with severe industrial-scale freshwater footprints.",
  },
];
