# Software Requirements Specification (SRS)

**Project:** AI — The Hidden Cost  
**Standard:** IEEE 830 / ISO/IEC/IEEE 29148 Compliant  
**Version:** 1.0.0  
**Status:** Architecture Baseline

---

## 1. System Overview & Scope

"AI — The Hidden Cost" is a responsive, highly performant, accessible single-page web application. It guides the user along an intellectual and sensory journey, translating abstract data center metrics (joules, liters of evaporative cooling, grams of $CO_2e$) and cognitive psychology research into palpable visual representations.

---

## 2. Functional Requirements (FR)

### 2.1 Navigation & Global Controls
- **FR-NAV-01 (Fixed Header):** The application shall render a persistent, semi-transparent navigation bar with a subtle backdrop blur (`backdrop-blur-md`).
- **FR-NAV-02 (Section Anchors):** Navigation shall provide jump links to:
  1. `#hero` ("Overview")
  2. `#environmental-impact` ("Physical Toll")
  3. `#calculator` ("Personal Impact")
  4. `#human-creativity` ("Cognitive Cost")
  5. `#research` ("Methodology & Sources")
- **FR-NAV-03 (Scroll Spy):** The active navigation indicator shall update automatically based on the viewport's intersection with section thresholds.
- **FR-NAV-04 (Accessibility Controls):** The header shall feature a toggle for Reduced Motion (`Prefers-Reduced-Motion` override) and a unit preference toggle (Metric: Liters/mL/km vs Imperial: Gallons/fl oz/miles).

### 2.2 Hero Experience (Cinematic Opening)
- **FR-HERO-01 (Cinematic Timeline):** On initial load, a 3–5 second orchestrated sequence shall play:
  - $t=0.0s$: Absolute dark canvas with subtle starfield/nebula luminance.
  - $t=1.0s$: Earth curvature emerges with deep blue atmospheric rim glow.
  - $t=2.5s$: A suspended water droplet condenses and falls towards the earth horizon.
  - $t=3.8s$: Ripple dissipation revealing the primary headline: *"Every AI Answer Has a Cost"*.
- **FR-HERO-02 (Non-Blocking Bypass):** Users may bypass the opening animation at any point by scrolling, clicking "Explore", or pressing `Space` / `Esc`.
- **FR-HERO-03 (Reduced-Motion Fallback):** When `prefers-reduced-motion: reduce` is active or toggled, the timeline is bypassed, rendering the static Earth artwork and headline immediately.

### 2.3 Section 1: Environmental Impact Visualization
- **FR-ENV-01 (Core Metrics Triad):** The section shall present three primary footprint indicators per query:
  1. **Water Consumption:** Median 500 mL per 20–50 prompts (direct on-site evaporation + indirect off-site generation).
  2. **Electricity Demand:** Estimated 0.003 to 0.01 kWh per standard LLM query (compared to ~0.0003 kWh for Google Search).
  3. **Carbon Intensity:** Estimated 1.5 to 4.3 grams of $CO_2$ equivalent per prompt.
- **FR-ENV-02 (Direct vs. Indirect Water Breakdown):** The section shall provide an interactive diagram or toggle distinguishing:
  - *Direct:* On-site data center cooling towers evaporating potable municipal water.
  - *Indirect:* Thermal/fossil power plant cooling required to generate the electricity powering the compute servers.
- **FR-ENV-03 (Interactive Equivalence Benchmarks):** Provide visual context comparisons (e.g., "1 hour of AI interaction $\approx$ charging a smartphone $3\times$" or "cooling 1 query $\approx$ sipping 1 ice cube").
- **FR-ENV-04 (Evidence Footnotes):** Every data card must feature a clickable citation pill linking directly to its academic entry in Section 4.

### 2.4 Section 2: Interactive Environmental Calculator
- **FR-CALC-01 (Primary Input):** The user shall be provided a responsive slider and numerical input field for "Daily AI Prompts" (range: 1 to 500, default: 25 prompts/day).
- **FR-CALC-02 (Preset Scenarios):** Provide one-click lifestyle presets:
  - *Casual User:* 5 prompts/day (light search/summary)
  - *Knowledge Worker / Student:* 25 prompts/day (writing, research)
  - *Power Coder / Creator:* 80 prompts/day (code generation, iterative debugging)
  - *Enterprise Team (10 people):* 400 prompts/day
- **FR-CALC-03 (Adjustable Assumptions Drawer):** An expandable "Parameters & Assumptions" accordion allowing advanced users to adjust:
  - Model class: Lightweight (e.g., Gemini Flash / 8B), Standard (GPT-4o / Claude Sonnet), Heavy/Reasoning (o1 / Gemini Ultra).
  - Grid Cleanliness: US Average, Coal-heavy, Hydro/Renewable-heavy.
- **FR-CALC-04 (Time Horizon Toggle):** Display outputs in Daily, Monthly, and Annualized projections.
- **FR-CALC-05 (Dynamic Container Metaphor Morphing):**
  The calculator visualizer dynamically morphs and fills containers based on cumulative water volume:
  - Level 1 ($< 1\,\text{L}$): Single 500ml water bottle
  - Level 2 ($1 - 20\,\text{L}$): Multiple water bottles or a 5-gallon water cooler jug
  - Level 3 ($20 - 200\,\text{L}$): Standard residential bathtub (~150 L)
  - Level 4 ($> 1,000\,\text{L}$): Tanker trucks or swimming pools
- **FR-CALC-06 (Formula Transparency & Reset):** Clear "How this is calculated" methodology drawer and a "Reset to defaults" button.

### 2.5 Section 3: Human Creativity & Cognitive Offloading
- **FR-CRIT-01 (Curated Editorial Narrative):** Scientific exposition on the unintended consequences of generative AI on human cognitive faculties.
- **FR-CRIT-02 (Idea Diversity & Homogenization Matrix):** Interactive side-by-side comparison illustrating:
  - Human divergent thinking: Wide semantic dispersion, unexpected analogies, idiosyncratic metaphors.
  - LLM probabilistic output: Centering on high-probability semantic clusters (loss of variance and "creative entropy").
- **FR-CRIT-03 (Cognitive Offloading Mechanics):** Visual explainer detailing:
  - Short-term cognitive efficiency gain vs. long-term skill atrophy.
  - The "Einstellung Effect" induced by early exposure to AI-generated answers.
- **FR-CRIT-04 (Balanced Scientific Perspective):** Explicit recognition of AI as an accelerator for ideation when paired with active critical human synthesis, avoiding one-sided technological determinism.

### 2.6 Section 4: Research Archive & Methodology
- **FR-RES-01 (Interactive Bibliography):** Filterable, searchable repository of all referenced academic papers, industry sustainability disclosures, and preprints.
- **FR-RES-02 (Metadata Fields per Entry):**
  - Paper Title & Authors
  - Peer-Reviewed Publication / Conference / Journal
  - Publication Year (2022–2025)
  - DOI / Permanent Canonical URL
  - Key Finding Summary
  - Methodological Limitations & Assumptions Disclosed
- **FR-RES-03 (Filter Categories):** Filter by topic: "Water Consumption", "Grid Electricity & Carbon", "Cognitive Impact & Psychology", "Data Center Architecture".

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Performance & Resource Efficiency
- **NFR-PERF-01 (Core Web Vitals):**
  - Largest Contentful Paint (LCP): $\le 1.8\,\text{s}$ on 4G network.
  - Cumulative Layout Shift (CLS): $\le 0.02$.
  - First Input Delay (FID) / Interaction to Next Paint (INP): $\le 100\,\text{ms}$.
- **NFR-PERF-02 (Total Bundle Budget):**
  - Initial JS bundle transfer size: $\le 160\,\text{kB}$ gzip.
  - Total first-load asset weight (including optimized SVG and textures): $\le 1.2\,\text{MB}$.
- **NFR-PERF-03 (Animation Framerate):** Constant 60fps on modern mobile browsers (iPhone 12+, Pixel 6+) and 120fps on ProMotion displays. No jank or main-thread locking during scroll.

### 3.2 Accessibility (WCAG 2.1 Level AA)
- **NFR-A11Y-01 (Color Contrast):** All text elements must achieve a minimum contrast ratio of $4.5:1$ against dark background surfaces (and $3:1$ for large headings).
- **NFR-A11Y-02 (Screen Reader Compatibility):** All slider controls, toggles, and dynamic calculation outputs must use correct ARIA attributes (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-live="polite"`).
- **NFR-A11Y-03 (Keyboard Navigation):** 100% of interactive widgets (sliders, toggles, modals, source filters) must be accessible via keyboard (`Tab`, `Shift+Tab`, `Arrow keys`, `Enter`, `Escape`) with visible focus rings.
- **NFR-A11Y-04 (Motion Sensitivity):** Honor system `prefers-reduced-motion: reduce` by replacing all spring/kinetic transitions with subtle instantaneous fades.

### 3.3 Security, Privacy & Compliance
- **NFR-SEC-01 (Zero Telemetry):** No external third-party scripts, advertising trackers, or fingerprinting beacons.
- **NFR-SEC-02 (Static Asset Delivery):** Static site generation (SSG) with Immutable HTTP caching headers for static assets.
- **NFR-SEC-03 (Content Security Policy):** Strict CSP preventing inline script execution and unauthorized outbound network calls.

### 3.4 Responsive Design & Cross-Browser Support
- **NFR-RESP-01 (Viewports):** Seamless layout adaptation from $320\,\text{px}$ (compact mobile) to $2560\,\text{px}+$ (ultra-wide 4K monitors).
- **NFR-RESP-02 (Browser Matrix):** Chrome/Chromium 110+, Safari/iOS Safari 16+, Firefox 115+, Edge 110+.

---

## 4. User Journey & Story Map

```
Stage 1: AWARENESS (Hero)
User lands -> Dark cinematic void -> Earth atmospheric glow -> Falling drop -> "Every AI Answer Has a Cost"
Emotional Trigger: Wonder shifted to accountability.

Stage 2: REALIZATION (Section 1)
User scrolls -> Physical infrastructure revealed (servers, cooling towers, power lines)
Data points: 500ml per session, electricity spikes, direct vs indirect cooling.
Emotional Trigger: Surprise ("I thought the cloud was ethereal").

Stage 3: PERSONALIZATION (Section 2 - Calculator)
User enters 30 prompts/day -> Sliders react -> Water container morphs from drop to bottle to bathtub.
Annual projection: 5,475 liters of freshwater.
Emotional Trigger: Direct agency & personal relevance.

Stage 4: INTELLECTUAL REFLECTION (Section 3 - Creativity)
User explores cognitive offloading -> Side-by-side human vs AI idea clusters -> Homogenization warning.
Emotional Trigger: Deeper psychological resonance.

Stage 5: VALIDATION & TRUST (Section 4 - Research)
User inspects scientific references -> Checks peer-reviewed DOIs -> Methodology limitations.
Emotional Trigger: Intellectual confidence and credibility.
```
