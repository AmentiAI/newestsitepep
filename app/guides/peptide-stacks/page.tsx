import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Popular Peptide Stacks Explained',
  description:
    'Why compounds are combined, which stacks appear most in research, and how pre-blended vials simplify multi-peptide protocols.',
  alternates: { canonical: `${SITE.baseUrl}/guides/peptide-stacks` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Stacks Guide"
      title="Popular Peptide Stacks Explained"
      lead="Most research-peptide work pairs compounds that hit different arms of the same system. Here's a breakdown of the combinations that keep appearing in the literature and why they make sense."
      crossLinks={['bpc', 'sema', 'muscle', 'fatloss', 'calc', 'recon']}
      related={[
        'bpc-157-tb-500-blend-bpc-157-10mg-tb-500-10mg',
        'ipamorelin-cjc-1295-blend-cjc-1295-5mg-ipa-5mg',
        'cagri-sema-blend-5mg-cagrilintide-5mg-sema-10mg',
        'glow-blend-70mg',
      ]}
    >
      <H2>Why stack peptides at all?</H2>
      <P>
        Biological systems rarely run on a single signal. Growth hormone release uses two
        receptors. Satiety runs through multiple hormone pathways. Tissue repair involves
        angiogenesis plus cell migration plus immune modulation. Stacking peptides that
        target complementary mechanisms produces stronger or broader endpoints than any
        single compound alone — which is why the same combinations keep appearing across
        independent research groups.
      </P>

      <H2>Repair stack: BPC-157 + TB-500</H2>
      <P>
        The canonical soft-tissue repair combination. BPC-157 drives angiogenesis via
        VEGFR2. TB-500 drives cellular migration via actin sequestration. Different
        arms of the same process. Available pre-blended at 10 mg and 20 mg total mass.
      </P>
      <UL>
        <li>BPC-157 + TB-500 10 mg (5 mg + 5 mg)</li>
        <li>BPC-157 + TB-500 20 mg (10 mg + 10 mg)</li>
      </UL>

      <H2>Growth-axis stack: Ipamorelin + CJC-1295</H2>
      <P>
        Ipamorelin activates the ghrelin receptor. CJC-1295 activates the GHRH receptor.
        Both drive growth-hormone release from the pituitary, but through different
        signaling cascades. Activating both at once produces a larger GH pulse than
        either alone. This is the most-published growth-axis stack in the research
        literature.
      </P>
      <P>
        Pre-blended versions use the <strong>No DAC</strong> variant of CJC-1295 so both
        compounds have short half-lives and can pulse together — mimicking natural GH
        release rhythms.
      </P>

      <H2>Alternative growth-axis: Ipamorelin + Tesamorelin</H2>
      <P>
        Same principle, different GHRH analog. Tesamorelin is closer to native GHRH
        structurally than CJC-1295. Researchers who prefer a more "natural" GHRH-analog
        profile use this stack instead. Available in two pre-blended ratios:
      </P>
      <UL>
        <li>IPA 3 mg + TESA 10 mg</li>
        <li>IPA 5 mg + TESA 10 mg</li>
      </UL>

      <H2>Metabolic stack: Cagri-Sema</H2>
      <P>
        Cagrilintide + semaglutide. Amylin pathway + GLP-1 pathway. Cagrilintide is a
        long-acting amylin analog that engages satiety and gastric-emptying circuits
        distinct from GLP-1. Combining the two produces additive metabolic endpoints —
        and the pre-blend eliminates the need to reconstitute two separate vials.
      </P>

      <H2>Advanced metabolic stack: Cagri-Reta</H2>
      <P>
        Cagrilintide + retatrutide. Amylin + GLP-1 + GIP + glucagon. Four-receptor
        coverage across the entire incretin and satiety landscape. This is the most
        aggressive metabolic research stack currently available as a pre-blend. Two
        ratio options:
      </P>
      <UL>
        <li>Cagri-Reta 5 mg / 5 mg</li>
        <li>Cagri-Reta 10 mg variant</li>
      </UL>

      <H2>Cosmetic / repair stack: GLOW and KLOW</H2>
      <H3>GLOW</H3>
      <P>
        GHK-Cu plus repair peptides (typically BPC-157 and TB-500 variants). Targets
        collagen synthesis, vascular signaling, and cellular migration all at once —
        the three arms of skin and soft-tissue remodeling. Available in 50 mg and 70 mg
        total-mass formats.
      </P>
      <H3>KLOW</H3>
      <P>
        GLOW plus KPV — the α-MSH-derived anti-inflammatory tripeptide. Adds an
        inflammation-modulation layer to the cosmetic/repair stack. 80 mg total-mass
        format.
      </P>

      <H2>Mitochondrial support stack</H2>
      <P>
        Not pre-blended, but commonly run together in longevity research:
      </P>
      <UL>
        <li><strong>MOTS-c</strong> — mitochondrial-derived peptide, AMPK modulation.</li>
        <li><strong>SS-31</strong> — cardiolipin-binding, inner mitochondrial membrane support.</li>
        <li><strong>NAD+</strong> — sirtuin and PARP substrate.</li>
      </UL>
      <P>
        Each compound targets a different part of mitochondrial biology. Researchers
        studying mitochondrial dysfunction models often run all three in parallel.
      </P>

      <H2>Cognitive stack (DIY)</H2>
      <P>
        No pre-blended cognitive stacks exist in the current catalogue, but common
        parallel combinations include:
      </P>
      <UL>
        <li><strong>Selank + Semax</strong> — anxiolytic + nootropic, covering both axes.</li>
        <li><strong>DSIP + Pinealon</strong> — sleep modulation + pineal-axis bioregulator.</li>
      </UL>

      <H2>Why pre-blended vs DIY?</H2>
      <P>
        Pre-blended vials save reconstitution time, lock in a fixed ratio, and reduce
        injection volume (one vial instead of two). They're the right choice when the
        canonical ratio matches your research design. DIY — buying separate vials and
        combining them — is the right choice when you need ratio flexibility, or when
        you want to add or remove one component mid-protocol.
      </P>

      <H2>Stack design principles</H2>
      <UL>
        <li><strong>Complementary mechanisms, not redundant ones.</strong> Stacking two GLP-1 agonists adds nothing. Stacking GLP-1 + amylin adds a new pathway.</li>
        <li><strong>Match half-lives.</strong> Short-acting + short-acting, or long-acting + long-acting. Mixing produces unpredictable timing.</li>
        <li><strong>Introduce one variable at a time.</strong> Adding three compounds simultaneously makes it impossible to attribute any observed endpoint to a specific one.</li>
      </UL>

      <H2>Research-use notice</H2>
      <P>
        Every stack and compound on {SITE.name} is sold for laboratory research only.
        Nothing on this page is medical advice.
      </P>
    </GuideLayout>
  )
}
