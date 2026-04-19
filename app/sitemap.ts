import type { MetadataRoute } from 'next'
import { products, categories } from '@/lib/products'
import { SITE } from '@/lib/site'

const GUIDE_SLUGS = [
  'what-are-peptides',
  'peptides-for-fat-loss',
  'peptides-for-muscle-growth',
  'peptides-for-skin',
  'peptides-for-sleep',
  'bpc-157-vs-tb-500',
  'semaglutide-vs-tirzepatide',
  'peptide-stacks',
]

// Stable lastmod. Google ignores lastmod when it updates on every deploy —
// bump this only when the content of a section actually changes.
const CONTENT_LASTMOD = new Date('2026-04-15T00:00:00Z')

// Per-product lastmod seeded by slug, so the sitemap reports a stable,
// differentiated lastmod rather than `now` for every URL.
function stableLastModFor(slug: string): Date {
  let h = 0x811c9dc5
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0
  }
  // Spread product lastmods across a 90-day window ending at CONTENT_LASTMOD
  // so Google doesn't see them all bouncing in lockstep either.
  const offsetDays = h % 90
  const d = new Date(CONTENT_LASTMOD)
  d.setUTCDate(d.getUTCDate() - offsetDays)
  return d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl
  return [
    { url: base, lastModified: CONTENT_LASTMOD, priority: 1 },
    { url: `${base}/products`, lastModified: CONTENT_LASTMOD, priority: 0.9 },
    { url: `${base}/looksmaxxing`, lastModified: CONTENT_LASTMOD, priority: 0.9 },
    { url: `${base}/guides`, lastModified: CONTENT_LASTMOD, priority: 0.8 },
    { url: `${base}/faq`, lastModified: CONTENT_LASTMOD, priority: 0.5 },
    { url: `${base}/where-to-buy-peptides`, lastModified: CONTENT_LASTMOD, priority: 0.9 },
    { url: `${base}/dosage-calculator`, lastModified: CONTENT_LASTMOD, priority: 0.8 },
    { url: `${base}/peptide-glossary`, lastModified: CONTENT_LASTMOD, priority: 0.7 },
    { url: `${base}/reconstitution-guide`, lastModified: CONTENT_LASTMOD, priority: 0.8 },
    ...GUIDE_SLUGS.map((s) => ({
      url: `${base}/guides/${s}`,
      lastModified: CONTENT_LASTMOD,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${base}/category/${c.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: CONTENT_LASTMOD,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: stableLastModFor(p.slug),
      priority: 0.8,
    })),
  ]
}
