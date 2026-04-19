import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { products, getProduct } from '@/lib/products'
import { contentFor, CompoundContent } from '@/lib/content'
import { SITE } from '@/lib/site'
import { discountedFmt } from '@/lib/price'
import { productJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/schema'
import { varianceFor, PageVariance, SectionKey, ExtraBlockKey } from '@/lib/pageVariance'
import { copyFor } from '@/lib/productCopy'
import { analyzeFamily, savingsPct, reconTableFor, pairPicksFor, parseDose, type VariantRow } from '@/lib/variants'
import ProductCard from '@/components/ProductCard'
import RelatedLinks from '@/components/RelatedLinks'

export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug)
  if (!p) return {}
  const copy = copyFor(p)
  const description = copy.metaDescription
  const title = `Buy ${p.name} Online — ${p.category} Peptide | ${SITE.name}`
  return {
    title,
    description,
    alternates: { canonical: `${SITE.baseUrl}/products/${p.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.baseUrl}/products/${p.slug}`,
      images: [{ url: p.image }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug)
  if (!p) notFound()

  const c = contentFor(p.slug)
  const copy = copyFor(p)
  const faqs = c?.faqs ?? []
  const related = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4)

  const v = varianceFor(p.slug, p.category)

  const family = analyzeFamily(p)
  const familySavings = savingsPct(family)
  const reconRows = reconTableFor(p)
  const pairPicks = pairPicksFor(p, 3)
  const { mg: currentMg } = parseDose(p.name)

  const hero = (
    <Hero p={p} tagline={copy.tagline} overview={c?.overview} variance={v} />
  )

  const computedBlocks = (
    <div className="mt-10 space-y-6">
      {family.length > 1 && (
        <VariantTable rows={family} savings={familySavings} productBase={parseDose(p.name).baseName} />
      )}
      {reconRows.length > 0 && currentMg && (
        <ReconBlock productName={p.name} mg={currentMg} rows={reconRows} />
      )}
      {pairPicks.length > 0 && (
        <PairPicks productName={p.name} picks={pairPicks} />
      )}
    </div>
  )

  const sidebar = (
    <Sidebar p={p} variance={v} />
  )

  const mainSections = c
    ? v.sectionOrder
        .filter((k) => sectionHasContent(k, c, faqs.length))
        .map((k, idx) => (
          <ContentSection
            key={k}
            sectionKey={k}
            content={c}
            faqs={faqs}
            variance={v}
            order={idx}
          />
        ))
    : null

  const extrasByPosition = (pos: 'top' | 'mid' | 'bottom') =>
    v.extras
      .filter((e) => e.position === pos)
      .map((e) => <ExtraBlock key={e.key} blockKey={e.key} p={p} variance={v} />)

  const relatedBlock = related.length > 0 && (
    <RelatedBlock heading={v.relatedHeading} related={related} />
  )

  const content = c ? (
    <>
      {extrasByPosition('top')}
      {v.sidebar === 'inline-top' && <InlineSidebarRow sidebar={sidebar} />}
      {renderBody(v, sidebar, mainSections, extrasByPosition('mid'))}
      {v.sidebar === 'inline-bottom' && <InlineSidebarRow sidebar={sidebar} />}
      {extrasByPosition('bottom')}
    </>
  ) : (
    <section className="mt-16 card p-6">
      <p className="text-ink-700">{copy.shortDescription}</p>
      <p className="mt-3 text-sm text-ink-500">
        Full compound write-up coming soon. Request the supplier's spec sheet or COA from
        the product page at checkout.
      </p>
    </section>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Catalogue</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{p.name}</span>
      </nav>

      {hero}

      {computedBlocks}

      {v.related === 'before-content' && relatedBlock && (
        <div className="mt-16">{relatedBlock}</div>
      )}

      {content}

      {v.related === 'between' && relatedBlock && (
        <div className="mt-16">{relatedBlock}</div>
      )}

      <RelatedLinks keys={['calc', 'recon', 'glossary', 'wheretobuy', 'stacks', 'guides']} />

      {v.related === 'after-content' && relatedBlock && (
        <div className="mt-16">{relatedBlock}</div>
      )}

      <JsonLd data={productJsonLd(p, copy.shortDescription)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Catalogue', url: `${SITE.baseUrl}/products` },
          { name: p.name, url: `${SITE.baseUrl}/products/${p.slug}` },
        ])}
      />
    </div>
  )
}

function sectionHasContent(
  key: SectionKey,
  c: CompoundContent,
  faqCount: number,
): boolean {
  switch (key) {
    case 'mechanism':
      return !!c.mechanism
    case 'highlights':
      return c.highlights.length > 0
    case 'protocolNotes':
      return !!c.protocolNotes
    case 'stackingNotes':
      return !!c.stackingNotes
    case 'storage':
      return !!c.storage
    case 'faqs':
      return faqCount > 0
  }
}

function renderBody(
  v: PageVariance,
  sidebar: React.ReactNode,
  sections: React.ReactNode,
  midExtras: React.ReactNode,
) {
  const sectionsWithMid = (
    <>
      {sections && Array.isArray(sections) && sections.length > 3 ? (
        <>
          {sections.slice(0, Math.ceil(sections.length / 2))}
          {midExtras}
          {sections.slice(Math.ceil(sections.length / 2))}
        </>
      ) : (
        <>
          {sections}
          {midExtras}
        </>
      )}
    </>
  )

  if (v.sidebar === 'left') {
    return (
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <aside className="lg:col-span-1 lg:order-first space-y-4">{sidebar}</aside>
        <div className="lg:col-span-2 space-y-10">{sectionsWithMid}</div>
      </div>
    )
  }
  if (v.sidebar === 'right') {
    return (
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">{sectionsWithMid}</div>
        <aside className="space-y-4">{sidebar}</aside>
      </div>
    )
  }
  // inline variants render the sidebar as a separate row elsewhere
  return <div className="mt-16 space-y-10">{sectionsWithMid}</div>
}

function InlineSidebarRow({ sidebar }: { sidebar: React.ReactNode }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {sidebar}
    </div>
  )
}

function Hero({
  p,
  tagline,
  overview,
  variance: v,
}: {
  p: ReturnType<typeof getProduct> & {}
  tagline: string
  overview?: string
  variance: PageVariance
}) {
  const image = (
    <div className="card relative aspect-square overflow-hidden">
      <Image
        src={p.image}
        alt={p.name}
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-contain p-8"
      />
    </div>
  )

  const info = (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-brand-600">{p.category}</div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{p.name}</h1>
      <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-700">
        ≥98% HPLC purity · lot-matched CoA · sealed under nitrogen
      </div>
      <p className="mt-4 text-lg text-ink-800 font-medium">{tagline}</p>
      {overview && (
        <p className="mt-3 leading-relaxed text-ink-700">{overview}</p>
      )}

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-black text-ink-900">{discountedFmt(p.priceNum)}</span>
        <span className="text-xl font-medium text-ink-400 line-through">{p.price}</span>
        <span className="rounded-md bg-red-600 px-2 py-1 text-xs font-black text-white">
          SAVE {SITE.promoPercent}%
        </span>
      </div>
      <div className="mt-1 text-sm text-ink-500">USD · ships lyophilized · discount auto-applied</div>

      <Link
        href={`/go/${p.slug}`}
        target="_blank"
        rel="noopener nofollow sponsored"
        className="btn-yellow mt-5 inline-flex items-center gap-2"
      >
        Buy now →
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-brand-400 bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-ink-800">
            {t}
          </span>
        ))}
      </div>
    </div>
  )

  if (v.hero === 'stacked') {
    return (
      <div className="space-y-6">
        <div className="max-w-3xl mx-auto w-full">{image}</div>
        <div className="max-w-3xl mx-auto w-full">{info}</div>
      </div>
    )
  }
  if (v.hero === 'image-right') {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        {info}
        {image}
      </div>
    )
  }
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {image}
      {info}
    </div>
  )
}

function ContentSection({
  sectionKey,
  content: c,
  faqs,
  variance: v,
  order,
}: {
  sectionKey: SectionKey
  content: CompoundContent
  faqs: CompoundContent['faqs']
  variance: PageVariance
  order: number
}) {
  const title = v.headings[sectionKey]

  switch (sectionKey) {
    case 'mechanism':
      return (
        <Section title={title} index={order}>
          <p>{c.mechanism}</p>
        </Section>
      )
    case 'highlights':
      return (
        <Section title={title} index={order}>
          <ul className="space-y-2">
            {c.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                <span className="text-ink-700">{h}</span>
              </li>
            ))}
          </ul>
        </Section>
      )
    case 'protocolNotes':
      return (
        <Section title={title} index={order}>
          <p>{c.protocolNotes}</p>
        </Section>
      )
    case 'stackingNotes':
      return (
        <Section title={title} index={order}>
          <p>{c.stackingNotes}</p>
        </Section>
      )
    case 'storage':
      return (
        <Section title={title} index={order}>
          <p>{c.storage}</p>
        </Section>
      )
    case 'faqs':
      return (
        <Section title={title} index={order}>
          <div className="divide-y divide-ink-200 card">
            {faqs.map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="cursor-pointer font-semibold text-ink-900">
                  {f.q}
                </summary>
                <p className="mt-2 text-ink-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )
  }
}

function Sidebar({
  p,
  variance: v,
}: {
  p: ReturnType<typeof getProduct> & {}
  variance: PageVariance
}) {
  const rows: Record<PageVariance['specsOrder'][number], { k: string; v: string }> = {
    compound: { k: 'Compound', v: p.name },
    category: { k: 'Category', v: p.category },
    price: { k: 'Price', v: p.price },
    format: { k: 'Format', v: 'Lyophilized vial' },
    coa: { k: 'COA', v: 'Per-lot, independent lab' },
    use: { k: 'Use', v: 'Research only' },
  }

  return (
    <>
      <div className="card p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Quick specs</div>
        <dl className="mt-3 space-y-2 text-sm">
          {v.specsOrder.map((key) => (
            <Row key={key} k={rows[key].k} v={rows[key].v} />
          ))}
        </dl>
      </div>
      <div className="card bg-brand-50 border-brand-400 p-5">
        <div className="text-sm font-bold text-ink-900">Research-use-only notice</div>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          Compounds listed on {SITE.name} are sold for in-vitro and laboratory research.
          They are not medicines, supplements, or consumer products. Nothing on this page
          is medical or clinical advice.
        </p>
      </div>
    </>
  )
}

function ExtraBlock({
  blockKey,
  p,
}: {
  blockKey: ExtraBlockKey
  p: ReturnType<typeof getProduct> & {}
  variance: PageVariance
}) {
  switch (blockKey) {
    case 'category-context':
      return (
        <section className="mt-12 card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
            {p.category} class
          </div>
          <p className="mt-2 text-ink-700 leading-relaxed">
            {p.name} sits in the {p.category.toLowerCase()} shelf at {SITE.name}. Buyers
            comparing compounds in this class typically weigh potency, half-life, and
            receptor selectivity before choosing a vial.
          </p>
        </section>
      )
    case 'vial-note':
      return (
        <section className="mt-12 card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Vial and format
          </div>
          <p className="mt-2 text-ink-700 leading-relaxed">
            {p.name} ships as a lyophilized powder in a single-use glass vial, sealed and
            labelled with the lot identifier. The matching COA is issued per lot by an
            independent analytical lab.
          </p>
        </section>
      )
    case 'literature-callout':
      return (
        <section className="mt-12 card bg-ink-50 p-5">
          <div className="text-sm font-bold text-ink-900">Sourcing and QC</div>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">
            Every {p.name} vial ships sealed under nitrogen with a lot-matched
            certificate of analysis. Purity is HPLC-verified at ≥98% and a mass-spec
            identity check is on file per lot.
          </p>
        </section>
      )
    case 'tag-strip':
      if (!p.tags.length) return null
      return (
        <section className="mt-12">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Compound tags
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-ink-700"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )
  }
}

function RelatedBlock({
  heading,
  related,
}: {
  heading: string
  related: ReturnType<typeof getProduct>[]
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-ink-900">{heading}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((r) => r && <ProductCard key={r.slug} p={r} />)}
      </div>
    </section>
  )
}

function Section({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children: React.ReactNode
}) {
  // Slight variance in heading hierarchy/prose class so the first few
  // sections don't all render with identical DOM shape either.
  const eyebrow = index % 3 === 1
  return (
    <section>
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Section {index + 1}
        </div>
      )}
      <h2 className={`${eyebrow ? 'mt-1' : ''} text-2xl font-bold text-ink-900`}>{title}</h2>
      <div className="mt-3 prose-body">{children}</div>
    </section>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-ink-200 pb-1 last:border-0">
      <dt className="text-ink-500">{k}</dt>
      <dd className="font-medium text-ink-900 text-right">{v}</dd>
    </div>
  )
}

function VariantTable({
  rows,
  savings,
  productBase,
}: {
  rows: VariantRow[]
  savings: number | null
  productBase: string
}) {
  return (
    <section className="card p-5" aria-labelledby="variant-heading">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2 id="variant-heading" className="text-xl font-bold text-ink-900">
          {productBase} vial sizes — price per mg
        </h2>
        {savings !== null && savings > 0 && (
          <span className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-black uppercase tracking-wider text-white">
            Up to {savings}% cheaper per mg
          </span>
        )}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-ink-500">
              <th className="py-2 pr-3 font-semibold">Size</th>
              <th className="py-2 pr-3 font-semibold">Price</th>
              <th className="py-2 pr-3 font-semibold">$ / mg</th>
              <th className="py-2 pr-3 font-semibold">Best value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.product.slug}
                className={`border-b border-ink-100 last:border-0 ${
                  r.isCurrent ? 'bg-brand-50' : ''
                }`}
              >
                <td className="py-2 pr-3 font-medium text-ink-900">
                  {r.isCurrent ? (
                    <span>{r.mg ? `${r.mg} mg` : r.product.name} <span className="text-xs text-brand-600">· this page</span></span>
                  ) : (
                    <Link href={`/products/${r.product.slug}`} className="text-brand-700 hover:underline">
                      Buy {r.product.name}
                    </Link>
                  )}
                </td>
                <td className="py-2 pr-3 text-ink-800">{discountedFmt(r.pricePaid)}</td>
                <td className="py-2 pr-3 text-ink-800">
                  {r.pricePerMg !== null ? `$${r.pricePerMg.toFixed(2)}` : '—'}
                </td>
                <td className="py-2 pr-3">
                  {r.isBestValue && (
                    <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                      Best
                    </span>
                  )}
                  {r.isWorstValue && !r.isBestValue && (
                    <span className="text-xs text-ink-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ReconBlock({
  productName,
  mg,
  rows,
}: {
  productName: string
  mg: number
  rows: { targetMgPerMl: number; ml: string }[]
}) {
  return (
    <section className="card p-5" aria-labelledby="recon-heading">
      <h2 id="recon-heading" className="text-xl font-bold text-ink-900">
        {productName} reconstitution volumes
      </h2>
      <p className="mt-2 text-sm text-ink-600">
        A {mg} mg vial reconstituted with bacteriostatic water yields:
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {rows.map((r) => (
          <div key={r.targetMgPerMl} className="rounded-md border border-ink-200 p-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              at {r.targetMgPerMl} mg/mL
            </div>
            <div className="mt-1 text-lg font-bold text-ink-900">{r.ml}</div>
            <div className="text-xs text-ink-500">BAC water</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-500">
        Calculated from vial mass. Verify against the supplier's instructions for your protocol.
      </p>
    </section>
  )
}

function PairPicks({
  productName,
  picks,
}: {
  productName: string
  picks: ReturnType<typeof pairPicksFor>
}) {
  const names = picks.map((x) => x.name)
  const list =
    names.length === 1
      ? names[0]
      : names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
  return (
    <section className="card p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
        Often paired with
      </div>
      <p className="mt-2 text-ink-800 leading-relaxed">
        Buyers viewing <strong>{productName}</strong> typically also consider {list} from the same
        shelf. Each is in stock, sealed under nitrogen with a lot-matched CoA.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {picks.map((x) => (
          <Link
            key={x.slug}
            href={`/products/${x.slug}`}
            className="rounded-full border border-brand-400 bg-brand-50 px-3 py-1 text-sm font-semibold text-ink-800 hover:bg-brand-100"
          >
            Buy {x.name} — {discountedFmt(x.priceNum)}
          </Link>
        ))}
      </div>
    </section>
  )
}
