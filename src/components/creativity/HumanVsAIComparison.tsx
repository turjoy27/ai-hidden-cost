"use client";

import React, { useState } from "react";
import { IDEA_COMPARISONS, IdeaComparisonScenario } from "@/data/creativity-data";
import { CitationPill } from "@/components/common/CitationPill";
import { User, Cpu, Sparkles, Compass, CheckCircle2, AlertTriangle } from "lucide-react";

export const HumanVsAIComparison: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(IDEA_COMPARISONS[0].id);

  const currentScenario =
    IDEA_COMPARISONS.find((s) => s.id === selectedScenarioId) || IDEA_COMPARISONS[0];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Psychometric Exhibits</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
          Human vs. Algorithmic Ideation in Practice
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
          Examine side-by-side responses across established divergent thinking tasks. Observe how human answers draw from bodily and cultural memory, whereas AI answers optimize for central statistical probability.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {IDEA_COMPARISONS.map((scenario) => {
          const isSelected = scenario.id === currentScenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all text-left border ${
                isSelected
                  ? "bg-cyan/15 border-cyan text-cyan font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="text-[10px] text-slate-500 uppercase">{scenario.taskType}</div>
              <div className="font-sans font-medium text-slate-200 mt-0.5">{scenario.promptTitle}</div>
            </button>
          );
        })}
      </div>

      {/* Current Prompt Description Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs font-mono text-slate-300">
        <strong className="text-cyan block uppercase text-[10px] tracking-wider mb-1">Task Specification:</strong>
        {currentScenario.promptDescription}
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Human Column (Emerald) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/25 flex flex-col justify-between space-y-6 group hover:border-emerald-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-bold">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span>Human Divergent Response</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Variance: {(currentScenario.humanResponse.semanticVarianceScore * 100).toFixed(0)}%
              </span>
            </div>

            <h4 className="text-xl font-serif text-white font-medium">
              "{currentScenario.humanResponse.title}"
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {currentScenario.humanResponse.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Observed Qualitative Markers:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentScenario.humanResponse.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono text-emerald-300"
                  >
                    + {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-400 font-sans leading-relaxed">
            <strong className="text-emerald-400 font-mono text-[11px] uppercase block mb-1">Cognitive Mechanism:</strong>
            {currentScenario.humanResponse.psychologicalMechanism}
          </div>
        </div>

        {/* AI Model Column (Cyan) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan/25 flex flex-col justify-between space-y-6 group hover:border-cyan/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-cyan text-xs font-mono uppercase tracking-wider font-bold">
                <div className="w-7 h-7 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>Algorithmic Maximum-Likelihood</span>
              </div>
              <span className="text-xs font-mono text-cyan font-bold bg-cyan/10 px-2.5 py-1 rounded-full border border-cyan/30">
                Variance: {(currentScenario.aiResponse.semanticVarianceScore * 100).toFixed(0)}%
              </span>
            </div>

            <h4 className="text-xl font-serif text-white font-medium">
              "{currentScenario.aiResponse.title}"
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {currentScenario.aiResponse.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Observed Qualitative Markers:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentScenario.aiResponse.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-sky-950/40 border border-sky-800/40 text-[10px] font-mono text-sky-300"
                  >
                    • {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-400 font-sans leading-relaxed">
            <strong className="text-cyan font-mono text-xs uppercase block mb-1">Probabilistic Mechanism:</strong>
            {currentScenario.aiResponse.probabilisticMechanism}
          </div>
        </div>

      </div>

      {/* Synthesis Footer */}
      <div className="p-5 rounded-2xl bg-[#08152c] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="space-y-1">
          <span className="text-cyan uppercase tracking-wider font-bold block">Scientific Synthesis:</span>
          <p className="text-slate-300 font-sans text-xs max-w-2xl leading-relaxed">
            {currentScenario.synthesis}
          </p>
        </div>
        <CitationPill citationId={currentScenario.citationId} label="View Study Citation" />
      </div>

    </div>
  );
};
