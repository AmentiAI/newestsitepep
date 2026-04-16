import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { faqJsonLd, JsonLd } from '@/lib/schema'
import RelatedLinks from '@/components/RelatedLinks'

export const dynamic = 'force-static'

const FAQS = [
  {
    q: `Is ${SITE.name} a shop?`,
    a: `No — we're a reference catalogue. Every "Buy" link opens our vetted supplier.`,
  },
  {
    q: `Who supplies the compounds?`,
    a: `Orders are fulfilled by an independent peptide supplier that publishes per-lot certificates of analysis. We earn an affiliate commission on referred sales.`,
  },
  {
    q: `Are these for human use?`,
    a: `No. Everything catalogued here is a research-grade compound intended for in-vitro and laboratory research.`,
  },
  {
    q: `Why organise by pathway instead of by name?`,
    a: `Because researchers shop by what a compound does, not by brand. Pathway-first makes comparison faster.`,
  },
  {
    q: `Do you get paid for clicks?`,
    a: `We earn a commission on completed purchases — not on clicks. It doesn't change your price.`,
  },
  {
    q: `How do I reconstitute a vial?`,
    a: `Alcohol-swab both stoppers, draw the pre-calculated bac water volume with a U-100 syringe, inject down the side of the vial, and swirl (never shake). Full step-by-step in the reconstitution guide.`,
  },
  {
    q: `How do I work out the right dose?`,
    a: `Use the dosage calculator — enter vial mg, bac water volume, and your target research dose to get concentration and draw volume in syringe units.`,
  },
]

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about the catalogue, the supplier, reconstitution, and research use.',
  alternates: { canonical: `${SITE.baseUrl}/faq` },
}

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">Questions</div>
      <h1 className="mt-3 text-3xl font-black text-ink-900 sm:text-4xl md:text-5xl">FAQ</h1>

      <div className="mt-8 divide-y divide-ink-200 card">
        {FAQS.map((f, i) => (
          <details key={i} className="group p-5">
            <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
            <p className="mt-2 text-ink-700 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <RelatedLinks keys={['basics', 'wheretobuy', 'calc', 'recon', 'glossary', 'products']} />

      <JsonLd data={faqJsonLd(FAQS)} />
    </div>
  )
}
