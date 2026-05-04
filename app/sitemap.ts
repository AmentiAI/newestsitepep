import type { MetadataRoute } from 'next'
import { parents, categories, hashSlug } from '@/lib/catalog'
import { REVIEWERS } from '@/lib/reviewers'
import { SITE } from '@/lib/site'

// Stable lastmod. Google ignores lastmod when it updates on every deploy —
// bump this only when the content of a section actually changes.
const CONTENT_LASTMOD = new Date('2026-04-15T00:00:00Z')

// Per-parent lastmod seeded by slug, so the sitemap reports a stable,
// differentiated lastmod rather than `now` for every URL.
function stableLastModFor(slug: string): Date {
  const h = hashSlug(slug)
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
    { url: `${base}/faq`, lastModified: CONTENT_LASTMOD, priority: 0.5 },
    { url: `${base}/where-to-buy-peptides`, lastModified: CONTENT_LASTMOD, priority: 0.9 },
    { url: `${base}/dosage-calculator`, lastModified: CONTENT_LASTMOD, priority: 0.8 },
    { url: `${base}/peptide-glossary`, lastModified: CONTENT_LASTMOD, priority: 0.7 },
    { url: `${base}/reconstitution-guide`, lastModified: CONTENT_LASTMOD, priority: 0.8 },
    { url: `${base}/reviewers`, lastModified: CONTENT_LASTMOD, priority: 0.7 },
    ...REVIEWERS.map((r) => ({
      url: `${base}/reviewers/${r.slug}`,
      lastModified: CONTENT_LASTMOD,
      priority: 0.6,
    })),
    ...categories.map((c) => ({
      url: `${base}/category/${c.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: CONTENT_LASTMOD,
      priority: 0.7,
    })),
    ...parents.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: stableLastModFor(p.slug),
      priority: 0.8,
    })),
  ]
}
