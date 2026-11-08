"use client";

import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IdeaDispersionGraphic } from "./IdeaDispersionGraphic";
import { HumanVsAIComparison } from "./HumanVsAIComparison";
import { CognitiveOffloadingExplainer } from "./CognitiveOffloadingExplainer";

export const CreativityStage: React.FC = () => {
  return (
    <section
      id="human-creativity"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.06] space-y-16"
    >
      {/* Editorial Section Header */}
      <SectionHeader
        eyebrow="Section 03 // Cognitive Ecology"
        title="The Homogenization of Human Thought"
        description="When millions of writers, designers, and engineers draw from identical probabilistic neural models, what happens to the eccentric outliers of human ingenuity?"
      />

      {/* 1. Visual Storytelling Exhibit: High-Dimensional Semantic Dispersion */}
      <IdeaDispersionGraphic />

      {/* 2. Interactive Side-by-Side Prompt Comparisons */}
      <HumanVsAIComparison />

      {/* 3. Balanced Cognitive Framework: Augmentation, Anchoring & Symbiosis */}
      <CognitiveOffloadingExplainer />
    </section>
  );
};
