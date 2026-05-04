import type { Metadata } from 'next'
import Link from 'next/link'
import { REVIEWERS, displayName } from '@/lib/reviewers'
import { SITE } from '@/lib/site'
import { breadcrumbJsonLd, JsonLd } from '@/lib/schema'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Scientific Reviewers — Who Vets Our Research Content',
  description:
    'The scientists and clinicians who review the mechanism primers and research framing published on ' +
    SITE.name +
    '. Every reviewer entry includes a verifiable public profile.',
  alternates: { canonical: `${SITE.baseUrl}/reviewers` },
  openGraph: {
    title: 'Scientific Reviewers',
    description: 'Scientists who vet the research framing on ' + SITE.name + '.',
    url: `${SITE.baseUrl}/reviewers`,
  },
}

export default function ReviewersIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="px-2">/</span>
        <span className="font-medium text-ink-900">Scientific Reviewers</span>
      </nav>

      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        Scientific Review
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        Who reviews the research framing on {SITE.name}
      </h1>
      <p className="mt-5 text-lg text-ink-700 leading-relaxed">
        The mechanism primers, research-context passages, and literature framing
        published on this site are reviewed by named scientists. Each reviewer below
        is verifiable against a public profile — clinical and prescribing guidance
        is out of scope for research-compound content and is not covered by this
        review programme.
      </p>

      <div className="mt-10 space-y-6">
        {REVIEWERS.map((r) => (
          <article
            key={r.slug}
            className="card p-6 hover:border-brand-400 transition-colors"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-ink-900">
                  <Link href={`/reviewers/${r.slug}`} className="hover:text-brand-700">
                    {displayName(r)}
                  </Link>
                </h2>
                <div className="mt-1 text-sm text-ink-600">{r.role}</div>
                <div className="text-sm text-ink-500">{r.affiliation}</div>
              </div>
              <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white">
                Verified
              </span>
            </div>
            <p className="mt-3 text-ink-700 leading-relaxed">{r.shortBio}</p>
            <Link
              href={`/reviewers/${r.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Read full profile →
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-12 card bg-ink-50 p-6">
        <h2 className="text-xl font-bold text-ink-900">What our reviewers cover</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
          <li>· Mechanism primers — is the pathway description accurate to the published literature?</li>
          <li>· Research-framing paragraphs — is the compound situated correctly in its research class?</li>
          <li>· Category overviews — does the framework hold up against the cited endpoints?</li>
        </ul>
        <h3 className="mt-5 text-sm font-bold text-ink-900">What they do not cover</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
          <li>· Dosing recommendations or prescribing advice (not applicable to research compounds)</li>
          <li>· Clinical outcomes in humans (outside the published pre-clinical scope)</li>
          <li>· Supplier pricing, inventory, or logistics content</li>
        </ul>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: SITE.baseUrl },
          { name: 'Scientific Reviewers', url: `${SITE.baseUrl}/reviewers` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Scientific Reviewers',
          url: `${SITE.baseUrl}/reviewers`,
          description:
            'Named scientific reviewers who vet mechanism primers and research framing on ' + SITE.name,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: REVIEWERS.length,
            itemListElement: REVIEWERS.map((r, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE.baseUrl}/reviewers/${r.slug}`,
              name: displayName(r),
            })),
          },
        }}
      />
    </div>
  )
}
