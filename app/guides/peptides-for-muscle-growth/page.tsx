import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Peptides for Muscle Growth and Recovery',
  description:
    'The growth-axis peptide stack: ipamorelin, CJC-1295, tesamorelin, IGF-1 LR3. Plus BPC-157 and TB-500 for repair between training.',
  alternates: { canonical: `${SITE.baseUrl}/guides/peptides-for-muscle-growth` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Muscle Growth Guide"
      title="Peptides for Muscle Growth and Recovery"
      lead="The muscle-growth peptide conversation splits cleanly in two: compounds that amplify the growth-hormone axis, and compounds that accelerate soft-tissue recovery between training. The best-documented stacks combine one from each lane."
      related={['ipamorelin-10mg', 'cjc-1295-no-dac-10mg', 'igf-1-lr3-1mg', 'bpc-157-10mg']}
    >
      <H2>The growth-hormone axis: two receptors, two peptide classes</H2>
      <P>
        Growth hormone release from the pituitary is regulated by two separate receptor
        systems. GHRH analogs activate the GHRH receptor. GHRPs (growth-hormone-releasing
        peptides) activate the ghrelin receptor. Because these are two distinct pathways,
        activating both at once produces a larger GH pulse than either alone. This is the
        mechanistic reason behind the canonical "GHRP + GHRH" stack design.
      </P>

      <H2>The GHRP side: ipamorelin, GHRP-2, GHRP-6, hexarelin</H2>
      <H3>Ipamorelin</H3>
      <P>
        The most selective of the group. Research reports strong GH release with minimal
        cortisol or prolactin impact — this is the "clean" reputation ipamorelin carries
        in comparative studies. Short half-life (~2 hours) supports pulsed dosing.
      </P>
      <H3>GHRP-2</H3>
      <P>
        Older, still potent. More HPA-axis engagement than ipamorelin — cortisol and
        prolactin elevation are noticeable at research doses. Benchmark compound in the
        literature.
      </P>
      <H3>GHRP-6</H3>
      <P>
        Strongest appetite-stimulation profile in the class — useful if hunger is an
        endpoint, counterproductive if it isn't.
      </P>
      <H3>Hexarelin</H3>
      <P>
        Most potent per-mg and the only GHRP with well-documented direct cardiac-tissue
        effects. More HPA-axis impact than ipamorelin.
      </P>

      <H2>The GHRH side: CJC-1295, tesamorelin, sermorelin</H2>
      <H3>CJC-1295 (No DAC and with DAC)</H3>
      <P>
        GHRH (1-29) analog. The "No DAC" version has a half-life in hours — suited to
        multi-daily pulsed protocols. The "with DAC" version includes an albumin-binding
        modification that extends half-life to days, for sustained-level research.
      </P>
      <H3>Tesamorelin</H3>
      <P>
        Stabilized GHRH (1-44) analog — closer to native GHRH than CJC-1295. Daily-dose
        research profile, well documented in visceral-adiposity models.
      </P>
      <H3>Sermorelin</H3>
      <P>
        GHRH (1-29) without stabilizing modifications. Shortest half-life of the three,
        which some researchers prefer because it better mimics natural GHRH pulsatility.
      </P>

      <H2>The canonical stack: ipamorelin + CJC-1295</H2>
      <P>
        This is the combination that dominates the growth-axis research literature.
        Ipamorelin drives the ghrelin-receptor pulse, CJC-1295 drives the GHRH receptor
        pulse, and timing them together produces stronger GH release than either alone.
        Pre-blended vials are available so you don't need to reconstitute two vials
        separately.
      </P>

      <H2>IGF-1 LR3: direct downstream</H2>
      <P>
        GH from the pituitary signals the liver to produce IGF-1, which drives many of the
        anabolic effects attributed to the growth axis. IGF-1 LR3 is a modified IGF-1
        variant with a longer half-life, letting researchers study IGF-1 signaling directly
        without going through the GH axis. Smaller vial (1 mg) because the working doses
        are lower.
      </P>

      <H2>Repair peptides: BPC-157 and TB-500</H2>
      <P>
        Training creates microtrauma; recovery sets the pace of progress. BPC-157 and
        TB-500 are the two most-studied repair peptides and show up in virtually every
        serious training-peptide protocol.
      </P>
      <H3>BPC-157</H3>
      <P>
        Drives angiogenesis at injury sites via the VEGFR2 pathway. Enormous rodent-model
        literature covering tendon, ligament, muscle, and gut tissue. Unusual among peptides
        for being orally stable.
      </P>
      <H3>TB-500</H3>
      <P>
        Fragment of Thymosin Beta-4. Promotes cellular migration via actin sequestration.
        Reported half-life is unusually long for a research peptide (days, not hours).
      </P>
      <H3>The combined repair blend</H3>
      <P>
        Pre-blended BPC-157 + TB-500 vials (10 mg and 20 mg total mass) are the standard
        way to run combined-repair research. Different arms of the repair pathway,
        co-lyophilized.
      </P>

      <H2>MOTS-c and mitochondrial support</H2>
      <P>
        MOTS-c is a mitochondrial-derived peptide studied in exercise-response and
        insulin-sensitivity research. Included here because it shows up in some serious
        performance-oriented stacks alongside SS-31 (cardiolipin-binding, mitochondrial
        membrane support) and NAD+ (sirtuin substrate).
      </P>

      <H2>Putting it together</H2>
      <UL>
        <li><strong>Core growth-axis stack</strong> — Ipamorelin + CJC-1295 blend.</li>
        <li><strong>Add direct IGF-1 signaling</strong> — IGF-1 LR3.</li>
        <li><strong>Repair foundation</strong> — BPC-157 + TB-500 blend.</li>
        <li><strong>Mitochondrial support</strong> — MOTS-c, optionally SS-31 or NAD+.</li>
      </UL>

      <H2>Research-use notice</H2>
      <P>
        Every vial on {SITE.name} is sold for laboratory research only. Nothing on this
        page is training or medical advice.
      </P>
    </GuideLayout>
  )
}
