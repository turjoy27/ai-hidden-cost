/**
 * AI — The Hidden Cost: Creativity & Cognitive Research Data
 *
 * Empirical psychometric scenarios based on Divergent Thinking tests (Guilford, Torrance, Runco)
 * and recent peer-reviewed LLM creativity literature (Doshi & Hauser, 2024; Girotra et al., 2023).
 */

export interface IdeaComparisonScenario {
  id: string;
  promptTitle: string;
  taskType: "Alternative Uses Task" | "Conceptual Metaphor" | "Product Archetype Innovation";
  promptDescription: string;
  humanResponse: {
    title: string;
    description: string;
    semanticVarianceScore: number; // 0.0 to 1.0 (dispersion from baseline centroid)
    traits: string[];
    psychologicalMechanism: string;
  };
  aiResponse: {
    title: string;
    description: string;
    semanticVarianceScore: number;
    traits: string[];
    probabilisticMechanism: string;
  };
  synthesis: string;
  citationId: string;
}

export interface CognitivePillar {
  phase: string;
  title: string;
  subtitle: string;
  body: string;
  benefit: string;
  risk: string;
  citationId: string;
}

export const IDEA_COMPARISONS: IdeaComparisonScenario[] = [
  {
    id: "alt-uses-brick",
    promptTitle: "Re-imagining a Common Red Brick",
    taskType: "Alternative Uses Task",
    promptDescription: "A classic psychometric test of divergent thinking (Guilford AUT): Generate an unexpected, unconventional application for an ordinary building brick.",
    humanResponse: {
      title: "Ancient Pigment Palette & Fermentation Weight",
      description: "Grinding the fired clay into a warm ochre pigment for natural oil painting, or wrapping the sterilized brick in cheesecloth as a porous bacterial weight for pickling wild greens in an earthen crock.",
      semanticVarianceScore: 0.88,
      traits: ["Sensory-tactile analogy", "Historical-cultural retrieval", "Outlier semantic leap"],
      psychologicalMechanism: "Episodic memory integration: Humans recall cross-domain sensory and culinary traditions outside immediate structural paradigms.",
    },
    aiResponse: {
      title: "Modular Doorstop & Bookend Anchor",
      description: "Wrapping the brick in heavy felt fabric or painted canvas to serve as a rustic rustic doorstop, heavy paperweight, or decorative industrial bookend on an office bookshelf.",
      semanticVarianceScore: 0.38,
      traits: ["High statistical probability", "Functional utility focus", "Common design trope"],
      probabilisticMechanism: "Maximum-likelihood convergence: The model predicts tokens heavily associated with 'brick alternative use' in web corpora (doorstop, bookend, garden border).",
    },
    synthesis: "AI generates fluent, immediately practical ideas with zero latency, but human participants demonstrate significantly broader semantic variance and eccentric domain crossings.",
    citationId: "runco-2022-divergent",
  },
  {
    id: "concept-metaphor",
    promptTitle: "Metaphor for Sudden Grief",
    taskType: "Conceptual Metaphor",
    promptDescription: "Express the psychological disorientation of unexpected loss without using standard weather, ocean, or darkness clichés.",
    humanResponse: {
      title: "The Phantom Step in a Childhood Staircase",
      description: "The violent shock when your foot expects the solidity of a step in the dark and plunges through empty air instead, wrenching your knee before your mind understands that the floor was never there.",
      semanticVarianceScore: 0.91,
      traits: ["Somatosensory shock", "Spatial dislocation", "High idiosyncratic resonance"],
      psychologicalMechanism: "Embodied cognition: Human metaphor generation draws upon visceral physical trauma and proprioceptive bodily sensations.",
    },
    aiResponse: {
      title: "An Abrupt Static in an Old Radio Broadcast",
      description: "Like a favorite song playing on an analog car radio that abruptly cuts into piercing white static while driving through an unmapped desert canyon at dusk.",
      semanticVarianceScore: 0.44,
      traits: ["Cinematic aesthetic", "Syntactically polished", "Common literary archetype"],
      probabilisticMechanism: "Vector cosine proximity: Navigates semantic embeddings linking 'interruption', 'silence', and 'frequency cut' within trained aesthetic registers.",
    },
    synthesis: "Both metaphors evoke emotional poignancy. However, when 1,000 users ask an LLM for metaphors, outputs cluster around radio static, hollow vessels, and torn fabric, reducing societal metaphor diversity.",
    citationId: "doshi-2024-diversity",
  },
  {
    id: "novel-ritual",
    promptTitle: "Inventing an Urban Evening Transition Ritual",
    taskType: "Product Archetype Innovation",
    promptDescription: "Design a secular community evening ritual for dense city dwellers to decompress from remote digital work.",
    humanResponse: {
      title: "The 7:00 PM Copper Bell & Window Exchange",
      description: "A synchronized neighborhood tradition where apartment residents strike a resonant brass Tibetan bowl on their fire escapes, exchange quiet nods across alleyways, and switch off ambient router LEDs for exactly ten minutes.",
      semanticVarianceScore: 0.85,
      traits: ["Communal acoustic rhythm", "Physical-spatial interaction", "Anti-digital boundary"],
      psychologicalMechanism: "Social-spatial divergence: Humans invent rituals rooted in physical architecture, neighborhood acoustics, and tactile kinship.",
    },
    aiResponse: {
      title: "The Digital Sundown Journaling Circuit",
      description: "A timed 30-minute routine consisting of writing three gratitude bullets in an offline paper journal, preparing chamomile tea with lavender honey, and conducting 5 minutes of box-breathing to low-frequency binaural beats.",
      semanticVarianceScore: 0.34,
      traits: ["Wellness culture tropes", "Algorithmic lifestyle template", "Highly reproducible"],
      probabilisticMechanism: "Self-help corpus centroid: Pulls from high-frequency lifestyle blogs, productivity podcasts, and wellness routines.",
    },
    synthesis: "The AI proposal is frictionless and immediately actionable. The human proposal introduces poetic communal eccentricity that a statistical model rarely originates.",
    citationId: "girotra-2023-ideation",
  },
];

export const COGNITIVE_PILLARS: CognitivePillar[] = [
  {
    phase: "01 // The Augmentation Frontier",
    title: "Overcoming Friction & Cognitive Fatigue",
    subtitle: "The measurable upside of artificial cognitive assistance",
    body: "Generative AI excels at mitigating the 'blank page syndrome' and lowering activation barriers for initial ideation. Controlled trials show that lower-performing creators experience substantial performance uplifts (+8% to +15% in creative narrative fluency and structural coherence) when using LLMs as lateral sounding boards.",
    benefit: "Rapid combinatorial ideation, structural synthesis, and democratization of expressive fluency.",
    risk: "Premature satisfaction with generic first-pass completions before deeper idiosyncratic intuition activates.",
    citationId: "doshi-2024-diversity",
  },
  {
    phase: "02 // The Anchoring Trap",
    title: "The Einstellung Effect & Centroid Convergence",
    subtitle: "How early synthetic completions constrain human search spaces",
    body: "Cognitive psychology identifies the 'Einstellung Effect'—where exposure to an early, plausible solution anchors the mind's search space, blinding problem-solvers to novel alternative avenues. When millions of creators prompt the same underlying neural architectures, the collective pool of novel concepts experiences semantic homogenization.",
    benefit: "Guarantees a baseline floor of grammatical and structural competence.",
    risk: "Loss of collective creative variance; societal clustering around the median of training distribution.",
    citationId: "chatterjee-2023-offloading",
  },
  {
    phase: "03 // The Symbiosis Frontier",
    title: "Intentional Independent Synthesis",
    subtitle: "Sustaining human agency in an algorithmic ecosystem",
    body: "The scientific consensus does not claim AI inherently destroys human creativity. Rather, it demands conscious cognitive hygiene: engaging in unassisted divergent ideation first, using AI second as an adversarial critic or stress-tester, and retaining final editorial curation. True symbiosis treats AI as a sparring partner, never the authoritative creator.",
    benefit: "Leverages computational scale while safeguarding human idiosyncratic perspective.",
    risk: "Degradation of sustained deep cognitive endurance through excessive outsourcing of synthesis.",
    citationId: "runco-2022-divergent",
  },
];
