"use client";

import React from "react";
import { BookOpen } from "lucide-react";

interface CitationPillProps {
  citationId: string;
  label: string;
}

export const CitationPill: React.FC<CitationPillProps> = ({ citationId, label }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(`citation-${citationId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      targetElement.classList.add("ring-2", "ring-cyan", "ring-offset-2", "ring-offset-void");
      setTimeout(() => {
        targetElement.classList.remove("ring-2", "ring-cyan", "ring-offset-2", "ring-offset-void");
      }, 2500);
    } else {
      const researchSection = document.getElementById("research");
      if (researchSection) {
        researchSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`View academic citation: ${label}`}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono tracking-tight text-cyan bg-cyan/10 border border-cyan/25 hover:bg-cyan/20 hover:border-cyan/50 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan"
    >
      <BookOpen className="w-3 h-3" />
      <span>{label}</span>
    </button>
  );
};
