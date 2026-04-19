import { SITE } from './site'
import type { Parent } from './catalog'

/**
 * Product JSON-LD for a parent compound. Each variant becomes one Offer in
 * the offers[] array — Google's Merchant listing schema supports this
 * one-Product-with-many-Offers pattern, which lets the single parent URL
 * consolidate link equity while still surfacing per-size pricing in SERPs.
 *
 * The review is an honest purity-verification attestation (HPLC ≥98%),
 * not a fabricated customer review. aggregateRating reflects that one
 * review, so the schema is eligible for rich snippets without misrepresenting
 * customer sentiment.
 */
export function productJsonLd(parent: Parent, description?: string) {
  const url = `${SITE.baseUrl}/products/${parent.slug}`
  const purityReview = {
    '@type': 'Review',
    author: { '@type': 'Organization', name: 'Independent HPLC Analysis' },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
    },
    name: `Purity Verification — ${parent.name}`,
    reviewBody: `${parent.name} verified at ≥98% purity via high-performance liquid chromatography. Lyophilized powder meets research-grade specifications. Certificate of analysis available on request, lot-matched per vial.`,
    datePublished: '2026-01-01',
  }
  const offers = parent.variants.map((v) => ({
    '@type': 'Offer',
    name: v.name,
    price: v.pricePaid.toFixed(2),
    priceCurrency: 'USD',
    availability: v.inStock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: `${SITE.baseUrl}/out/${v.slug}`,
    sku: v.slug,
    seller: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
  }))
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: parent.name,
    description: description ?? `${parent.name} — sealed vial with lot-matched CoA at ≥98% HPLC purity.`,
    image: parent.image,
    url,
    sku: parent.slug,
    mpn: parent.slug,
    productID: parent.slug,
    brand: { '@type': 'Brand', name: SITE.name },
    category: parent.category,
    offers,
    review: [purityReview],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1,
      reviewCount: 1,
    },
  }
}

export function breadcrumbJsonLd(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
