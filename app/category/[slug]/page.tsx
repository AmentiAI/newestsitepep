import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
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
    title: `${c} Research Peptides`,
    description: `Every ${c.toLowerCase()} research compound indexed on ${SITE.name}.`,
    alternates: { canonical: `${SITE.baseUrl}/category/${params.slug}` },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = categoryFromSlug(params.slug)
  if (!c) notFound()
  const list = products.filter((p) => p.category === c)
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-tide-300">Category</div>
        <h1 className="mt-2 text-3xl font-semibold text-ink-100 md:text-4xl">{c}</h1>
        <p className="mt-2 text-ink-400">{list.length} compounds indexed.</p>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </div>
  )
}
