import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { parents, categories, type Parent } from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, JsonLd } from '@/lib/schema'
import { categoryContentFor, CategoryContent } from '@/lib/categoryContent'

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
  const content = categoryContentFor(params.slug)
  const description = content
    ? content.intro.slice(0, 155) + (content.intro.length > 155 ? '…' : '')
    : `Every ${c.toLowerCase()} research compound indexed on ${SITE.name} — lot-matched COAs, transparent pricing.`
  const top = parents
    .filter((p) => p.category === c)
    .slice(0, 3)
    .map((p) => p.name)
  const topList = Array.from(new Set(top)).slice(0, 3).join(', ')
  return {
    title: topList
      ? `Buy ${c} Peptides Online | ${topList} | ${SITE.name}`
      : `Buy ${c} Peptides Online | ${SITE.name}`,
    description,
    alternates: { canonical: `${SITE.baseUrl}/category/${params.slug}` },
    openGraph: {
      title: `Buy ${c} Peptides Online`,
      description,
      url: `${SITE.baseUrl}/category/${params.slug}`,
    },
    twitter: { card: 'summary_large_image', title: `Buy ${c} Peptides Online`, description },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = categoryFromSlug(params.slug)
  if (!c) notFound()
  const list = parents.filter((p) => p.category === c)
  const content = categoryContentFor(params.slug)

  const grid = (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {list.map((p) => <ProductCard key={p.slug} p={p} />)}
    </div>
  )

  const header = (
    <header className="mb-8">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">Category</div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        {content?.heading ?? `Buy ${c} Peptides`}
      </h1>
      {content ? (
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">{content.intro}</p>
      ) : (
        <p className="mt-3 text-lg text-ink-700">
          {list.length} {c.toLowerCase()} peptide compounds in stock — every one sealed under
          nitrogen at ≥98% HPLC purity with a lot-matched certificate of analysis. Tracked
          US shipping in 3–5 business days; free shipping over $200.
        </p>
      )}
      <div className="mt-3 text-sm text-ink-500">
        {list.length} compounds in this class · ≥98% HPLC purity · lot-matched CoA
      </div>
    </header>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Catalogue</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{c}</span>
      </nav>

      {header}

      <QuickAnswer list={list} category={c} />

      {content ? (
        <VariedBody content={content} grid={grid} category={c} />
      ) : (
        grid
      )}

      <RelatedLinks keys={['products', 'calc', 'recon', 'glossary', 'wheretobuy', 'guides']} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Catalogue', url: `${SITE.baseUrl}/products` },
          { name: c, url: `${SITE.baseUrl}/category/${params.slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${c} Peptides`,
          url: `${SITE.baseUrl}/category/${params.slug}`,
          description: content?.intro ?? `${c} research compounds on ${SITE.name}.`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: list.length,
            itemListElement: list.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE.baseUrl}/products/${p.slug}`,
              name: p.name,
            })),
          },
        }}
      />
    </div>
  )
}

function VariedBody({
  content,
  grid,
  category,
}: {
  content: CategoryContent
  grid: React.ReactNode
  category: string
}) {
  const framework = <ComparisonFramework content={content} />
  const mechanism = <MechanismPrimer content={content} />
  const usecases = <UseCases content={content} />
  const faqs = <Faqs content={content} />
  const related = <RelatedReading content={content} />

  switch (content.layout) {
    case 'framework-first':
      return (
        <>
          {framework}
          <GridBlock grid={grid} category={category} />
          {mechanism}
          {usecases}
          {faqs}
          {related}
        </>
      )
    case 'mechanism-first':
      return (
        <>
          {mechanism}
          {usecases}
          <GridBlock grid={grid} category={category} />
          {framework}
          {faqs}
          {related}
        </>
      )
    case 'usecase-first':
      return (
        <>
          {usecases}
          {framework}
          <GridBlock grid={grid} category={category} />
          {mechanism}
          {faqs}
          {related}
        </>
      )
    case 'faq-inline':
      return (
        <>
          {framework}
          {mechanism}
          <GridBlock grid={grid} category={category} />
          {faqs}
          {usecases}
          {related}
        </>
      )
  }
}

function QuickAnswer({
  list,
  category,
}: {
  list: Parent[]
  category: string
}) {
  if (list.length === 0) return null
  const prices = list.map((p) => p.cheapest.pricePaid)
  const lowest = Math.min(...prices)
  const highest = Math.max(...prices)
  const top = list.slice(0, 3).map((p) => p.name)
  const topList =
    top.length === 1
      ? top[0]
      : top.length === 2
        ? `${top[0]} and ${top[1]}`
        : `${top[0]}, ${top[1]} and ${top[2]}`
  return (
    <div className="my-6 border-l-4 border-emerald-600 bg-emerald-50/40 p-5 rounded-r">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
        Quick answer
      </p>
      <p className="mt-2 text-base leading-relaxed text-ink-800">
        {SITE.name} carries <strong>{list.length} {category.toLowerCase()} peptide compounds</strong>{' '}
        priced from <strong>${lowest.toFixed(2)}</strong> to <strong>${highest.toFixed(2)}</strong>.
        The top products are {topList}. Every vial is sealed under nitrogen at ≥98% HPLC purity
        with its original lot CoA. Tracked US shipping in 3–5 business days; free shipping over $200.
      </p>
    </div>
  )
}

function GridBlock({ grid, category }: { grid: React.ReactNode; category: string }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-ink-900">{category} catalogue</h2>
      <div className="mt-4">{grid}</div>
    </section>
  )
}

function ComparisonFramework({ content }: { content: CategoryContent }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-ink-900">How to compare compounds in this class</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {content.comparisonFramework.map((f) => (
          <div key={f.label} className="card p-5">
            <div className="text-sm font-bold text-brand-600 uppercase tracking-wider">{f.label}</div>
            <p className="mt-2 text-ink-700 leading-relaxed">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MechanismPrimer({ content }: { content: CategoryContent }) {
  return (
    <section className="my-12 card bg-ink-50 p-6">
      <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Mechanism primer</div>
      <p className="mt-2 text-ink-800 leading-relaxed">{content.mechanismPrimer}</p>
    </section>
  )
}

function UseCases({ content }: { content: CategoryContent }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-ink-900">Typical use-cases</h2>
      <ul className="mt-4 space-y-2">
        {content.useCases.map((u, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
            <span className="text-ink-700 leading-relaxed">{u}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Faqs({ content }: { content: CategoryContent }) {
  if (!content.faqs.length) return null
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-ink-900">Frequently asked</h2>
      <div className="mt-4 divide-y divide-ink-200 card">
        {content.faqs.map((f, i) => (
          <details key={i} className="group p-5">
            <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
            <p className="mt-2 text-ink-700 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function RelatedReading({ content }: { content: CategoryContent }) {
  if (!content.relatedReading.length) return null
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-ink-900">Related reading</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {content.relatedReading.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-full border border-brand-400 bg-brand-50 px-4 py-2 text-sm font-semibold text-ink-800 hover:bg-brand-100"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
