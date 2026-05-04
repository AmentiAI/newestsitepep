import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { parents, getParent, type Parent } from '@/lib/catalog'
import { contentFor, type CompoundContent } from '@/lib/content'
import { SITE } from '@/lib/site'
import { productJsonLd, breadcrumbJsonLd, faqJsonLd, JsonLd } from '@/lib/schema'
import { type SectionKey } from '@/lib/pageShape'
import { planFor, type PagePlan, type PlannedSection, type HeroVariant } from '@/lib/pageLayoutPlan'
import { copyFor } from '@/lib/productCopy'
import { pickPairs, pickRelated, pickCompatibleCompounds } from '@/lib/relatedPicks'
import { reviewerForScope } from '@/lib/reviewers'
import ProductCard from '@/components/ProductCard'
import RelatedLinks from '@/components/RelatedLinks'
import ReviewerByline from '@/components/ReviewerByline'

export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return parents.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getParent(params.slug)
  if (!p) return {}
  const copy = copyFor(p)
  const plan = planFor(p)
  return {
    title: plan.title,
    description: copy.metaDescription,
    alternates: { canonical: `${SITE.baseUrl}/products/${p.slug}` },
    openGraph: {
      title: plan.title,
      description: copy.metaDescription,
      url: `${SITE.baseUrl}/products/${p.slug}`,
      images: [{ url: p.image }],
    },
    twitter: { card: 'summary_large_image', title: plan.title, description: copy.metaDescription },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getParent(params.slug)
  if (!p) notFound()

  const c = contentFor(p.slug)
  const copy = copyFor(p)
  const plan = planFor(p)
  const reviewer = reviewerForScope('products')

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Catalogue</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{p.name}</span>
      </nav>

      {reviewer && <ReviewerByline reviewer={reviewer} />}

      <Hero
        p={p}
        plan={plan}
        tagline={copy.tagline}
        overview={c?.overview}
      />

      <div className="mt-12 space-y-12">
        {plan.sections.map((s) => {
          const body = renderSection(s.key, p, c, plan)
          if (!body) return null
          return (
            <section key={s.key}>
              <SectionHeader title={s.title} eyebrow={s.eyebrow} />
              <div className="mt-4">{body}</div>
            </section>
          )
        })}
      </div>

      <RelatedLinks keys={['calc', 'recon', 'glossary', 'wheretobuy', 'stacks', 'guides']} />

      <JsonLd
        data={{
          ...productJsonLd(p, copy.shortDescription),
          ...(reviewer
            ? {
                reviewedBy: {
                  '@type': 'Person',
                  '@id': `${SITE.baseUrl}/reviewers/${reviewer.slug}`,
                  name: reviewer.name,
                  jobTitle: reviewer.role,
                },
              }
            : {}),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Catalogue', url: `${SITE.baseUrl}/products` },
          { name: p.name, url: `${SITE.baseUrl}/products/${p.slug}` },
        ])}
      />
      {c?.faqs.length ? <JsonLd data={faqJsonLd(c.faqs)} /> : null}
    </div>
  )
}

function renderSection(
  k: SectionKey,
  p: Parent,
  c: CompoundContent | null,
  plan: PagePlan,
): React.ReactNode {
  switch (k) {
    case 'priceTable':
      return <PriceTable p={p} />
    case 'sizePicker':
      return <SizePicker p={p} />
    case 'reconMath':
      return <ReconMath p={p} />
    case 'capsuleBreakdown':
      return <CapsuleBreakdown p={p} />
    case 'bottleBreakdown':
      return <BottleBreakdown p={p} />
    case 'blendComposition':
      return <BlendComposition p={p} />
    case 'compatibilityList':
      return <CompatibilityList p={p} />
    case 'shelfLife':
      return <ShelfLife />
    case 'mechanismPrimer':
      return c?.mechanism ? <Prose text={c.mechanism} /> : null
    case 'useCases':
      return <UseCases p={p} content={c} />
    case 'protocolNotes':
      return c?.protocolNotes ? <Prose text={c.protocolNotes} /> : null
    case 'stackingNotes':
      return c?.stackingNotes ? <Prose text={c.stackingNotes} /> : null
    case 'storage':
      return c?.storage ? <StorageBody text={c.storage} /> : null
    case 'highlights':
      return c && c.highlights.length ? <Highlights items={c.highlights} /> : null
    case 'pairWith':
      return <PairWith p={p} />
    case 'faqs':
      return c && c.faqs.length ? <Faqs items={c.faqs} /> : null
    case 'related':
      return <Related p={p} />
    case 'analyticalNotes':
      return <AnalyticalNotes p={p} plan={plan} />
    case 'researchFraming':
      return <ResearchFraming p={p} />
    case 'safety':
      return <Safety p={p} plan={plan} />
  }
}

// --- Hero variants --------------------------------------------------------

function Hero({
  p,
  plan,
  tagline,
  overview,
}: {
  p: Parent
  plan: PagePlan
  tagline: string
  overview?: string
}) {
  const primary = p.cheapest
  const multi = p.variants.length > 1
  const priceLabel = multi
    ? `from ${formatUsd(primary.pricePaid)}`
    : formatUsd(primary.pricePaid)

  const purityLine =
    plan.shape === 'solvent'
      ? 'USP-grade · 0.9% benzyl alcohol · sealed multi-dose vial'
      : '≥98% HPLC purity · lot-matched CoA · sealed under nitrogen'

  const priceBlock = (
    <>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-black text-ink-900">{priceLabel}</span>
        <span className="text-xl font-medium text-ink-400 line-through">{primary.price}</span>
        <span className="rounded-md bg-red-600 px-2 py-1 text-xs font-black text-white">
          SAVE {SITE.promoPercent}%
        </span>
      </div>
      <div className="mt-1 text-sm text-ink-500">
        USD · {plan.shape === 'solvent' ? 'ships sealed · ready to use' : 'ships lyophilized · discount auto-applied'}
      </div>
      <Link
        href={`/buy/${primary.slug}`}
        target="_blank"
        rel="noopener nofollow sponsored"
        className="btn-yellow mt-5 inline-flex items-center gap-2"
      >
        {multi ? `Buy ${primary.sizeLabel} →` : `Buy ${p.name} now →`}
      </Link>
    </>
  )

  const tagBar = (
    <div className="mt-4 flex flex-wrap gap-2">
      {p.tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-brand-400 bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-ink-800"
        >
          {t}
        </span>
      ))}
    </div>
  )

  const category = (
    <div className="text-xs font-bold uppercase tracking-wider text-brand-600">{p.category}</div>
  )

  const h1 = (
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{plan.h1}</h1>
  )

  const purity = (
    <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-700">
      {purityLine}
    </div>
  )

  const body = renderHeroBody(plan.heroVariant, p, tagline, overview)

  return (
    <div className="grid gap-8 md:grid-cols-2">
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
      <div>
        {category}
        {h1}
        {purity}
        {body}
        <div className="mt-6">{priceBlock}</div>
        {tagBar}
      </div>
    </div>
  )
}

function renderHeroBody(
  variant: HeroVariant,
  p: Parent,
  tagline: string,
  overview?: string,
): React.ReactNode {
  switch (variant) {
    case 'overview-first':
      return (
        <>
          {overview && <p className="mt-4 leading-relaxed text-ink-700">{overview}</p>}
          <p className="mt-3 text-base text-ink-800 font-medium">{tagline}</p>
        </>
      )
    case 'tagline-first':
      return (
        <>
          <p className="mt-4 text-lg text-ink-800 font-medium">{tagline}</p>
          {overview && <p className="mt-3 leading-relaxed text-ink-700">{overview}</p>}
        </>
      )
    case 'fact-first':
      return (
        <>
          <ul className="mt-4 space-y-1.5 text-sm text-ink-700">
            <li>· Category: {p.category}</li>
            <li>· {p.variants.length === 1 ? 'Single research size' : `${p.variants.length} research sizes`}</li>
            <li>· Ships with lot-matched certificate of analysis</li>
          </ul>
          <p className="mt-3 text-base text-ink-800 font-medium">{tagline}</p>
          {overview && <p className="mt-2 text-sm leading-relaxed text-ink-700">{overview}</p>}
        </>
      )
    case 'question-first':
      return (
        <>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-ink-500">
            What is {p.name}?
          </p>
          {overview && <p className="mt-2 leading-relaxed text-ink-700">{overview}</p>}
          <p className="mt-3 text-base text-ink-800 font-medium">{tagline}</p>
        </>
      )
  }
}

// --- Section header (body-only sections use this from the page) ----------

function SectionHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <>
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600">{eyebrow}</div>
      )}
      <h2 className={`${eyebrow ? 'mt-1' : ''} text-2xl font-bold text-ink-900`}>{title}</h2>
    </>
  )
}

// --- Section bodies -------------------------------------------------------

function PriceTable({ p }: { p: Parent }) {
  const rows = p.variants
  const bestValueSlug = p.bestValue.slug
  const mgRows = rows.filter((v) => v.pricePerMg != null)
  const savingsPct =
    mgRows.length >= 2
      ? Math.round(
          ((Math.max(...mgRows.map((v) => v.pricePerMg!)) -
            Math.min(...mgRows.map((v) => v.pricePerMg!))) /
            Math.max(...mgRows.map((v) => v.pricePerMg!))) *
            100,
        )
      : null
  return (
    <div className="card p-5">
      {savingsPct !== null && savingsPct > 0 && (
        <div className="mb-3">
          <span className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-black uppercase tracking-wider text-white">
            Up to {savingsPct}% cheaper per mg
          </span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-ink-500">
              <th className="py-2 pr-3 font-semibold">Size</th>
              <th className="py-2 pr-3 font-semibold">Price</th>
              <th className="py-2 pr-3 font-semibold">$ / mg</th>
              <th className="py-2 pr-3 font-semibold">Best value</th>
              <th className="py-2 pr-3 font-semibold">Buy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.slug} className="border-b border-ink-100 last:border-0">
                <td className="py-2 pr-3 font-medium text-ink-900">{v.sizeLabel}</td>
                <td className="py-2 pr-3 text-ink-800">{formatUsd(v.pricePaid)}</td>
                <td className="py-2 pr-3 text-ink-800">
                  {v.pricePerMg != null ? `$${v.pricePerMg.toFixed(2)}` : '—'}
                </td>
                <td className="py-2 pr-3">
                  {v.slug === bestValueSlug && (
                    <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                      Best
                    </span>
                  )}
                </td>
                <td className="py-2 pr-3">
                  <Link
                    href={`/buy/${v.slug}`}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="font-semibold text-brand-700 hover:underline"
                  >
                    Buy →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SizePicker({ p }: { p: Parent }) {
  if (p.variants.length === 1) return null
  return (
    <div className="flex flex-wrap gap-2">
      {p.variants.map((v) => (
        <Link
          key={v.slug}
          href={`/buy/${v.slug}`}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="rounded-full border border-brand-400 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-ink-800 hover:bg-brand-100"
        >
          {v.sizeLabel} — {formatUsd(v.pricePaid)}
        </Link>
      ))}
    </div>
  )
}

function ReconMath({ p }: { p: Parent }) {
  const rows = p.variants.filter((v) => v.mg != null)
  if (rows.length === 0) return null
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-600">
        Volumes of bacteriostatic water required to dissolve each vial at common
        research concentrations.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-ink-500">
              <th className="py-2 pr-3 font-semibold">Vial</th>
              <th className="py-2 pr-3 font-semibold">at 2 mg/mL</th>
              <th className="py-2 pr-3 font-semibold">at 5 mg/mL</th>
              <th className="py-2 pr-3 font-semibold">at 10 mg/mL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.slug} className="border-b border-ink-100 last:border-0">
                <td className="py-2 pr-3 font-medium text-ink-900">{v.sizeLabel}</td>
                <td className="py-2 pr-3 text-ink-800">{reconMl(v.mg!, 2)}</td>
                <td className="py-2 pr-3 text-ink-800">{reconMl(v.mg!, 5)}</td>
                <td className="py-2 pr-3 text-ink-800">{reconMl(v.mg!, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-500">
        Numbers are calculated from the stated vial mass. Verify against the supplier's
        instructions for your specific research protocol.
      </p>
    </div>
  )
}

function reconMl(mg: number, concentration: number): string {
  const ml = mg / concentration
  if (!isFinite(ml) || ml <= 0) return '—'
  return ml % 1 === 0 ? `${ml.toFixed(0)} mL` : `${ml.toFixed(2)} mL`
}

function CapsuleBreakdown({ p }: { p: Parent }) {
  const rows = p.variants.map((v) => {
    const capMatch = v.name.match(/x\s*(\d+)\s*(capsules?|tablets?)/i)
    const count = capMatch ? parseInt(capMatch[1], 10) : null
    const per = v.mg
    const totalMg = count != null && per != null ? count * per : null
    return { v, count, per, totalMg }
  })
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-600">
        Each bottle ships sealed with a lot-matched certificate of analysis covering
        per-capsule purity.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map(({ v, count, per, totalMg }) => (
          <div key={v.slug} className="rounded-md border border-ink-200 p-4">
            <div className="text-sm font-bold text-ink-900">{v.sizeLabel}</div>
            <dl className="mt-2 space-y-1 text-sm">
              <Row label="Per capsule" value={per != null ? `${formatMg(per)}` : '—'} />
              <Row label="Count" value={count != null ? `${count}` : '—'} />
              <Row label="Total active" value={totalMg != null ? `${formatMg(totalMg)}` : '—'} />
              <Row label="Price" value={formatUsd(v.pricePaid)} />
              {v.pricePerMg != null && (
                <Row label="$ per mg" value={`$${v.pricePerMg.toFixed(2)}`} />
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}

function BottleBreakdown({ p }: { p: Parent }) {
  const rows = p.variants.map((v) => {
    const concMatch = v.name.match(/(\d+(?:\.\d+)?)\s*mg\s*\/\s*ml/i)
    const volMatch = v.name.match(/(\d+)\s*ml\b/i)
    const concentration = concMatch ? parseFloat(concMatch[1]) : null
    const volume = volMatch ? parseInt(volMatch[1], 10) : null
    const totalMg = concentration != null && volume != null ? concentration * volume : null
    return { v, concentration, volume, totalMg }
  })
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-600">
        Pre-mixed at the supplier's facility. Each bottle ships sealed, no
        reconstitution step required.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map(({ v, concentration, volume, totalMg }) => (
          <div key={v.slug} className="rounded-md border border-ink-200 p-4">
            <div className="text-sm font-bold text-ink-900">{v.sizeLabel}</div>
            <dl className="mt-2 space-y-1 text-sm">
              <Row
                label="Concentration"
                value={concentration != null ? `${concentration} mg/mL` : '—'}
              />
              <Row label="Volume" value={volume != null ? `${volume} mL` : '—'} />
              <Row label="Total active" value={totalMg != null ? `${formatMg(totalMg)}` : '—'} />
              <Row label="Price" value={formatUsd(v.pricePaid)} />
              {concentration != null && volume != null && (
                <Row
                  label="$ per mL"
                  value={`$${(v.pricePaid / volume).toFixed(2)}`}
                />
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlendComposition({ p }: { p: Parent }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-ink-600">
        Each vial ships as a single lyophilized cake. The supplier measures each constituent
        before co-mixing so reconstitution yields the stated mg of each peptide per mL.
      </p>
      <ul className="mt-4 divide-y divide-ink-200 rounded-md border border-ink-200">
        {p.variants.map((v) => (
          <li key={v.slug} className="flex items-baseline justify-between gap-3 p-3">
            <span className="text-sm font-medium text-ink-900">{v.name}</span>
            <span className="flex items-baseline gap-3">
              <span className="text-sm text-ink-700">{formatUsd(v.pricePaid)}</span>
              <Link
                href={`/buy/${v.slug}`}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                Buy →
              </Link>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-500">
        Blend ratio is lot-verified via HPLC and documented on the per-lot certificate of analysis.
      </p>
    </div>
  )
}

function CompatibilityList({ p }: { p: Parent }) {
  const compatible = pickCompatibleCompounds(p, 12)
  return (
    <div>
      <p className="max-w-3xl text-ink-700 leading-relaxed">
        Bacteriostatic water is the standard solvent for every lyophilized peptide on
        {` ${SITE.name}`}. The 0.9% benzyl alcohol holds sterility for up to 28 days once
        the seal is broken, which matches the shelf-life of most reconstituted research
        peptides at 2–8 °C.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {compatible.map((cp) => (
          <Link
            key={cp.slug}
            href={`/products/${cp.slug}`}
            className="rounded-md border border-ink-200 bg-white p-3 text-sm font-medium text-ink-900 hover:border-brand-400"
          >
            {cp.name}
            <span className="block text-xs font-normal text-ink-500">{cp.category}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ShelfLife() {
  return (
    <div className="card p-5">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <Row label="Sealed vial" value="24 months at room temperature, protected from light" />
        <Row label="After puncture" value="28 days at 2–8 °C with benzyl-alcohol preservative" />
        <Row label="Freezing" value="Not recommended — repeated freeze/thaw reduces sterility margin" />
        <Row label="Re-use" value="Single multi-dose vial; wipe septum with alcohol between draws" />
      </dl>
    </div>
  )
}

function Prose({ text }: { text: string }) {
  return <p className="text-ink-700 leading-relaxed">{text}</p>
}

function UseCases({ p, content }: { p: Parent; content: CompoundContent | null }) {
  const items = content?.highlights?.length
    ? content.highlights
    : defaultUseCases(p)
  return (
    <ul className="space-y-2">
      {items.map((h, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
          <span className="text-ink-700 leading-relaxed">{h}</span>
        </li>
      ))}
    </ul>
  )
}

function defaultUseCases(p: Parent): string[] {
  return [
    `Pre-clinical ${p.category.toLowerCase()} endpoint studies using ${p.name} as the reference compound.`,
    `Comparative assays that pit ${p.name} against other ${p.category.toLowerCase()} peptides in parallel arms.`,
    `Protocols that require a lot-matched CoA for downstream assay reproducibility.`,
  ]
}

function StorageBody({ text }: { text: string }) {
  return (
    <div className="card bg-ink-50 p-5">
      <p className="text-ink-700 leading-relaxed">{text}</p>
    </div>
  )
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((h, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
          <span className="text-ink-700 leading-relaxed">{h}</span>
        </li>
      ))}
    </ul>
  )
}

function PairWith({ p }: { p: Parent }) {
  const picks = pickPairs(p, 3)
  if (picks.length === 0) return null
  const names = picks.map((x) => x.name)
  const list =
    names.length === 1
      ? names[0]
      : names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
  return (
    <div className="card p-5">
      <p className="text-ink-800 leading-relaxed">
        Buyers viewing <strong>{p.name}</strong> typically also consider {list}. Each is in
        stock, sealed under nitrogen with a lot-matched CoA.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {picks.map((x) => (
          <Link
            key={x.slug}
            href={`/products/${x.slug}`}
            className="rounded-full border border-brand-400 bg-brand-50 px-3 py-1 text-sm font-semibold text-ink-800 hover:bg-brand-100"
          >
            Buy {x.name} — from {formatUsd(x.cheapest.pricePaid)}
          </Link>
        ))}
      </div>
    </div>
  )
}

function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-200 card">
      {items.map((f, i) => (
        <details key={i} className="group p-5">
          <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
          <p className="mt-2 text-ink-700 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

function Related({ p }: { p: Parent }) {
  const related = pickRelated(p, 4)
  if (related.length === 0) return null
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {related.map((r) => <ProductCard key={r.slug} p={r} />)}
    </div>
  )
}

// --- New sections: analyticalNotes + researchFraming ---------------------

function AnalyticalNotes({ p, plan }: { p: Parent; plan: PagePlan }) {
  const solvent = plan.shape === 'solvent'
  return (
    <div className="card p-5">
      <p className="text-ink-700 leading-relaxed">
        {solvent ? (
          <>
            Each vial of bacteriostatic water is supplied under USP specification — 0.9%
            benzyl alcohol preservative, endotoxin-tested, and sealed with a butyl-rubber
            septum intended for multi-dose draws. Per-lot release paperwork is available
            on request.
          </>
        ) : (
          <>
            Every lot of {p.name} is released against HPLC and mass-spectrometry identity
            and purity checks. Lots ship with a COA that matches the lot number printed on
            the vial label — verification paperwork is traceable back to the lab that
            performed the analysis, not to an internal QA sheet.
          </>
        )}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
        <li>· Identity verified by HPLC + MS (quantitative ion match)</li>
        <li>· Purity ≥98% by area normalisation on HPLC</li>
        <li>· COA traceable to independent lab, not an internal QA sheet</li>
        <li>· Lot number on COA matches lot number on vial label</li>
      </ul>
    </div>
  )
}

function ResearchFraming({ p }: { p: Parent }) {
  const cat = p.category.toLowerCase()
  const framing: Record<string, { pitch: string; angle: string }> = {
    'fat loss': {
      pitch:
        'In the fat-loss class, research reads out primarily on energy-balance and appetite-signalling endpoints. Published comparisons lean on incretin pharmacology and pharmacokinetic differences between analogs.',
      angle:
        'Protocols tend to separate short-acting from long-acting compounds, and single-agonist from dual-agonist work.',
    },
    recovery: {
      pitch:
        'Recovery-class research centres on soft-tissue and vascular repair. Endpoints are mechanism-level — angiogenesis, cell migration, collagen remodelling — rather than clinical outcomes.',
      angle:
        'Many published designs pair repair-class compounds with a complementary pathway peptide to cover both arms of the response.',
    },
    longevity: {
      pitch:
        'Longevity-class research tends to read out on pathway-level markers (senescence, mitochondrial turnover, NAD+) rather than lifespan. This keeps the class heavy on mechanism primers and light on translational claims.',
      angle:
        'Choice of compound usually tracks the pathway the protocol is measuring — the two decisions are effectively one.',
    },
    growth: {
      pitch:
        'Growth-axis compounds are studied primarily for their effect on pulsatile GH release and downstream IGF-1 signalling. Comparative potency mapping is the workhorse design in this class.',
      angle:
        'Secretagogue vs receptor-agonist choice is the first axis that separates research designs in this space.',
    },
    cognitive: {
      pitch:
        'Cognitive-research peptides span cholinergic, neuroplasticity, and cerebrovascular literature. Endpoints range from hippocampal LTP to behavioural working-memory assays.',
      angle:
        'Choice of administration route (systemic, ICV, intranasal) is a meaningful variable — it changes which brain regions see relevant concentrations.',
    },
    blends: {
      pitch:
        'Pre-mixed blend research is structurally distinct from single-compound work: the blend is an arm, not a starting point, and the variable being tested is the sum of two pathways.',
      angle:
        'Ratio matters as much as identity — the same two peptides at different ratios produce measurably different readouts.',
    },
  }
  const f = framing[cat] ?? {
    pitch: `Research in the ${cat} class spans pathway-level endpoints and pre-clinical comparison work. ${p.name} is one of the compounds researchers compare in this space.`,
    angle:
      'Protocol design typically weighs compound identity against the pathway the research question is measuring.',
  }
  return (
    <div>
      <p className="text-ink-700 leading-relaxed">{f.pitch}</p>
      <p className="mt-3 text-ink-700 leading-relaxed">{f.angle}</p>
    </div>
  )
}

function Safety({ p, plan }: { p: Parent; plan: PagePlan }) {
  const cat = p.category.toLowerCase()
  const solvent = plan.shape === 'solvent'
  const blend = plan.shape === 'blend'

  if (solvent) {
    return (
      <div className="card border-amber-300 bg-amber-50 p-5">
        <p className="text-ink-800 leading-relaxed">
          Bacteriostatic water is a research solvent, not a clinical preparation. The
          0.9% benzyl alcohol preservative is incompatible with neonatal use and with
          some intrathecal protocols. Sterility is held by the closed-vial seal — once
          punctured, the 28-day in-use window assumes proper septum hygiene between
          draws. Nothing on this page is medical, clinical, or pharmacy advice.
        </p>
      </div>
    )
  }

  // Per-category caveat that varies the framing without inventing claims that don't
  // belong to a specific compound. Each category gets language that names the actual
  // limitation pattern for that research area.
  const categoryCaveat: Record<string, string> = {
    'fat loss':
      'GLP-class compounds carry a known dose-dependent gastrointestinal profile in published research (delayed gastric emptying, nausea), and the rare-but-documented adverse signals (gallbladder events, pancreatitis flags) are why titrated escalation is the standard protocol design.',
    recovery:
      'Most repair-class evidence is preclinical — predominantly rodent tendon, gut, and corneal models. Human data for compounds in this class is sparse and limited to small pilot studies; cross-species extrapolation is the central caveat any honest research framing has to flag.',
    longevity:
      'Longevity-class endpoints are pathway-level (senescence markers, NAD+ pools, mitochondrial turnover) — not lifespan. Translating pathway-level effects into lifespan or healthspan claims is unsupported by the published literature and is exactly the inferential gap that disqualifies most longevity-marketing language.',
    growth:
      'Growth-axis stimulation has documented downstream effects on glucose tolerance and IGF-1 levels that compound over time. Long-horizon research designs need to track those secondary endpoints — they are the limitation most short-protocol designs ignore.',
    cognitive:
      'Cognitive-peptide research is heavily concentrated in single-region literature (much of it from a small number of Russian neuropharmacology groups). Replication outside those laboratories is sparse, and translation from rodent behavioural assays to human cognitive endpoints is the field-level limitation worth stating up-front.',
    blends:
      'Pre-mixed blends compress two protocol decisions (compound choice + ratio) into one product. That trades flexibility for convenience: the literature supporting each constituent does not automatically transfer to the blend at the supplied ratio, and additivity at the chosen ratio is itself a research question.',
  }

  const compoundFraming = blend
    ? 'Each constituent of this blend carries its own preclinical-evidence profile. The fact that two compounds appear together in a vial is a convenience choice, not a published combination-pharmacology claim — the literature on each peptide does not automatically transfer to the blend at the ratio supplied.'
    : `${p.name} research data sits in the preclinical and early-clinical literature. Specific dosing, schedule, and route choices in published protocols reflect those research designs — not clinical recommendations and not advice for any human use.`

  const caveat = categoryCaveat[cat] ?? 'Pre-clinical evidence does not automatically generalise to other species, populations, or endpoints — every compound in this class has gaps in the published record that need to be acknowledged when designing a research protocol.'

  return (
    <div className="card border-amber-300 bg-amber-50 p-5">
      <p className="text-ink-800 leading-relaxed">
        {compoundFraming}
      </p>
      <p className="mt-3 text-ink-800 leading-relaxed">
        {caveat}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-ink-800">
        <li>· Sold for in-vitro and laboratory research only — not for human consumption, not a medicine, not a supplement.</li>
        <li>· Nothing on this page is medical advice, clinical dosing guidance, or a prescribing recommendation.</li>
        <li>· The {p.name} literature is dynamic — confirm pharmacology and any cited endpoint against current peer-reviewed sources before designing a protocol.</li>
        <li>· Lot-to-lot purity is verified by HPLC and reported on the per-lot certificate of analysis. Identity verification at the bench is still good research practice.</li>
      </ul>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-ink-100 pb-1 last:border-0">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-medium text-ink-900 text-right">{value}</dd>
    </div>
  )
}

function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`
}

function formatMg(n: number): string {
  if (n < 1) return `${(n * 1000).toFixed(0)} mcg`
  return n % 1 === 0 ? `${n} mg` : `${n.toFixed(1)} mg`
}
