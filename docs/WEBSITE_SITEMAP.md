# Website Sitemap & User Experience Blueprint

**Project:** AI — The Hidden Cost  
**Format:** Single-Page Immersive Editorial Narrative (SPA / SSG)  
**Version:** 1.0.0

---

## 1. Single-Page Structural Hierarchy & Anchors

```
+===================================================================================+
|                               GLOBAL NAVIGATION BAR                               |
| [Logo: AI The Hidden Cost] [Physical Toll] [Calculator] [Cognitive] [Research]    |
|                                       [Reduced Motion Toggle] [Unit: Metric/Imp]  |
+===================================================================================+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 01. HERO STAGE (#hero)                                                            |
| - Cinematic Opening Timeline (3–5s non-blocking)                                  |
| - Earth in Dark Space (atmospheric rim shader / SVG glow)                         |
| - Suspended Water Droplet (fall & ripple dissipation)                             |
| - Primary Headline: "Every AI Answer Has a Cost"                                  |
| - Subtitle & Quick CTA: "Explore the Invisible Physical & Cognitive Footprint"    |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 02. SECTION 1: ENVIRONMENTAL IMPACT (#environmental-impact)                       |
| - Section Header: "The Physical Toll: Silicon, Water & Power"                     |
| - Triad Footprint Cards (Water mL, Electricity kWh, Carbon gCO2e)                 |
| - Interactive Water Anatomy (Direct Evaporative Cooling vs Indirect Grid Cooling) |
| - Physical Equivalence Benchmarks (iPhone charges, 500ml bottles, lightbulbs)     |
| - Interactive Server Rack Thermal Anatomy Diagram                                 |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 03. SECTION 2: PERSONAL ENVIRONMENTAL CALCULATOR (#calculator)                    |
| - Section Header: "Calculate Your AI Footprint"                                   |
| - Interactive Inputs:                                                             |
|   * Daily Prompts Slider (1 to 500 prompts/day)                                   |
|   * Lifestyle Presets (Casual, Knowledge Worker, Coder, Team)                     |
|   * Advanced Assumptions Drawer (Model Tier, Regional Grid Cleanliness)           |
| - Real-Time Dynamic Visualizer:                                                   |
|   * Morphing Water Container (Droplet -> 500mL Bottle -> 5-Gal Jug -> Bathtub)    |
| - Projection Outputs (Daily, Monthly, Annual Water & Carbon Totals)               |
| - Methodology & Formula Explanation Drawer ("How is this calculated?")            |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 04. SECTION 3: HUMAN CREATIVITY & COGNITIVE IMPACT (#human-creativity)            |
| - Section Header: "The Cognitive Cost: Ideation & Human Agency"                   |
| - Editorial Documentary Narrative Flow                                            |
| - Divergent Thinking vs. High-Probability Semantic Clusters (Interactive Graphic) |
| - Cognitive Offloading & The Einstellung Effect (Short-term ease vs Long-term)    |
| - Balanced Perspective: Symbiosis vs Atrophy                                      |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 05. SECTION 4: RESEARCH ARCHIVE & METHODOLOGY (#research)                         |
| - Section Header: "Verified Research & Academic Sources"                          |
| - Category Filter (All, Water Footprint, Electricity & Grid, Cognitive Science)   |
| - Academic Paper Cards:                                                           |
|   * Title, Authors, Journal/Conference, Year                                      |
|   * Key Quantitative Findings & Excerpt                                           |
|   * Methodological Disclosures & Scientific Limitations                           |
|   * Direct DOI / Canonical External Links                                         |
| - Academic Integrity Pledge (Zero fabricated numbers policy)                      |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| 06. EDITORIAL FOOTER                                                              |
| - Citation summary, Project open-source notice, Privacy declaration               |
| - Return to top button (#hero)                                                    |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Taxonomy & UI Specifications

### 2.1 Global Navigation (`components/common/Navbar.tsx`)
- **Visual Style:** Floating pill or full-width glassmorphism bar (`bg-slate-950/70 backdrop-blur-md border-b border-white/10`).
- **Interactive State Machine:**
  - `INITIAL`: Rendered at top of viewport.
  - `SCROLLED`: Height shrinks slightly ($64\,\text{px} \to 52\,\text{px}$), shadow intensifies.
  - `ACTIVE_SECTION`: Current section indicator underlines in cyan (`#38bdf8`).
  - `MOBILE_MENU_OPEN`: Fullscreen darkened overlay with large typography links.

### 2.2 Hero Cinematic Stage (`components/hero/HeroStage.tsx`)
- **State Machine:**
  - State 0: `BOOT` — Black background, stars twinkling.
  - State 1: `EARTH_RISE` ($t=1.0s$) — Earth sphere translates up, atmospheric blue rim expands.
  - State 2: `DROP_FALL` ($t=2.5s$) — Droplet animates vertically down with water refraction filter.
  - State 3: `RIPPLE_RESOLVE` ($t=3.8s$) — Shockwave ripple expands, headline fades in with stagger.
  - State 4: `INTERACTIVE` — Scroll indicator pulses, full UI active.
  - *Fallback State:* `STATIC_ACCESSIBLE` — Rendered instantly when reduced motion is preferred or user presses skip.

### 2.3 Environmental Calculator (`components/calculator/CalculatorContainer.tsx`)
- **State Machine & Data Flow:**
  ```
  [User drags slider (e.g. 40 prompts)]
                  |
                  v
       [useCalculator Hook]
                  |
    +-------------+-------------+
    |                           |
  [calculateWater(40)]   [calculateCarbon(40)]
    |                           |
    +-------------+-------------+
                  |
       [Volume: 1,000 mL/day -> 365 L/year]
                  |
                  v
       [VolumeVisualizer Container Tier]
       Tier: 'jug' (5-Gallon Office Water Cooler)
                  |
                  v
  [SVG morphs from Bottle to Cooler Jug with wave fill animation]
  ```

### 2.4 Container Morphing Visualization Matrix
| Cumulative Volume Tier | Real-World Object | Visual Representation | Visual Fill Behavior |
| :--- | :--- | :--- | :--- |
| **Tier 1 ($< 0.5\,\text{L}$)** | Single Water Droplet | Teardrop SVG with liquid shimmer | Droplet swells in size |
| **Tier 2 ($0.5\,\text{L} - 1.5\,\text{L}$)** | 500 mL Plastic Bottle | Reusable water bottle silhouette | Liquid fill height rises $0\% \to 100\%$ |
| **Tier 3 ($1.5\,\text{L} - 30\,\text{L}$)** | 5-Gallon (19L) Water Cooler Jug | Blue office water cooler jug | Water fills vertically, bubbles animate |
| **Tier 4 ($30\,\text{L} - 300\,\text{L}$)** | Residential Bathtub (~150L) | Minimalist bathtub outline | Water fills tub with gentle surface wave |
| **Tier 5 ($> 300\,\text{L}$)** | Multiple Bathtubs / Cistern | Cistern with numerical multiplier counter | "$\times 3.5$ Bathtubs" indicator |

---

## 3. Micro-Interactions & Modals

1. **Citation Pill Hover / Click (`components/common/CitationPill.tsx`):**
   - Hover: Mini popover revealing author, publication year, and finding quote.
   - Click: Smooth-scrolls viewport to the exact paper entry in Section 4, highlighting it with a brief pulse effect.
2. **Methodology Drawer (`components/calculator/MethodologyDrawer.tsx`):**
   - Accessible slide-out sheet displaying complete step-by-step mathematical formulas, constant values, and scholarly sources.
3. **Unit Switcher (Metric / Imperial):**
   - Global toggle switching all instances of Liters $\leftrightarrow$ Gallons, Kilograms $\leftrightarrow$ Pounds, Kilometers $\leftrightarrow$ Miles seamlessly without resetting user inputs.
