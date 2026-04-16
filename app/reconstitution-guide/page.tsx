import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: `How to Reconstitute Peptides — Step by Step Guide | ${SITE.name}`,
  description:
    'Reconstitute lyophilized peptides correctly. Step-by-step guide with bac water volumes, storage, dose math, and common mistakes to avoid.',
  alternates: { canonical: `${SITE.baseUrl}/reconstitution-guide` },
}

const STEPS = [
  {
    n: 1,
    title: 'Let the vial reach room temperature',
    body: 'Take the lyophilized vial out of the fridge and let it warm for 15–20 minutes. Cold vials increase the risk of the stopper popping loose and shock-denaturing fragile peptides.',
  },
  {
    n: 2,
    title: 'Wipe both stoppers',
    body: 'Alcohol swab the rubber stopper on both the peptide vial and the bac water vial. This is the single biggest contamination vector in a home lab setup.',
  },
  {
    n: 3,
    title: 'Draw the bac water',
    body: 'Using a U-100 syringe, draw the pre-calculated volume of bacteriostatic water. Typical volumes: 2 ml for mg-range compounds, 3 ml for mcg-range compounds. Use the Dosage Calculator to confirm.',
  },
  {
    n: 4,
    title: 'Inject slowly down the side of the vial',
    body: 'Angle the needle against the inside wall and push the plunger slowly. Blasting water directly onto the lyophilized cake can denature fragile peptides and cause foaming.',
  },
  {
    n: 5,
    title: 'Swirl — never shake',
    body: 'Rotate the vial gently between your fingers until the powder fully dissolves. Shaking introduces shear forces that can damage peptide structure. Most compounds dissolve in under a minute.',
  },
  {
    n: 6,
    title: 'Inspect the solution',
    body: 'The solution should be clear. Cloudiness, floating particles, or a persistent film are all failure modes — do not use.',
  },
  {
    n: 7,
    title: 'Label and refrigerate',
    body: 'Label with the reconstitution date, concentration (mcg/ml), and compound name. Refrigerate. Most reconstituted peptides keep ~28 days at 2–8 °C.',
  },
]

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        Protocol Guide
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        How to Reconstitute Peptides
      </h1>
      <p className="mt-4 text-lg text-ink-700 leading-relaxed">
        Reconstitution is the step where most research protocols introduce avoidable
        error. A correct reconstitution preserves peptide integrity; a sloppy one can
        ruin a multi-hundred-dollar vial in under a minute.
      </p>

      <ol className="mt-10 space-y-5">
        {STEPS.map((s) => (
          <li key={s.n} className="card p-5 sm:p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-400 text-lg font-black text-ink-900">
                {s.n}
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink-900">{s.title}</h2>
                <p className="mt-1 text-ink-700 leading-relaxed">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 prose-body space-y-5">
        <h2 className="text-2xl font-bold text-ink-900">Common mistakes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Shaking instead of swirling.</strong> Causes foaming and structural damage.</li>
          <li><strong>Using sterile water instead of bacteriostatic.</strong> No preservative — solution spoils within days.</li>
          <li><strong>Not accounting for the swept volume.</strong> The lyophilized cake adds near-zero volume. If you add 2 ml bac water, your total is 2 ml, not 2.1.</li>
          <li><strong>Leaving vials at room temperature.</strong> Accelerates degradation; refrigerate once reconstituted.</li>
          <li><strong>Freezing reconstituted solutions.</strong> Freeze-thaw cycles denature most peptides. If long-term storage is required, aliquot and freeze — never refreeze after thawing.</li>
        </ul>

        <h2 className="text-2xl font-bold text-ink-900">Storage timelines</h2>
        <p>
          Lyophilized (sealed, refrigerated): 2+ years for most compounds. Reconstituted
          (refrigerated): ~28 days for most compounds; shorter for fragile peptides like
          BPC-157 (often 2–4 weeks), longer for stabilised formulations.
        </p>

        <h2 className="text-2xl font-bold text-ink-900">When to discard</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cloudiness that wasn't there on day one.</li>
          <li>Visible particles or aggregation.</li>
          <li>Any color change in what should be a clear solution.</li>
          <li>Past 30 days reconstituted, unless the spec sheet confirms longer stability.</li>
        </ul>
      </section>

      <section className="mt-10 card bg-brand-50 border-brand-400 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink-900">Get the vials and bac water</h2>
        <p className="mt-2 text-ink-700">
          USP-grade bac water and 139 lot-matched research peptides in one catalogue.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/products" className="btn-yellow">Buy research peptides →</Link>
          <Link href="/dosage-calculator" className="btn-outline">Open dosage calculator</Link>
        </div>
      </section>
    </div>
  )
}
