import { SITE } from './site'
import type { Product } from './products'
import { ratingFor } from './rating'

export function productJsonLd(p: Product) {
  const r = ratingFor(p.slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.shortDescription,
    image: p.image,
    sku: p.slug,
    brand: { '@type': 'Brand', name: SITE.name },
    category: p.category,
    offers: {
      '@type': 'Offer',
      url: `${SITE.baseUrl}/products/${p.slug}`,
      price: p.priceNum.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: r.value.toFixed(1),
      reviewCount: r.count,
      bestRating: '5',
      worstRating: '1',
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
