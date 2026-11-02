"use client";

import React from "react";
import { ContainerTier, UnitSystem } from "@/lib/calculator/types";
import { formatVolume } from "@/lib/calculator/units";
import { Droplets, Info } from "lucide-react";

interface VolumeVisualizerProps {
  selectedVolumeLiters: number;
  annualWaterLiters: number;
  timeHorizon: "day" | "month" | "year";
  containerClass: ContainerTier;
  containerMultiplier: number;
  containerLabel: string;
  unitSystem: UnitSystem;
}

export const VolumeVisualizer: React.FC<VolumeVisualizerProps> = ({
  selectedVolumeLiters,
  annualWaterLiters,
  timeHorizon,
  containerClass,
  containerMultiplier,
  containerLabel,
  unitSystem,
}) => {
  // Calculate relative fill percentage within current tier for dynamic wave height
  const getFillPercent = (): number => {
    if (annualWaterLiters <= 0) return 0;
    switch (containerClass) {
      case "droplet":
        return Math.min(100, Math.max(25, (annualWaterLiters / 40) * 100));
      case "bottle":
        return Math.min(100, Math.max(30, (annualWaterLiters / 120) * 100));
      case "jug":
        return Math.min(100, Math.max(35, (annualWaterLiters / 500) * 100));
      case "bathtub":
        return Math.min(100, Math.max(40, (annualWaterLiters / 2500) * 100));
      case "cistern":
        return 90;
      default:
        return 65;
    }
  };

  const fillPercent = getFillPercent();
  const horizonLabel = timeHorizon === "day" ? "Daily Total" : timeHorizon === "month" ? "Monthly Total" : "Annual Total";

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[380px] border border-cyan/20 relative overflow-hidden group">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Visualizer Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-4 z-10">
        <div className="inline-flex items-center gap-1.5 text-cyan">
          <Droplets className="w-3.5 h-3.5 animate-pulse" />
          <span className="uppercase tracking-wider">Dynamic Volume Metaphor</span>
        </div>
        <span className="text-slate-400">
          {horizonLabel}: <strong className="text-white font-bold">{formatVolume(selectedVolumeLiters, unitSystem, 1)}</strong>
        </span>
      </div>

      {/* Dynamic Container SVG Stage */}
      <div className="relative w-48 h-56 flex items-center justify-center my-2 z-10">
        {/* Tier 1: Single Freshwater Droplet */}
        {containerClass === "droplet" && (
          <div className="relative flex flex-col items-center justify-center animate-in zoom-in-90 duration-500">
            <svg viewBox="0 0 100 130" className="w-32 h-44 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]">
              <defs>
                <linearGradient id="dropletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M50 15 C50 15 22 58 22 86 C22 102 34 115 50 115 C66 115 78 102 78 86 C78 58 50 15 50 15 Z"
                fill="url(#dropletGrad)"
              />
              <ellipse cx="40" cy="75" rx="6" ry="14" fill="#ffffff" opacity="0.6" />
            </svg>
            <div className="mt-2 text-xs font-mono text-cyan tracking-wider">Freshwater Droplet</div>
          </div>
        )}

        {/* Tier 2: 500 mL Reusable Bottle */}
        {containerClass === "bottle" && (
          <div className="relative flex flex-col items-center justify-center animate-in zoom-in-90 duration-500">
            <svg viewBox="0 0 100 160" className="w-28 h-48 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <defs>
                <clipPath id="bottleClip">
                  <path d="M38 12 H62 V26 H68 C72 26 76 34 76 44 L78 142 C78 148 72 152 66 152 H34 C28 152 22 148 22 142 L24 44 C24 34 28 26 32 26 H38 Z" />
                </clipPath>
              </defs>
              {/* Bottle Cap & Neck */}
              <rect x="42" y="4" width="16" height="10" rx="2" fill="#0284c7" />
              {/* Outer Shell Glass */}
              <path
                d="M38 12 H62 V26 H68 C72 26 76 34 76 44 L78 142 C78 148 72 152 66 152 H34 C28 152 22 148 22 142 L24 44 C24 34 28 26 32 26 H38 Z"
                fill="#0b1b36"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              {/* Animated Liquid Fill */}
              <g clipPath="url(#bottleClip)">
                <rect
                  x="20"
                  y={160 - (fillPercent * 1.3)}
                  width="60"
                  height="160"
                  fill="#0284c7"
                  opacity="0.85"
                  className="transition-all duration-700 ease-out"
                />
                {/* Surface Reflection */}
                <ellipse cx="50" cy={160 - (fillPercent * 1.3)} rx="26" ry="4" fill="#38bdf8" opacity="0.9" />
              </g>
              {/* Glass Specular Glare */}
              <line x1="28" y1="46" x2="28" y2="136" stroke="#ffffff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            </svg>
            <div className="mt-2 text-xs font-mono text-cyan tracking-wider">500 mL Reusable Bottle</div>
          </div>
        )}

        {/* Tier 3: 5-Gallon Office Water Cooler Jug */}
        {containerClass === "jug" && (
          <div className="relative flex flex-col items-center justify-center animate-in zoom-in-90 duration-500">
            <svg viewBox="0 0 110 140" className="w-36 h-48 filter drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              <defs>
                <clipPath id="jugClip">
                  <path d="M 44 8 H 66 V 20 H 76 C 84 20 88 28 88 38 L 88 122 C 88 132 80 136 70 136 H 40 C 30 136 22 132 22 122 L 22 38 C 22 28 26 20 34 20 H 44 Z" />
                </clipPath>
              </defs>
              {/* Spout Cap */}
              <rect x="46" y="2" width="18" height="8" rx="2" fill="#0284c7" />
              {/* Jug Glass Outer Shell */}
              <path
                d="M 44 8 H 66 V 20 H 76 C 84 20 88 28 88 38 L 88 122 C 88 132 80 136 70 136 H 40 C 30 136 22 132 22 122 L 22 38 C 22 28 26 20 34 20 H 44 Z"
                fill="#081833"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              {/* Internal Liquid Fill */}
              <g clipPath="url(#jugClip)">
                <rect
                  x="20"
                  y={136 - (fillPercent * 1.15)}
                  width="70"
                  height="140"
                  fill="#0284c7"
                  opacity="0.85"
                  className="transition-all duration-700 ease-out"
                />
                <ellipse cx="55" cy={136 - (fillPercent * 1.15)} rx="32" ry="5" fill="#38bdf8" opacity="0.9" />
              </g>
              {/* Ribbing lines */}
              <line x1="28" y1="55" x2="82" y2="55" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
              <line x1="28" y1="85" x2="82" y2="85" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
              <line x1="28" y1="110" x2="82" y2="110" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
            </svg>
            <div className="mt-2 text-xs font-mono text-cyan tracking-wider">5-Gal (19L) Cooler Jug</div>
          </div>
        )}

        {/* Tier 4: Residential Bathtub */}
        {containerClass === "bathtub" && (
          <div className="relative flex flex-col items-center justify-center animate-in zoom-in-90 duration-500">
            <svg viewBox="0 0 160 110" className="w-48 h-36 filter drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
              <defs>
                <clipPath id="tubClip">
                  <path d="M 16 35 C 16 28 144 28 144 35 L 134 88 C 132 96 28 96 26 88 Z" />
                </clipPath>
              </defs>
              {/* Bathtub Rim */}
              <ellipse cx="80" cy="35" rx="66" ry="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Bathtub Body */}
              <path
                d="M 14 35 L 26 88 C 28 98 132 98 134 88 L 146 35"
                fill="#0b1329"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
              {/* Animated Tub Liquid */}
              <g clipPath="url(#tubClip)">
                <rect
                  x="15"
                  y={96 - (fillPercent * 0.65)}
                  width="130"
                  height="80"
                  fill="#0284c7"
                  opacity="0.85"
                  className="transition-all duration-700 ease-out"
                />
                <ellipse cx="80" cy={96 - (fillPercent * 0.65)} rx="55" ry="7" fill="#38bdf8" opacity="0.9" />
              </g>
              {/* Bathtub Feet */}
              <circle cx="35" cy="98" r="4.5" fill="#64748b" />
              <circle cx="125" cy="98" r="4.5" fill="#64748b" />
            </svg>
            <div className="mt-2 text-xs font-mono text-amber-400 tracking-wider">Household Bathtub (~150 L)</div>
          </div>
        )}

        {/* Tier 5: Municipal Storage Cistern */}
        {containerClass === "cistern" && (
          <div className="relative flex flex-col items-center justify-center animate-in zoom-in-90 duration-500">
            <svg viewBox="0 0 150 130" className="w-44 h-40 filter drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
              <defs>
                <clipPath id="cisternClip">
                  <path d="M 20 30 H 130 V 105 C 130 115 20 115 20 105 Z" />
                </clipPath>
              </defs>
              {/* Tank Dome */}
              <ellipse cx="75" cy="30" rx="55" ry="14" fill="#1e293b" stroke="#ef4444" strokeWidth="2.5" />
              <rect x="20" y="30" width="110" height="75" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
              <ellipse cx="75" cy="105" rx="55" ry="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
              {/* Liquid */}
              <g clipPath="url(#cisternClip)">
                <rect x="20" y="45" width="110" height="70" fill="#0284c7" opacity="0.8" />
              </g>
              {/* Structural Ladder */}
              <line x1="35" y1="30" x2="35" y2="105" stroke="#64748b" strokeWidth="1.5" />
              <line x1="45" y1="30" x2="45" y2="105" stroke="#64748b" strokeWidth="1.5" />
              <line x1="35" y1="45" x2="45" y2="45" stroke="#64748b" strokeWidth="1.5" />
              <line x1="35" y1="65" x2="45" y2="65" stroke="#64748b" strokeWidth="1.5" />
              <line x1="35" y1="85" x2="45" y2="85" stroke="#64748b" strokeWidth="1.5" />
            </svg>
            <div className="mt-2 text-xs font-mono text-red-400 tracking-wider">Industrial Storage Cistern</div>
          </div>
        )}
      </div>

      {/* Visualizer Footer Callout */}
      <div className="w-full text-center mt-3 z-10">
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200">
          {containerLabel}
        </div>
      </div>
    </div>
  );
};
