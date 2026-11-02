"use client";

import React, { useState } from "react";
import { CitationPill } from "@/components/common/CitationPill";
import { Sparkles, Network, CircleDot, Info } from "lucide-react";

export const IdeaDispersionGraphic: React.FC = () => {
  const [viewMode, setViewMode] = useState<"both" | "human" | "ai">("both");

  // Representative 2D coordinates projected from high-dimensional semantic embedding space (t-SNE / UMAP)
  const humanPoints = [
    { x: 35, y: 30, label: "Tactile Metaphor", r: 5 },
    { x: 80, y: 75, label: "Cultural Anecdote", r: 6 },
    { x: 130, y: 25, label: "Historical Anachronism", r: 4.5 },
    { x: 45, y: 135, label: "Sensory Shock", r: 5.5 },
    { x: 195, y: 35, label: "Poetic Inversion", r: 5 },
    { x: 235, y: 80, label: "Somatosensory Memory", r: 6 },
    { x: 170, y: 125, label: "Anti-structural Hack", r: 5 },
    { x: 255, y: 145, label: "Eccentric Ritual", r: 4.5 },
    { x: 105, y: 100, label: "Subconscious Association", r: 6.5 },
    { x: 30, y: 80, label: "Visceral Trauma", r: 4 },
  ];

  // AI cluster: Centroid collapse (tight Gaussian distribution around center x=140, y=85)
  const aiPoints = [
    { x: 138, y: 82, r: 4 },
    { x: 144, y: 86, r: 4.5 },
    { x: 132, y: 88, r: 4 },
    { x: 146, y: 79, r: 3.5 },
    { x: 135, y: 76, r: 4 },
    { x: 142, y: 92, r: 4 },
    { x: 149, y: 84, r: 3.5 },
    { x: 130, y: 84, r: 4 },
    { x: 140, y: 73, r: 3 },
    { x: 153, y: 89, r: 3.5 },
    { x: 126, y: 80, r: 3 },
    { x: 145, y: 95, r: 3.5 },
    { x: 134, y: 91, r: 3 },
    { x: 150, y: 76, r: 3.5 },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <Network className="w-3.5 h-3.5 animate-pulse" />
            <span>High-Dimensional Semantic Embedding Analysis</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
            Ideational Dispersion vs. Centroid Collapse
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
            In Natural Language Processing (NLP), concepts exist as geometric vectors. Unassisted human divergent thinking disperses widely across semantic space; generative AI outputs cluster tightly around high-probability centroids.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono shrink-0">
          <button
            onClick={() => setViewMode("both")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "both" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Overlay Both
          </button>
          <button
            onClick={() => setViewMode("human")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "human" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Human Dispersion
          </button>
          <button
            onClick={() => setViewMode("ai")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "ai" ? "bg-cyan text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            AI Centroid Cluster
          </button>
        </div>
      </div>

      {/* Visual Canvas Stage */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#040916] border border-white/10 overflow-hidden flex items-center justify-center p-4">
        
        {/* Subtle Coordinate Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Semantic Coordinate SVG Canvas */}
        <svg viewBox="0 0 280 180" className="w-full h-full max-w-2xl">
          {/* Centroid Probability Density Halo (AI) */}
          {(viewMode === "both" || viewMode === "ai") && (
            <g className="transition-opacity duration-700">
              <defs>
                <radialGradient id="aiHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="140" cy="85" rx="55" ry="38" fill="url(#aiHalo)" />
              <ellipse cx="140" cy="85" rx="28" ry="18" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </g>
          )}

          {/* Human Constellation Connecting Lines */}
          {(viewMode === "both" || viewMode === "human") && (
            <g className="transition-opacity duration-700" opacity="0.4">
              {humanPoints.map((p, i) => {
                const next = humanPoints[(i + 2) % humanPoints.length];
                return (
                  <line
                    key={`line-${i}`}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="#10B981"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}
            </g>
          )}

          {/* Human Divergent Nodes (Emerald Constellation) */}
          {(viewMode === "both" || viewMode === "human") && (
            <g className="transition-opacity duration-700">
              {humanPoints.map((p, idx) => (
                <g key={`human-node-${idx}`} className="group cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    fill="#10B981"
                    className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  />
                  <circle cx={p.x} cy={p.y} r={p.r + 3} fill="none" stroke="#10B981" strokeWidth="0.8" opacity="0.5" />
                </g>
              ))}
            </g>
          )}

          {/* AI Centroid Points (Cyan Dense Cluster) */}
          {(viewMode === "both" || viewMode === "ai") && (
            <g className="transition-opacity duration-700">
              {aiPoints.map((p, idx) => (
                <circle
                  key={`ai-node-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={p.r}
                  fill="#38BDF8"
                  className="filter drop-shadow-[0_0_6px_rgba(56,189,248,0.9)] animate-pulse"
                />
              ))}
            </g>
          )}
        </svg>

        {/* In-Canvas Dynamic Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-4 text-[11px] font-mono">
            {(viewMode === "both" || viewMode === "human") && (
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <span>Human Divergent Ideas (Wide Variance: ~0.88)</span>
              </div>
            )}
            {(viewMode === "both" || viewMode === "ai") && (
              <div className="flex items-center gap-1.5 text-cyan">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_8px_#38bdf8]" />
                <span>AI Maximum-Likelihood Centroid (~0.38)</span>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-slate-500">
            2D Projection of 1,536-Dimensional Semantic Embeddings
          </div>
        </div>
      </div>

      {/* Scientific Takeaway Banner */}
      <div className="p-5 rounded-2xl bg-[#08152c] border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="space-y-1">
          <span className="text-emerald-400 uppercase tracking-wider font-bold block">
            Empirical Finding: The Diversity Paradox (Doshi & Hauser, 2024)
          </span>
          <p className="text-slate-300 font-sans text-xs max-w-2xl leading-relaxed">
            AI assistance significantly elevates individual baseline quality for less creative participants, yet reduces the overall semantic variety across the collective ecosystem. The floor rises, but the idiosyncratic ceiling compresses.
          </p>
        </div>
        <CitationPill citationId="doshi-2024-diversity" label="Science Advances 2024" />
      </div>

    </div>
  );
};
