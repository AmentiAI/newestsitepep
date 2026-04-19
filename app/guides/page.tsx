import type { Metadata } from 'next'
import Link from 'next/link'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Peptide Guides — Compound Breakdowns & Comparisons',
  description:
    'Plain-English guides to the most-searched research peptides: BPC-157, TB-500, semaglutide vs tirzepatide, GHK-Cu, and more.',
  alternates: { canonical: `${SITE.baseUrl}/guides` },
  openGraph: {
    title: 'Peptide Guides — Compound Breakdowns',
    description: 'Plain-English guides to the most-searched research peptides and comparisons.',
    url: `${SITE.baseUrl}/guides`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide Guides',
    description: 'Plain-English research peptide breakdowns and comparisons.',
  },
}

const GUIDES = [
  {
    slug: 'what-are-peptides',
    title: 'What Are Peptides? A Beginner\'s Guide',
    desc: 'How peptides differ from proteins, why they matter in research, and the families you\'ll see most often.',
  },
  {
    slug: 'peptides-for-fat-loss',
    title: 'Peptides for Fat Loss: GLP-1, GIP, and Beyond',
    desc: 'Semaglutide, tirzepatide, retatrutide, cagrilintide, 5-Amino-1MQ — how they compare and where each fits.',
  },
  {
    slug: 'peptides-for-muscle-growth',
    title: 'Peptides for Muscle Growth & Recovery',
    desc: 'The growth-axis stack: ipamorelin, CJC-1295, tesamorelin, IGF-1 LR3. Plus BPC-157/TB-500 for repair.',
  },
  {
    slug: 'peptides-for-skin',
    title: 'Peptides for Skin, Hair, and Anti-Aging',
    desc: 'GHK-Cu, epitalon, GLOW and KLOW blends, and why the cosmetic-peptide space keeps expanding.',
  },
  {
    slug: 'peptides-for-sleep',
    title: 'Peptides for Sleep and Cognitive Support',
    desc: 'DSIP, selank, semax, pinealon. What each targets and how they\'re used in research protocols.',
  },
  {
    slug: 'bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500: Repair Peptide Comparison',
    desc: 'Two of the most-studied soft-tissue repair peptides — what\'s the difference and why do researchers stack them?',
  },
  {
    slug: 'semaglutide-vs-tirzepatide',
    title: 'Semaglutide vs Tirzepatide vs Retatrutide',
    desc: 'Single, dual, and triple agonists — how the new generation of incretin peptides stack up.',
  },
  {
    slug: 'peptide-stacks',
    title: 'Popular Peptide Stacks Explained',
    desc: 'Why compounds are combined, which stacks are common in research, and how the pre-blended vials save reconstitution time.',
  },
]

export default function GuidesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">Guides</div>
      <h1 className="mt-3 text-4xl font-black text-ink-900 md:text-5xl">
        Plain-English peptide guides
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-700 leading-relaxed">
        Clear, no-fluff breakdowns of the most-searched peptides — what they do,
        how they compare, and which variants show up most in the literature.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card p-6 transition hover:border-brand-400 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-ink-900">{g.title}</h2>
            <p className="mt-2 text-ink-700">{g.desc}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
              Read guide →
            </span>
          </Link>
        ))}
      </div>

      <RelatedLinks title="Tools and references" keys={['calc', 'recon', 'glossary', 'wheretobuy', 'products', 'looksmaxxing']} />
    </div>
  )
}
