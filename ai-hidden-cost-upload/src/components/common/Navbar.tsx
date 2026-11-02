"use client";

import React, { useState, useEffect } from "react";
import { Droplets, Sparkles, Sliders, Menu, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "#hero", number: "01" },
  { label: "Physical Toll", href: "#environmental-impact", number: "02" },
  { label: "Calculator", href: "#calculator", number: "03" },
  { label: "The Mind", href: "#human-creativity", number: "04" },
  { label: "Sources", href: "#research", number: "05" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  useEffect(() => {
    // Check initial system prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      document.documentElement.classList.add("force-reduced-motion");
    }

    // IntersectionObserver for active section spy
    const sectionIds = ["hero", "environmental-impact", "calculator", "human-creativity", "research"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 180;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleReducedMotion = () => {
    const nextState = !reducedMotion;
    setReducedMotion(nextState);
    if (nextState) {
      document.documentElement.classList.add("force-reduced-motion");
    } else {
      document.documentElement.classList.remove("force-reduced-motion");
    }
    window.dispatchEvent(new CustomEvent("reduced-motion-change", { detail: { reducedMotion: nextState } }));
  };

  const toggleUnits = () => {
    const nextUnit = unitSystem === "metric" ? "imperial" : "metric";
    setUnitSystem(nextUnit);
    window.dispatchEvent(new CustomEvent("unit-change", { detail: { unitSystem: nextUnit } }));
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 transition-all duration-300">
      <nav className="glass-panel rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-between border border-white/10">
        
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group text-slate-100 hover:text-cyan transition-colors"
          aria-label="AI: The Hidden Cost - Home"
        >
          <div className="w-7 h-7 rounded-full bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform">
            <Droplets className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-tight font-medium text-white group-hover:text-cyan transition-colors">
              AI: The Hidden Cost
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-mono transition-all relative",
                  isActive
                    ? "text-cyan bg-cyan/10 border border-cyan/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                )}
              >
                <span className="opacity-50 mr-1.5 text-[10px]">{item.number}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Controls: Units & Reduced Motion */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Unit Toggle */}
          <button
            onClick={toggleUnits}
            title={`Toggle unit system (currently ${unitSystem})`}
            aria-label="Toggle Metric or Imperial units"
            className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-slate-700 bg-slate-900/80 hover:border-slate-500 text-slate-300 transition-colors"
          >
            <span className={cn(unitSystem === "metric" ? "text-cyan font-bold" : "text-slate-500")}>Metric</span>
            <span className="mx-1 text-slate-600">/</span>
            <span className={cn(unitSystem === "imperial" ? "text-cyan font-bold" : "text-slate-500")}>Imperial</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleReducedMotion}
            title={reducedMotion ? "Motion: Reduced" : "Motion: Standard"}
            aria-label="Toggle reduced motion"
            className={cn(
              "p-1.5 rounded-full border transition-all text-xs",
              reducedMotion
                ? "bg-amber-950/50 border-amber-500/60 text-amber-300"
                : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200"
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-5 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-mono flex items-center justify-between",
                    isActive
                      ? "text-cyan bg-cyan/10 border border-cyan/30"
                      : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500">{item.number}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <button
              onClick={toggleUnits}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300"
            >
              Units: <span className="text-cyan font-bold uppercase">{unitSystem}</span>
            </button>
            <button
              onClick={toggleReducedMotion}
              className={cn(
                "px-3 py-1.5 rounded-lg border flex items-center gap-1.5",
                reducedMotion
                  ? "border-amber-500/60 bg-amber-950/50 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-400"
              )}
            >
              <Sliders className="w-3 h-3" />
              <span>Motion: {reducedMotion ? "Reduced" : "Standard"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
