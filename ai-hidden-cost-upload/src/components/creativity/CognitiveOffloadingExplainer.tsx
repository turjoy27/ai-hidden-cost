"use client";

import React from "react";
import { COGNITIVE_PILLARS } from "@/data/creativity-data";
import { CitationPill } from "@/components/common/CitationPill";
import { BrainCircuit, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

export const CognitiveOffloadingExplainer: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Cognitive Psychology Framework</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
          The Cognitive Arc: Augmentation, Anchoring & Symbiosis
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
          Scientific inquiry reveals that AI tools are neither purely destructive nor purely beneficial. The cognitive impact hinges entirely on the sequence and depth of human engagement.
        </p>
      </div>

      {/* Three Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COGNITIVE_PILLARS.map((pillar, index) => (
          <div
            key={pillar.title}
            className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between space-y-6 hover:border-emerald-500/30 transition-all group"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-cyan uppercase tracking-wider block">
                {pillar.phase}
              </span>
              <h4 className="text-lg font-serif text-white font-medium group-hover:text-cyan transition-colors">
                {pillar.title}
              </h4>
              <p className="text-xs text-slate-400 font-sans italic">
                {pillar.subtitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {pillar.body}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5 text-[11px] font-mono">
              {/* Benefit */}
              <div className="flex items-start gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                <span className="leading-tight">
                  <strong className="text-emerald-400">Benefit:</strong> {pillar.benefit}
                </span>
              </div>

              {/* Risk */}
              <div className="flex items-start gap-2 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span className="leading-tight">
                  <strong className="text-amber-400">Cognitive Risk:</strong> {pillar.risk}
                </span>
              </div>

              <div className="pt-2 flex justify-end">
                <CitationPill citationId={pillar.citationId} label="Peer-Reviewed Study" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Balanced Summary Callout */}
      <div className="p-5 rounded-2xl bg-[#061224] border border-cyan/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <p className="text-slate-300 font-sans text-xs leading-relaxed max-w-2xl">
            <strong className="text-white font-mono uppercase text-[11px] block mb-0.5">Scientific Principle of Cognitive Hygiene:</strong>
            Do not prompt an AI for the initial answer. Draft raw idiosyncratic outlines, questions, and analogies independently first; bring in computational models subsequently for stress-testing and expansion.
          </p>
        </div>
      </div>

    </div>
  );
};
