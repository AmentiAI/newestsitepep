import Link from 'next/link'
import { products } from '@/lib/products'
import ProductCard from './ProductCard'

export default function GuideLayout({
  eyebrow,
  title,
  lead,
  children,
  related,
}: {
  eyebrow: string
  title: string
  lead: string
  children: React.ReactNode
  related?: string[]
}) {
  const relatedProducts = (related ?? [])
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as typeof products
  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        {eyebrow}
      </div>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-ink-900 md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg text-ink-700 leading-relaxed">{lead}</p>
      <div className="mt-4 h-1 w-16 bg-brand-400" />

      <div className="mt-10 space-y-8 text-ink-800 leading-relaxed">{children}</div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-ink-200 pt-10">
          <h2 className="text-2xl font-bold text-ink-900">Featured compounds</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}

      <div className="mt-12 card bg-brand-50 border-brand-400 p-6">
        <div className="font-bold text-ink-900">Ready to browse?</div>
        <p className="mt-1 text-ink-700">
          Every compound referenced on this page is indexed in the catalogue with
          per-batch COAs and direct purchase links.
        </p>
        <Link href="/products" className="btn-yellow mt-4 inline-block">
          Open the catalogue →
        </Link>
      </div>
    </article>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-ink-900 mt-10 mb-3">{children}</h2>
}
export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-ink-900 mt-6 mb-2">{children}</h3>
}
export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-ink-700 leading-relaxed">{children}</p>
}
export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="ml-5 list-disc space-y-1 text-ink-700">{children}</ul>
}
