"use client";

import React, { useState } from "react";
import { RESEARCH_PAPERS } from "@/data/research-papers";
import { ResearchPaper } from "@/lib/calculator/types";
import { BookOpen, ExternalLink, Filter, Search, ShieldCheck } from "lucide-react";

export const ResearchArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Sources", count: RESEARCH_PAPERS.length },
    { id: "water", label: "Water Footprint", count: RESEARCH_PAPERS.filter((p) => p.category === "water").length },
    { id: "energy", label: "Grid Energy", count: RESEARCH_PAPERS.filter((p) => p.category === "energy").length },
    { id: "carbon", label: "Carbon Emissions", count: RESEARCH_PAPERS.filter((p) => p.category === "carbon").length },
    { id: "creativity", label: "Cognitive Science", count: RESEARCH_PAPERS.filter((p) => p.category === "creativity").length },
  ];

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.keyFinding.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-cyan/15 border-cyan text-cyan font-bold shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-60">({cat.count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan"
          />
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel text-center text-xs font-mono text-slate-500">
            No research papers matched your search criteria.
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              id={`citation-${paper.id}`}
              className="glass-panel rounded-2xl p-6 sm:p-8 transition-all hover:border-cyan/40 scroll-mt-28"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <div className="text-xs font-mono uppercase tracking-widest text-cyan flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>[{paper.category.toUpperCase()}] // {paper.year}</span>
                </div>
                <a
                  href={paper.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan transition-colors"
                >
                  <span>Canonical DOI / Report</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h4 className="text-lg sm:text-xl font-serif text-white font-medium mb-2">
                {paper.title}
              </h4>

              <p className="text-xs font-mono text-slate-400 mb-4">
                Authors: {paper.authors.join(", ")} — Published in <span className="text-slate-300 italic">{paper.publication}</span>
              </p>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-sm text-slate-300 mb-3 leading-relaxed">
                <strong className="text-cyan font-mono text-xs uppercase block mb-1">Key Quantitative Finding:</strong>
                {paper.keyFinding}
              </div>

              <div className="text-xs text-slate-500 font-sans leading-relaxed">
                <strong className="text-slate-400">Methodology & Limitations Disclosed:</strong> {paper.limitationsDisclosed}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Academic Integrity Pledge Banner */}
      <div className="p-5 rounded-2xl bg-[#030a1c] border border-cyan/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan" />
          <span>Zero Fabricated Statistics Policy: Every figure displayed on this website is mapped to peer-reviewed academic literature.</span>
        </div>
      </div>
    </div>
  );
};
