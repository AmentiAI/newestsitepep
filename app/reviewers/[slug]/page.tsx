import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { REVIEWERS, getReviewer, displayName } from '@/lib/reviewers'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, personJsonLd, JsonLd } from '@/lib/schema'

export const dynamic = 'force-static'
export const revalidate = 86400

export function generateStaticParams() {
  return REVIEWERS.map((r) => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getReviewer(params.slug)
  if (!r) return {}
  const full = displayName(r)
  return {
    title: `${full} — ${r.role}`,
    description: r.shortBio,
    alternates: { canonical: `${SITE.baseUrl}/reviewers/${r.slug}` },
    openGraph: {
      title: full,
      description: r.shortBio,
      url: `${SITE.baseUrl}/reviewers/${r.slug}`,
    },
  }
}

export default function ReviewerProfile({ params }: { params: { slug: string } }) {
  const r = getReviewer(params.slug)
  if (!r) notFound()
  const full = displayName(r)
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <Link href="/reviewers" className="hover:text-brand-600">Scientific Reviewers</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">{r.name}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white">
          Verified Reviewer
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
          {r.role}
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        {full}
      </h1>
      <div className="mt-2 text-lg text-ink-600">{r.affiliation}</div>

      <section className="mt-10 space-y-5">
        {r.bio.map((para, i) => (
          <p key={i} className="text-ink-800 leading-relaxed text-lg">
            {para}
          </p>
        ))}
      </section>

      <section className="mt-10 card p-6">
        <h2 className="text-xl font-bold text-ink-900">Credentials and roles</h2>
        <ul className="mt-4 space-y-2">
          {r.credentials.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="text-ink-800 leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 card bg-ink-50 p-6">
        <h2 className="text-xl font-bold text-ink-900">Verification sources</h2>
        <p className="mt-2 text-sm text-ink-600">
          Every reviewer listed on this site is backed by a public profile. The
          links below are the sources used to verify this reviewer's credentials.
        </p>
        <ul className="mt-4 space-y-2">
          {r.sameAs.map((url) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="text-sm font-medium text-brand-700 hover:underline break-all"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">What this reviewer covers</h2>
        <p className="mt-2 text-ink-700 leading-relaxed">
          {full} reviews the mechanism-primer and research-framing content on
          {` ${SITE.name}`} — the parts of product and category pages that describe
          how a compound is situated in the published literature. Clinical
          guidance, dosing, and prescribing language are not within this
          reviewer's remit and are not published on the site as research-compound
          pages are not medical advice.
        </p>
      </section>

      <section className="mt-10 card bg-brand-50 border-brand-400 p-6">
        <h2 className="text-lg font-bold text-ink-900">Browse reviewed content</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/products" className="btn-yellow">Research catalogue →</Link>
          <Link href="/guides" className="rounded-md border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800 hover:border-brand-400">
            Guides
          </Link>
          <Link href="/reviewers" className="rounded-md border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800 hover:border-brand-400">
            All reviewers
          </Link>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Scientific Reviewers', url: `${SITE.baseUrl}/reviewers` },
          { name: r.name, url: `${SITE.baseUrl}/reviewers/${r.slug}` },
        ])}
      />
      <JsonLd data={personJsonLd(r)} />
    </div>
  )
}
