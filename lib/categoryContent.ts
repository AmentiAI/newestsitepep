// Substantive per-category buying-guide content. Category pages with a
// 2-sentence intro over a product grid were specifically demoted by the
// March 2026 core update — Google wants evidence the page helps decide.
//
// Each entry here is hand-written per category (there are only 6) and the
// structure varies per category so Google doesn't see a shared skeleton.

export interface CategoryQAndA {
  q: string
  a: string
}

export interface CategoryContent {
  /** Plain-text H1 override. Varies shape per category. */
  heading: string
  /** First paragraph shown above the grid. 80–160 words, unique per category. */
  intro: string
  /** What researchers typically weigh up in this class. */
  comparisonFramework: { label: string; detail: string }[]
  /** Pathway / mechanism primer. */
  mechanismPrimer: string
  /** Use-cases in research settings. */
  useCases: string[]
  /** Category-specific FAQs. */
  faqs: CategoryQAndA[]
  /** Where to read more on-site. */
  relatedReading: { label: string; href: string }[]
  /** Structural layout variant — what order the sections render in. */
  layout: 'framework-first' | 'mechanism-first' | 'usecase-first' | 'faq-inline'
}

const BY_SLUG: Record<string, CategoryContent> = {
  'fat-loss': {
    heading: 'Fat-loss and metabolic research peptides',
    intro:
      'Fat-loss research peptides sit at the intersection of incretin biology and energy-balance physiology. Most of the compounds in this class are studied for their interaction with the GLP-1 or GIP receptor — two of the best-characterised incretin pathways in the published pharmacology literature. Researchers working in this space typically compare analogs on potency, half-life, receptor selectivity, and published pharmacokinetic data. The catalogue here lists each compound at multiple dose strengths to support dose-response work, with lot-matched certificates of analysis from an independent lab. Nothing on this page is medical advice — these vials are sold strictly for in-vitro and laboratory research.',
    comparisonFramework: [
      {
        label: 'Receptor selectivity',
        detail:
          'Dual GIP/GLP-1 agonists (e.g. tirzepatide, retatrutide) behave differently in comparative studies than pure GLP-1 agonists — receptor profile is the first axis worth comparing before choosing a research compound.',
      },
      {
        label: 'Pharmacokinetics',
        detail:
          'Half-life and dosing cadence vary widely. Long-acting analogs (weekly) and short-acting variants each map to different research protocol designs. Check the published PK data, not just the compound name.',
      },
      {
        label: 'Endpoint fit',
        detail:
          'Satiety, gastric emptying, insulin-glucose coupling, energy expenditure — the best compound depends on which endpoint the protocol actually reads out.',
      },
      {
        label: 'Dose tier',
        detail:
          'Vial strength matters for reconstitution volume and working concentration. Low-dose tiers suit sub-chronic work; high-dose tiers are more common in chronic-dosing designs.',
      },
    ],
    mechanismPrimer:
      'GLP-1 receptor agonism activates the pancreatic β-cell via cAMP-PKA signalling, enhances glucose-dependent insulin secretion, and acts centrally via hindbrain and hypothalamic circuits to reduce food-intake. Dual GIP/GLP-1 agonists add a second incretin arm that is studied for complementary effects on adipocyte biology and lipid handling in peripheral tissues.',
    useCases: [
      'Pharmacokinetic comparison across analogs in rodent models',
      'Dose-response work on satiety and gastric-emptying endpoints',
      'Central-route (ICV) vs systemic-route protocol contrasts',
      'Receptor-binding kinetics work in cell-line assays',
      'Chronic-dosing energy-expenditure studies',
    ],
    faqs: [
      {
        q: 'How are GLP-1 and GIP/GLP-1 agonists compared in the literature?',
        a: 'Published comparisons typically measure weight, food intake, insulin response, and in some designs energy expenditure. Dual agonists (GIP + GLP-1) produce different profiles in several rodent studies versus GLP-1-only analogs, though direct comparison depends heavily on dose and dosing cadence.',
      },
      {
        q: 'Why do these compounds come in such different vial strengths?',
        a: 'Research protocols vary from microgram-range cell-line work to milligram-range chronic-dosing rodent studies. Offering multiple strengths reduces dilution error and lets researchers match vial size to the protocol they actually run.',
      },
      {
        q: 'What does a lot-matched COA include?',
        a: 'A certificate of analysis is an independent lab report confirming identity and purity, usually by HPLC and mass spectrometry. Lot-matched means the report corresponds to the specific batch you receive — not a generic product-line report.',
      },
    ],
    relatedReading: [
      { label: 'Semaglutide vs tirzepatide', href: '/guides/semaglutide-vs-tirzepatide' },
      { label: 'Peptides for fat loss', href: '/guides/peptides-for-fat-loss' },
      { label: 'Dosage calculator', href: '/dosage-calculator' },
    ],
    layout: 'framework-first',
  },

  recovery: {
    heading: 'Recovery and soft-tissue-repair research peptides',
    intro:
      'Research in the recovery class centres on compounds studied in pre-clinical models of tendon, ligament, gut, and vascular repair. Two of the longest-studied peptides in this space are BPC-157 and TB-500, which appear frequently as a paired protocol because they are thought to act on complementary arms of the repair response — angiogenic signalling on one side, actin sequestration and cellular migration on the other. The literature record spans rodent, porcine, and in-vitro wound-healing assays, and most protocols measure mechanism-level endpoints (vessel density, collagen remodelling, re-epithelialisation) rather than human outcomes.',
    comparisonFramework: [
      {
        label: 'Angiogenic vs migratory',
        detail:
          'BPC-157 is studied primarily as an angiogenic compound via the VEGFR2 axis. TB-500 is studied for actin-sequestration and cell migration. The two are not redundant — which pathway matters depends on the repair endpoint.',
      },
      {
        label: 'Route of administration',
        detail:
          'BPC-157 is unusually stable at gastric pH so the literature covers both oral-gavage and systemic routes. TB-500 is typically studied systemically. Route of administration changes the relevant PK window.',
      },
      {
        label: 'Single vs blended protocols',
        detail:
          'Many published comparisons study BPC-157 + TB-500 side by side, and pre-mixed blends exist for protocols that require both pathways without multiple vials.',
      },
    ],
    mechanismPrimer:
      'The repair response is a multi-stage biological process — haemostasis, inflammation, proliferation, remodelling — and different peptides act at different stages. Compounds here span angiogenic signalling (new vessel formation), cytoskeletal regulation (cell migration and adhesion), and cytokine-level inflammation modulation. Researchers designing protocols tend to map the compound to the stage they are measuring.',
    useCases: [
      'Comparative tendon-to-bone healing research',
      'Gut-barrier and mucosal repair models',
      'Dermal wound-closure and re-epithelialisation assays',
      'Vascular-endpoint studies (angiogenesis, vessel density)',
      'Comparative inflammation-resolution work',
    ],
    faqs: [
      {
        q: 'Why are BPC-157 and TB-500 so often paired?',
        a: 'They are thought to hit different, complementary arms of the repair response — BPC-157 is angiogenic (via the VEGFR2 axis), TB-500 acts on G-actin sequestration and cell migration. Comparative studies frequently report additive outcomes in soft-tissue repair models.',
      },
      {
        q: 'Is there a difference between TB-500 and Thymosin Beta-4?',
        a: 'TB-500 is an active fragment of the full 43-residue Thymosin Beta-4 peptide. The two are often used interchangeably in discussion, but the synthetic TB-500 fragment is what most labs work with.',
      },
      {
        q: 'Does recovery research translate directly to human outcomes?',
        a: 'Most of the recovery literature here is pre-clinical — rodent, porcine, or cell-line. Translational claims require clinical data which is not the scope of these research compounds.',
      },
    ],
    relatedReading: [
      { label: 'BPC-157 vs TB-500', href: '/guides/bpc-157-vs-tb-500' },
      { label: 'Reconstitution guide', href: '/reconstitution-guide' },
      { label: 'Peptide stacks', href: '/guides/peptide-stacks' },
    ],
    layout: 'mechanism-first',
  },

  longevity: {
    heading: 'Longevity and cellular-senescence research peptides',
    intro:
      'Longevity-class research peptides are studied across the core pathways of biological ageing — cellular senescence, mitochondrial quality control, NAD+ salvage and sirtuin activation, epigenetic-clock readouts, and autophagy regulation. Most of the published work is pre-clinical and pathway-focused: compounds are evaluated for their effect on biomarker panels and mechanism-level endpoints rather than lifespan directly. This makes the category heavier on mechanism primers than on dose-response data. Each vial in this catalogue is lot-matched to an independent certificate of analysis.',
    comparisonFramework: [
      {
        label: 'Pathway target',
        detail:
          'Senolytics (e.g. epitalon-adjacent work), NAD+ precursors, AMPK/mTOR modulators, and telomere-biology compounds each hit a different node. Pick the compound by the pathway the protocol is measuring.',
      },
      {
        label: 'Biomarker readout',
        detail:
          'Epigenetic-age clocks, inflammation-of-ageing panels, mitochondrial-function assays, and senescence-associated markers are not interchangeable. Confirm the published studies read out what the protocol actually measures.',
      },
      {
        label: 'Model organism',
        detail:
          'Research in this class spans cell-line, rodent, and in-vitro systems. The relevant PK and receptor behaviour changes between them — model choice matters.',
      },
    ],
    mechanismPrimer:
      'Biological ageing research leans on a handful of well-characterised pathway hubs: the mTOR/AMPK nutrient-sensing axis, the NAD+/sirtuin deacetylase system, autophagy (ULK1, Beclin-1), mitochondrial biogenesis (PGC-1α), and cell-cycle / senescence checkpoints. Longevity-class research peptides generally map to one of these hubs rather than acting systemically, and the choice of compound typically mirrors the choice of biological question.',
    useCases: [
      'Senescence-marker readouts in cell-line models',
      'Mitochondrial-turnover assays',
      'Cross-compound comparison in parallel-pathway designs',
      'NAD+ salvage and sirtuin-activation research',
      'Epigenetic-clock readouts in rodent models',
    ],
    faqs: [
      {
        q: 'Do longevity peptides extend lifespan?',
        a: 'Most of the published work measures pathway-level endpoints — senescence markers, mitochondrial turnover, inflammation panels — rather than lifespan directly. Translational longevity claims require much more data than the pre-clinical literature currently supports.',
      },
      {
        q: 'What does "senolytic" mean in this research context?',
        a: 'A senolytic is a compound studied for its ability to selectively clear senescent cells — cells that have entered a non-dividing, pro-inflammatory state. Selectivity over healthy cells is the main comparison axis in published senolytic work.',
      },
      {
        q: 'How are NAD+ precursors compared in the literature?',
        a: 'By bioavailability, intracellular NAD+ lift, and downstream sirtuin activation. Not all precursors produce the same NAD+ lift in published comparisons.',
      },
    ],
    relatedReading: [
      { label: 'Peptide glossary', href: '/peptide-glossary' },
      { label: 'All guides', href: '/guides' },
      { label: 'Reconstitution guide', href: '/reconstitution-guide' },
    ],
    layout: 'usecase-first',
  },

  growth: {
    heading: 'Growth-axis and hypertrophy research peptides',
    intro:
      'Growth-axis peptides in this catalogue are studied for their interaction with the GH–IGF-1 system. Secretagogues like CJC-1295 and ipamorelin act upstream at the pituitary, while receptor-binding compounds work on the GHRH-receptor directly. Published comparisons tend to measure pulsatile GH release, downstream IGF-1 phosphorylation, and in some designs muscle-protein-synthesis endpoints. This class is heavy on comparative potency mapping — most research questions reduce to which compound produces the cleanest pulse with the most predictable downstream signalling.',
    comparisonFramework: [
      {
        label: 'Secretagogue vs receptor agonist',
        detail:
          'Secretagogues drive endogenous GH pulse. Receptor agonists bypass the pulse. Protocol choice depends on whether the research question is about release dynamics or downstream signalling.',
      },
      {
        label: 'Half-life',
        detail:
          'CJC-1295 with DAC has a substantially longer half-life than ipamorelin. Long-acting analogs change the dosing schedule — and the pulse profile — considerably.',
      },
      {
        label: 'IGF-1 downstream',
        detail:
          'Protocols reading out IGF-1 phosphorylation vs GH release alone require different dosing windows. The literature supports both designs.',
      },
    ],
    mechanismPrimer:
      'Growth-hormone release is pulsatile and tightly regulated by two counter-regulatory signals at the pituitary — GHRH stimulates release, somatostatin suppresses it. Secretagogue research peptides act through the GHRH-R or GHS-R pathways and differ in which of these arms they engage. Downstream, GH binds hepatic receptors to drive IGF-1, which is the more commonly measured endpoint in chronic-dosing work.',
    useCases: [
      'Pulsatile GH release research in rodent models',
      'Comparative secretagogue potency mapping',
      'IGF-1 downstream signalling studies',
      'Receptor-binding kinetics work',
      'Muscle-protein-synthesis endpoint research',
    ],
    faqs: [
      {
        q: 'What is the difference between a GH secretagogue and a GH receptor agonist?',
        a: 'A secretagogue triggers endogenous GH release (preserves pulse), while a receptor agonist acts directly at downstream receptors. The two produce very different research profiles and suit different questions.',
      },
      {
        q: 'Why combine CJC-1295 and ipamorelin in protocols?',
        a: 'They act through complementary mechanisms — CJC-1295 via the GHRH-R and ipamorelin via the GHS-R. Combined, they produce a larger GH pulse in published rodent research than either alone.',
      },
      {
        q: 'Is IGF-1 a reliable endpoint in chronic-dosing research?',
        a: 'IGF-1 integrates the GH pulse over time, making it a more stable readout than instantaneous GH measurement. Most chronic-dosing protocols use it as the primary endpoint.',
      },
    ],
    relatedReading: [
      { label: 'Peptides for muscle growth', href: '/guides/peptides-for-muscle-growth' },
      { label: 'Reconstitution guide', href: '/reconstitution-guide' },
      { label: 'Dosage calculator', href: '/dosage-calculator' },
    ],
    layout: 'faq-inline',
  },

  cognitive: {
    heading: 'Cognitive and nootropic research peptides',
    intro:
      'Cognitive research peptides sit at the intersection of cholinergic pharmacology, neuroplasticity, and cerebrovascular research. Compounds in this category are studied in cell-line electrophysiology (LTP, LTD), rodent behavioural models (Morris water maze, novel-object recognition), and molecular assays of BDNF / NGF expression. The catalogue here includes both long-studied nootropics like semax and selank and more recent research compounds that appear in comparative behavioural work.',
    comparisonFramework: [
      {
        label: 'Target pathway',
        detail:
          'Cholinergic, BDNF/NGF, glutamatergic, and cerebrovascular — each compound maps to a primary pathway. Nootropic comparison starts here.',
      },
      {
        label: 'Behavioural vs electrophysiological readout',
        detail:
          'Some compounds have strong electrophysiological data (LTP) with sparse behavioural data, and vice versa. Research design should match the compound to the available evidence base.',
      },
      {
        label: 'Route of administration',
        detail:
          'Intranasal, systemic, and ICV routes appear across nootropic research. Route choice affects both PK and which brain regions see relevant concentrations.',
      },
    ],
    mechanismPrimer:
      'The cognitive-research literature weighs cholinergic turnover, hippocampal long-term potentiation, and neurotrophic factor expression as core mechanism-level endpoints. BDNF and NGF are the two most frequently measured neurotrophic factors in this space, and many compounds are compared by their effect on BDNF expression in cortical or hippocampal tissue.',
    useCases: [
      'Acetylcholine-turnover assays in cortical tissue',
      'Hippocampal LTP and synaptic-plasticity electrophysiology',
      'Behavioural working-memory research in rodent models',
      'BDNF / NGF expression studies',
      'Neurovascular-coupling and perfusion research',
    ],
    faqs: [
      {
        q: 'Are nootropic research peptides the same as consumer nootropics?',
        a: 'No. The compounds in this catalogue are research-grade vials sold strictly for in-vitro and laboratory use. Consumer nootropics are a separate category with different regulation and labelling.',
      },
      {
        q: 'What does BDNF measure in this research?',
        a: 'Brain-Derived Neurotrophic Factor is a widely-used readout of neuroplasticity-relevant signalling. Many cognitive-research compounds are compared by their effect on BDNF expression in cortical or hippocampal tissue.',
      },
      {
        q: 'Why do some nootropic compounds use intranasal administration in research?',
        a: 'Intranasal delivery bypasses the blood-brain barrier for some peptides and is frequently used in published rodent and in-vitro work where brain-region concentration matters more than systemic PK.',
      },
    ],
    relatedReading: [
      { label: 'Peptide glossary', href: '/peptide-glossary' },
      { label: 'Looksmaxxing peptides', href: '/looksmaxxing' },
      { label: 'Guides', href: '/guides' },
    ],
    layout: 'framework-first',
  },

  blends: {
    heading: 'Pre-mixed research peptide blends',
    intro:
      'Pre-mixed blends are research peptides supplied in a single vial at a documented ratio. The main use-case is comparative protocol work where multiple pathways are studied in parallel — rather than reconstituting and dosing two or three vials separately, researchers use a single blend to reduce variable count across arms. Every blend here lists its constituents with per-compound purity verification in the lot-matched certificate of analysis.',
    comparisonFramework: [
      {
        label: 'Ratio',
        detail:
          'The ratio of constituents is the most important axis — the same two peptides at different ratios produce different signalling profiles in published blended-protocol studies.',
      },
      {
        label: 'Pathway coverage',
        detail:
          'Blends make sense when the two peptides hit complementary pathways (e.g. BPC-157 + TB-500). If the pathways overlap heavily, a single compound is often cleaner research-wise.',
      },
      {
        label: 'Reconstitution volume',
        detail:
          'Blend vials typically carry more total peptide mass — reconstitution volume and working-concentration calculations need to match the sum, not a single compound.',
      },
    ],
    mechanismPrimer:
      'Multi-compound research is a distinct design choice: the blend lets the researcher study the sum of two pathways without introducing inter-vial dosing variance. This matters especially in repair-class protocols where BPC-157 and TB-500 are studied together, and in growth-axis work where CJC-1295 and ipamorelin are paired for a larger GH pulse.',
    useCases: [
      'Comparative repair-pathway protocols',
      'Parallel-signalling research designs',
      'GH-pulse optimisation in growth-axis work',
      'Pathway-crossover studies',
      'Efficiency-focused multi-endpoint protocols',
    ],
    faqs: [
      {
        q: 'Why use a blend instead of reconstituting two separate vials?',
        a: 'Reducing variable count — one vial, one reconstitution, one dose. In comparative protocols where the blend is the arm being tested, a pre-mixed vial removes inter-vial dosing variance from the design.',
      },
      {
        q: 'What does the certificate of analysis cover on a blended vial?',
        a: 'Per-compound identity and purity, the blend ratio, and the lot number. Each constituent is typically HPLC/MS verified independently.',
      },
      {
        q: 'Are blend ratios adjustable?',
        a: 'No — blends ship at the documented ratio per lot. Protocols requiring a different ratio typically reconstitute separate vials rather than relying on a blend.',
      },
    ],
    relatedReading: [
      { label: 'BPC-157 vs TB-500', href: '/guides/bpc-157-vs-tb-500' },
      { label: 'Peptide stacks', href: '/guides/peptide-stacks' },
      { label: 'Reconstitution guide', href: '/reconstitution-guide' },
    ],
    layout: 'mechanism-first',
  },
}

export function categoryContentFor(slug: string): CategoryContent | undefined {
  return BY_SLUG[slug]
}
