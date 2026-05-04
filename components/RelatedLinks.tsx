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
