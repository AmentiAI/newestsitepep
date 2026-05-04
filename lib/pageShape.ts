// Page-shape classifier. Each parent product is classified into one of seven
// shapes. The per-shape layout plan lives in `pageLayoutPlan.ts` — this file
// just owns the classifier and the section-key type.

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
  return /\bmg\s*\/\s*ml\b/i.test(v.name) || (/\bml\b/i.test(v.name) && !variantIsCapsule(v))
}

export function pageShapeFor(parent: Parent): PageShape {
  if (SOLVENT_KEYWORDS.test(parent.name)) return 'solvent'
  if (BLEND_KEYWORDS.test(parent.name)) return 'blend'
  if (parent.variants.every(variantIsCapsule)) return 'capsule'
  if (parent.variants.every(variantIsLiquid)) return 'liquid'
  if (parent.variants.length >= 3) return 'value-shop'
  const hasMg = parent.variants.some((v) => v.mg != null)
  if (hasMg && parent.variants.length <= 2) return 'recon-first'
  return 'specialty'
}

export type SectionKey =
  | 'priceTable'
  | 'sizePicker'
  | 'reconMath'
  | 'capsuleBreakdown'
  | 'bottleBreakdown'
  | 'blendComposition'
  | 'compatibilityList'
  | 'shelfLife'
  | 'mechanismPrimer'
  | 'useCases'
  | 'protocolNotes'
  | 'stackingNotes'
  | 'storage'
  | 'highlights'
  | 'pairWith'
  | 'faqs'
  | 'related'
  | 'analyticalNotes'   // HPLC/MS/COA framing (generic, always available)
  | 'researchFraming'   // category-framed research-context paragraph
  | 'safety'            // research-limitations + risk-disclosure block (YMYL trust signal)
