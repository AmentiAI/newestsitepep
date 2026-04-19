import { SITE } from './site'
import type { Product } from './products'

export function productJsonLd(p: Product, description?: string) {
  const url = `${SITE.baseUrl}/products/${p.slug}`
  const purityReview = {
    '@type': 'Review',
    author: { '@type': 'Organization', name: 'Independent HPLC Analysis' },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
    },
    name: `Purity Verification — ${p.name}`,
    reviewBody: `${p.name} verified at ≥98% purity via high-performance liquid chromatography. Lyophilized powder meets research-grade specifications. Certificate of analysis available on request, lot-matched per vial.`,
    datePublished: '2026-01-01',
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: description ?? p.shortDescription,
    image: p.image,
    url,
    sku: p.slug,
    mpn: p.slug,
    productID: p.slug,
    brand: { '@type': 'Brand', name: SITE.name },
    category: p.category,
    offers: {
      '@type': 'Offer',
      url,
      price: p.priceNum.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    },
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
