"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Droplets, Sparkles, AlertCircle, ChevronDown } from "lucide-react";
import { CitationPill } from "@/components/common/CitationPill";
import { CinematicEarthVapor } from "@/components/hero/CinematicEarthVapor";

export const HeroIntro: React.FC = () => {
  const [animationStage, setAnimationStage] = useState<number>(0);
  const [bypassed, setBypassed] = useState<boolean>(false);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setBypassed(true);
      setAnimationStage(4);
      return;
    }

    // Orchestrated 3.5s cinematic timeline with immediate visual presence
    const t1 = setTimeout(() => setAnimationStage(1), 400);   // Atmospheric Earth rises
    const t2 = setTimeout(() => setAnimationStage(2), 1500);  // Droplet condenses and falls
    const t3 = setTimeout(() => setAnimationStage(3), 2600);  // Ripple shockwave dissipation
    const t4 = setTimeout(() => setAnimationStage(4), 3500);  // Headline fully resolved

    // Non-blocking bypass: user keypress (Esc/Space), scroll, or toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Escape") {
        setBypassed(true);
        setAnimationStage(4);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setBypassed(true);
        setAnimationStage(4);
      }
    };

    const handleMotionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ reducedMotion: boolean }>;
      if (customEvent.detail?.reducedMotion) {
        setBypassed(true);
        setAnimationStage(4);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("reduced-motion-change", handleMotionChange);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("reduced-motion-change", handleMotionChange);
    };
  }, []);

  const handleSkip = () => {
    setBypassed(true);
    setAnimationStage(4);
  };

  const isResolved = bypassed || animationStage >= 4;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-void pt-28 pb-24 px-4"
    >
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 bg-starfield opacity-40 pointer-events-none" />

      {/* Cinematic Continuous Earth Water Vaporization Visual */}
      <CinematicEarthVapor />

      {/* Suspended Water Droplet */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-6">
        <div
          className={`relative transition-all duration-700 ${
            animationStage >= 1 || isResolved
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-90 scale-95"
          }`}
        >
          {/* Droplet Glow */}
          <div className="absolute -inset-3 bg-sky-400/30 rounded-full blur-xl animate-pulse" />
          
          <div className="relative w-12 h-16 sm:w-16 sm:h-20 text-cyan filter drop-shadow-[0_0_25px_rgba(56,189,248,0.85)]">
            <svg viewBox="0 0 24 36" className="w-full h-full fill-current">
              <path d="M12 2 C12 2 4 14 4 22 C4 27.5 7.6 32 12 32 C16.4 32 20 27.5 20 22 C20 14 12 2 12 2 Z" />
              <ellipse cx="9" cy="18" rx="2" ry="4" fill="#ffffff" opacity="0.65" />
            </svg>
          </div>
        </div>
      </div>

      {/* Primary Narrative Headline */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 -translate-y-4 sm:-translate-y-8">
        <div
          className={`space-y-4 transition-all duration-700 ${
            animationStage >= 1 || isResolved
              ? "opacity-100 translate-y-0"
              : "opacity-90 translate-y-2"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-cyan/40 text-xs font-mono tracking-widest uppercase text-cyan shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            <span>An Investigation Into Compute</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white leading-[1.05]">
            Every AI Answer <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan to-sky-300">
              Has a Cost
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed pt-2">
            A query feels weightless in the cloud. In reality, each prompt evaporates potable freshwater from Earth, draws from the power grid, and subtly alters the landscape of human thought.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#environmental-impact"
              className="px-6 py-3 rounded-full bg-cyan text-slate-950 font-sans font-medium text-sm hover:bg-sky-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center gap-2 group"
            >
              <span>Explore The Physical Toll</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#calculator"
              className="px-6 py-3 rounded-full glass-panel text-slate-200 hover:text-white hover:border-cyan/50 text-sm font-sans transition-all flex items-center gap-2"
            >
              <span>Calculate Your Footprint</span>
            </a>
          </div>
        </div>
      </div>

      {/* Skip Button (visible during intro animation) */}
      {!isResolved && (
        <button
          onClick={handleSkip}
          className="absolute top-28 right-8 z-30 text-xs font-mono text-slate-500 hover:text-cyan transition-colors"
        >
          Skip opening [Space]
        </button>
      )}

      {/* Subtle Scroll Hint Positioned in Right Corner to Avoid Overlap */}
      <motion.div
        initial={false}
        animate={{ opacity: isResolved ? 0.75 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden md:flex absolute bottom-8 right-8 z-30 items-center gap-2 text-slate-400 text-[11px] font-mono hover:text-cyan transition-colors"
      >
        <span>SCROLL DOWN</span>
        <ChevronDown className="w-3.5 h-3.5 text-cyan animate-bounce" />
      </motion.div>
    </section>
  );
};
