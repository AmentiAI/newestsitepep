// Variant grouping and per-product computed content.
//
// The catalogue lists each dose as its own SKU (e.g. Tirzepatide 15mg,
// Tirzepatide 30mg, Tirzepatide 60mg). This module groups them back into
// dose families so product pages can render a genuinely unique computed
// variant-pricing table + reconstitution math — the kind of content Google
// accepts as distinct rather than templated.

import { products, type Product } from './products'
import { discounted } from './price'

export interface VariantRow {
  product: Product
  mg: number | null
  /** Discounted price (what the buyer actually pays). */
  pricePaid: number
  pricePerMg: number | null
  isCurrent: boolean
  isBestValue: boolean
  isWorstValue: boolean
}

export interface ReconRow {
  targetMgPerMl: number
  ml: string
}

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

export function variantFamilyFor(p: Product): Product[] {
  const { baseName } = parseDose(p.name)
  if (!baseName) return [p]
  return products
    .filter((x) => x.category === p.category && parseDose(x.name).baseName === baseName)
    .sort((a, b) => {
      const ma = parseDose(a.name).mg ?? 0
      const mb = parseDose(b.name).mg ?? 0
      return ma - mb
    })
}

export function analyzeFamily(p: Product): VariantRow[] {
  const family = variantFamilyFor(p)
  const rows: VariantRow[] = family.map((x) => {
    const { mg } = parseDose(x.name)
    const pricePaid = discounted(x.priceNum)
    const pricePerMg = mg && mg > 0 ? pricePaid / mg : null
    return {
      product: x,
      mg,
      pricePaid,
      pricePerMg,
      isCurrent: x.slug === p.slug,
      isBestValue: false,
      isWorstValue: false,
    }
  })
  const mgRows = rows.filter((r) => r.pricePerMg !== null)
  if (mgRows.length >= 2) {
    const best = mgRows.reduce((a, b) => (a.pricePerMg! <= b.pricePerMg! ? a : b))
    const worst = mgRows.reduce((a, b) => (a.pricePerMg! >= b.pricePerMg! ? a : b))
    best.isBestValue = true
    worst.isWorstValue = true
  }
  return rows
}

export function savingsPct(rows: VariantRow[]): number | null {
  const mgRows = rows.filter((r) => r.pricePerMg !== null)
  if (mgRows.length < 2) return null
  const best = mgRows.reduce((a, b) => (a.pricePerMg! <= b.pricePerMg! ? a : b))
  const worst = mgRows.reduce((a, b) => (a.pricePerMg! >= b.pricePerMg! ? a : b))
  if (!worst.pricePerMg) return null
  return Math.round(((worst.pricePerMg - best.pricePerMg!) / worst.pricePerMg) * 100)
}

/** Bac water volume in mL for a given vial mg and target mg/mL concentration. */
export function reconVolume(vialMg: number, targetMgPerMl: number): string {
  const ml = vialMg / targetMgPerMl
  if (!isFinite(ml) || ml <= 0) return ''
  return ml % 1 === 0 ? `${ml.toFixed(0)} mL` : `${ml.toFixed(1)} mL`
}

export function reconTableFor(p: Product): ReconRow[] {
  const { mg } = parseDose(p.name)
  if (!mg) return []
  return [
    { targetMgPerMl: 5, ml: reconVolume(mg, 5) },
    { targetMgPerMl: 10, ml: reconVolume(mg, 10) },
    { targetMgPerMl: 2, ml: reconVolume(mg, 2) },
  ].filter((r) => r.ml !== '')
}

/** Products to suggest as a named pair-with. Lowest-price first within the same
 *  category, excluding the current product and its own variant family. */
export function pairPicksFor(p: Product, limit = 3): Product[] {
  const family = new Set(variantFamilyFor(p).map((x) => x.slug))
  return products
    .filter((x) => x.category === p.category && !family.has(x.slug))
    .sort((a, b) => a.priceNum - b.priceNum)
    .slice(0, limit)
}
