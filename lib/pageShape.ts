// Page-shape classifier. Each parent product is classified into one of seven
// shapes. The product page renders a shape-specific layout, so different
// shapes produce structurally different pages (different H1 formulas,
// section sets, and section orders) — not just different prose in the same
// template. This is what breaks the programmatic-SEO duplicate-content
// filter without relying on prose uniqueness alone.

import type { Parent, Variant } from './catalog'

export type PageShape =
  | 'value-shop'    // multi-size compound (3+ doses). Leads with pricing comparison.
  | 'recon-first'   // lyophilized vial, 1–2 sizes. Leads with reconstitution math.
  | 'capsule'       // oral capsules/tablets. Leads with capsule composition.
  | 'liquid'        // pre-dissolved liquid / concentrate. Leads with bottle breakdown.
  | 'blend'         // pre-mixed multi-compound blend. Leads with blend composition.
  | 'solvent'       // bacteriostatic water. Leads with compatibility list.
  | 'specialty'     // anything not matching the above (topicals, atypical formats).

const BLEND_KEYWORDS = /\bblend\b|\+|cagri-sema|cagri-reta|reta-cagri|glow|klow|ipa[\/-]tesa|ipamorelin[\/-]/i
const CAPSULE_KEYWORDS = /\bcapsules?\b|\btablets?\b/i
const LIQUID_NAME_KEYWORDS = /\bliquid\b|methylene blue|l-carnitine|bam-15|\bru-58841\b/i
const SOLVENT_KEYWORDS = /bacteriostatic water/i

function variantIsCapsule(v: Variant): boolean {
  return CAPSULE_KEYWORDS.test(v.name) || CAPSULE_KEYWORDS.test(v.sizeLabel)
}

function variantIsLiquid(v: Variant): boolean {
  // A liquid variant has a mL/mg-per-mL token in its raw name. We also catch
  // concentrate-style entries like "30mg/mL 30mL".
  return /\bmg\s*\/\s*ml\b/i.test(v.name) || (/\bml\b/i.test(v.name) && !variantIsCapsule(v))
}

export function pageShapeFor(parent: Parent): PageShape {
  if (SOLVENT_KEYWORDS.test(parent.name)) return 'solvent'
  if (BLEND_KEYWORDS.test(parent.name)) return 'blend'
  if (parent.variants.every(variantIsCapsule)) return 'capsule'
  if (parent.variants.every(variantIsLiquid)) return 'liquid'
  if (parent.variants.length >= 3) return 'value-shop'
  // Anything with a parseable mg and lyophilized framing is recon-first.
  const hasMg = parent.variants.some((v) => v.mg != null)
  if (hasMg && parent.variants.length <= 2) return 'recon-first'
  return 'specialty'
}

// Section order / set per shape. Ordered list of section keys the layout
// should render, top-to-bottom, between the hero and the footer.
export type SectionKey =
  | 'priceTable'       // variant pricing + $/mg table
  | 'sizePicker'       // simple chip-row of in-stock sizes (recon/specialty use this instead of full table)
  | 'reconMath'        // reconstitution math block (mg → mL at 5/10 mg/mL)
  | 'capsuleBreakdown' // capsule composition (mg × count)
  | 'bottleBreakdown'  // liquid concentrate breakdown (mg/mL × mL)
  | 'blendComposition' // constituents of a pre-mixed blend
  | 'compatibilityList'// solvent compatibility list (every peptide that reconstitutes with BAC)
  | 'shelfLife'        // solvent shelf-life / storage block
  | 'mechanismPrimer'  // one-paragraph mechanism note pulled from content
  | 'useCases'         // research use-cases pulled from content
  | 'protocolNotes'    // protocol / handling notes pulled from content
  | 'stackingNotes'    // stacking / pairing notes pulled from content
  | 'storage'          // storage notes pulled from content
  | 'highlights'       // key-facts bullet list pulled from content
  | 'pairWith'         // named-partner line (shape-specific — solvents skip)
  | 'faqs'             // product-page FAQs (rendered visually, NOT as FAQPage schema)
  | 'related'          // related-products grid

export interface ShapeLayout {
  sections: SectionKey[]
  h1Formula: (parent: Parent) => string
}

export const SHAPE_LAYOUTS: Record<PageShape, ShapeLayout> = {
  'value-shop': {
    sections: ['priceTable', 'reconMath', 'mechanismPrimer', 'useCases', 'pairWith', 'protocolNotes', 'stackingNotes', 'faqs', 'related'],
    h1Formula: (p) => {
      const sizes = p.variants.map((v) => v.sizeLabel.split('·')[0].trim())
      const min = p.variants[0]?.sizeLabel.split('·')[0].trim() ?? ''
      const max = p.variants[p.variants.length - 1]?.sizeLabel.split('·')[0].trim() ?? ''
      const range = sizes.length > 2 ? `${min}–${max}` : sizes.join(' / ')
      return `Buy ${p.name} Online — ${p.variants.length} sizes (${range})`
    },
  },
  'recon-first': {
    sections: ['reconMath', 'sizePicker', 'highlights', 'mechanismPrimer', 'pairWith', 'useCases', 'protocolNotes', 'stackingNotes', 'storage', 'faqs', 'related'],
    h1Formula: (p) => {
      const first = p.variants[0]?.sizeLabel.split('·')[0].trim()
      return first
        ? `Buy ${p.name} — ${first} Lyophilized Vial`
        : `Buy ${p.name} Online`
    },
  },
  'capsule': {
    sections: ['capsuleBreakdown', 'sizePicker', 'mechanismPrimer', 'pairWith', 'useCases', 'protocolNotes', 'highlights', 'faqs', 'related'],
    h1Formula: (p) => {
      const primary = p.variants[0]
      if (!primary) return `Order ${p.name} Online`
      return `Order ${p.name} — ${primary.sizeLabel}`
    },
  },
  'liquid': {
    sections: ['bottleBreakdown', 'sizePicker', 'mechanismPrimer', 'pairWith', 'useCases', 'protocolNotes', 'storage', 'highlights', 'faqs', 'related'],
    h1Formula: (p) => {
      const primary = p.variants[0]
      if (!primary) return `Buy ${p.name} Online`
      return `Buy ${p.name} — Pre-Dissolved ${primary.sizeLabel} Bottle`
    },
  },
  'blend': {
    sections: ['blendComposition', 'sizePicker', 'mechanismPrimer', 'useCases', 'pairWith', 'protocolNotes', 'stackingNotes', 'highlights', 'faqs', 'related'],
    h1Formula: (p) => `Order ${p.name} — Pre-Mixed Pathway Vial`,
  },
  'solvent': {
    sections: ['compatibilityList', 'sizePicker', 'shelfLife', 'storage', 'protocolNotes', 'faqs', 'related'],
    h1Formula: (p) => `Bacteriostatic Water — Reconstitution Solvent (${p.variants[0]?.sizeLabel ?? '30 mL'})`,
  },
  'specialty': {
    sections: ['sizePicker', 'highlights', 'mechanismPrimer', 'pairWith', 'useCases', 'protocolNotes', 'stackingNotes', 'storage', 'faqs', 'related'],
    h1Formula: (p) => `Order ${p.name} Online`,
  },
}

export function layoutFor(parent: Parent): ShapeLayout {
  return SHAPE_LAYOUTS[pageShapeFor(parent)]
}
