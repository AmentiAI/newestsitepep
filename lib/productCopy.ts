// Deterministic per-product unique copy.
//
// The auto-generated catalogue reuses 6 taglines across 139 products, which
// reads as duplicate content to Google. This module composes a tagline and
// short description per slug from category-scoped clause pools — different
// sentence shape, different opener, different closer for each product.
// Seeded by slug so builds stay stable.

import type { Parent } from './catalog'

function fnv1a(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)]
}

type CategoryKey = 'Fat Loss' | 'Recovery' | 'Longevity' | 'Growth' | 'Cognitive' | 'Blends' | 'Other'

function keyFor(cat: string): CategoryKey {
  if (cat === 'Fat Loss' || cat === 'Recovery' || cat === 'Longevity' || cat === 'Growth' || cat === 'Cognitive' || cat === 'Blends') {
    return cat
  }
  return 'Other'
}

// Per-category vocabulary pools. Each pool contributes a different clause slot,
// so products within the same category combine them into distinct sentences.
const TAGLINE_POOLS: Record<CategoryKey, { subjects: string[]; verbs: string[]; objects: string[] }> = {
  'Fat Loss': {
    subjects: [
      'Incretin pathway research',
      'GLP-1 axis work',
      'Energy-balance studies',
      'Appetite-signalling research',
      'Metabolic-rate investigations',
      'Body-composition research',
    ],
    verbs: [
      'centred on',
      'focused on',
      'investigating',
      'examining',
      'built around',
      'structured for',
    ],
    objects: [
      'incretin receptor pharmacology.',
      'glucose-insulin coupling in rodent models.',
      'gastric-emptying and satiety endpoints.',
      'central appetite-regulation pathways.',
      'energy-expenditure and nutrient-partition studies.',
      'cross-species metabolic comparisons.',
    ],
  },
  Recovery: {
    subjects: [
      'Soft-tissue repair research',
      'Wound-healing protocols',
      'Tendon and ligament studies',
      'Regenerative-signalling work',
      'Pre-clinical repair models',
      'Inflammation-resolution research',
    ],
    verbs: [
      'using',
      'exploring',
      'mapped to',
      'built around',
      'structured around',
      'centred on',
    ],
    objects: [
      'angiogenic and actin-dynamic pathways.',
      'collagen remodelling and vascular endpoints.',
      'comparative tendon-to-bone healing work.',
      'mucosal and gut-barrier models.',
      'migration, adhesion, and re-epithelialisation assays.',
      'cytokine modulation in injury research.',
    ],
  },
  Longevity: {
    subjects: [
      'Cellular-senescence research',
      'Anti-ageing pathway work',
      'Epigenetic-clock studies',
      'Telomere-biology research',
      'Mitochondrial-quality investigations',
      'Autophagy-pathway studies',
    ],
    verbs: [
      'exploring',
      'centred on',
      'mapped against',
      'structured around',
      'built around',
      'examining',
    ],
    objects: [
      'senolytic selectivity in vitro.',
      'mTOR / AMPK signalling balance.',
      'NAD+ salvage and sirtuin activation.',
      'mitochondrial turnover endpoints.',
      'systemic inflammation-of-ageing markers.',
      'regenerative-capacity assays.',
    ],
  },
  Growth: {
    subjects: [
      'Growth-axis research',
      'GH / IGF-1 pathway studies',
      'Somatotropic signalling work',
      'Hypertrophy-model research',
      'GHRH-receptor investigations',
      'Anabolic-signalling studies',
    ],
    verbs: [
      'focused on',
      'investigating',
      'centred on',
      'built for',
      'structured around',
      'mapped to',
    ],
    objects: [
      'pulsatile GH release in rodent models.',
      'IGF-1 downstream phosphorylation.',
      'muscle-protein-synthesis endpoints.',
      'receptor-binding kinetics.',
      'comparative secretagogue studies.',
      'cross-compound potency mapping.',
    ],
  },
  Cognitive: {
    subjects: [
      'Nootropic pathway research',
      'Cholinergic-system studies',
      'Neuroplasticity research',
      'BDNF / NGF pathway work',
      'Cognition-endpoint investigations',
      'Cerebrovascular research',
    ],
    verbs: [
      'centred on',
      'exploring',
      'built around',
      'structured for',
      'investigating',
      'examining',
    ],
    objects: [
      'acetylcholine-turnover assays.',
      'hippocampal LTP endpoints.',
      'working-memory behavioural models.',
      'BDNF expression in rodent cortex.',
      'neurovascular coupling studies.',
      'cross-compound cognition mapping.',
    ],
  },
  Blends: {
    subjects: [
      'Comparative-protocol research',
      'Multi-compound studies',
      'Pre-mixed stack work',
      'Pathway-pairing investigations',
      'Combination-repair research',
      'Parallel-signalling studies',
    ],
    verbs: [
      'paired to cover',
      'combining',
      'bundling',
      'structured around',
      'mapped to',
      'built for',
    ],
    objects: [
      'complementary repair pathways.',
      'additive-outcome endpoints.',
      'parallel signalling arms in one vial.',
      'comparative-study designs with fewer variables.',
      'pathway-crossover research.',
      'efficient multi-compound protocols.',
    ],
  },
  Other: {
    subjects: [
      'Research-compound work',
      'Pathway-mapping studies',
      'Receptor-signalling research',
      'Pre-clinical literature work',
      'Mechanistic-endpoint studies',
    ],
    verbs: ['centred on', 'built around', 'mapped to', 'structured for', 'investigating'],
    objects: [
      'published receptor models.',
      'signalling-pathway endpoints.',
      'pre-clinical comparative assays.',
      'literature-backed research designs.',
    ],
  },
}

type DescShape =
  | 'primary-first' // "<Name> is a <primary>. <secondary> <closer>."
  | 'context-first' // "In <context> research, <name> is studied for <primary>. <closer>."
  | 'closer-first' // "<Closer>. <Name> is used in <primary> work — <secondary>."
  | 'clause-chain' // "<Name> — <primary>, <secondary>, <closer>."

const DESC_SHAPES: DescShape[] = ['primary-first', 'context-first', 'closer-first', 'clause-chain']

const DESC_POOLS: Record<
  CategoryKey,
  { context: string[]; primary: string[]; secondary: string[]; closer: string[] }
> = {
  'Fat Loss': {
    context: [
      'incretin-biology',
      'metabolic-signalling',
      'appetite-regulation',
      'energy-balance',
      'glucose-homeostasis',
    ],
    primary: [
      'a research compound studied for GLP-1 receptor pharmacology',
      'a peptide examined in body-recomposition and appetite-signalling models',
      'used in laboratory work on gastric emptying and satiety endpoints',
      'a compound investigated for its effect on insulin-glucose coupling',
      'studied alongside other incretins for comparative potency work',
    ],
    secondary: [
      'Researchers commonly use it in rodent feeding-behaviour protocols',
      'It appears across published comparisons with other GLP-1 agonists',
      'The literature covers both systemic and central-route studies',
      'Protocols span acute-dose response and chronic-dosing designs',
      'Pharmacokinetic data in peer-reviewed work informs most research schedules',
    ],
    closer: [
      'ships lyophilized with a lot-matched third-party COA',
      'arrives as a sealed single-use vial, COA issued per lot',
      'is sold strictly for in-vitro and laboratory research use',
      'is supplied with batch-specific purity verification on request',
      'comes with independent HPLC / MS verification per lot',
    ],
  },
  Recovery: {
    context: [
      'soft-tissue-repair',
      'wound-healing',
      'regenerative-biology',
      'pre-clinical repair',
      'tissue-remodelling',
    ],
    primary: [
      'a research peptide studied in tendon, ligament, and gut-lining models',
      'examined for its role in angiogenic and actin-sequestration pathways',
      'used in comparative repair and re-epithelialisation assays',
      'investigated for cytokine-modulation endpoints in injury research',
      'studied in published work on collagen remodelling and vascular endpoints',
    ],
    secondary: [
      'Research designs commonly pair it with a complementary repair peptide',
      'The literature spans rodent, porcine, and in-vitro wound models',
      'It appears in both systemic and local-application research protocols',
      'Comparative studies typically measure migration and closure endpoints',
      'Published work focuses on pathway-level mechanism rather than clinical claims',
    ],
    closer: [
      'ships lyophilized, COA matched by lot number',
      'arrives as a single-use vial sealed and labelled with the lot ID',
      'is sold strictly for in-vitro and laboratory research',
      'is supplied with a batch-specific certificate of analysis',
      'comes with independent analytical verification on request',
    ],
  },
  Longevity: {
    context: [
      'cellular-senescence',
      'epigenetic-age',
      'telomere-biology',
      'mitochondrial-quality',
      'autophagy-pathway',
    ],
    primary: [
      'a compound studied in senolytic-selectivity and ageing-pathway work',
      'examined for mTOR / AMPK balance in pre-clinical ageing models',
      'investigated for NAD+ salvage and sirtuin-activation endpoints',
      'used in comparative mitochondrial-turnover research',
      'studied alongside other longevity peptides in parallel-assay work',
    ],
    secondary: [
      'The literature leans on markers of inflammation-of-ageing and senescence',
      'Protocols often combine biochemical endpoints with lifespan-adjacent assays',
      'Cross-compound comparisons are common in published longevity work',
      'Research typically uses rodent and cell-line models before translational claims',
      'Published data focuses on pathway readouts, not human outcomes',
    ],
    closer: [
      'ships lyophilized with a lot-matched COA',
      'arrives sealed in a single-use glass vial, per-lot verified',
      'is strictly for in-vitro and laboratory research use',
      'is supplied with independent lab verification per batch',
      'comes with a batch-specific certificate of analysis',
    ],
  },
  Growth: {
    context: [
      'growth-axis',
      'GH / IGF-1',
      'somatotropic-signalling',
      'hypertrophy-model',
      'anabolic-pathway',
    ],
    primary: [
      'a research peptide studied for pulsatile GH release in rodent models',
      'used in GHRH-receptor and secretagogue comparison work',
      'examined for IGF-1 phosphorylation and downstream signalling',
      'investigated in muscle-protein-synthesis endpoint studies',
      'compared against other growth-axis peptides in potency mapping',
    ],
    secondary: [
      'Researchers use it across acute-stimulation and chronic-dose protocols',
      'It appears in comparative studies of GHRH analogs',
      'The literature spans receptor-binding kinetics and systemic endpoints',
      'Protocols typically include both cell-line and whole-animal readouts',
      'Pharmacokinetic data from published work informs dosing-window choices',
    ],
    closer: [
      'ships lyophilized, COA provided per lot',
      'arrives as a sealed vial with lot-level traceability',
      'is sold strictly for in-vitro and laboratory research use',
      'is supplied with independent HPLC / MS verification',
      'comes with a batch-specific purity report',
    ],
  },
  Cognitive: {
    context: [
      'nootropic',
      'neuroplasticity',
      'cholinergic-system',
      'cerebrovascular',
      'cognition-endpoint',
    ],
    primary: [
      'a peptide studied for acetylcholine-turnover and cholinergic assays',
      'examined in hippocampal LTP and working-memory research',
      'used in BDNF / NGF pathway investigations',
      'investigated in neurovascular-coupling and perfusion models',
      'compared against other cognitive compounds in behavioural studies',
    ],
    secondary: [
      'The literature spans in-vitro electrophysiology and rodent behaviour work',
      'Protocols commonly pair biochemistry with behavioural endpoints',
      'Cross-compound comparisons are common in nootropic research designs',
      'Published work focuses on mechanism rather than consumer claims',
      'Research schedules lean on data from peer-reviewed cognition studies',
    ],
    closer: [
      'ships lyophilized with a lot-matched COA',
      'arrives sealed in a single-use vial, per-lot verified',
      'is strictly for in-vitro and laboratory research',
      'is supplied with a batch-specific certificate of analysis',
      'comes with independent purity verification on request',
    ],
  },
  Blends: {
    context: [
      'comparative-protocol',
      'multi-compound',
      'pathway-pairing',
      'combination-repair',
      'parallel-signalling',
    ],
    primary: [
      'a pre-mixed research stack combining complementary pathways in one vial',
      'used in comparative protocols that require parallel signalling coverage',
      'structured for repair research where multiple pathways are studied together',
      'examined in additive-outcome endpoint work',
      'investigated in multi-compound comparison designs',
    ],
    secondary: [
      'Research protocols use the blend to reduce variable count across arms',
      'The literature covers both single-compound and blended-protocol designs',
      'Cross-pathway work is the core use-case in published blend studies',
      'Protocols typically compare blend arms to single-compound controls',
      'Researchers lean on blends for efficiency in multi-endpoint designs',
    ],
    closer: [
      'ships lyophilized with a lot-matched COA for each constituent',
      'arrives as a sealed vial, blend ratio documented per lot',
      'is sold strictly for in-vitro and laboratory research',
      'is supplied with per-lot analytical verification',
      'comes with independent HPLC / MS data on request',
    ],
  },
  Other: {
    context: ['research', 'pre-clinical', 'pathway'],
    primary: [
      'a research compound examined in published pathway studies',
      'used in comparative receptor-signalling work',
      'investigated in pre-clinical mechanism research',
    ],
    secondary: [
      'The literature covers mechanism-level endpoints in cell and rodent models',
      'Protocols typically pair biochemistry with behavioural or functional readouts',
      'Published work focuses on pathway claims rather than consumer outcomes',
    ],
    closer: [
      'ships lyophilized with a lot-matched COA',
      'arrives sealed in a single-use vial, per-lot verified',
      'is strictly for in-vitro and laboratory research',
    ],
  },
}

export interface ProductCopy {
  tagline: string
  shortDescription: string
  /** Short ≤160 char meta description. */
  metaDescription: string
}

export function copyFor(p: Parent): ProductCopy {
  const seed = fnv1a(p.slug)
  const rand = mulberry32(seed)
  const key = keyFor(p.category)

  // Tagline: pick one clause from each pool, vary the joiner.
  const tPool = TAGLINE_POOLS[key]
  const subject = pick(rand, tPool.subjects)
  const verb = pick(rand, tPool.verbs)
  const object = pick(rand, tPool.objects)
  const joinerRoll = rand()
  const tagline =
    joinerRoll < 0.33
      ? `${subject} ${verb} ${object}`
      : joinerRoll < 0.66
        ? `${subject} — ${verb} ${object}`
        : `${verb.charAt(0).toUpperCase() + verb.slice(1)} ${object.replace(/\.$/, '')} — ${subject.toLowerCase()}.`

  // Description: compose from four independent clauses in a shape chosen by slug.
  const dPool = DESC_POOLS[key]
  const ctx = pick(rand, dPool.context)
  const primary = pick(rand, dPool.primary)
  const secondary = pick(rand, dPool.secondary)
  const closer = pick(rand, dPool.closer)
  const shape = pick(rand, DESC_SHAPES)

  let shortDescription: string
  switch (shape) {
    case 'primary-first':
      shortDescription = `${p.name} is ${primary}. ${secondary}, and each vial ${closer}.`
      break
    case 'context-first':
      shortDescription = `In ${ctx} research, ${p.name} is ${primary}. ${secondary} — vials ${closer}.`
      break
    case 'closer-first':
      shortDescription = `Each ${p.name} vial ${closer}. The compound is ${primary}; ${secondary.toLowerCase()}.`
      break
    case 'clause-chain':
      shortDescription = `${p.name} — ${primary}; ${secondary.toLowerCase()}; ${closer}.`
      break
  }

  // Meta description — tighter, keyword-led, ≤160 chars.
  const metaShapes = [
    `Buy ${p.name} — ${primary}. ${closer}.`,
    `${p.name}: ${primary} in ${ctx} research. ${closer}.`,
    `Research-grade ${p.name} — ${primary}; ${closer}.`,
    `${p.name} for ${ctx} work — ${closer}, from ${p.cheapest.price} per vial.`,
  ]
  const raw = pick(rand, metaShapes)
  const metaDescription = raw.length > 160 ? raw.slice(0, 157).trimEnd() + '…' : raw

  return { tagline, shortDescription, metaDescription }
}
