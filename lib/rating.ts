// Deterministic per-slug rating. Stable across SSR/hydration.
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function ratingFor(slug: string): { value: number; count: number } {
  const h = hash(slug)
  // 4.0 – 5.0 inclusive, one decimal
  const value = Math.round((4 + ((h % 1000) / 1000)) * 10) / 10
  // 47 – 342 reviews
  const count = 47 + (h % 296)
  return { value, count }
}
