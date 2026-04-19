// Parent-product catalogue. Groups the raw SKU list (one row per vial size)
// into parent compounds with an embedded variants[] array. Product pages
// render one URL per parent — the variants become an Offer[] inside a single
// Product JSON-LD and a size-picker on the page.
//
// Why: the raw catalogue lists "Tirzepatide 15mg", "Tirzepatide 30mg",
// "Tirzepatide 60mg" as three separate SKUs. Emitting three URLs whose body
// content differs only in a number is the canonical duplicate-content
// failure mode for programmatic-SEO sites (Google picks one canonical and
// drops the rest from the index). Collapsing into one parent URL per
// compound consolidates link equity and removes the near-duplicate cluster.

import { products as rawSkus, type Product as Sku } from './products'
import { discounted } from './price'

export interface Variant {
  /** Original SKU slug — still used by /out/[slug] to resolve per-size affiliate URL. */
  slug: string
  /** Full SKU name, e.g. "Retatrutide 30mg". */
  name: string
  /** Parsed milligram content, if the SKU name ends in a dose token. */
  mg: number | null
  /** Short label for size pickers and variant tables, e.g. "30 mg" or "30 mL". */
  sizeLabel: string
  /** Raw list price, e.g. "$149.99". */
  price: string
  priceNum: number
  /** Discounted price the buyer actually pays. */
  pricePaid: number
  /** $/mg (discounted). Null when mg is unknown. */
  pricePerMg: number | null
  /** Supplier destination URL (tagged with ref) for the affiliate redirect. */
  affiliateUrl: string
  inStock: boolean
  /** Per-variant image (may differ across sizes when supplier images differ). */
  image: string
}

export interface Parent {
  slug: string
  name: string
  category: string
  image: string
  tags: string[]
  protocol: string
  variants: Variant[]
  /** Cheapest absolute price in the family — drives card price display. */
  cheapest: Variant
  /** Best $/mg in the family (falls back to cheapest when no mg data). */
  bestValue: Variant
  /** Variant to feature by default on the product page / in the primary CTA. */
  defaultVariant: Variant
  /** Highest mg in the family (or null if none parsed). */
  maxMg: number | null
  /** Internal hash used by the pair-pick and related shuffle. */
  slugHash: number
}

// --- Parent grouping table ------------------------------------------------

// Explicit multi-variant parent groups. Anything not listed here becomes a
// single-variant parent whose slug is derived from the base name.
const MULTI_VARIANT_GROUPS: {
  parentSlug: string
  parentName: string
  variantSkuSlugs: string[]
}[] = [
  { parentSlug: 'tirzepatide', parentName: 'Tirzepatide',
    variantSkuSlugs: ['tirzepatide-15mg', 'tirzepatide-30mg', 'tirzepatide-60mg'] },
  { parentSlug: 'semaglutide', parentName: 'Semaglutide',
    variantSkuSlugs: ['semaglutide-3mg', 'semaglutide-6mg', 'semaglutide-12mg', 'semaglutide-20mg', 'semaglutide-30mg'] },
  { parentSlug: 'retatrutide', parentName: 'Retatrutide',
    variantSkuSlugs: ['retatrutide-10mg', 'retatrutide-15mg', 'retatrutide-20mg', 'retatrutide-30mg'] },
  { parentSlug: 'cagrilintide', parentName: 'Cagrilintide',
    variantSkuSlugs: ['cagrilintide-5mg', 'cagrilintide-10mg'] },
  { parentSlug: 'aod9604', parentName: 'AOD9604',
    variantSkuSlugs: ['aod9604-2mg', 'aod9604-5mg', 'aod9604-10mg'] },
  { parentSlug: 'adipotide-fttp', parentName: 'Adipotide (FTPP)',
    variantSkuSlugs: ['adipotide-fttp-5mg', 'adipotide-fttp-10mg'] },
  { parentSlug: '5-amino-1mq', parentName: '5-Amino-1MQ',
    variantSkuSlugs: ['5-amino-1mq-5mg', '5-amino-1mq-50mg'] },
  { parentSlug: 'bam-15', parentName: 'BAM-15 (Liquid)',
    variantSkuSlugs: ['bam-15-30mg-ml-30ml', 'bam-15-50mg-ml-30ml'] },
  { parentSlug: 'l-carnitine', parentName: 'L-Carnitine (Liquid)',
    variantSkuSlugs: ['l-carnitine-400mg-ml', 'l-carnitine-600mg-ml'] },
  { parentSlug: 'slu-pp-332-capsules', parentName: 'SLU-PP-332 Capsules',
    variantSkuSlugs: ['slu-pp-332-1mg-x-30-capsules', 'slu-pp-332-100mg-x-30-capsules', 'slu-pp-332-100mg-x-120-capsules'] },
  { parentSlug: 'slu-pp-332-liquid', parentName: 'SLU-PP-332 (Liquid)',
    variantSkuSlugs: ['slu-pp-332-1mg-ml-30ml', 'slu-pp-332-5mg-ml-30ml'] },
  { parentSlug: 'cjc-1295-no-dac', parentName: 'CJC-1295 No DAC',
    variantSkuSlugs: ['cjc-1295-no-dac-5mg', 'cjc-1295-no-dac-10mg'] },
  { parentSlug: 'kisspeptin-10', parentName: 'Kisspeptin-10',
    variantSkuSlugs: ['kisspeptin-10-5mg', 'kisspeptin-10-10mg'] },
  { parentSlug: 'sermorelin', parentName: 'Sermorelin',
    variantSkuSlugs: ['sermorelin-2mg', 'sermorelin-5mg', 'sermorelin-10mg'] },
  { parentSlug: 'tesamorelin', parentName: 'Tesamorelin',
    variantSkuSlugs: ['tesamorelin-10mg', 'tesamorelin-20mg'] },
  { parentSlug: 'kpv', parentName: 'KPV',
    variantSkuSlugs: ['kpv-5mg', 'kpv-10mg'] },
  { parentSlug: 'mots-c', parentName: 'MOTS-c',
    variantSkuSlugs: ['mots-c-10mg', 'mots-c-20mg', 'mots-c-40mg'] },
  { parentSlug: 'oxytocin', parentName: 'Oxytocin',
    variantSkuSlugs: ['oxytocin-8mg', 'oxytocin-10mg'] },
  { parentSlug: 'ss-31', parentName: 'SS-31',
    variantSkuSlugs: ['ss-31-10mg', 'ss-31-25mg', 'ss-31-50mg'] },
  { parentSlug: 'thymosin-alpha-1', parentName: 'Thymosin Alpha-1',
    variantSkuSlugs: ['thymosin-alpha-1-5mg', 'thymosin-alpha-1-10mg'] },
  { parentSlug: 'vip', parentName: 'VIP',
    variantSkuSlugs: ['vip-5mg', 'vip-10mg'] },
  { parentSlug: 'epitalon', parentName: 'Epitalon',
    variantSkuSlugs: ['epitalon-10mg', 'epitalon-50mg'] },
  { parentSlug: 'ghk-cu', parentName: 'GHK-Cu',
    variantSkuSlugs: ['ghk-cu-50mg', 'ghk-cu-100mg'] },
  { parentSlug: 'nad', parentName: 'NAD+',
    variantSkuSlugs: ['nad-500mg', 'nad-1000mg'] },
  { parentSlug: 'glutathione', parentName: 'Glutathione',
    variantSkuSlugs: ['glutathione-200mg', 'glutathione-600mg', 'glutathione-1500mg'] },
  { parentSlug: 'ru-58841', parentName: 'RU-58841 (Topical)',
    variantSkuSlugs: ['ru-58841-50mg-x-30ml', 'ru-58841-50mg-x-60ml'] },
  { parentSlug: 'dsip', parentName: 'DSIP (Delta Sleep-Inducing Peptide)',
    variantSkuSlugs: ['dsip-delta-sleep-inducing-peptide-5mg', 'dsip-delta-sleep-inducing-peptide-10mg', 'dsip-delta-sleep-inducing-peptide-15mg'] },
  { parentSlug: 'na-selank-amidate', parentName: 'NA-Selank Amidate',
    variantSkuSlugs: ['na-selank-amidate-10mg', 'na-selank-amidate-30mg'] },
  { parentSlug: 'pinealon', parentName: 'Pinealon',
    variantSkuSlugs: ['pinealon-10mg', 'pinealon-20mg'] },
  { parentSlug: 'bpc-157-tb-500-blend', parentName: 'BPC-157 + TB-500 Blend',
    variantSkuSlugs: ['bpc-157-tb-500-blend-bpc-157-10mg-tb-500-10mg', 'bpc-157-tb-500-blend-bpc-157-5mg-tb-500-5mg'] },
  { parentSlug: 'ipamorelin-cjc-1295-blend', parentName: 'Ipamorelin + CJC-1295 Blend',
    variantSkuSlugs: ['ipamorelin-cjc-1295-blend-cjc-1295-5mg-ipa-5mg', 'ipamorelin-cjc-1295-blend-cjc-1295-5mg-ipamorelin-5mg'] },
  { parentSlug: 'ipamorelin-tesamorelin-blend', parentName: 'Ipamorelin + Tesamorelin Blend',
    variantSkuSlugs: ['ipamorelin-tesamorelin-blend-ipa-3mg-tesa-10mg', 'ipamorelin-tesamorelin-blend-ipa-5mg-tesa-10mg'] },
  { parentSlug: 'cagri-reta', parentName: 'Cagri-Reta',
    variantSkuSlugs: ['cagri-reta-5mg', 'cagri-reta-10mg'] },
  { parentSlug: 'glow-blend', parentName: 'GLOW Blend',
    variantSkuSlugs: ['glow-blend-50mg', 'glow-blend-70mg'] },
]

// Single-variant slug overrides. For SKUs whose auto-derived parent slug
// would be ugly (long format suffixes, multi-token names), we list an
// explicit parent slug + parent name.
const SINGLE_OVERRIDES: Record<string, { parentSlug: string; parentName: string }> = {
  '5-amino-1mq-capsules-50mg-x-60-capsules': {
    parentSlug: '5-amino-1mq-capsules',
    parentName: '5-Amino-1MQ Capsules',
  },
  'bpc-157-capsules-500mcg-x-60-capsules': {
    parentSlug: 'bpc-157-capsules',
    parentName: 'BPC-157 Capsules',
  },
  'o-304-atx-304-100mg-x-60-capsules': {
    parentSlug: 'o-304-capsules',
    parentName: 'O-304 (ATX-304) Capsules',
  },
  'tesofensine-500mcg-x-30-capsules': {
    parentSlug: 'tesofensine-capsules',
    parentName: 'Tesofensine Capsules',
  },
  'tesofensine-500mcg-x-30-tablets': {
    parentSlug: 'tesofensine-tablets',
    parentName: 'Tesofensine Tablets',
  },
  'methylene-blue-10mg-ml-50ml': {
    parentSlug: 'methylene-blue',
    parentName: 'Methylene Blue (Liquid)',
  },
  'l-carnitine-5-pack-600mg': {
    parentSlug: 'l-carnitine-5-pack',
    parentName: 'L-Carnitine 5-Pack',
  },
  'tb-500-thymosin-beta-4-10mg': {
    parentSlug: 'tb-500',
    parentName: 'TB-500 (Thymosin Beta-4)',
  },
  'n-acetyl-semax-amidate-30mg': {
    parentSlug: 'n-acetyl-semax-amidate',
    parentName: 'N-Acetyl Semax Amidate',
  },
  'reta-cagri-5mg-5mg': {
    parentSlug: 'reta-cagri',
    parentName: 'Reta-Cagri Blend',
  },
  'cagri-sema-blend-5mg-cagrilintide-5mg-sema-10mg': {
    parentSlug: 'cagri-sema-blend',
    parentName: 'Cagri-Sema Blend',
  },
  'ipa-tesa-blend-ipa-5mg-tesa-10mg-15mg': {
    parentSlug: 'ipa-tesa-blend',
    parentName: 'IPA/TESA Blend (15 mg Total)',
  },
  'bacteriostatic-water-30ml': {
    parentSlug: 'bacteriostatic-water',
    parentName: 'Bacteriostatic Water',
  },
  'usp-bacteriostatic-water-30ml': {
    parentSlug: 'usp-bacteriostatic-water',
    parentName: 'Bacteriostatic Water USP',
  },
}

// --- Dose + label parsing -------------------------------------------------

const DOSE_RE = /\s+(\d+(?:\.\d+)?)\s*(mg|mcg|iu)\b/i

export function parseDose(name: string): { baseName: string; mg: number | null } {
  const m = name.match(DOSE_RE)
  if (!m) return { baseName: name.trim(), mg: null }
  const value = parseFloat(m[1])
  const unit = m[2].toLowerCase()
  const mg = unit === 'mg' ? value : unit === 'mcg' ? value / 1000 : null
  const baseName = name.replace(DOSE_RE, '').trim()
  return { baseName, mg }
}

function stripFormatTokens(name: string): string {
  let n = name
  n = n.replace(/\s+x\s*\d+\s*(capsules?|tablets?)\s*$/i, '')
  n = n.replace(/\s+x\s*\d+\s*ml\s*$/i, '')
  n = n.replace(/\s+\d+\s*ml\s*$/i, '')
  n = n.replace(/\s+\d+(?:\.\d+)?\s*mg\s*\/\s*ml\s*$/i, '')
  n = n.replace(/\s+\d+(?:\.\d+)?\s*(mg|mcg|iu)\b/i, '')
  return n.trim()
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Short label for size pickers. When mg alone doesn't disambiguate variants
// in the same parent (e.g. two RU-58841 50mg bottles at different volumes),
// append the distinguishing format qualifier.
function deriveSizeLabel(sku: Sku, mg: number | null): string {
  const capMatch = sku.name.match(/x\s*(\d+)\s*(capsules?|tablets?)/i)
  const volMatch = sku.name.match(/x?\s*(\d+)\s*ml\b/i)
  const concMatch = sku.name.match(/(\d+(?:\.\d+)?)\s*mg\s*\/\s*ml/i)
  if (mg != null) {
    const mgLabel =
      mg >= 1 ? `${mg % 1 === 0 ? mg : mg.toFixed(1)} mg` : `${(mg * 1000).toFixed(0)} mcg`
    if (capMatch) return `${mgLabel} · ×${capMatch[1]} ${capMatch[2].toLowerCase()}`
    if (concMatch && volMatch) return `${concMatch[1]} mg/mL · ${volMatch[1]} mL`
    if (volMatch) return `${mgLabel} · ${volMatch[1]} mL`
    return mgLabel
  }
  if (capMatch) return `×${capMatch[1]} ${capMatch[2].toLowerCase()}`
  if (concMatch && volMatch) return `${concMatch[1]} mg/mL · ${volMatch[1]} mL`
  if (volMatch) return `${volMatch[1]} mL`
  return sku.name
}

// --- Hashing --------------------------------------------------------------

// xmur3-style 32-bit string hash. Used by deterministic-shuffle and the
// sitemap's stable lastmod spread.
export function hashSlug(s: string): number {
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return (h ^ (h >>> 16)) >>> 0
}

// --- Parent building ------------------------------------------------------

const MULTI_LOOKUP: Map<string, { parentSlug: string; parentName: string }> = new Map()
for (const g of MULTI_VARIANT_GROUPS) {
  for (const sku of g.variantSkuSlugs) {
    MULTI_LOOKUP.set(sku, { parentSlug: g.parentSlug, parentName: g.parentName })
  }
}

function skuToVariant(sku: Sku): Variant {
  const { mg } = parseDose(sku.name)
  const pricePaid = discounted(sku.priceNum)
  const pricePerMg = mg != null && mg > 0 ? pricePaid / mg : null
  return {
    slug: sku.slug,
    name: sku.name,
    mg,
    sizeLabel: deriveSizeLabel(sku, mg),
    price: sku.price,
    priceNum: sku.priceNum,
    pricePaid,
    pricePerMg,
    affiliateUrl: sku.affiliateUrl,
    inStock: true,
    image: sku.image,
  }
}

function resolveParent(sku: Sku): { parentSlug: string; parentName: string } {
  const multi = MULTI_LOOKUP.get(sku.slug)
  if (multi) return multi
  const override = SINGLE_OVERRIDES[sku.slug]
  if (override) return override
  const stripped = stripFormatTokens(sku.name)
  return { parentSlug: slugifyName(stripped), parentName: stripped }
}

function buildParents(): Parent[] {
  const bySlug = new Map<string, {
    first: Sku
    name: string
    variants: Variant[]
  }>()

  for (const sku of rawSkus) {
    const { parentSlug, parentName } = resolveParent(sku)
    const entry = bySlug.get(parentSlug)
    if (entry) {
      entry.variants.push(skuToVariant(sku))
    } else {
      bySlug.set(parentSlug, {
        first: sku,
        name: parentName,
        variants: [skuToVariant(sku)],
      })
    }
  }

  const parents: Parent[] = []
  for (const [parentSlug, entry] of bySlug) {
    const variants = entry.variants.slice().sort((a, b) => {
      if (a.mg != null && b.mg != null) return a.mg - b.mg
      return a.priceNum - b.priceNum
    })
    const cheapest = variants.reduce((a, b) => (a.priceNum <= b.priceNum ? a : b))
    const mgVariants = variants.filter((v) => v.pricePerMg != null)
    const bestValue = mgVariants.length
      ? mgVariants.reduce((a, b) => (a.pricePerMg! <= b.pricePerMg! ? a : b))
      : cheapest
    const maxMg = variants.reduce<number | null>((max, v) => {
      if (v.mg == null) return max
      return max == null || v.mg > max ? v.mg : max
    }, null)
    parents.push({
      slug: parentSlug,
      name: entry.name,
      category: entry.first.category,
      image: entry.first.image,
      tags: entry.first.tags,
      protocol: entry.first.protocol,
      variants,
      cheapest,
      bestValue,
      defaultVariant: cheapest,
      maxMg,
      slugHash: hashSlug(parentSlug),
    })
  }

  // Stable ordering — by category, then name — so downstream lists render deterministically.
  parents.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category)
    return a.name.localeCompare(b.name)
  })
  return parents
}

export const parents: Parent[] = buildParents()

const PARENTS_BY_SLUG = new Map(parents.map((p) => [p.slug, p]))
const VARIANT_SLUG_TO_PARENT = new Map<string, Parent>()
for (const p of parents) {
  for (const v of p.variants) {
    VARIANT_SLUG_TO_PARENT.set(v.slug, p)
  }
}

export function getParent(slug: string): Parent | undefined {
  return PARENTS_BY_SLUG.get(slug)
}

/** Resolve a slug that may be either a parent or a legacy per-size variant. */
export function resolveSlug(slug: string): { parent: Parent; variant?: Variant } | undefined {
  const direct = PARENTS_BY_SLUG.get(slug)
  if (direct) return { parent: direct }
  const parent = VARIANT_SLUG_TO_PARENT.get(slug)
  if (!parent) return undefined
  const variant = parent.variants.find((v) => v.slug === slug)
  return { parent, variant }
}

export function findVariant(slug: string): { parent: Parent; variant: Variant } | undefined {
  const parent = VARIANT_SLUG_TO_PARENT.get(slug)
  if (!parent) return undefined
  const variant = parent.variants.find((v) => v.slug === slug)
  if (!variant) return undefined
  return { parent, variant }
}

/** Map of legacy /products/{variant-slug} → /products/{parent-slug} for the 301 table. */
export function legacyVariantRedirects(): { from: string; to: string }[] {
  const out: { from: string; to: string }[] = []
  for (const p of parents) {
    for (const v of p.variants) {
      if (v.slug !== p.slug) {
        out.push({ from: v.slug, to: p.slug })
      }
    }
  }
  return out
}

export const categories: string[] = Array.from(
  new Set(parents.map((p) => p.category)),
).sort()
