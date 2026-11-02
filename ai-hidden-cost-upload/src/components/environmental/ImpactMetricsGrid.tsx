"use client";

import React from "react";
import { CitationPill } from "@/components/common/CitationPill";
import { Droplets, Zap, CloudRain, Smartphone, Car, ExternalLink } from "lucide-react";
import { UnitSystem } from "@/lib/calculator/types";
import { formatVolume, formatCarbon, formatEnergy } from "@/lib/calculator/units";

interface ImpactMetricsGridProps {
  unitSystem: UnitSystem;
}

export const ImpactMetricsGrid: React.FC<ImpactMetricsGridProps> = ({ unitSystem }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Water Evaporation */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan/25 hover:border-cyan/50 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan group-hover:scale-105 transition-transform">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan">
                Per 20–50 Prompts
              </span>
            </div>

            <div className="text-xs font-mono text-cyan tracking-wider uppercase mb-1">
              Water Evaporation
            </div>

            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight mb-1">
              {unitSystem === "metric" ? "500 mL" : "16.9 fl oz"}
            </div>

            <div className="text-[11px] font-mono text-slate-500 mb-3">
              Range: {unitSystem === "metric" ? "350 mL – 750 mL" : "11.8 – 25.4 fl oz"}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              A standard 20–50 query conversation with a flagship LLM evaporates approximately one standard plastic water bottle of potable municipal water between cooling towers and utility power plants.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <CitationPill citationId="li-2023-thirsty" label="Li et al., UC Riverside 2023" />
            <span className="text-[10px] font-mono text-slate-500">Direct + Indirect</span>
          </div>
        </div>

        {/* Metric 2: Electricity Demand */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/25 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                ~10x Google Search
              </span>
            </div>

            <div className="text-xs font-mono text-amber-400 tracking-wider uppercase mb-1">
              Electricity Demand
            </div>

            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight mb-1">
              0.003 <span className="text-xl text-slate-400 font-normal">kWh</span>
            </div>

            <div className="text-[11px] font-mono text-slate-500 mb-3">
              Range: 0.0022 – 0.008 kWh / query
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              An average LLM prompt consumes approximately 3 Watt-hours of electricity—nearly 10 times the energy of a conventional search engine query (approx 0.0003 kWh). Multi-step reasoning models consume up to 2.8x more.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <CitationPill citationId="devries-2023-energy" label="de Vries, Joule 2023" />
            <span className="text-[10px] font-mono text-slate-500">Inference IT Power</span>
          </div>
        </div>

        {/* Metric 3: Carbon Footprint */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/25 hover:border-sky-500/50 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <CloudRain className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
                EPA Grid Standard
              </span>
            </div>

            <div className="text-xs font-mono text-sky-400 tracking-wider uppercase mb-1">
              Greenhouse Carbon
            </div>

            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight mb-1">
              1.5 – 4.3 <span className="text-xl text-slate-400 font-normal">g</span>
            </div>

            <div className="text-[11px] font-mono text-slate-500 mb-3">
              CO₂ equivalent per standard prompt
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Carbon intensity depends directly on local power generation. A prompt executed in a fossil-heavy grid (e.g. Midwest US or Australia) produces over 10 times the emissions of one executed in a hydroelectric or nuclear grid.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <CitationPill citationId="luccioni-2023-bloom" label="Luccioni et al., 2023" />
            <span className="text-[10px] font-mono text-slate-500">Scope 2 Emissions</span>
          </div>
        </div>

      </div>

      {/* Relatable Physical Equivalencies Row */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-cyan" />
          <span>1 Hour of Continuous AI Interaction ≈ <strong>Charging a Smartphone 3–4×</strong></span>
        </div>
        <div className="hidden md:block w-px h-5 bg-white/10" />
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-amber-400" />
          <span>100 AI Queries ≈ <strong>Driving a Gasoline Passenger Car ~0.25 Miles</strong></span>
        </div>
      </div>
    </div>
  );
};
