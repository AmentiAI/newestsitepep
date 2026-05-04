import { SITE } from './site'
import type { Parent } from './catalog'

/**
 * Product JSON-LD for a parent compound. Each variant becomes one Offer in
 * the offers[] array — Google's Merchant listing schema supports this
 * one-Product-with-many-Offers pattern, which lets the single parent URL
 * consolidate link equity while still surfacing per-size pricing in SERPs.
 *
 * Purity attestations live on `additionalProperty` (PropertyValue) rather than
 * a `Review` + `aggregateRating` pair: a HPLC certificate is a measurement,
 * not a customer review, and Google treats single-Review-from-the-seller
 * patterns as spammy structured markup. PropertyValue is the schema-correct
 * container for measured product attributes.
 */
export function productJsonLd(parent: Parent, description?: string) {
  const url = `${SITE.baseUrl}/products/${parent.slug}`
  const offers = parent.variants.map((v) => ({
    '@type': 'Offer',
    name: v.name,
    price: v.pricePaid.toFixed(2),
    priceCurrency: 'USD',
    availability: v.inStock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: `${SITE.baseUrl}/products/${parent.slug}`,
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
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Purity',
        value: '≥98%',
        unitText: 'percent',
        measurementTechnique: 'High-performance liquid chromatography (HPLC)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Certificate of analysis',
        value: 'Lot-matched, available on request',
      },
      {
        '@type': 'PropertyValue',
        name: 'Form',
        value: 'Lyophilized powder',
      },
      {
        '@type': 'PropertyValue',
        name: 'Intended use',
        value: 'In vitro / laboratory research only — not for human consumption',
      },
    ],
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

/**
 * Person JSON-LD for a scientific reviewer. Used on reviewer profile pages
 * and referenced by `reviewedBy` on content they've vetted. `sameAs` must
 * contain at least one public verification URL — absence of a verifiable
 * source is grounds to omit the reviewer entirely rather than ship a
 * Person schema without one.
 */
export function personJsonLd(r: {
  slug: string
  name: string
  honorific?: string
  postNominals?: string
  role: string
  affiliation: string
  shortBio: string
  sameAs: string[]
}) {
  const profileUrl = `${SITE.baseUrl}/reviewers/${r.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': profileUrl,
    name: r.name,
    honorificPrefix: r.honorific,
    honorificSuffix: r.postNominals,
    jobTitle: r.role,
    affiliation: { '@type': 'Organization', name: r.affiliation },
    description: r.shortBio,
    url: profileUrl,
    sameAs: r.sameAs,
  }
}

/**
 * Article JSON-LD for guide content. The `reviewedBy` block points at the
 * Person schema by `@id` (the reviewer's profile URL) so Google can resolve
 * authorship/review credentials across pages without the Person object being
 * inlined twice. `speakable` exposes the lead paragraph to voice surfaces.
 */
export function articleJsonLd(opts: {
  url: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  reviewer?: {
    slug: string
    name: string
    honorific?: string
    postNominals?: string
  }
  image?: string
}) {
  const reviewedBy = opts.reviewer
    ? {
        '@type': 'Person',
        '@id': `${SITE.baseUrl}/reviewers/${opts.reviewer.slug}`,
        name: [opts.reviewer.honorific, opts.reviewer.name].filter(Boolean).join(' '),
        ...(opts.reviewer.postNominals ? { honorificSuffix: opts.reviewer.postNominals } : {}),
      }
    : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.baseUrl,
    },
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.baseUrl,
    },
    ...(reviewedBy ? { reviewedBy } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article > p:first-of-type'],
    },
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
