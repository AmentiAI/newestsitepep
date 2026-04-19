import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'BPC-157 vs TB-500: Repair Peptide Comparison',
  description:
    'Two of the most-studied repair peptides side by side. How they differ mechanistically, which research models each dominates, and why they\'re so often stacked.',
  alternates: { canonical: `${SITE.baseUrl}/guides/bpc-157-vs-tb-500` },
  openGraph: {
    title: 'BPC-157 vs TB-500: Repair Peptide Comparison',
    description: 'Mechanism-level comparison of two widely-studied repair peptides and why they are so often paired.',
    url: `${SITE.baseUrl}/guides/bpc-157-vs-tb-500`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BPC-157 vs TB-500: Repair Peptide Comparison',
    description: 'Angiogenic vs actin-migratory repair peptides compared.',
  },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Compound Comparison"
      title="BPC-157 vs TB-500: Repair Peptide Comparison"
      lead="Ask any peptide-research community about soft-tissue repair and you'll hear the same two names. BPC-157 and TB-500 aren't competitors — they hit different arms of the repair response. Here's what each one actually does."
      related={[
        'bpc-157-10mg',
        'tb-500-thymosin-beta-4-10mg',
        'bpc-157-tb-500-blend-bpc-157-10mg-tb-500-10mg',
        'bpc-157-tb-500-blend-bpc-157-5mg-tb-500-5mg',
      ]}
      crossLinks={['stacks', 'muscle', 'recon', 'calc', 'glossary', 'products']}
    >
      <H2>The 30-second version</H2>
      <UL>
        <li><strong>BPC-157</strong> drives angiogenesis (new blood vessel formation) at injury sites.</li>
        <li><strong>TB-500</strong> drives cellular migration (moving cells to the site of injury).</li>
        <li>They're complementary — which is why pre-blended stacks exist.</li>
      </UL>

      <H2>BPC-157 in detail</H2>
      <P>
        BPC-157 is a 15-amino-acid synthetic peptide derived from a protective protein
        found in gastric juice. The name stands for Body Protection Compound-157. It has
        one of the largest peptide-research literatures of any repair compound, largely
        coming out of the Seiwerth and Sikiric laboratories in Zagreb.
      </P>
      <H3>Proposed mechanism</H3>
      <P>
        Research describes BPC-157 acting on the VEGFR2 pathway — promoting angiogenesis
        at the site of injury. It also modulates the nitric oxide (NO) system and has been
        shown to upregulate growth-hormone receptor expression in injured tissue. The
        angiogenic effect is the central mechanism most of the repair literature points to.
      </P>
      <H3>What models has it been studied in?</H3>
      <P>
        Tendon, ligament, muscle, corneal, bone, and gut-lining repair. The breadth of
        tissue coverage is part of why the peptide is so widely used in research.
      </P>
      <H3>Format</H3>
      <P>
        Available as <strong>10 mg injectable vials</strong> and as <strong>500 mcg
        capsules</strong> (60-count). The capsule format is unusual for a peptide —
        BPC-157 is remarkably stable at gastric pH, which is why oral bioavailability
        research exists in the first place.
      </P>

      <H2>TB-500 in detail</H2>
      <P>
        TB-500 is a synthetic fragment of Thymosin Beta-4, a 43-amino-acid protein found
        at high concentrations in platelets and wound fluid. The fragment contains the
        actin-binding sequence that drives Tβ4's biological activity.
      </P>
      <H3>Proposed mechanism</H3>
      <P>
        TB-500 binds and sequesters G-actin monomers, regulating the dynamic actin pool
        available for cytoskeletal remodeling. This is the proposed basis for its effects
        on cell migration, wound closure, and progenitor-cell recruitment to injury sites.
      </P>
      <H3>What models has it been studied in?</H3>
      <P>
        Dermal wound healing, cardiac remodeling after ischemia, corneal repair, and
        neurological recovery. Cardiac research is particularly notable — Tβ4 is one of
        the few peptides with published cardiac-tissue repair data.
      </P>
      <H3>Format</H3>
      <P>
        Standard is the <strong>10 mg injectable vial</strong>.
      </P>

      <H2>Head-to-head: which one for which goal?</H2>
      <H3>Acute soft-tissue injury</H3>
      <P>
        Most research protocols favor combined use — BPC-157 to drive angiogenesis,
        TB-500 to drive cellular migration. Different stages of the repair cascade.
      </P>
      <H3>Chronic repair / overuse research</H3>
      <P>
        BPC-157 has the broader literature here, particularly in tendon and ligament
        models.
      </P>
      <H3>Cardiovascular research</H3>
      <P>
        TB-500 has the clearer published profile because Tβ4's cardiac-tissue effects
        are relatively well characterized.
      </P>
      <H3>Gut and digestive research</H3>
      <P>
        BPC-157. Originated from gastric-juice research and remains the dominant
        peptide in GI repair models.
      </P>

      <H2>Why the combined blend?</H2>
      <P>
        If the two peptides target different arms of repair, why not use both? That's the
        reasoning behind the pre-blended vials:
      </P>
      <UL>
        <li><strong>BPC-157 + TB-500 10 mg</strong> — 5 mg each component.</li>
        <li><strong>BPC-157 + TB-500 20 mg</strong> — 10 mg each component.</li>
      </UL>
      <P>
        Pre-blending saves one reconstitution step and gives a fixed 1:1 ratio. If your
        research design calls for a non-1:1 ratio, separate vials give you the flexibility.
      </P>

      <H2>Reconstitution and handling</H2>
      <P>
        Both peptides ship lyophilized. A 10 mg vial reconstituted in 2 mL bacteriostatic
        water gives 5 mg/mL working stock. Swirl gently to dissolve — don't shake.
        Refrigerate the reconstituted solution; use within ~28 days. Aliquot before freezing
        if the protocol extends beyond that window.
      </P>

      <H2>Research-use notice</H2>
      <P>
        Both compounds are sold through {SITE.name} for laboratory research only. Nothing
        on this page is medical advice.
      </P>
    </GuideLayout>
  )
}
