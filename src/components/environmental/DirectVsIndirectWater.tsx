"use client";

import React, { useState } from "react";
import { CitationPill } from "@/components/common/CitationPill";
import { Droplets, Zap, Building2, Flame, ArrowRight, ShieldCheck } from "lucide-react";

export const DirectVsIndirectWater: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"both" | "direct" | "indirect">("both");

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
      
      {/* Header with Explanatory Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan mb-2">
            <Droplets className="w-3.5 h-3.5 animate-pulse" />
            <span>Water Accounting Taxonomy (NREL / ISO 14046)</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
            Direct vs. Indirect Water Consumption
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
            When an AI data center runs, water is consumed at two distinct geographic locations: on-site inside evaporative cooling towers, and off-site at thermoelectric power plants.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "both" ? "bg-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Combined View
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "direct" ? "bg-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Direct Only
          </button>
          <button
            onClick={() => setActiveTab("indirect")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "indirect" ? "bg-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Indirect Only
          </button>
        </div>
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Direct On-Site Cooling */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-8 border transition-all ${
            activeTab === "indirect" ? "opacity-30" : "opacity-100"
          } ${activeTab === "direct" ? "border-cyan/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]" : "border-cyan/20"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan font-mono text-xs font-bold">
              ~40% of Total Footprint
            </span>
          </div>

          <h4 className="text-xl font-serif text-white mb-2">
            Direct On-Site Cooling Towers
          </h4>

          <div className="text-2xl font-mono font-bold text-cyan mb-3">
            ~10 mL <span className="text-xs text-slate-400 font-normal">per standard query</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            High-density AI server clusters (e.g. NVIDIA H100 racks generating up to 10.2 kW of thermal energy per chassis) reject heat through on-site evaporative cooling towers. Municipal tap water is sprayed over heat exchangers and evaporated into the atmosphere to keep silicon below 85°C.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Primary Mechanism:</span>
              <span className="text-slate-200">Evaporative Heat Rejection</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Water Quality Used:</span>
              <span className="text-slate-200">Potable Tap / Municipal</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Corporate Metric:</span>
              <span className="text-slate-200">WUE (Water Usage Effectiveness)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <CitationPill citationId="li-2023-thirsty" label="Li et al., UC Riverside 2023" />
            <span className="text-[10px] font-mono text-slate-500">On-site measurement</span>
          </div>
        </div>

        {/* Card 2: Indirect Off-Site Grid Cooling */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-8 border transition-all ${
            activeTab === "direct" ? "opacity-30" : "opacity-100"
          } ${activeTab === "indirect" ? "border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]" : "border-amber-500/20"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              ~60% of Total Footprint
            </span>
          </div>

          <h4 className="text-xl font-serif text-white mb-2">
            Indirect Off-Site Utility Cooling
          </h4>

          <div className="text-2xl font-mono font-bold text-amber-300 mb-3">
            ~15 mL <span className="text-xs text-slate-400 font-normal">per standard query</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            The electricity supplying the data center comes from utility power plants (nuclear, coal, natural gas, combined cycle). These thermal power plants require immense water withdrawal for steam condenser cooling, evaporating freshwater miles away from the server facility.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Primary Mechanism:</span>
              <span className="text-slate-200">Thermoelectric Condensation</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Location:</span>
              <span className="text-slate-200">Local Utility Power Plant</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Reporting Scope:</span>
              <span className="text-slate-200">Scope 2 Indirect Footprint</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <CitationPill citationId="devries-2023-energy" label="de Vries, Joule 2023" />
            <span className="text-[10px] font-mono text-slate-500">Grid generation factor</span>
          </div>
        </div>

      </div>

      {/* Sourced Comparison Banner: Provider Disclosures vs Academic Research */}
      <div className="p-5 rounded-2xl bg-[#061226] border border-cyan/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan">
          <ShieldCheck className="w-4 h-4" />
          <span className="uppercase tracking-wider font-bold">Scientific Nuance: Academic Studies vs. Corporate Disclosures</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          While corporate sustainability disclosures (Microsoft 2024, Google 2024) report fleet-wide cloud averages of ~0.30 to 0.49 L of direct water per kWh, peer-reviewed engineering analyses (Li et al., 2023) observe that dedicated AI accelerator clusters operate at significantly higher server rack power densities (up to 40 kW/rack vs 8 kW standard cloud), necessitating elevated evaporative cooling intensity during peak ambient heat.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <CitationPill citationId="li-2023-thirsty" label="Li et al., 2023" />
          <CitationPill citationId="msft-google-2024-reports" label="Microsoft & Google 2024 Reports" />
        </div>
      </div>

    </div>
  );
};
