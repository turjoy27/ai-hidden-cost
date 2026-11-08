"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Droplets, Flame, Wind, Info, Zap } from "lucide-react";

interface VaporParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  life: number;
  maxLife: number;
  peakAlpha: number;
  wobbleSeed: number;
  type: "plume" | "ambient" | "droplet";
}

interface DatacenterNode {
  id: string;
  name: string;
  location: string;
  xPercent: number; // 0 to 1 across viewport width
  cssLeft: string;
  cssBottom: string;
  coolingMethod: string;
  waterRateMlPerPrompt: number;
  dailyWithdrawalM3: string;
}

const DATACENTER_NODES: DatacenterNode[] = [
  {
    id: "us-east",
    name: "Northern Virginia Corridor",
    location: "Loudoun County, USA (Data Center Alley)",
    xPercent: 0.22,
    cssLeft: "22%",
    cssBottom: "115px",
    coolingMethod: "Direct Evaporative Cooling Towers",
    waterRateMlPerPrompt: 11.2,
    dailyWithdrawalM3: "1.4M gallons/day",
  },
  {
    id: "us-midwest",
    name: "Council Bluffs Cloud Campus",
    location: "Iowa, USA",
    xPercent: 0.40,
    cssLeft: "40%",
    cssBottom: "155px",
    coolingMethod: "Cooling Towers + Adiabatic Economizers",
    waterRateMlPerPrompt: 9.8,
    dailyWithdrawalM3: "850K gallons/day",
  },
  {
    id: "eu-west",
    name: "Dublin Hyperscale Pods",
    location: "Grange Castle, Ireland",
    xPercent: 0.60,
    cssLeft: "60%",
    cssBottom: "155px",
    coolingMethod: "Evaporative Chillers & River Draw",
    waterRateMlPerPrompt: 10.4,
    dailyWithdrawalM3: "620K gallons/day",
  },
  {
    id: "apac",
    name: "Singapore & Johor Corridor",
    location: "Southeast Asia Tropical Hub",
    xPercent: 0.78,
    cssLeft: "78%",
    cssBottom: "115px",
    coolingMethod: "High-Wet-Bulb Potable Evaporative Towers",
    waterRateMlPerPrompt: 14.5,
    dailyWithdrawalM3: "980K gallons/day",
  },
];

type ComputeLoad = "low" | "standard" | "heavy";

export const CinematicEarthVapor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [computeLoad, setComputeLoad] = useState<ComputeLoad>("standard");
  const [activeNode, setActiveNode] = useState<DatacenterNode | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([]);

  // Compute load parameters: multiplier on particle count, velocity, and vapor volume
  const loadConfig = useMemo(() => {
    switch (computeLoad) {
      case "low":
        return {
          particleMultiplier: 0.6,
          speedMultiplier: 0.8,
          alphaMultiplier: 0.75,
          promptsLabel: "1 Prompt (~10 mL steam)",
          steamVolumeDesc: "Single cooling cycle evaporation",
        };
      case "heavy":
        return {
          particleMultiplier: 2.2,
          speedMultiplier: 1.5,
          alphaMultiplier: 1.35,
          promptsLabel: "500 Prompts (~5,000 mL steam / 10 Bottles)",
          steamVolumeDesc: "High-concurrency cluster load",
        };
      case "standard":
      default:
        return {
          particleMultiplier: 1.2,
          speedMultiplier: 1.1,
          alphaMultiplier: 1.0,
          promptsLabel: "25–50 Prompts (~500 mL steam / 1 Bottle)",
          steamVolumeDesc: "Typical daily conversational AI session",
        };
    }
  }, [computeLoad]);

  useEffect(() => {
    // Detect prefers-reduced-motion media query
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    const handleMqChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ reducedMotion: boolean }>;
      if (typeof customEvent.detail?.reducedMotion === "boolean") {
        setIsReducedMotion(customEvent.detail.reducedMotion);
      }
    };

    mq.addEventListener("change", handleMqChange);
    window.addEventListener("reduced-motion-change", handleCustomEvent);

    return () => {
      mq.removeEventListener("change", handleMqChange);
      window.removeEventListener("reduced-motion-change", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const particles: VaporParticle[] = [];

    // Horizon curvature function
    // Renders a prominent, realistic Earth horizon curvature
    const getHorizonY = (x: number, w: number, h: number) => {
      const isMobile = w < 640;
      // Earth peak rises up to ~175px from bottom on desktop, ~135px on mobile
      const peakY = h - (isMobile ? 135 : 175);
      const curveDrop = isMobile ? 80 : 135;
      const nx = (x - w / 2) / (w / 2); // -1 (left edge) to +1 (right edge)
      return peakY + (nx * nx) * curveDrop;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1440) || 1440;
      height = containerRef.current?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 900) || 900;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-map datacenter node positions along the curved Earth surface
      const positions = DATACENTER_NODES.map((node) => {
        const x = node.xPercent * width;
        const y = getHorizonY(x, width, height);
        return { x, y };
      });
      setNodePositions(positions);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause canvas render loop when scrolled out of view to preserve 100% GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const spawnParticle = (forceNodeIdx?: number): VaporParticle => {
      const isMobile = width < 640;
      const isPlume = Math.random() < 0.65; // Plumes from cooling towers vs ambient veil
      const isDroplet = !isPlume && Math.random() < 0.3;

      let x = 0;
      let y = 0;

      if (isPlume) {
        // Spawn around one of the datacenter nodes
        const nodeIdx = typeof forceNodeIdx === "number" ? forceNodeIdx : Math.floor(Math.random() * DATACENTER_NODES.length);
        const node = DATACENTER_NODES[nodeIdx];
        const baseX = node.xPercent * width;
        const jitter = (Math.random() - 0.5) * (isMobile ? 25 : 55);
        x = baseX + jitter;
        y = getHorizonY(x, width, height) - Math.random() * 8;
      } else {
        // Distributed across the Earth horizon
        x = (0.1 + Math.random() * 0.8) * width;
        y = getHorizonY(x, width, height) - Math.random() * 10;
      }

      const speedFactor = loadConfig.speedMultiplier;
      const baseRadius = isDroplet
        ? 1.5 + Math.random() * 1.5
        : isPlume
        ? (isMobile ? 12 : 20) + Math.random() * (isMobile ? 14 : 28)
        : (isMobile ? 18 : 28) + Math.random() * (isMobile ? 20 : 36);

      const maxLife = isDroplet
        ? 80 + Math.random() * 40
        : isPlume
        ? 150 + Math.random() * 90
        : 180 + Math.random() * 110;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5 * speedFactor,
        vy: (isDroplet
          ? -(1.2 + Math.random() * 1.6)
          : isPlume
          ? -(1.3 + Math.random() * 1.8)
          : -(0.7 + Math.random() * 1.1)) * speedFactor,
        radius: baseRadius,
        baseRadius,
        life: 0,
        maxLife,
        peakAlpha: (isDroplet
          ? 0.6 + Math.random() * 0.3
          : isPlume
          ? 0.32 + Math.random() * 0.22
          : 0.18 + Math.random() * 0.14) * loadConfig.alphaMultiplier,
        wobbleSeed: Math.random() * 500,
        type: isDroplet ? "droplet" : isPlume ? "plume" : "ambient",
      };
    };

    // Target particle count based on compute load and screen width
    const baseCount = width < 640 ? 45 : 95;
    const targetCount = Math.round(baseCount * loadConfig.particleMultiplier);

    // Seed initial particles pre-aged across their lifecycles
    for (let i = 0; i < targetCount; i++) {
      const p = spawnParticle();
      p.life = Math.random() * p.maxLife;
      p.y += p.vy * p.life;
      p.x += p.vx * p.life;
      particles.push(p);
    }

    const render = () => {
      if (!isVisible || isReducedMotion) {
        ctx.clearRect(0, 0, width, height);

        // Draw static atmospheric glow on reduced motion
        const grad = ctx.createLinearGradient(0, height - 260, 0, height);
        grad.addColorStop(0, "rgba(56, 189, 248, 0)");
        grad.addColorStop(0.5, "rgba(56, 189, 248, 0.15)");
        grad.addColorStop(1, "rgba(2, 132, 199, 0.3)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, height - 280, width, 280);

        if (!isReducedMotion) {
          animId = requestAnimationFrame(render);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Continuous particle generation
      while (particles.length < targetCount) {
        particles.push(spawnParticle());
      }

      // Update and draw steam particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.maxLife || p.y < -80) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;

        // Upward turbulent drift
        const wobble = Math.sin(p.wobbleSeed + p.life * 0.035) * 0.45;
        p.x += p.vx + wobble;
        p.y += p.vy;

        // Radius expansion as steam expands into upper atmosphere
        if (p.type !== "droplet") {
          p.radius = p.baseRadius * (1 + progress * 2.4);
        }

        // Opacity envelope: gradual rise, stay visible, gradual dissipation
        let alpha = 0;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * p.peakAlpha;
        } else if (progress < 0.6) {
          alpha = p.peakAlpha;
        } else {
          alpha = (1 - (progress - 0.6) / 0.4) * p.peakAlpha;
        }

        if (p.type === "droplet") {
          // Glistening condensed micro-droplet
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${alpha * 0.9})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.35})`;
          ctx.fill();
        } else {
          // Soft radial evaporative steam puff
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            Math.max(p.radius, 1)
          );

          if (p.type === "plume") {
            // Intense thermal cooling plume (white/cyan center)
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
            grad.addColorStop(0.3, `rgba(186, 230, 253, ${alpha * 0.7})`);
            grad.addColorStop(0.65, `rgba(56, 189, 248, ${alpha * 0.3})`);
            grad.addColorStop(1, "rgba(2, 132, 199, 0)");
          } else {
            // Soft atmospheric water vapor veil
            grad.addColorStop(0, `rgba(224, 242, 254, ${alpha * 0.65})`);
            grad.addColorStop(0.4, `rgba(56, 189, 248, ${alpha * 0.35})`);
            grad.addColorStop(0.8, `rgba(14, 165, 233, ${alpha * 0.12})`);
            grad.addColorStop(1, "rgba(2, 6, 23, 0)");
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [loadConfig, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      aria-label="Earth Water Vaporization Visualization"
    >
      {/* 1. Realistic Curved Earth Horizon Body */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center">
        {/* Outer Atmospheric Ozone Glow (Deep Cyan / Electric Azure) */}
        <div
          className="absolute -bottom-24 sm:-bottom-32 w-[160%] max-w-[2200px] h-80 sm:h-[420px] rounded-[100%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.45) 0%, rgba(14,165,233,0.25) 40%, rgba(2,132,199,0.08) 65%, transparent 80%)",
            filter: "blur(32px)",
          }}
        />

        {/* Earth Horizon Curvature Arc Body */}
        <div
          className="relative w-[180%] max-w-[2400px] h-64 sm:h-80 rounded-[100%] overflow-hidden pointer-events-none border-t border-sky-400/80 shadow-[0_-15px_60px_rgba(56,189,248,0.45)]"
          style={{
            background:
              "linear-gradient(180deg, #071e3d 0%, #03132c 25%, #020b1e 60%, #01040a 100%)",
            marginBottom: "-145px",
          }}
        >
          {/* Earth Surface Continents and Ocean Lighting Map */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% -20%, rgba(56,189,248,0.6) 0%, rgba(14,165,233,0.2) 50%, transparent 85%)",
            }}
          />

          {/* Earth Atmospheric Limb Line (Luminous Horizon Rim) */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-90 blur-[1px]" />
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-60 blur-[4px]" />
        </div>
      </div>

      {/* 2. Continuous Billowing Steam Plumes (CSS Animated Multi-Layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DATACENTER_NODES.map((node, idx) => (
          <div
            key={`plume-group-${node.id}`}
            className="absolute pointer-events-none"
            style={{
              left: node.cssLeft,
              bottom: node.cssBottom,
            }}
          >
            {/* Primary Billowing Steam Column */}
            <div
              className="absolute -bottom-4 -left-6 w-14 h-48 rounded-full bg-gradient-to-t from-white/70 via-cyan/40 to-transparent blur-md animate-vapor-a"
              style={{ animationDelay: `-${(idx * 1.5 + 0.8) % 5.5}s` }}
            />
            {/* Wider Dissipating Vapor Veil */}
            <div
              className="absolute -bottom-8 -left-10 w-24 h-60 rounded-full bg-gradient-to-t from-cyan/40 via-sky-400/25 to-transparent blur-xl animate-vapor-b"
              style={{ animationDelay: `-${(idx * 1.8 + 2.3) % 7.0}s` }}
            />
            {/* Fast Wispy Steam Tendril */}
            <div
              className="absolute -bottom-2 -left-3 w-8 h-40 rounded-full bg-gradient-to-t from-sky-200/60 via-sky-300/30 to-transparent blur-sm animate-vapor-c"
              style={{ animationDelay: `-${(idx * 1.2 + 3.1) % 4.8}s` }}
            />
          </div>
        ))}

        {/* Ambient Oceanic Evaporative Veil Streams */}
        {[
          { left: "14%", bottom: "100px", delay: "-1.5s" },
          { left: "50%", bottom: "145px", delay: "-3.8s" },
          { left: "86%", bottom: "100px", delay: "-2.4s" },
        ].map((ambient, idx) => (
          <div
            key={`ambient-stream-${idx}`}
            className="absolute pointer-events-none"
            style={{
              left: ambient.left,
              bottom: ambient.bottom,
            }}
          >
            <div
              className="w-20 h-52 -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan/30 via-sky-400/15 to-transparent blur-2xl animate-vapor-b"
              style={{ animationDelay: ambient.delay }}
            />
          </div>
        ))}
      </div>

      {/* 3. HTML5 Canvas Rendering Continuous Steam Plumes & Micro-Droplets */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Interactive Datacenter Hotspots Along the Earth Curvature */}
      <div className="absolute inset-0 pointer-events-auto">
        {DATACENTER_NODES.map((node) => {
          const isHovered = activeNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: node.cssLeft,
                bottom: node.cssBottom,
                transform: "translate(-50%, 50%)",
              }}
              className="absolute z-20 group"
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Pulsing Thermal Emission Beacon */}
              <div className="relative flex items-center justify-center cursor-pointer p-3">
                <span className="absolute w-8 h-8 rounded-full bg-cyan/25 animate-ping opacity-60" />
                <span className="absolute w-5 h-5 rounded-full bg-sky-400/40 blur-[3px]" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-white border border-cyan shadow-[0_0_15px_#38bdf8]" />
              </div>

              {/* Tooltip / Label Card */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3.5 py-2.5 rounded-xl glass-panel border border-cyan/40 bg-slate-950/95 text-left whitespace-nowrap shadow-[0_12px_36px_rgba(0,0,0,0.85)] transition-all duration-300 pointer-events-none ${
                  isHovered
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-2 scale-95 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:scale-100"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-cyan uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <span>{node.coolingMethod}</span>
                </div>
                <div className="text-xs font-serif text-white font-medium mt-1">
                  {node.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {node.location}
                </div>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center gap-3 text-[10px] font-mono text-slate-300">
                  <span className="text-cyan">~{node.waterRateMlPerPrompt} mL/prompt</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{node.dailyWithdrawalM3}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Live Evaporation Telemetry & Interactive Prompt Load Selector */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-[92%] max-w-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-cyan/35 bg-slate-950/85 shadow-[0_8px_32px_rgba(56,189,248,0.22)] backdrop-blur-md">
          {/* Status Label with Pulsing Indicator */}
          <div className="flex items-center gap-2 text-left">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan shadow-[0_0_8px_#38bdf8]" />
            </span>
            <div>
              <div className="text-[11px] font-mono tracking-wider text-cyan uppercase font-semibold flex items-center gap-1.5">
                <span>Earth Evaporation Simulator</span>
                <span className="text-slate-500 font-normal hidden sm:inline">· Continuous</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {loadConfig.promptsLabel}
              </div>
            </div>
          </div>

          {/* Interactive Load Multiplier Buttons */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 flex-shrink-0">
            <button
              onClick={() => setComputeLoad("low")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                computeLoad === "low"
                  ? "bg-cyan text-slate-950 font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1 Query
            </button>
            <button
              onClick={() => setComputeLoad("standard")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                computeLoad === "standard"
                  ? "bg-cyan text-slate-950 font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              25 Prompts
            </button>
            <button
              onClick={() => setComputeLoad("heavy")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                computeLoad === "heavy"
                  ? "bg-cyan text-slate-950 font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Cluster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
