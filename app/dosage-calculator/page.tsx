import type { Metadata } from 'next'
import Link from 'next/link'
import DosageCalculator from '@/components/DosageCalculator'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: `Peptide Dosage Calculator — Reconstitution & Syringe Units | ${SITE.name}`,
  description:
    'Interactive peptide dosage calculator. Enter vial mg, bac water volume, and research dose — get concentration, draw volume, and U-100 syringe units.',
  alternates: { canonical: `${SITE.baseUrl}/dosage-calculator` },
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        Tools
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        Peptide Dosage Calculator
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-700 leading-relaxed">
        Enter your vial size, how much bacteriostatic water you reconstituted with,
        and the research dose you want to deliver. The calculator returns the
        concentration, the volume to draw, and the reading on a U-100 insulin syringe.
      </p>

      <div className="mt-8">
        <DosageCalculator />
      </div>

      <section className="mt-12 prose-body space-y-5">
        <h2 className="text-2xl font-bold text-ink-900">How the math works</h2>
        <p>
          Reconstituted concentration equals total peptide mass divided by bac water
          volume. A 10 mg vial diluted in 2 ml bac water yields 5,000 mcg/ml. A 250 mcg
          research dose therefore draws 0.05 ml — which reads as 5 units on a U-100
          syringe.
        </p>
        <h2 className="text-2xl font-bold text-ink-900">Choosing a dilution</h2>
        <p>
          Smaller research doses benefit from more dilute reconstitution so the draw
          volume is easier to measure accurately. Compounds dosed in tens of mcg
          (ipamorelin, tesamorelin) typically use 2–3 ml. Compounds dosed in mg ranges
          (semaglutide, tirzepatide) often use 1–2 ml to keep injection volumes small.
        </p>
        <h2 className="text-2xl font-bold text-ink-900">Syringe types</h2>
        <p>
          U-100 insulin syringes: 100 units = 1 ml. U-40 syringes: 40 units = 1 ml.
          U-100 is the lab-standard default in most research protocols.
        </p>
      </section>

      <RelatedLinks keys={['recon', 'glossary', 'wheretobuy', 'products', 'stacks', 'sema']} />

      <section className="mt-10 card bg-brand-50 border-brand-400 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink-900">Need the vials?</h2>
        <p className="mt-2 text-ink-700">
          Browse the full catalogue — every compound ships lyophilized with a lot-matched
          certificate of analysis.
        </p>
        <Link href="/products" className="btn-yellow mt-4 inline-flex">
          Buy research peptides →
        </Link>
      </section>
    </div>
  )
}
