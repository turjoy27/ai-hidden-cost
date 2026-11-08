"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/common/Navbar";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ImpactMetricsGrid } from "@/components/environmental/ImpactMetricsGrid";
import { DirectVsIndirectWater } from "@/components/environmental/DirectVsIndirectWater";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { CreativityStage } from "@/components/creativity/CreativityStage";
import { ResearchArchive } from "@/components/research/ResearchArchive";
import { CitationPill } from "@/components/common/CitationPill";
import { UnitSystem } from "@/lib/calculator/types";
import {
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

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

  return (
    <div className="bg-void text-slate-100 min-h-screen relative selection:bg-cyan selection:text-slate-950 font-sans">
      {/* Persistent Floating Global Navigation */}
      <Navbar />

      {/* Main Single-Page Narrative Composition */}
      <main className="w-full">
        {/* 1. Cinematic Earth Hero Stage */}
        <HeroIntro />

        {/* 2. Section 1: The Physical Toll (Biophysical Footprint) */}
        <section
          id="environmental-impact"
          className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06] space-y-16"
        >
          <SectionHeader
            eyebrow="Section 01 // Biophysical Footprint"
            title="The Physical Weight of Pure Compute"
            description="Behind the seamless interface of an AI conversation lies a planetary cooling apparatus. Every inference cycle rejects thermal energy into municipal water and power grids."
          />

          {/* Metric Triad Cards (Water, Electricity, Carbon) */}
          <ImpactMetricsGrid unitSystem={unitSystem} />

          {/* Direct vs. Indirect Water Consumption Explainer */}
          <DirectVsIndirectWater />
        </section>

        {/* 3. Section 2: Personal Environmental Calculator */}
        <section
          id="calculator"
          className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06] space-y-12"
        >
          <SectionHeader
            eyebrow="Section 02 // Personal Impact Simulator"
            title="Calculate Your Material Footprint"
            description="Translate your everyday interactions with ChatGPT, Claude, and Gemini into tangible liters of potable water, kilowatt-hours, and real-world containers."
          />

          {/* Complete Interactive Calculator Component */}
          <CalculatorContainer />
        </section>

        {/* 4. Section 3: Human Creativity Documentary Stage */}
        <CreativityStage />

        {/* 5. Section 4: Verified Research Archive */}
        <section
          id="research"
          className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06] space-y-8"
        >
          <SectionHeader
            eyebrow="Section 04 // Scientific Compendium"
            title="Verified Academic Sources & Methodology"
            description="Zero fabricated figures. Every data point on this website links directly to peer-reviewed academic literature or verified corporate disclosures."
          />

          <ResearchArchive />
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-[#02050e] text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan" />
            <span>Academic Rigor & Privacy Guarantee: Zero telemetry, zero tracking cookies.</span>
          </div>
          <div>
            <span>AI: The Hidden Cost — An Educational Investigation</span>
          </div>
          <a
            href="#hero"
            className="text-slate-400 hover:text-cyan transition-colors"
          >
            Return to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
