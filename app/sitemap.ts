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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = SITE.baseUrl
  return [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/products`, lastModified: now, priority: 0.9 },
    { url: `${base}/looksmaxxing`, lastModified: now, priority: 0.9 },
    { url: `${base}/guides`, lastModified: now, priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, priority: 0.5 },
    ...GUIDE_SLUGS.map((s) => ({
      url: `${base}/guides/${s}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${base}/category/${c.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ]
}
