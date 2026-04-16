import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { faqJsonLd, JsonLd } from '@/lib/schema'

export const dynamic = 'force-static'

const FAQS = [
  {
    q: `Is ${SITE.name} a shop?`,
    a: `No — we're a reference catalogue. Every "Buy" link opens the supplier we partner with.`,
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
]

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about the catalogue, the supplier, and research use.',
  alternates: { canonical: `${SITE.baseUrl}/faq` },
}

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink-100">FAQ</h1>
      <div className="mt-8 divide-y divide-white/5 card">
        {FAQS.map((f, i) => (
          <details key={i} className="p-4">
            <summary className="cursor-pointer font-medium text-ink-100">{f.q}</summary>
            <p className="mt-2 text-ink-400">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(FAQS)} />
    </div>
  )
}
