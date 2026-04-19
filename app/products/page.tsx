import type { Metadata } from 'next'
import { parents, categories } from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: `Buy Peptides Online — Shop All ${parents.length} Compounds In Stock`,
  description: `${parents.length} peptide compounds in stock across ${categories.length} classes. ≥98% HPLC purity, lot-matched CoA, tracked US shipping 3–5 business days. Free shipping over $200.`,
  alternates: { canonical: `${SITE.baseUrl}/products` },
  openGraph: {
    title: `Buy Peptides Online — Shop All ${parents.length} Compounds`,
    description: `${parents.length} peptide compounds in stock. ≥98% HPLC purity, lot-matched CoA.`,
    url: `${SITE.baseUrl}/products`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Buy Peptides Online — ${parents.length} Compounds In Stock`,
    description: `${parents.length} peptide compounds in stock. ≥98% HPLC purity, lot-matched CoA.`,
  },
}

export default function ProductsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-ink-900 md:text-4xl">Shop all peptide compounds</h1>
        <p className="mt-2 text-ink-600">
          {parents.length} compounds in stock across {categories.length} classes. ≥98% HPLC purity,
          lot-matched CoA, tracked US shipping in 3–5 business days.
        </p>
      </header>
      {categories.map((c) => {
        const list = parents.filter((p) => p.category === c)
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
