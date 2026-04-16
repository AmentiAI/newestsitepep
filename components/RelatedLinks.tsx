import Link from 'next/link'

type LinkItem = { href: string; title: string; blurb: string }

const ALL: Record<string, LinkItem> = {
  products: {
    href: '/products',
    title: 'Full Catalogue',
    blurb: 'Buy research peptides across all six pathways — 139 compounds.',
  },
  looksmaxxing: {
    href: '/looksmaxxing',
    title: 'Looksmaxxing Peptides',
    blurb: 'Skin, pigmentation, body composition, recovery.',
  },
  guides: {
    href: '/guides',
    title: 'All Guides',
    blurb: 'In-depth explainers across the research peptide space.',
  },
  calc: {
    href: '/dosage-calculator',
    title: 'Dosage Calculator',
    blurb: 'Reconstitution math — vial mg, bac water, U-100 units.',
  },
  recon: {
    href: '/reconstitution-guide',
    title: 'Reconstitution Guide',
    blurb: 'Step-by-step protocol for dissolving lyophilized vials.',
  },
  glossary: {
    href: '/peptide-glossary',
    title: 'Peptide Glossary',
    blurb: 'Plain-language A–Z of terms you\'ll see on spec sheets.',
  },
  wheretobuy: {
    href: '/where-to-buy-peptides',
    title: 'Where to Buy Peptides',
    blurb: 'Buyer\'s guide — COAs, red flags, vendor selection.',
  },
  stacks: {
    href: '/guides/peptide-stacks',
    title: 'Peptide Stacks Explained',
    blurb: 'Why compounds are combined and the canonical stacks.',
  },
  sema: {
    href: '/guides/semaglutide-vs-tirzepatide',
    title: 'Semaglutide vs Tirzepatide vs Retatrutide',
    blurb: 'Single, dual, and triple agonists compared.',
  },
  bpc: {
    href: '/guides/bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500',
    blurb: 'The canonical repair stack — mechanisms compared.',
  },
  fatloss: {
    href: '/guides/peptides-for-fat-loss',
    title: 'Peptides for Fat Loss',
    blurb: 'GLP-1, amylin, and the incretin class.',
  },
  muscle: {
    href: '/guides/peptides-for-muscle-growth',
    title: 'Peptides for Muscle Growth',
    blurb: 'Growth-axis and secretagogue compounds.',
  },
  skin: {
    href: '/guides/peptides-for-skin',
    title: 'Peptides for Skin',
    blurb: 'GHK-Cu, repair peptides, pigmentation compounds.',
  },
  sleep: {
    href: '/guides/peptides-for-sleep',
    title: 'Peptides for Sleep',
    blurb: 'DSIP, Pinealon, and sleep-axis research peptides.',
  },
  basics: {
    href: '/guides/what-are-peptides',
    title: 'What Are Peptides?',
    blurb: 'Foundations — what a peptide is and how it differs from a protein.',
  },
}

export default function RelatedLinks({
  title = 'Related reading',
  keys,
}: {
  title?: string
  keys: Array<keyof typeof ALL>
}) {
  const items = keys.map((k) => ALL[k]).filter(Boolean)
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-ink-900">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="card p-4 transition hover:border-brand-400 hover:shadow-md"
          >
            <div className="font-bold text-ink-900">{it.title}</div>
            <div className="mt-1 text-sm text-ink-600 leading-relaxed">{it.blurb}</div>
            <div className="mt-2 text-xs font-bold text-brand-600">Read →</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
