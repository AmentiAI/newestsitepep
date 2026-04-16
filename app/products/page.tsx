import type { Metadata } from 'next'
import { products, categories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Full Catalogue',
  description: `Every research peptide indexed on ${SITE.name} — ${products.length} compounds across ${categories.length} pathways.`,
  alternates: { canonical: `${SITE.baseUrl}/products` },
}

export default function ProductsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-ink-100 md:text-4xl">Full catalogue</h1>
        <p className="mt-2 text-ink-400">
          {products.length} compounds. Grouped by research pathway below.
        </p>
      </header>
      {categories.map((c) => {
        const list = products.filter((p) => p.category === c)
        return (
          <section key={c} className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-tide-200">
              {c} <span className="text-ink-400 text-sm">({list.length})</span>
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
