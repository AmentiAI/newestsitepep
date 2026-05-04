// Per-slug page plan. Given a parent product, produces a deterministic,
// slug-seeded layout plan: section order, H1 formula, <title> formula,
// hero prose variant, and per-section H2 headings. This breaks structural
// templating — no two slugs within the same shape share an identical
// skeleton, because the order, the H1, the title formula and each H2 is
// independently hash-picked from a pool.

import type { Parent } from './catalog'
import { pageShapeFor, type PageShape, type SectionKey } from './pageShape'

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

export type HeroVariant =
  | 'overview-first'
  | 'tagline-first'
  | 'fact-first'
  | 'question-first'

export interface PlannedSection {
  key: SectionKey
  title: string
  eyebrow?: string
}

export interface PagePlan {
  shape: PageShape
  title: string
  h1: string
  heroVariant: HeroVariant
  sections: PlannedSection[]
}

// --- Section heading pools -----------------------------------------------

// 3–4 H2 phrasings per section key. Picked by hash so 60 recon-first pages
// don't all show `<h2>Mechanism in the literature</h2>` in slot 4.
const SECTION_HEADINGS: Record<SectionKey, { title: string; eyebrow?: string }[]> = {
  priceTable: [
    { title: 'Vial sizes and price per mg' },
    { title: 'Per-mg pricing across sizes' },
    { title: 'What each vial size costs per mg' },
    { title: 'Size and $ / mg breakdown' },
  ],
  sizePicker: [
    { title: 'Available sizes', eyebrow: 'In stock' },
    { title: 'In-stock vial sizes', eyebrow: 'Current inventory' },
    { title: 'Choose a size', eyebrow: 'Ships sealed' },
    { title: 'Sizes in this line', eyebrow: 'Sealed & labelled' },
  ],
  reconMath: [
    { title: 'Reconstitution volumes', eyebrow: 'Bac-water math' },
    { title: 'How much bac-water per vial', eyebrow: 'Dissolution table' },
    { title: 'Bac-water volumes at common concentrations', eyebrow: 'Reconstitution math' },
    { title: 'Mixing volumes at 2 / 5 / 10 mg/mL', eyebrow: 'Working stock' },
  ],
  capsuleBreakdown: [
    { title: 'Capsule composition', eyebrow: 'Oral format' },
    { title: 'What each capsule contains', eyebrow: 'Composition' },
    { title: 'Per-capsule mg and count', eyebrow: 'Bottle breakdown' },
  ],
  bottleBreakdown: [
    { title: 'Bottle breakdown and $/mL', eyebrow: 'Pre-dissolved liquid' },
    { title: 'Concentration, volume, and $ / mL', eyebrow: 'Ready-to-dose' },
    { title: 'What each bottle contains', eyebrow: 'Liquid format' },
  ],
  blendComposition: [
    { title: 'Blend composition', eyebrow: 'Pre-mixed vial' },
    { title: 'What is in the vial', eyebrow: 'Blend ratio' },
    { title: 'Constituents and ratio', eyebrow: 'Multi-compound vial' },
  ],
  compatibilityList: [
    { title: 'What reconstitutes with this vial', eyebrow: 'Compatibility' },
    { title: 'Compatible lyophilized peptides', eyebrow: 'Solvent compatibility' },
    { title: 'Peptides this solvent dissolves', eyebrow: 'Works with' },
  ],
  shelfLife: [
    { title: 'Shelf life and handling', eyebrow: 'After opening' },
    { title: 'How long it stays viable', eyebrow: 'Storage window' },
    { title: 'Sealed vs punctured shelf-life', eyebrow: 'Storage' },
  ],
  mechanismPrimer: [
    { title: 'Mechanism in the literature', eyebrow: 'Primer' },
    { title: 'How the compound is described in published work', eyebrow: 'Mechanism note' },
    { title: 'Pathway-level research framing', eyebrow: 'Mechanism' },
    { title: 'What the literature says about the pathway', eyebrow: 'Research primer' },
  ],
  useCases: [
    { title: 'Research use-cases', eyebrow: 'What it is studied for' },
    { title: 'Common research applications', eyebrow: 'Laboratory use' },
    { title: 'Where it appears in published protocols', eyebrow: 'In the literature' },
    { title: 'Typical laboratory applications', eyebrow: 'Research fit' },
  ],
  protocolNotes: [
    { title: 'Handling in the lab', eyebrow: 'Protocol notes' },
    { title: 'Protocol-level handling notes', eyebrow: 'Lab handling' },
    { title: 'Working-stock and handling', eyebrow: 'Protocol' },
  ],
  stackingNotes: [
    { title: 'Stacking and paired-compound work', eyebrow: 'Pairing notes' },
    { title: 'How it is paired in research protocols', eyebrow: 'Stacking' },
    { title: 'Compounds it is studied alongside', eyebrow: 'Paired work' },
  ],
  storage: [
    { title: 'Storage and shelf-life' },
    { title: 'How to store it between doses' },
    { title: 'Storage window and handling' },
  ],
  highlights: [
    { title: 'Key facts', eyebrow: 'At a glance' },
    { title: 'At-a-glance summary', eyebrow: 'Quick facts' },
    { title: 'What is worth knowing first', eyebrow: 'Highlights' },
  ],
  pairWith: [
    { title: 'Often paired with', eyebrow: 'From the same shelf' },
    { title: 'Commonly studied alongside', eyebrow: 'Paired picks' },
    { title: 'What buyers view together', eyebrow: 'Related picks' },
  ],
  faqs: [
    { title: 'Frequently asked', eyebrow: 'Questions we get' },
    { title: 'Common research-buyer questions', eyebrow: 'FAQ' },
    { title: 'Questions about this compound', eyebrow: 'Asked and answered' },
  ],
  related: [
    { title: 'More from this class' },
    { title: 'Other compounds in this category' },
    { title: 'Similar research peptides' },
  ],
  analyticalNotes: [
    { title: 'Purity and analytical verification', eyebrow: 'Lot-matched COA' },
    { title: 'How each lot is verified', eyebrow: 'Analytical notes' },
    { title: 'HPLC, MS, and per-lot testing', eyebrow: 'Quality verification' },
  ],
  researchFraming: [
    { title: 'Where this compound sits in the field', eyebrow: 'Research context' },
    { title: 'How the category frames this compound', eyebrow: 'Field context' },
    { title: 'Category-level research framing', eyebrow: 'Context' },
  ],
  safety: [
    { title: 'Research limitations and safety framing', eyebrow: 'Read before designing a study' },
    { title: 'What the evidence does — and does not — support', eyebrow: 'Safety & limitations' },
    { title: 'Limitations, caveats, and what is not established', eyebrow: 'Honest framing' },
    { title: 'Where the published literature stops', eyebrow: 'Limitations' },
  ],
}

// --- Section orderings per shape -----------------------------------------

// Each shape gets several distinct orderings. The slug hash picks one.
// All orderings end with `faqs` then `related`. Structural sections
// (price/size/recon/breakdown) stay in the top half; content sections can
// appear in varied positions. `analyticalNotes` and `researchFraming` are
// optional additions that appear in some orderings but not others — this
// alone already guarantees two pages in the same shape do not share a
// section count.

const ORDERINGS: Record<PageShape, SectionKey[][]> = {
  'value-shop': [
    ['priceTable', 'reconMath', 'mechanismPrimer', 'useCases', 'safety', 'pairWith', 'protocolNotes', 'stackingNotes', 'faqs', 'related'],
    ['priceTable', 'mechanismPrimer', 'reconMath', 'useCases', 'protocolNotes', 'analyticalNotes', 'pairWith', 'safety', 'faqs', 'related'],
    ['priceTable', 'useCases', 'reconMath', 'safety', 'mechanismPrimer', 'stackingNotes', 'pairWith', 'researchFraming', 'faqs', 'related'],
    ['priceTable', 'reconMath', 'useCases', 'protocolNotes', 'mechanismPrimer', 'safety', 'analyticalNotes', 'stackingNotes', 'faqs', 'related'],
    ['priceTable', 'mechanismPrimer', 'safety', 'reconMath', 'researchFraming', 'useCases', 'pairWith', 'protocolNotes', 'faqs', 'related'],
    ['priceTable', 'reconMath', 'mechanismPrimer', 'safety', 'researchFraming', 'useCases', 'analyticalNotes', 'pairWith', 'faqs', 'related'],
    ['priceTable', 'useCases', 'mechanismPrimer', 'reconMath', 'protocolNotes', 'analyticalNotes', 'safety', 'stackingNotes', 'pairWith', 'faqs', 'related'],
    ['priceTable', 'mechanismPrimer', 'researchFraming', 'reconMath', 'useCases', 'safety', 'protocolNotes', 'pairWith', 'faqs', 'related'],
  ],
  'recon-first': [
    ['reconMath', 'sizePicker', 'mechanismPrimer', 'useCases', 'safety', 'pairWith', 'highlights', 'protocolNotes', 'storage', 'faqs', 'related'],
    ['sizePicker', 'mechanismPrimer', 'reconMath', 'useCases', 'highlights', 'safety', 'storage', 'protocolNotes', 'pairWith', 'faqs', 'related'],
    ['mechanismPrimer', 'reconMath', 'safety', 'useCases', 'sizePicker', 'protocolNotes', 'highlights', 'analyticalNotes', 'pairWith', 'faqs', 'related'],
    ['reconMath', 'useCases', 'sizePicker', 'mechanismPrimer', 'researchFraming', 'safety', 'protocolNotes', 'storage', 'pairWith', 'faqs', 'related'],
    ['sizePicker', 'useCases', 'reconMath', 'highlights', 'mechanismPrimer', 'stackingNotes', 'safety', 'analyticalNotes', 'faqs', 'related'],
    ['reconMath', 'mechanismPrimer', 'sizePicker', 'safety', 'protocolNotes', 'highlights', 'useCases', 'researchFraming', 'storage', 'faqs', 'related'],
    ['mechanismPrimer', 'sizePicker', 'useCases', 'reconMath', 'safety', 'pairWith', 'storage', 'protocolNotes', 'analyticalNotes', 'faqs', 'related'],
    ['reconMath', 'sizePicker', 'useCases', 'protocolNotes', 'mechanismPrimer', 'researchFraming', 'safety', 'stackingNotes', 'highlights', 'faqs', 'related'],
    ['mechanismPrimer', 'safety', 'reconMath', 'sizePicker', 'useCases', 'highlights', 'analyticalNotes', 'protocolNotes', 'storage', 'faqs', 'related'],
    ['sizePicker', 'reconMath', 'safety', 'mechanismPrimer', 'researchFraming', 'useCases', 'pairWith', 'protocolNotes', 'storage', 'faqs', 'related'],
  ],
  capsule: [
    ['capsuleBreakdown', 'sizePicker', 'mechanismPrimer', 'useCases', 'safety', 'pairWith', 'protocolNotes', 'highlights', 'faqs', 'related'],
    ['capsuleBreakdown', 'mechanismPrimer', 'sizePicker', 'useCases', 'analyticalNotes', 'safety', 'protocolNotes', 'pairWith', 'faqs', 'related'],
    ['sizePicker', 'capsuleBreakdown', 'useCases', 'mechanismPrimer', 'safety', 'protocolNotes', 'highlights', 'researchFraming', 'faqs', 'related'],
    ['capsuleBreakdown', 'useCases', 'sizePicker', 'protocolNotes', 'mechanismPrimer', 'safety', 'pairWith', 'analyticalNotes', 'faqs', 'related'],
    ['capsuleBreakdown', 'mechanismPrimer', 'safety', 'useCases', 'sizePicker', 'highlights', 'researchFraming', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'capsuleBreakdown', 'mechanismPrimer', 'safety', 'useCases', 'analyticalNotes', 'pairWith', 'protocolNotes', 'faqs', 'related'],
  ],
  liquid: [
    ['bottleBreakdown', 'sizePicker', 'mechanismPrimer', 'useCases', 'safety', 'protocolNotes', 'highlights', 'faqs', 'related'],
    ['sizePicker', 'mechanismPrimer', 'bottleBreakdown', 'useCases', 'analyticalNotes', 'safety', 'protocolNotes', 'faqs', 'related'],
    ['bottleBreakdown', 'useCases', 'sizePicker', 'mechanismPrimer', 'safety', 'pairWith', 'researchFraming', 'storage', 'faqs', 'related'],
    ['bottleBreakdown', 'mechanismPrimer', 'safety', 'sizePicker', 'protocolNotes', 'useCases', 'storage', 'faqs', 'related'],
    ['sizePicker', 'bottleBreakdown', 'mechanismPrimer', 'researchFraming', 'safety', 'useCases', 'protocolNotes', 'faqs', 'related'],
    ['bottleBreakdown', 'mechanismPrimer', 'useCases', 'safety', 'sizePicker', 'analyticalNotes', 'storage', 'faqs', 'related'],
  ],
  blend: [
    ['blendComposition', 'sizePicker', 'mechanismPrimer', 'useCases', 'safety', 'pairWith', 'protocolNotes', 'stackingNotes', 'faqs', 'related'],
    ['sizePicker', 'blendComposition', 'mechanismPrimer', 'stackingNotes', 'useCases', 'safety', 'analyticalNotes', 'pairWith', 'faqs', 'related'],
    ['blendComposition', 'useCases', 'sizePicker', 'stackingNotes', 'mechanismPrimer', 'safety', 'researchFraming', 'protocolNotes', 'faqs', 'related'],
    ['blendComposition', 'mechanismPrimer', 'safety', 'stackingNotes', 'sizePicker', 'useCases', 'analyticalNotes', 'highlights', 'faqs', 'related'],
    ['blendComposition', 'mechanismPrimer', 'stackingNotes', 'useCases', 'researchFraming', 'safety', 'sizePicker', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'blendComposition', 'mechanismPrimer', 'safety', 'useCases', 'stackingNotes', 'protocolNotes', 'pairWith', 'faqs', 'related'],
  ],
  solvent: [
    ['compatibilityList', 'sizePicker', 'shelfLife', 'storage', 'safety', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'compatibilityList', 'shelfLife', 'protocolNotes', 'analyticalNotes', 'safety', 'storage', 'faqs', 'related'],
    ['compatibilityList', 'shelfLife', 'safety', 'sizePicker', 'storage', 'researchFraming', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'shelfLife', 'compatibilityList', 'safety', 'protocolNotes', 'storage', 'analyticalNotes', 'faqs', 'related'],
  ],
  specialty: [
    ['sizePicker', 'highlights', 'mechanismPrimer', 'useCases', 'safety', 'pairWith', 'protocolNotes', 'storage', 'faqs', 'related'],
    ['mechanismPrimer', 'sizePicker', 'useCases', 'safety', 'highlights', 'analyticalNotes', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'useCases', 'mechanismPrimer', 'researchFraming', 'safety', 'highlights', 'storage', 'pairWith', 'faqs', 'related'],
    ['mechanismPrimer', 'safety', 'sizePicker', 'useCases', 'highlights', 'researchFraming', 'protocolNotes', 'faqs', 'related'],
    ['sizePicker', 'mechanismPrimer', 'highlights', 'safety', 'useCases', 'analyticalNotes', 'storage', 'faqs', 'related'],
  ],
}

// --- H1 formulas per shape -----------------------------------------------

function sizeToken(p: Parent): string {
  return p.variants[0]?.sizeLabel.split('·')[0].trim() ?? ''
}

function mgRange(p: Parent): string {
  const mgs = p.variants.map((v) => v.mg).filter((x): x is number => x != null)
  if (mgs.length === 0) return ''
  const min = Math.min(...mgs)
  const max = Math.max(...mgs)
  if (min === max) return `${min} mg`
  return `${min}–${max} mg`
}

const H1_FORMULAS: Record<PageShape, Array<(p: Parent) => string>> = {
  'value-shop': [
    (p) => `Buy ${p.name} Online — ${p.variants.length} sizes (${mgRange(p)})`,
    (p) => `${p.name} Research Vials — ${p.variants.length} Dose Strengths`,
    (p) => `Order ${p.name} (${mgRange(p)}) — Lot-Matched COA per Vial`,
    (p) => `${p.name} — Pick a Dose Strength`,
  ],
  'recon-first': [
    (p) => `Buy ${p.name} — ${sizeToken(p)} Lyophilized Vial`,
    (p) => `${p.name} Research Vial (${sizeToken(p)}) — Sealed & Lot-Verified`,
    (p) => `Order ${p.name} for Pre-Clinical Research — ${sizeToken(p)}`,
    (p) => `${p.name} — Lyophilized ${sizeToken(p)} Vial with COA`,
  ],
  capsule: [
    (p) => `Order ${p.name} — ${p.variants[0]?.sizeLabel ?? ''}`,
    (p) => `${p.name} Capsules — Oral Research Format`,
    (p) => `Buy ${p.name} — Bottled Capsule Research Format`,
  ],
  liquid: [
    (p) => `Buy ${p.name} — Pre-Dissolved ${p.variants[0]?.sizeLabel ?? ''} Bottle`,
    (p) => `${p.name} (Liquid) — Ready-to-Dose Research Bottle`,
    (p) => `Order ${p.name} — Pre-Mixed Liquid Format`,
  ],
  blend: [
    (p) => `Order ${p.name} — Pre-Mixed Pathway Vial`,
    (p) => `${p.name} — Dual-Pathway Research Blend`,
    (p) => `Buy ${p.name} — Multi-Compound Vial with Per-Lot COA`,
  ],
  solvent: [
    (p) => `Bacteriostatic Water — Reconstitution Solvent (${p.variants[0]?.sizeLabel ?? '30 mL'})`,
    (p) => `${p.name} — Peptide Reconstitution Solvent`,
    (p) => `Order Bacteriostatic Water — Multi-Dose Sealed Vial`,
  ],
  specialty: [
    (p) => `Order ${p.name} Online`,
    (p) => `Buy ${p.name} — Research Compound`,
    (p) => `${p.name} — ${p.category} Research Vial`,
  ],
}

const TITLE_FORMULAS: Record<PageShape, Array<(p: Parent) => string>> = {
  'value-shop': [
    (p) => `Buy ${p.name} Online — ${p.variants.length} Vial Sizes`,
    (p) => `${p.name} (${mgRange(p)}) — Research Vials with COA`,
    (p) => `${p.name} — Pick from ${p.variants.length} Dose Strengths`,
  ],
  'recon-first': [
    (p) => `${p.name} for Research — Lyophilized Vial with COA`,
    (p) => `Buy ${p.name} — Sealed Research Vial`,
    (p) => `${p.name} Research Vial — Lot-Matched COA`,
  ],
  capsule: [
    (p) => `Order ${p.name} Capsules — Oral Research Format`,
    (p) => `${p.name} — Capsule Research Format`,
  ],
  liquid: [
    (p) => `${p.name} Pre-Dissolved Liquid — Ready-to-Dose Bottle`,
    (p) => `Buy ${p.name} (Liquid) — Pre-Mixed Research Bottle`,
  ],
  blend: [
    (p) => `${p.name} Pre-Mixed Blend — Dual-Pathway Research Vial`,
    (p) => `Order ${p.name} — Multi-Compound Pathway Vial`,
  ],
  solvent: [
    (p) => `Bacteriostatic Water ${p.variants[0]?.sizeLabel ?? '30 mL'} — Peptide Reconstitution Solvent`,
    (p) => `Bacteriostatic Water — Multi-Dose Reconstitution Solvent`,
  ],
  specialty: [
    (p) => `${p.name} — ${p.category} Research Compound`,
    (p) => `Buy ${p.name} — Research Vial`,
  ],
}

const HERO_VARIANTS: HeroVariant[] = [
  'overview-first',
  'tagline-first',
  'fact-first',
  'question-first',
]

export function planFor(p: Parent): PagePlan {
  const shape = pageShapeFor(p)
  const rand = mulberry32(fnv1a(p.slug))
  const ordering = pick(rand, ORDERINGS[shape])
  const h1 = pick(rand, H1_FORMULAS[shape])(p)
  const title = pick(rand, TITLE_FORMULAS[shape])(p)
  const heroVariant = pick(rand, HERO_VARIANTS)
  const sections: PlannedSection[] = ordering.map((k) => {
    const variants = SECTION_HEADINGS[k]
    const v = variants[Math.floor(rand() * variants.length)]
    return { key: k, title: v.title, eyebrow: v.eyebrow }
  })
  return { shape, title, h1, heroVariant, sections }
}
