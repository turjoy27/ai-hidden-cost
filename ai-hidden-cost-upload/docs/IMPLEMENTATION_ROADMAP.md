# Implementation Roadmap & Milestone Plan

**Project:** AI — The Hidden Cost  
**Governance:** Sequential Milestone Gates (Strict adherence to Development Rules 1–7)  
**Version:** 1.0.0

---

## 1. Development Principles & Milestone Gates

In strict accordance with `PROJECT_REQUIREMENTS.md`:
- **Rule 1:** Work in distinct, well-defined milestones.
- **Rule 2:** Create an approved implementation plan before writing any production code.
- **Rule 3:** Never invent research data; every single metric must be verifiable.
- **Rule 4:** Keep calculations strictly isolated in `lib/calculator/` away from UI components.
- **Rule 5:** Test every major feature with automated test suites.
- **Rule 6:** Review the browser appearance visually after every milestone implementation.
- **Rule 7:** **Do not proceed to the next milestone without explicit verification and review of the current milestone.**

---

## 2. Milestone Breakdown & Progression Schedule

```
+-----------------------------------------------------------------------------------+
| MILESTONE 0: Research Verification & Data Architecture Baseline                  |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 0]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 1: Project Scaffolding, Tooling & Design System Foundations            |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 1]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 2: Cinematic Hero Experience & Opening Timeline                        |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 2]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 3: Section 1 - Environmental Impact & Physical Infrastructure Stage    |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 3]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 4: Section 2 - Decoupled Calculator Engine & Morphing Visualizer       |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 4]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 5: Section 3 - Human Creativity & Cognitive Offloading Editorial Flow   |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 5]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 6: Section 4 - Research Archive, Citation Cross-Linking & Methodology   |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 6]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 7: Automated Testing, Accessibility (WCAG AA), & Performance Tuning     |
+-----------------------------------------------------------------------------------+
                                         | [Review Gate 7]
                                         v
+-----------------------------------------------------------------------------------+
| MILESTONE 8: Static Production Build, Deployment Pipeline & Final Verification    |
+-----------------------------------------------------------------------------------+
```

---

## 3. Milestone Details & Deliverables

### Milestone 0: Research Verification & Data Baseline
- **Objective:** Curate, verify, and encode the academic foundation into type-safe data structures before generating UI.
- **Deliverables:**
  - `src/data/research-papers.ts`: Peer-reviewed papers with verified DOIs, authors, sample findings, and limitations (e.g., Pengfei Li et al., Alex de Vries, Sasha Luccioni, Torrance/Runco creativity research).
  - `src/data/baselines.ts`: Standard environmental coefficients (direct/indirect water in mL, kWh/prompt, grid carbon intensities).
  - `src/data/container-thresholds.ts`: Volume breakpoints and visual representation metadata.
- **Exit Criteria:** Zero placeholder or unverified statistics. All numbers mapped to reputable academic literature.

### Milestone 1: Project Scaffolding & Design System Foundations
- **Objective:** Initialize the Next.js application with TypeScript, Tailwind CSS, Motion, and cinematic design tokens.
- **Deliverables:**
  - Next.js App Router workspace configuration (`package.json`, `tsconfig.json`, `tailwind.config.ts`).
  - Dark cinematic visual theme: Deep blue, space black, electric cyan (`#38bdf8`), restrained organic green (`#10b981`).
  - Editorial typography configuration (Inter / Playfair / Geist Mono).
  - Global navigation bar (`Navbar.tsx`) with scrollspy and accessibility toggles.
  - Base responsive page shell (`src/app/page.tsx`).
- **Exit Criteria:** Application builds cleanly; zero TypeScript errors; responsive navigation bar renders across mobile and desktop.

### Milestone 2: Cinematic Hero Experience & Opening Timeline
- **Objective:** Construct the 3–5 second cinematic opening and hero narrative stage.
- **Deliverables:**
  - Earth emergence visual (`EarthVisual.tsx`) with atmospheric rim illumination.
  - Physics-based water droplet animation (`DropletAnimation.tsx`) condensing and falling.
  - Ripple shockwave resolve revealing the headline: *"Every AI Answer Has a Cost"*.
  - User-driven non-blocking bypass (scroll or click dismisses animation instantly).
  - First-class `prefers-reduced-motion` instantaneous fallback.
- **Exit Criteria:** Smooth 60fps opening on mobile and desktop; no scroll blocking; immediate accessibility fallback verified.

### Milestone 3: Section 1 — Environmental Impact Visualization
- **Objective:** Illustrate the biophysical toll of AI inference and data center cooling.
- **Deliverables:**
  - Metric Triad cards: Water (mL), Electricity (kWh), Carbon ($gCO_2e$) per query.
  - Direct vs. Indirect water consumption interactive explainer (cooling towers vs utility grid).
  - Relatable physical equivalence anchors (bottles of water, smartphone battery equivalents).
  - Interactive citation badges linked to Section 4.
- **Exit Criteria:** Visual clarity of physical footprint; responsive card layouts; zero layout shifts.

### Milestone 4: Section 2 — Decoupled Environmental Calculator
- **Objective:** Implement the isolated mathematical engine and interactive container morphing visualizer.
- **Deliverables:**
  - Pure calculation engine (`src/lib/calculator/engine.ts`, `formulas.ts`, `units.ts`) free of any React dependencies.
  - Accessible prompt slider ($1 - 500$ prompts) and preset buttons (Casual, Student, Coder, Team).
  - Advanced assumptions drawer (Model size multipliers, grid carbon profiles).
  - Time horizon switcher (Daily, Monthly, Annualized).
  - Dynamic container morph visualizer (Droplet $\to$ 500mL Bottle $\to$ 5-Gal Cooler Jug $\to$ Bathtub).
  - Transparent "How this is calculated" methodology modal.
- **Exit Criteria:** Calculation engine unit tested; visual container smoothly scales with volume; unit toggle works seamlessly.

### Milestone 5: Section 3 — Human Creativity & Cognitive Offloading
- **Objective:** Build the documentary/editorial narrative exploring generative AI's impact on human divergent thinking.
- **Deliverables:**
  - Editorial layout exploring cognitive offloading, skill atrophy, and the Einstellung Effect.
  - Interactive semantic cluster visualizer: Human divergent idea dispersion vs. LLM high-probability consensus.
  - Balanced scientific perspective highlighting both augmenting potential and homogenization risks.
- **Exit Criteria:** Scientifically objective tone; interactive graphic explains semantic clustering intuitively.

### Milestone 6: Section 4 — Research Archive, Citations & Methodology Explorer
- **Objective:** Provide a transparent, searchable, and filterable academic repository.
- **Deliverables:**
  - Filterable research bibliography categorized by topic (Water, Energy, Creativity).
  - Paper cards featuring authors, year, publication, key findings, and disclosed limitations.
  - Deep-link targets allowing citation pills from Sections 1–3 to highlight corresponding sources.
  - Clear methodology statements and evidence boundaries.
- **Exit Criteria:** Every citation pill across the website links correctly to its source card; filter operates instantaneously.

### Milestone 7: Automated Testing, Accessibility (WCAG AA), & Performance
- **Objective:** Validate calculation accuracy, audit accessibility, and optimize runtime performance.
- **Deliverables:**
  - Vitest test suite executing in $<2\,\text{s}$ covering calculation engine, unit conversions, and data integrity.
  - Automated accessibility verification (Lighthouse accessibility $\ge 98$, zero critical axe violations).
  - Image and bundle optimization (total first-load JS $< 160\,\text{kB}$ gzip).
- **Exit Criteria:** 100% test pass rate; full keyboard navigation functional; high contrast verified.

### Milestone 8: Static Production Build & Final Verification
- **Objective:** Build the production bundle and prepare the deployment pipeline.
- **Deliverables:**
  - Next.js static export build (`next build`).
  - Production readiness audit (meta tags, OpenGraph previews, favicon, security headers).
  - Deployment runbook for zero-cost static hosting (Vercel / Cloudflare Pages).
- **Exit Criteria:** Flawless static build output; zero console errors or warnings; verified responsive layout in browser.
