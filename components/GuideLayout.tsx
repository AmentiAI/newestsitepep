import Link from 'next/link'
import { resolveSlug } from '@/lib/catalog'
import { reviewerForScope } from '@/lib/reviewers'
import { articleJsonLd, JsonLd } from '@/lib/schema'
import { SITE } from '@/lib/site'
import ProductCard from './ProductCard'
import RelatedLinks from './RelatedLinks'
import ReviewerByline from './ReviewerByline'

export default function GuideLayout({
  eyebrow,
  title,
  lead,
  path,
  datePublished,
  dateModified,
  children,
  related,
  crossLinks,
}: {
  eyebrow: string
  title: string
  lead: string
  /** Site-relative path of this page, e.g. "/looksmaxxing". Used for the canonical URL in Article JSON-LD. */
  path: string
  /** ISO 8601 date the guide was first published. */
  datePublished: string
  /** ISO 8601 date the guide was last meaningfully edited. */
  dateModified: string
  children: React.ReactNode
  related?: string[]
  crossLinks?: React.ComponentProps<typeof RelatedLinks>['keys']
}) {
  const reviewer = reviewerForScope('guides')
  const article = articleJsonLd({
    url: `${SITE.baseUrl}${path}`,
    headline: title,
    description: lead,
    datePublished,
    dateModified,
    reviewer,
  })
  // Guides still reference legacy per-variant slugs; resolve them to parents
  // and de-duplicate so a guide mentioning tirzepatide-15mg and tirzepatide-30mg
  // surfaces one Tirzepatide card, not two.
  const resolved = (related ?? [])
    .map((s) => resolveSlug(s)?.parent)
    .filter((p): p is NonNullable<typeof p> => !!p)
  const seen = new Set<string>()
  const relatedProducts = resolved.filter((p) => {
    if (seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })
  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd data={article} />
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        {eyebrow}
      </div>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-ink-900 md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg text-ink-700 leading-relaxed">{lead}</p>
      <div className="mt-4 h-1 w-16 bg-brand-400" />

      {reviewer && <ReviewerByline reviewer={reviewer} />}

      <div className="mt-10 space-y-8 text-ink-800 leading-relaxed">{children}</div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-ink-200 pt-10">
          <h2 className="text-2xl font-bold text-ink-900">Featured compounds</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}

      {crossLinks && crossLinks.length > 0 && (
        <RelatedLinks keys={crossLinks} />
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

/**
 * Inline citation that links to a PubMed PMID. Renders as a small, dotted-underline
 * anchor — visible enough to read as an academic-style reference, subtle enough not
 * to compete with the surrounding prose. Opens in a new tab so readers don't lose
 * their place in the guide.
 */
export function Cite({
  pmid,
  url,
  label,
  title,
}: {
  /** PubMed ID. If provided, builds the canonical pubmed.ncbi.nlm.nih.gov link. */
  pmid?: string
  /** Override URL. Use when citing a non-PubMed-indexed source (preprint, journal-only DOI). */
  url?: string
  /** Anchor text — typically "Author Year" e.g. "Wilding 2021". */
  label: string
  /** Hover/screen-reader title — typically the paper title or a short descriptor. */
  title?: string
}) {
  const href = url ?? (pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : '#')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="text-ink-500 underline decoration-dotted underline-offset-2 hover:text-brand-700"
    >
      {label}
    </a>
  )
}
