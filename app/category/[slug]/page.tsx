import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

const toSlug = (c: string) => c.toLowerCase().replace(/\s+/g, '-')

export function generateStaticParams() {
  return categories.map((c) => ({ slug: toSlug(c) }))
}

function categoryFromSlug(slug: string) {
  return categories.find((c) => toSlug(c) === slug)
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = categoryFromSlug(params.slug)
  if (!c) return {}
  return {
    title: `Buy ${c} Research Peptides | ${SITE.name}`,
    description: `Every ${c.toLowerCase()} research compound indexed on ${SITE.name} — lot-matched COAs, transparent pricing.`,
    alternates: { canonical: `${SITE.baseUrl}/category/${params.slug}` },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = categoryFromSlug(params.slug)
  if (!c) notFound()
  const list = products.filter((p) => p.category === c)
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-brand-600">Category</div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
          Buy {c} Peptides
        </h1>
        <p className="mt-3 text-lg text-ink-700">
          {list.length} {c.toLowerCase()} research compounds indexed — every vial is
          lot-matched to an independent COA and ships lyophilized from our vetted
          supplier.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>

      <RelatedLinks keys={['products', 'calc', 'recon', 'glossary', 'wheretobuy', 'guides']} />
    </div>
  )
}
