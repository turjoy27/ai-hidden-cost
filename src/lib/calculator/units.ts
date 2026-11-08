/**
 * AI — The Hidden Cost: Unit Conversion & Formatting Utilities
 */

import { UnitSystem } from "./types";

// Conversion constants (NIST standards)
export const LITERS_TO_GALLONS = 0.26417205235815;
export const GALLONS_TO_LITERS = 3.785411784;
export const KG_TO_POUNDS = 2.20462262185;
export const MILES_TO_KM = 1.609344;
export const KM_TO_MILES = 0.621371192;

/**
 * Converts volume in Liters to target unit system.
 */
export function convertVolume(liters: number, target: UnitSystem): { value: number; unit: string } {
  if (target === "imperial") {
    return {
      value: liters * LITERS_TO_GALLONS,
      unit: "gal",
    };
  }
  return {
    value: liters,
    unit: "L",
  };
}

/**
 * Converts mass in Kilograms to target unit system.
 */
export function convertMass(kg: number, target: UnitSystem): { value: number; unit: string } {
  if (target === "imperial") {
    return {
      value: kg * KG_TO_POUNDS,
      unit: "lbs",
    };
  }
  return {
    value: kg,
    unit: "kg",
  };
}

/**
 * Converts distance in Miles to target unit system.
 */
export function convertDistance(miles: number, target: UnitSystem): { value: number; unit: string } {
  if (target === "metric") {
    return {
      value: miles * MILES_TO_KM,
      unit: "km",
    };
  }
  return {
    value: miles,
    unit: "mi",
  };
}

/**
 * Formats a volume number cleanly with unit.
 */
export function formatVolume(liters: number, target: UnitSystem, decimals: number = 1): string {
  const { value, unit } = convertVolume(liters, target);
  return `${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${unit}`;
}

/**
 * Formats carbon emissions with unit.
 */
export function formatCarbon(kg: number, target: UnitSystem, decimals: number = 2): string {
  const { value, unit } = convertMass(kg, target);
  return `${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${unit} CO₂e`;
}

/**
 * Formats energy in kilowatt-hours.
 */
export function formatEnergy(kwh: number, decimals: number = 2): string {
  return `${kwh.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} kWh`;
}
