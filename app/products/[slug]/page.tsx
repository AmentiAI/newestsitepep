import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { parents, getParent, type Parent } from '@/lib/catalog'
import { contentFor, type CompoundContent } from '@/lib/content'
import { SITE } from '@/lib/site'
import { productJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/schema'
import {
  pageShapeFor,
  layoutFor,
  type SectionKey,
  type PageShape,
} from '@/lib/pageShape'
import { copyFor } from '@/lib/productCopy'
import { pickPairs, pickRelated, pickCompatibleCompounds } from '@/lib/relatedPicks'
import ProductCard from '@/components/ProductCard'
import RelatedLinks from '@/components/RelatedLinks'

export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return parents.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getParent(params.slug)
  if (!p) return {}
  const copy = copyFor(p)
  const shape = pageShapeFor(p)
  const title = titleFor(p, shape)
  return {
    title,
    description: copy.metaDescription,
    alternates: { canonical: `${SITE.baseUrl}/products/${p.slug}` },
    openGraph: {
      title,
      description: copy.metaDescription,
      url: `${SITE.baseUrl}/products/${p.slug}`,
      images: [{ url: p.image }],
    },
    twitter: { card: 'summary_large_image', title, description: copy.metaDescription },
  }
}

// Shape-specific <title> formulae. Different suffix per shape so title-tag
// templating doesn't read as duplicate either.
function titleFor(p: Parent, shape: PageShape): string {
  switch (shape) {
    case 'value-shop':
      return `Buy ${p.name} Online — ${p.variants.length} Vial Sizes`
    case 'recon-first':
      return `${p.name} for Research — Lyophilized Vial with COA`
    case 'capsule':
      return `Order ${p.name} Capsules — Oral Research Format`
    case 'liquid':
      return `${p.name} Pre-Dissolved Liquid — Ready-to-Dose Bottle`
    case 'blend':
      return `${p.name} Pre-Mixed Blend — Dual-Pathway Research Vial`
    case 'solvent':
      return `Bacteriostatic Water ${p.variants[0]?.sizeLabel ?? '30 mL'} — Peptide Reconstitution Solvent`
    case 'specialty':
      return `${p.name} — ${p.category} Research Compound`
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getParent(params.slug)
  if (!p) notFound()

  const c = contentFor(p.slug)
  const copy = copyFor(p)
  const layout = layoutFor(p)
  const shape = pageShapeFor(p)
  const h1 = layout.h1Formula(p)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Catalogue</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{p.name}</span>
      </nav>

      <Hero p={p} h1={h1} shape={shape} tagline={copy.tagline} overview={c?.overview} />

      <div className="mt-12 space-y-12">
        {layout.sections.map((k) => {
          const node = renderSection(k, p, c)
          return node ? <div key={k}>{node}</div> : null
        })}
      </div>

      <RelatedLinks keys={['calc', 'recon', 'glossary', 'wheretobuy', 'stacks', 'guides']} />

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

function renderSection(
  k: SectionKey,
  p: Parent,
  c: CompoundContent | null,
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
      return c?.mechanism ? <MechanismPrimer mechanism={c.mechanism} /> : null
    case 'useCases':
      return <UseCases p={p} content={c} />
    case 'protocolNotes':
      return c?.protocolNotes ? <ProtocolNotes text={c.protocolNotes} /> : null
    case 'stackingNotes':
      return c?.stackingNotes ? <StackingNotes text={c.stackingNotes} /> : null
    case 'storage':
      return c?.storage ? <Storage text={c.storage} /> : null
    case 'highlights':
      return c && c.highlights.length ? <Highlights items={c.highlights} /> : null
    case 'pairWith':
      return <PairWith p={p} />
    case 'faqs':
      return c && c.faqs.length ? <Faqs items={c.faqs} /> : null
    case 'related':
      return <Related p={p} />
  }
}

function Hero({
  p,
  h1,
  shape,
  tagline,
  overview,
}: {
  p: Parent
  h1: string
  shape: PageShape
  tagline: string
  overview?: string
}) {
  const primary = p.cheapest
  const multi = p.variants.length > 1
  const priceLabel = multi
    ? `from ${formatUsd(primary.pricePaid)}`
    : formatUsd(primary.pricePaid)
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
        <div className="text-xs font-bold uppercase tracking-wider text-brand-600">{p.category}</div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{h1}</h1>
        <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {shape === 'solvent'
            ? 'USP-grade · 0.9% benzyl alcohol · sealed multi-dose vial'
            : '≥98% HPLC purity · lot-matched CoA · sealed under nitrogen'}
        </div>
        <p className="mt-4 text-lg text-ink-800 font-medium">{tagline}</p>
        {overview && <p className="mt-3 leading-relaxed text-ink-700">{overview}</p>}

        <div className="mt-6 flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-black text-ink-900">{priceLabel}</span>
          <span className="text-xl font-medium text-ink-400 line-through">{primary.price}</span>
          <span className="rounded-md bg-red-600 px-2 py-1 text-xs font-black text-white">
            SAVE {SITE.promoPercent}%
          </span>
        </div>
        <div className="mt-1 text-sm text-ink-500">
          USD · {shape === 'solvent' ? 'ships sealed · ready to use' : 'ships lyophilized · discount auto-applied'}
        </div>

        <Link
          href={`/out/${primary.slug}`}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="btn-yellow mt-5 inline-flex items-center gap-2"
        >
          {multi ? `Buy ${primary.sizeLabel} →` : `Buy ${p.name} now →`}
        </Link>

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
      </div>
    </div>
  )
}

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

// --- Value-shop: price-table lead -----------------------------------------

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
    <section className="card p-5">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <SectionHeader title="Vial sizes and price per mg" />
        {savingsPct !== null && savingsPct > 0 && (
          <span className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-black uppercase tracking-wider text-white">
            Up to {savingsPct}% cheaper per mg
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
                    href={`/out/${v.slug}`}
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
    </section>
  )
}

// --- Chip-row size picker (recon/capsule/liquid/blend/solvent/specialty) --

function SizePicker({ p }: { p: Parent }) {
  if (p.variants.length === 1) return null
  return (
    <section>
      <SectionHeader title="Available sizes" eyebrow="In stock" />
      <div className="mt-3 flex flex-wrap gap-2">
        {p.variants.map((v) => (
          <Link
            key={v.slug}
            href={`/out/${v.slug}`}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="rounded-full border border-brand-400 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-ink-800 hover:bg-brand-100"
          >
            {v.sizeLabel} — {formatUsd(v.pricePaid)}
          </Link>
        ))}
      </div>
    </section>
  )
}

// --- Reconstitution math (value-shop, recon-first) -----------------------

function ReconMath({ p }: { p: Parent }) {
  const rows = p.variants.filter((v) => v.mg != null)
  if (rows.length === 0) return null
  return (
    <section className="card p-5">
      <SectionHeader
        title="Reconstitution volumes"
        eyebrow="Bac-water math"
      />
      <p className="mt-2 text-sm text-ink-600">
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
    </section>
  )
}

function reconMl(mg: number, concentration: number): string {
  const ml = mg / concentration
  if (!isFinite(ml) || ml <= 0) return '—'
  return ml % 1 === 0 ? `${ml.toFixed(0)} mL` : `${ml.toFixed(2)} mL`
}

// --- Capsule breakdown ----------------------------------------------------

function CapsuleBreakdown({ p }: { p: Parent }) {
  const rows = p.variants.map((v) => {
    const capMatch = v.name.match(/x\s*(\d+)\s*(capsules?|tablets?)/i)
    const count = capMatch ? parseInt(capMatch[1], 10) : null
    const per = v.mg
    const totalMg = count != null && per != null ? count * per : null
    return { v, count, per, totalMg }
  })
  return (
    <section className="card p-5">
      <SectionHeader title="Capsule composition" eyebrow="Oral format" />
      <p className="mt-2 text-sm text-ink-600">
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
    </section>
  )
}

// --- Liquid bottle breakdown ---------------------------------------------

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
    <section className="card p-5">
      <SectionHeader title="Bottle breakdown and $/mL" eyebrow="Pre-dissolved liquid" />
      <p className="mt-2 text-sm text-ink-600">
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
    </section>
  )
}

// --- Blend composition ----------------------------------------------------

function BlendComposition({ p }: { p: Parent }) {
  return (
    <section className="card p-5">
      <SectionHeader title="Blend composition" eyebrow="Pre-mixed vial" />
      <p className="mt-2 text-sm text-ink-600">
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
                href={`/out/${v.slug}`}
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
    </section>
  )
}

// --- Solvent: compatibility list -----------------------------------------

function CompatibilityList({ p }: { p: Parent }) {
  const compatible = pickCompatibleCompounds(p, 12)
  return (
    <section>
      <SectionHeader
        title="What reconstitutes with this vial"
        eyebrow="Compatibility"
      />
      <p className="mt-2 max-w-3xl text-ink-700 leading-relaxed">
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
    </section>
  )
}

function ShelfLife() {
  return (
    <section className="card p-5">
      <SectionHeader title="Shelf life and handling" eyebrow="After opening" />
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <Row label="Sealed vial" value="24 months at room temperature, protected from light" />
        <Row label="After puncture" value="28 days at 2–8 °C with benzyl-alcohol preservative" />
        <Row label="Freezing" value="Not recommended — repeated freeze/thaw reduces sterility margin" />
        <Row label="Re-use" value="Single multi-dose vial; wipe septum with alcohol between draws" />
      </dl>
    </section>
  )
}

// --- Content-backed sections ---------------------------------------------

function MechanismPrimer({ mechanism }: { mechanism: string }) {
  return (
    <section>
      <SectionHeader title="Mechanism in the literature" eyebrow="Primer" />
      <p className="mt-3 text-ink-700 leading-relaxed">{mechanism}</p>
    </section>
  )
}

function UseCases({ p, content }: { p: Parent; content: CompoundContent | null }) {
  // Research use-cases are synthesized from the compound's highlights when
  // available; otherwise fall back to a shape-specific line so the section
  // never renders empty on a shape that expects it.
  const items = content?.highlights?.length
    ? content.highlights
    : defaultUseCases(p)
  return (
    <section>
      <SectionHeader title="Research use-cases" eyebrow="What it's used for" />
      <ul className="mt-4 space-y-2">
        {items.map((h, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
            <span className="text-ink-700 leading-relaxed">{h}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function defaultUseCases(p: Parent): string[] {
  return [
    `Pre-clinical ${p.category.toLowerCase()} endpoint studies using ${p.name} as the reference compound.`,
    `Comparative assays that pit ${p.name} against other ${p.category.toLowerCase()} peptides in parallel arms.`,
    `Protocols that require a lot-matched CoA for downstream assay reproducibility.`,
  ]
}

function ProtocolNotes({ text }: { text: string }) {
  return (
    <section>
      <SectionHeader title="Handling in the lab" eyebrow="Protocol notes" />
      <p className="mt-3 text-ink-700 leading-relaxed">{text}</p>
    </section>
  )
}

function StackingNotes({ text }: { text: string }) {
  return (
    <section>
      <SectionHeader title="Stacking and paired-compound work" eyebrow="Pairing notes" />
      <p className="mt-3 text-ink-700 leading-relaxed">{text}</p>
    </section>
  )
}

function Storage({ text }: { text: string }) {
  return (
    <section className="card bg-ink-50 p-5">
      <SectionHeader title="Storage and shelf-life" />
      <p className="mt-3 text-ink-700 leading-relaxed">{text}</p>
    </section>
  )
}

function Highlights({ items }: { items: string[] }) {
  return (
    <section>
      <SectionHeader title="Key facts" eyebrow="At a glance" />
      <ul className="mt-4 space-y-2">
        {items.map((h, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
            <span className="text-ink-700 leading-relaxed">{h}</span>
          </li>
        ))}
      </ul>
    </section>
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
    <section className="card p-5">
      <SectionHeader title="Often paired with" eyebrow="From the same shelf" />
      <p className="mt-3 text-ink-800 leading-relaxed">
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
    </section>
  )
}

function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section>
      <SectionHeader title="Frequently asked" eyebrow="Questions we get" />
      <div className="mt-4 divide-y divide-ink-200 card">
        {items.map((f, i) => (
          <details key={i} className="group p-5">
            <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
            <p className="mt-2 text-ink-700 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function Related({ p }: { p: Parent }) {
  const related = pickRelated(p, 4)
  if (related.length === 0) return null
  return (
    <section>
      <SectionHeader title={`More ${p.category} compounds`} />
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((r) => <ProductCard key={r.slug} p={r} />)}
      </div>
    </section>
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

