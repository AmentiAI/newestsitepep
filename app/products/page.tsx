import type { Metadata } from 'next'
import { products, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: `Buy Research Peptides — Full Catalogue | ${SITE.name}`,
  description: `Buy research peptides indexed on ${SITE.name} — ${products.length} compounds across ${categories.length} pathways, lot-matched COAs, USP bac water pairings.`,
  alternates: { canonical: `${SITE.baseUrl}/products` },
}

export default function ProductsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-ink-900 md:text-4xl">Buy research peptides</h1>
        <p className="mt-2 text-ink-600">
          {products.length} compounds indexed across {categories.length} pathways. Every link routes to a lot-matched, COA-backed vial.
        </p>
      </header>
      {categories.map((c) => {
        const list = products.filter((p) => p.category === c)
        return (
          <section key={c} className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-ink-900">
              {c} <span className="text-ink-500 text-sm font-medium">({list.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}
