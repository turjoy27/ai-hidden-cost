# System Architecture Document (SAD)

**Project:** AI — The Hidden Cost  
**Architecture Pattern:** Component-Driven Static Architecture (SSG) with Decoupled Mathematical Core  
**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion (Framer Motion), Recharts, Lucide Icons  
**Version:** 1.0.0

---

## 1. Architectural Philosophy & Principles

1. **Strict Decoupling of Math & UI:**
   All calculation formulas, conversion factors, baseline constants, and unit transformations must reside in pure, framework-agnostic TypeScript functions under `lib/calculator/`. Components never perform math directly; they consume derived calculations.
2. **Immutable Academic Truth:**
   All research data, statistics, and citations are stored in statically typed JSON/TS records under `data/`. No dynamic external API queries at runtime.
3. **Progressive Cinematic Enhancement:**
   Visual storytelling and animations must enrich comprehension without causing input lag, battery drain, or layout instability. Reduced-motion and low-spec fallbacks are first-class citizens.
4. **Zero-Server Operational Overhead:**
   Fully pre-rendered static HTML/CSS/JS exportable to global edge CDNs at zero operating cost.

---

## 2. Technology Stack & Decision Rationale

| Layer | Selected Technology | Alternative Considered | Decision Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router, SSG)** | Vite + React SPA | Next.js provides static optimization, automated metadata/OpenGraph generation, zero-JS static sections where appropriate, and built-in image optimization. |
| **Language** | **TypeScript (Strict Mode)** | Vanilla JavaScript | Strict typing prevents unit conversion bugs and guarantees adherence to academic research schema contracts. |
| **Styling** | **Tailwind CSS v3/v4** | Styled-Components, CSS Modules | Zero-runtime CSS extraction, minimal bundle footprint, standardized responsive design tokens, and fluid editorial typography. |
| **Animation Engine** | **Motion (`framer-motion`)** | GSAP, React Spring | Declarative React integration, hardware-accelerated transforms, built-in `useReducedMotion`, and seamless scroll-linked interpolations. |
| **Data Visualization** | **Recharts + Custom SVGs** | D3.js, Chart.js | Recharts offers lightweight, declarative SVG charting with React lifecycles; custom SVG morphing covers fluid container metaphors. |
| **Iconography** | **Lucide React** | FontAwesome, Raw SVGs | Clean line-art icons matching cinematic aesthetic, tree-shakable down to individual glyphs. |
| **Testing** | **Vitest + RTL + Axe** | Jest + Cypress | Blazing-fast execution, native TypeScript support, and zero-config compatibility. |

---

## 3. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT BROWSER                                   |
+-----------------------------------------------------------------------------------+
                                         |
     +-----------------------------------+-----------------------------------+
     |                                   |                                   |
+----+-----------------------------+ +---+-----------------------------+ +----+-----------------------------+
|        PRESENTATION LAYER        | |          STATE LAYER            | |         DATA & LOGIC LAYER        |
|  - App Layout & Navigation       | |  - Calculator Store (Zustand/   | |  - Pure Calculation Engine        |
|  - Hero Cinematic Stage          | |    Context)                     | |    (`lib/calculator/engine.ts`)   |
|  - Environmental Impact Stage    | |  - Active Section Observer      | |  - Unit Converters                |
|  - Interactive Calculator Stage  | |  - Motion Preference Store      | |    (`lib/calculator/units.ts`)    |
|  - Creativity Editorial Stage    | |  - Unit Preferences (Metric/    | |  - Static Research Database       |
|  - Research & Methodology Modal  | |    Imperial)                    | |    (`data/research/*.json`)       |
+----------------------------------+ +---------------------------------+ +----------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                        BUILD & DELIVERY PIPELINE (SSG)                            |
|       TypeScript Compile -> Vitest Tests -> Next.js Export -> Edge CDN (Vercel)   |
+-----------------------------------------------------------------------------------+
```

---

## 4. Directory & Module Structure

```
ai-hidden-cost/
├── docs/                                  # Architectural & Product Specifications
│   ├── PROJECT_ANALYSIS.md
│   ├── SOFTWARE_REQUIREMENTS.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── WEBSITE_SITEMAP.md
│   └── IMPLEMENTATION_ROADMAP.md
├── public/                                # Static Public Assets
│   ├── images/                            # Optimized Earth, textures, water textures
│   └── favicon.ico
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── layout.tsx                     # Root Layout, Fonts, SEO Metadata
│   │   ├── page.tsx                       # Single-page storytelling composition
│   │   └── globals.css                    # Tailwind imports, cinematic theme tokens
│   ├── components/
│   │   ├── common/                        # Reusable primitives
│   │   │   ├── Navbar.tsx                 # Fixed glassmorphism navigation
│   │   │   ├── CitationPill.tsx           # Interactive academic reference badge
│   │   │   ├── SectionHeader.tsx          # Editorial typography headers
│   │   │   └── ContainerModal.tsx         # Methodology & source detail dialog
│   │   ├── hero/                          # Hero Section
│   │   │   ├── HeroStage.tsx              # Cinematic Earth & drop canvas
│   │   │   ├── EarthVisual.tsx            # Multi-layer atmospheric SVG/Canvas
│   │   │   └── DropletAnimation.tsx       # Physics-based droplet motion
│   │   ├── environmental/                 # Section 1: Environmental Impact
│   │   │   ├── ImpactMetricsGrid.tsx      # Water, electricity, carbon cards
│   │   │   ├── DirectVsIndirectWater.tsx  # Cooling tower vs power grid explainer
│   │   │   └── InfrastructureVisual.tsx   # Data center physical footprint
│   │   ├── calculator/                    # Section 2: Interactive Calculator
│   │   │   ├── CalculatorContainer.tsx    # State connector & layout
│   │   │   ├── PromptSlider.tsx           # Accessible prompt input
│   │   │   ├── AssumptionPresets.tsx      # Persona preset selectors
│   │   │   ├── VolumeVisualizer.tsx       # Dynamic droplet -> container morph
│   │   │   ├── CalculationResults.tsx     # Daily & annual totals
│   │   │   └── MethodologyDrawer.tsx      # Transparent math breakdown
│   │   ├── creativity/                    # Section 3: Human Creativity
│   │   │   ├── CreativityStage.tsx        # Editorial layout & documentary flow
│   │   │   ├── DivergentVsCluster.tsx     # Human vs AI idea dispersion graphic
│   │   │   └── CognitiveOffloadCard.tsx   # Skill atrophy & reliance explainer
│   │   └── research/                      # Section 4: Academic Citations
│   │       ├── ResearchBibliography.tsx   # Filterable paper list
│   │       ├── PaperCard.tsx              # Paper details with DOI and methodology
│   │       └── EvidenceLimitations.tsx    # Nuance and uncertainty disclosures
│   ├── data/                              # Type-Safe Research Records
│   │   ├── baselines.ts                   # Per-prompt water/energy constants
│   │   ├── research-papers.ts             # Peer-reviewed bibliography
│   │   └── container-thresholds.ts        # Volumes for container morphing
│   ├── lib/                               # Pure Business Logic (No React)
│   │   ├── calculator/
│   │   │   ├── engine.ts                  # Pure mathematical calculation functions
│   │   │   ├── formulas.ts                # Carbon, energy, and water equations
│   │   │   ├── units.ts                   # Metric <-> Imperial conversion utilities
│   │   │   └── types.ts                   # Strict TypeScript domain interfaces
│   │   ├── hooks/                         # Custom React Hooks
│   │   │   ├── useScrollSpy.ts            # Active section observer
│   │   │   ├── useReducedMotion.ts        # Accessibility motion detector
│   │   │   └── useCalculator.ts           # Reactive calculation hook
│   │   └── utils/
│   │       └── formatters.ts              # Number & unit formatting
│   └── types/
│       └── index.ts                       # Shared global typings
└── tests/                                 # Automated Test Suite
    ├── calculator-engine.test.ts          # Pure formula validation
    ├── units.test.ts                      # Conversion accuracy tests
    └── research-data.test.ts              # Research schema & DOI integrity tests
```

---

## 5. Data Architecture & Domain Models

### 5.1 Calculator Domain Types (`lib/calculator/types.ts`)

```typescript
export interface EnvironmentalBaselines {
  // Water Consumption in milliliters (mL) per prompt
  waterMlPerPrompt: {
    direct: number;   // Evaporative data center cooling (on-site)
    indirect: number; // Power grid generation cooling (off-site)
    total: number;    // direct + indirect
  };
  // Electricity Consumption in Kilowatt-Hours (kWh) per prompt
  electricityKWhPerPrompt: number;
  // Carbon Footprint in Grams CO2 equivalent (gCO2e) per prompt
  carbonGramsPerPrompt: {
    averageGrid: number;
    coalHeavyGrid: number;
    cleanGrid: number;
  };
}

export interface CalculatorInputs {
  promptsPerDay: number;
  modelTier: 'standard' | 'lightweight' | 'reasoning';
  gridType: 'average' | 'coalHeavy' | 'clean';
  timeHorizon: 'day' | 'month' | 'year';
  unitSystem: 'metric' | 'imperial';
}

export interface CalculatorOutputs {
  promptsCount: number;
  waterVolumeLiters: number;
  waterVolumeGallons: number;
  electricityKWh: number;
  carbonKgCO2e: number;
  // Real-world physical equivalence anchors
  equivalents: {
    bottles500ml: number;
    smartphonesCharged: number;
    drivingMilesEquivalent: number;
    containerClass: 'droplet' | 'bottle' | 'jug' | 'bathtub' | 'pool';
  };
}
```

### 5.2 Research Paper Schema (`data/research-papers.ts`)

```typescript
export interface ResearchCitation {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  year: number;
  doiOrUrl: string;
  category: 'water' | 'energy' | 'carbon' | 'creativity' | 'data-center';
  keyFinding: string;
  methodologySummary: string;
  limitationsDisclosed: string;
  verified: boolean;
}
```

---

## 6. Mathematical Calculation Engine

The calculator separates prompt calculations into direct and indirect components using empirical formulas derived from peer-reviewed literature:

### 6.1 Water Equation (Li et al., UC Riverside, 2023)
$$\text{Total Water (mL)} = N_{\text{prompts}} \times (W_{\text{direct}} + W_{\text{indirect}}) \times M_{\text{model}}$$
- $W_{\text{direct}}$: Median $10.0\,\text{mL}$ per prompt (on-site cooling towers).
- $W_{\text{indirect}}$: Median $15.0\,\text{mL}$ per prompt (power plant thermoelectric cooling).
- $M_{\text{model}}$: Multiplier (Lightweight: $0.3\times$, Standard: $1.0\times$, Reasoning/Multi-turn: $2.5\times$).

### 6.2 Energy Equation (de Vries, Joule, 2023; Luccioni et al., 2023)
$$E_{\text{total}} (\text{kWh}) = N_{\text{prompts}} \times E_{\text{prompt}} \times M_{\text{model}}$$
- $E_{\text{prompt}}$: Median $0.003\,\text{kWh}$ per standard prompt.

### 6.3 Carbon Emissions Equation (IEA & US EPA eGRID factors)
$$C (\text{g CO}_2\text{e}) = E_{\text{total}} \times I_{\text{grid}}$$
- $I_{\text{grid}}$: Grid carbon intensity ($\approx 385\,\text{g CO}_2\text{e/kWh}$ US average; $\approx 750\,\text{g}$ coal-heavy; $\approx 50\,\text{g}$ renewable).

---

## 7. Animation Architecture & Performance Engine

```
[Viewport Scroll / User Interaction]
                 |
        [requestAnimationFrame]
                 |
   +-------------+-------------+
   |                           |
[Hardware-Accelerated CSS]  [Motion Transform Hooks]
 - opacity                   - useScroll (throttled)
 - transform: translate3d    - useTransform (smooth spring)
 - transform: scale          - AnimatePresence (conditional exits)
                 |
     [Render: 60fps/120fps]
```

1. **Passive Scroll Listening:** Never attach heavy state updates directly to window `scroll` events. Use Framer Motion's internal `useScroll` pipeline, which syncs directly with the browser's render loop via `requestAnimationFrame`.
2. **GPU Isolation:** Visual layers (Earth rim glow, water droplet, container SVG liquid) use `will-change: transform, opacity` and hardware-accelerated transforms to bypass CPU layout passes.
3. **Motion Kill-Switch:** A global CSS class `.reduced-motion` and React context disables all physics-springs and transitions when triggered or when `prefers-reduced-motion` is detected.

---

## 8. Testing Strategy

```
+-------------------------------------------------------------------------------+
|                             TESTING PYRAMID                                   |
+-------------------------------------------------------------------------------+
|  E2E / Visual Smoke (Browser Inspection & Responsive Viewport Check)           |
+-------------------------------------------------------------------------------+
|  Integration Tests (Calculator Slider Interaction -> Visual Container Update)  |
+-------------------------------------------------------------------------------+
|  Accessibility Tests (axe-core audit, WCAG contrast verification)             |
+-------------------------------------------------------------------------------+
|  Unit Tests (Pure Calculation Engine, Unit Conversions, Data Integrity)       |
+-------------------------------------------------------------------------------+
```

- **Unit Testing (Vitest):**
  - Verify calculation outputs across edge inputs ($0, 1, 25, 500, 10000$ prompts).
  - Verify unit conversion accuracy ($1\,\text{L} = 0.264172\,\text{gal}$).
  - Verify all research citations contain valid URLs, authors, and non-empty summaries.
- **Accessibility & Quality Audits:**
  - Automated Lighthouse CI testing for Performance $\ge 95$, Accessibility $\ge 98$, Best Practices $\ge 95$, SEO $\ge 95$.

---

## 9. Deployment Strategy

- **Platform:** Vercel / Cloudflare Pages (Zero-cost tier).
- **Target:** Static HTML/JS Export (`output: 'export'` or edge pre-rendered).
- **Security Headers:**
  - `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; font-src 'self' data:;`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Asset Pipeline:** Next.js Image Optimization + WebP/AVIF compression.
