// Deterministic pair-pick and related-product selection.
//
// The naïve pattern — filter by category, sort by price, slice(0, N) — makes
// every product in the same category display the same N partners (the
// alphabetically / cheapest first). Two dozen Khavinson pages all show the
// same four "related" items, which reads as a boilerplate sidebar and pushes
// the pages into a duplicate cluster.
//
// Fix: pick a different subset per parent from the same pool, using a
// slug-seeded shuffle. Stable per parent (the same product always shows the
// same partners), varied across parents (different parents get different
// permutations).

import { parents, hashSlug, type Parent } from './catalog'

// Format-only categories to exclude from the match filter when we have
// therapeutic axes available. We currently only carry one category field
// per product (therapeutic), so no filtering is needed here — but leaving
// the hook in place for when/if format tags are introduced.
const FORMAT_ONLY_CATEGORIES = new Set<string>([])

// mulberry32-style LCG, seeded by the slug hash. Returns a deterministic
// Fisher-Yates shuffle of the input array.
function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice()
  let state = seed === 0 ? 1 : seed
  for (let i = out.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = state % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function therapeuticPool(parent: Parent): Parent[] {
  return parents.filter(
    (p) =>
      p.slug !== parent.slug &&
      p.category === parent.category &&
      !FORMAT_ONLY_CATEGORIES.has(p.category),
  )
}

/**
 * Named-partner picks for the "often paired with" block on a product page.
 * Deterministic per parent, non-overlapping with pickRelated output.
 */
export function pickPairs(parent: Parent, count = 3): Parent[] {
  const pool = therapeuticPool(parent)
  if (pool.length === 0) return []
  const seed = hashSlug(parent.slug + '::pairs')
  return deterministicShuffle(pool, seed).slice(0, count)
}

/**
 * Related-product grid at the bottom of a product page. Different seed
 * suffix from pickPairs, and explicitly removes the pair-picks so the two
 * grids never overlap.
 */
export function pickRelated(parent: Parent, count = 4): Parent[] {
  const pool = therapeuticPool(parent)
  if (pool.length === 0) return []
  const pairSlugs = new Set(pickPairs(parent, 3).map((p) => p.slug))
  const seed = hashSlug(parent.slug + '::related')
  const shuffled = deterministicShuffle(pool, seed)
  const nonPair = shuffled.filter((p) => !pairSlugs.has(p.slug))
  return (nonPair.length >= count ? nonPair : shuffled).slice(0, count)
}

/**
 * Solvent compatibility list — every non-solvent parent that ships
 * lyophilized and can reconstitute with BAC water. Deterministic order.
 */
export function pickCompatibleCompounds(parent: Parent, count = 12): Parent[] {
  const pool = parents.filter((p) => p.slug !== parent.slug && p.maxMg != null)
  const seed = hashSlug(parent.slug + '::compat')
  return deterministicShuffle(pool, seed).slice(0, count)
}
