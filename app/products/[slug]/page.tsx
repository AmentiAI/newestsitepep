import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { products, getProduct } from '@/lib/products'
import { contentFor } from '@/lib/content'
import { SITE } from '@/lib/site'
import { productJsonLd, breadcrumbJsonLd, faqJsonLd, JsonLd } from '@/lib/schema'
import Rating from '@/components/Rating'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug)
  if (!p) return {}
  const c = contentFor(p.slug)
  const description = c?.overview
    ? c.overview.slice(0, 158)
    : p.shortDescription
  const title = `${p.name} — ${p.category} Research Compound`
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
  const faqs = c?.faqs ?? []
  const related = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Catalogue</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{p.name}</span>
      </nav>

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
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{p.name}</h1>
          <div className="mt-3"><Rating slug={p.slug} /></div>
          <p className="mt-4 text-lg text-ink-800 font-medium">{p.tagline}</p>
          {c?.overview && (
            <p className="mt-3 leading-relaxed text-ink-700">{c.overview}</p>
          )}

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink-900">{p.price}</span>
            <span className="text-sm text-ink-500">USD · ships lyophilized</span>
          </div>

          <Link
            href={`/go/${p.slug}`}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="btn-yellow mt-6 inline-flex items-center gap-2"
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
      </div>

      {c ? (
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <Section title="Proposed mechanism">
              <p>{c.mechanism}</p>
            </Section>

            {c.highlights.length > 0 && (
              <Section title="Research highlights">
                <ul className="space-y-2">
                  {c.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                      <span className="text-ink-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Research protocol notes">
              <p>{c.protocolNotes}</p>
            </Section>

            <Section title="Stacking and comparative studies">
              <p>{c.stackingNotes}</p>
            </Section>

            <Section title="Handling and storage">
              <p>{c.storage}</p>
            </Section>

            {faqs.length > 0 && (
              <Section title="Frequently asked">
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
            )}
          </div>

          <aside className="space-y-4">
            <div className="card p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Quick specs</div>
              <dl className="mt-3 space-y-2 text-sm">
                <Row k="Compound" v={p.name} />
                <Row k="Category" v={p.category} />
                <Row k="Price" v={p.price} />
                <Row k="Format" v="Lyophilized vial" />
                <Row k="COA" v="Per-lot, independent lab" />
                <Row k="Use" v="Research only" />
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
          </aside>
        </div>
      ) : (
        <section className="mt-16 card p-6">
          <p className="text-ink-700">{p.shortDescription}</p>
          <p className="mt-3 text-sm text-ink-500">
            Full compound write-up coming soon. Request the supplier's spec sheet or COA from
            the product page at checkout.
          </p>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-ink-900">Related in {p.category}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}

      <JsonLd data={productJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Catalogue', url: `${SITE.baseUrl}/products` },
          { name: p.name, url: `${SITE.baseUrl}/products/${p.slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-ink-900">{title}</h2>
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
