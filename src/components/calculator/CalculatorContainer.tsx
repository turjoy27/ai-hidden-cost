"use client";

import React, { useState, useEffect } from "react";
import {
  CalculatorInputs,
  ModelTier,
  GridType,
  DataSourceMode,
  TimeHorizon,
  UnitSystem,
} from "@/lib/calculator/types";
import { calculateEnvironmentalImpact } from "@/lib/calculator/engine";
import { formatVolume, formatCarbon, formatEnergy, convertDistance } from "@/lib/calculator/units";
import { VolumeVisualizer } from "./VolumeVisualizer";
import { CitationPill } from "@/components/common/CitationPill";
import {
  Droplets,
  Zap,
  CloudRain,
  Settings,
  HelpCircle,
  RotateCcw,
  Smartphone,
  Car,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";

interface PresetOption {
  label: string;
  prompts: number;
  description: string;
}

const PRESETS: PresetOption[] = [
  { label: "Casual User", prompts: 5, description: "Light web queries & writing assistance" },
  { label: "Knowledge Worker", prompts: 25, description: "Research, email drafts, document synthesis" },
  { label: "Software Engineer", prompts: 80, description: "Code generation, iterative debugging, testing" },
  { label: "Team / Agency", prompts: 250, description: "Multi-seat collaborative AI workflow" },
];

export const CalculatorContainer: React.FC = () => {
  const [promptsPerDay, setPromptsPerDay] = useState<number>(25);
  const [modelTier, setModelTier] = useState<ModelTier>("standard");
  const [gridType, setGridType] = useState<GridType>("average");
  const [dataSource, setDataSource] = useState<DataSourceMode>("research");
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>("year");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);
  const [showMethodology, setShowMethodology] = useState<boolean>(false);

  // Listen for global unit toggle from Navbar
  useEffect(() => {
    const handleUnitChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ unitSystem: UnitSystem }>;
      if (customEvent.detail?.unitSystem) {
        setUnitSystem(customEvent.detail.unitSystem);
      }
    };

    window.addEventListener("unit-change", handleUnitChange);
    return () => window.removeEventListener("unit-change", handleUnitChange);
  }, []);

  const calculatorInputs: CalculatorInputs = {
    promptsPerDay,
    modelTier,
    gridType,
    dataSource,
    timeHorizon,
    unitSystem,
  };

  const results = calculateEnvironmentalImpact(calculatorInputs);

  const resetDefaults = () => {
    setPromptsPerDay(25);
    setModelTier("standard");
    setGridType("average");
    setDataSource("research");
    setTimeHorizon("year");
  };

  const drivingMiles = results.equivalents.drivingMilesEquivalent;
  const convertedDistance = convertDistance(drivingMiles, unitSystem);

  return (
    <div className="w-full space-y-8">
      {/* Top Banner: Scientific Disclaimer */}
      <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 flex items-start gap-3 text-xs text-slate-300">
        <ShieldAlert className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Scientific Estimation Model:</strong> Calculations represent peer-reviewed empirical life-cycle modeling (NREL & UC Riverside benchmarks). Figures are statistical estimates based on data center Power Usage Effectiveness (PUE) and Water Usage Effectiveness (WUE), not direct device telemetry.
        </p>
      </div>

      {/* Main Grid: Controls vs Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Inputs & Adjustments (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Prompt Slider Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="prompt-slider" className="text-sm font-medium text-slate-200 block">
                  Daily AI Prompts
                </label>
                <span className="text-xs text-slate-400">Queries to ChatGPT, Claude, Gemini, Copilot</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={promptsPerDay}
                  onChange={(e) => setPromptsPerDay(Math.max(0, parseInt(e.target.value) || 0))}
                  aria-label="Direct prompt number input"
                  className="w-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan font-mono font-bold text-right text-lg focus:outline-none focus:border-cyan"
                />
                <span className="text-xs font-mono text-slate-500">/ day</span>
              </div>
            </div>

            {/* Accessible Range Slider */}
            <div className="space-y-2">
              <input
                id="prompt-slider"
                type="range"
                min="0"
                max="300"
                step="1"
                value={promptsPerDay}
                onChange={(e) => setPromptsPerDay(parseInt(e.target.value))}
                aria-valuenow={promptsPerDay}
                aria-valuemin={0}
                aria-valuemax={300}
                aria-label="Daily AI Prompts Slider"
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0 (None)</span>
                <span>25 (Average)</span>
                <span>80 (Developer)</span>
                <span>300 (Agency)</span>
              </div>
            </div>

            {/* Lifestyle Preset Buttons */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Quick Persona Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESETS.map((preset) => {
                  const isSelected = promptsPerDay === preset.prompts;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => setPromptsPerDay(preset.prompts)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-left border ${
                        isSelected
                          ? "bg-cyan/15 border-cyan text-cyan font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <div className="truncate font-sans font-medium">{preset.label}</div>
                      <div className="text-[10px] opacity-75">{preset.prompts} prompts/d</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Horizon Switcher */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Projection Timeframe:
              </span>
              <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-slate-800">
                {(["day", "month", "year"] as TimeHorizon[]).map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() => setTimeHorizon(horizon)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      timeHorizon === horizon
                        ? "bg-cyan text-slate-950 font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {horizon === "day" ? "Daily" : horizon === "month" ? "Monthly" : "Annual"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Adjustable Assumptions Accordion */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
            <button
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="w-full p-5 flex items-center justify-between text-left text-sm font-sans font-medium text-slate-200 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan" />
                <span>Adjust Scientific Assumptions & Model Multipliers</span>
              </div>
              {showAssumptions ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showAssumptions && (
              <div className="p-6 pt-2 space-y-5 border-t border-white/5 text-xs font-mono">
                {/* Data Baseline Mode */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-300">Baseline Data Source:</span>
                    <CitationPill citationId={results.sourceMetadata.citationId} label="Inspect Citation" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDataSource("research")}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        dataSource === "research"
                          ? "bg-cyan/15 border-cyan text-cyan font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>Academic Research</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Li et al. / de Vries (25 mL / query)</div>
                    </button>
                    <button
                      onClick={() => setDataSource("provider")}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        dataSource === "provider"
                          ? "bg-cyan/15 border-cyan text-cyan font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>Provider Disclosures</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Microsoft / Google (16 mL / query)</div>
                    </button>
                  </div>
                </div>

                {/* Model Tier */}
                <div>
                  <span className="text-slate-300 block mb-1.5">AI Model Tier / Reasoning Overhead:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "lightweight", label: "Lightweight (0.35x)", sub: "Flash / 8B" },
                        { id: "standard", label: "Standard (1.0x)", sub: "GPT-4o / Sonnet" },
                        { id: "reasoning", label: "Reasoning (2.8x)", sub: "o1 / Thinking" },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setModelTier(m.id)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          modelTier === m.id
                            ? "bg-cyan/15 border-cyan text-cyan font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div>{m.label}</div>
                        <div className="text-[10px] text-slate-500">{m.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional Grid Cleanliness */}
                <div>
                  <span className="text-slate-300 block mb-1.5">Regional Utility Grid Carbon Intensity:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "clean", label: "Clean / Hydro", sub: "50 g CO₂/kWh" },
                        { id: "average", label: "US Average", sub: "385 g CO₂/kWh" },
                        { id: "coalHeavy", label: "Coal Heavy", sub: "750 g CO₂/kWh" },
                      ] as const
                    ).map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGridType(g.id)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          gridType === g.id
                            ? "bg-cyan/15 border-cyan text-cyan font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div>{g.label}</div>
                        <div className="text-[10px] text-slate-500">{g.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Defaults Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={resetDefaults}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Assumptions to Default</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Container Morphing Visualizer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <VolumeVisualizer
            selectedVolumeLiters={results.waterTotalLiters}
            annualWaterLiters={results.waterTotalLiters * (timeHorizon === "year" ? 1 : timeHorizon === "month" ? 12 : 365)}
            timeHorizon={timeHorizon}
            containerClass={results.equivalents.containerClass}
            containerMultiplier={results.equivalents.containerMultiplier}
            containerLabel={results.equivalents.containerLabel}
            unitSystem={unitSystem}
          />

          {/* Quick Stats Banner */}
          <div className="p-4 rounded-2xl bg-[#071022] border border-white/5 text-xs font-mono space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Selected Baseline:</span>
              <span className="text-slate-200">{results.sourceMetadata.sourceName.split("(")[0]}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimation Confidence Range:</span>
              <span className="text-cyan font-bold">
                {formatVolume(results.ranges.waterLitersMin, unitSystem)} – {formatVolume(results.ranges.waterLitersMax, unitSystem)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Output Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Water Output Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan/25 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-cyan/15 border border-cyan/30 text-cyan flex items-center justify-center mb-3">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-cyan uppercase tracking-wider">
            Total Water Consumption ({timeHorizon})
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            {formatVolume(results.waterTotalLiters, unitSystem)}
          </div>
          <div className="text-xs font-mono text-slate-400 pt-1 space-y-1">
            <div className="flex justify-between">
              <span>Direct Cooling (On-site):</span>
              <span className="text-slate-200">{formatVolume(results.waterDirectLiters, unitSystem)}</span>
            </div>
            <div className="flex justify-between">
              <span>Indirect Power (Grid):</span>
              <span className="text-slate-200">{formatVolume(results.waterIndirectLiters, unitSystem)}</span>
            </div>
          </div>
        </div>

        {/* Electricity Output Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/25 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Grid Electricity Demand ({timeHorizon})
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            {formatEnergy(results.electricityKWh)}
          </div>
          <p className="text-xs text-slate-400 pt-1 leading-relaxed">
            Enough electricity to charge{" "}
            <strong className="text-amber-300 font-mono">
              {results.equivalents.smartphonesCharged.toLocaleString()} smartphones
            </strong>{" "}
            from 0% to 100%.
          </p>
        </div>

        {/* Carbon Footprint Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/25 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3">
            <CloudRain className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
            Greenhouse Emissions ({timeHorizon})
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            {formatCarbon(results.carbonKgCO2e, unitSystem)}
          </div>
          <p className="text-xs text-slate-400 pt-1 leading-relaxed">
            Equivalent emissions to driving a gasoline car{" "}
            <strong className="text-sky-300 font-mono">
              {convertedDistance.value.toFixed(1)} {convertedDistance.unit}
            </strong>.
          </p>
        </div>
      </div>

      {/* Methodology & Formula Disclosure Drawer */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full flex items-center justify-between text-left text-xs font-mono text-slate-400 hover:text-cyan transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan" />
            <span className="uppercase tracking-wider">How is this calculated? (Full Methodology & Formulas)</span>
          </div>
          {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showMethodology && (
          <div className="pt-4 mt-3 border-t border-white/5 space-y-4 text-xs font-sans text-slate-300 leading-relaxed">
            <div>
              <strong className="text-white font-mono block mb-1">1. Water Consumption Equation:</strong>
              <code className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 block font-mono text-[11px] overflow-x-auto">
                Total Water (L) = (Daily Prompts × Time Multiplier × (W_direct + W_indirect) × Model Multiplier) / 1000
              </code>
              <p className="text-slate-400 text-[11px] mt-1">
                Where direct cooling reflects on-site cooling tower evaporative loss (10 mL/query in Li et al., 2023) and indirect cooling reflects thermoelectric power generation cooling (15 mL/query).
              </p>
            </div>

            <div>
              <strong className="text-white font-mono block mb-1">2. Electricity & Carbon Equation:</strong>
              <code className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 block font-mono text-[11px] overflow-x-auto">
                Carbon (kg CO₂e) = (Prompts × 0.003 kWh × Model Multiplier × Grid Intensity g/kWh) / 1000
              </code>
              <p className="text-slate-400 text-[11px] mt-1">
                Grid factors reference US EPA eGRID standards (US Average: 385 g/kWh, Coal-heavy: 750 g/kWh, Clean: 50 g/kWh).
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Peer-reviewed citations: Li et al. (2023), de Vries (2023), Luccioni et al. (2023)
              </span>
              <CitationPill citationId="li-2023-thirsty" label="View Full Paper in Section 4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
