import Link from 'next/link'
import { parents, categories } from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 86400

const CATEGORY_COPY: Record<string, string> = {
  'Fat Loss': 'Metabolic and appetite-pathway compounds.',
  'Growth': 'Growth-axis and secretagogue peptides.',
  'Recovery': 'Repair, inflammation, and mitochondrial support.',
  'Longevity': 'Cellular aging and senescence compounds.',
  'Cognitive': 'Nootropic and sleep-support peptides.',
  'Blends': 'Pre-mixed stacks for side-by-side comparison.',
}

// Parents are already one row per compound, so no family dedupe is needed.
// Picking the first N gives one card per compound in sorted order.
function pickFeatured(count: number) {
  return parents.slice(0, count)
}

export default function HomePage() {
  const featured = pickFeatured(12)
  const carousel = featured.slice(0, 6)
  const grid = featured.slice(0, 8)

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12 lg:py-24">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
              <span className="inline-block h-1 w-8 bg-brand-400" /> Peptide Catalogue
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-ink-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-brand-500">TideMaxxing</span><br />
              The One Stop Shop<br />
              For All Your Peptides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-700 sm:mt-6 sm:text-lg">
              Buy research peptides the clean way. {SITE.name} is a one-stop index
              for purchasing lot-matched, COA-backed vials — organised by pathway,
              priced transparently, routed through a single vetted supplier. No
              upsells, no mystery stacks. Just a catalogue you can actually buy from.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link href="/products" className="btn-yellow">
                Buy research peptides — {SITE.promoPercent}% off sitewide
              </Link>
              <Link
                href="/buy/shop"
                target="_blank"
                rel="noopener nofollow sponsored"
                className="btn-outline"
              >
                Visit the shop →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm sm:mt-10 sm:grid-cols-4">
              <Stat k={`${parents.length}`} v="compounds indexed" />
              <Stat k={`${categories.length}`} v="categories" />
              <Stat k="COA" v="per-batch testing" />
              <Stat k="USP" v="bac water" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <HeroCarousel items={carousel} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-black text-ink-900">Browse by pathway</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${c.toLowerCase().replace(/\s+/g, '-')}`}
              className="card p-6 transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-brand-600">{c}</div>
              <div className="mt-2 text-lg font-semibold text-ink-900">{CATEGORY_COPY[c] ?? ''}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-black text-ink-900">Featured compounds</h2>
          <Link href="/products" className="font-semibold text-brand-600 hover:text-brand-700">
            See all {parents.length} →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {grid.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <RelatedLinks title="Start here" keys={['wheretobuy', 'calc', 'recon', 'glossary', 'guides', 'looksmaxxing']} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="card bg-brand-50 border-brand-400 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-ink-900">Why catalogue the tide?</h2>
          <p className="mt-3 max-w-3xl text-ink-700 leading-relaxed">
            New compounds, new blends, new dose formats every month. We keep one clean
            index so you can compare purity specs, find the right vial size, and link
            directly to a supplier with third-party COAs. Nothing here is medical advice.
          </p>
        </div>
      </section>
    </>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="card px-4 py-3">
      <div className="text-2xl font-black text-ink-900">{k}</div>
      <div className="text-xs font-semibold text-ink-500">{v}</div>
    </div>
  )
}
