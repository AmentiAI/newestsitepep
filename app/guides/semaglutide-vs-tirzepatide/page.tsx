import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Semaglutide vs Tirzepatide vs Retatrutide',
  description:
    'Single, dual, and triple agonists — how the new generation of incretin peptides compare, and what each adds over the last.',
  alternates: { canonical: `${SITE.baseUrl}/guides/semaglutide-vs-tirzepatide` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Compound Comparison"
      title="Semaglutide vs Tirzepatide vs Retatrutide"
      lead="Three generations of the same idea, each adding more receptors. Semaglutide activates one receptor. Tirzepatide activates two. Retatrutide activates three. Here's the detailed comparison."
      related={['semaglutide-6mg', 'tirzepatide-15mg', 'retatrutide-15mg', 'cagri-sema-blend-5mg-cagrilintide-5mg-sema-10mg']}
      crossLinks={['fatloss', 'stacks', 'calc', 'recon', 'wheretobuy', 'products']}
    >
      <H2>Receptor coverage at a glance</H2>
      <UL>
        <li><strong>Semaglutide</strong>: GLP-1 only.</li>
        <li><strong>Tirzepatide</strong>: GLP-1 + GIP (dual agonist).</li>
        <li><strong>Retatrutide</strong>: GLP-1 + GIP + glucagon (triple agonist).</li>
      </UL>

      <H2>Semaglutide: the GLP-1 benchmark</H2>
      <P>
        Semaglutide put the whole GLP-1 class on the map. It's a long-acting GLP-1 receptor
        agonist with an engineered fatty-acid side chain that extends its half-life to
        roughly seven days — enabling once-weekly research dosing. GLP-1 receptor activation
        slows gastric emptying, enhances glucose-dependent insulin secretion, and engages
        central appetite-regulation pathways in the hypothalamus.
      </P>
      <P>
        Research sizes: 3, 6, 12, 20, 30 mg. Research protocols almost universally titrate
        — starting low and scaling up over 4–8 weeks because GI-related endpoints scale
        with dose.
      </P>

      <H2>Tirzepatide: adding GIP</H2>
      <P>
        Tirzepatide activates both the GLP-1 and GIP receptors. GIP (glucose-dependent
        insulinotropic polypeptide) is a second incretin hormone. On its own, GIP has
        relatively modest effects — but combined with GLP-1 receptor activation, the dual
        signal produces stronger metabolic endpoints than GLP-1 alone.
      </P>
      <P>
        The clinical/research question with tirzepatide has always been: does the GIP
        component contribute independent benefit, or does it just amplify GLP-1 signaling?
        Published research suggests both are happening — distinct and additive effects.
      </P>
      <P>
        Research sizes: 15, 30, 60 mg. Weekly dosing. Titration schedules comparable to
        semaglutide.
      </P>

      <H2>Retatrutide: adding glucagon</H2>
      <P>
        Retatrutide goes further: GLP-1 + GIP + glucagon receptor. The glucagon receptor
        addition is mechanistically interesting because glucagon has opposite effects to
        insulin in certain tissues — raising glucose production but also increasing energy
        expenditure. The triple-agonist design balances these effects to produce stronger
        overall metabolic endpoints than either single or dual agonists.
      </P>
      <P>
        Research sizes: 10, 15, 20, 30 mg. Weekly dosing.
      </P>

      <H2>Direct research comparisons</H2>
      <P>
        In head-to-head research models:
      </P>
      <UL>
        <li>Tirzepatide produces larger weight-loss endpoints than semaglutide at comparable doses.</li>
        <li>Retatrutide produces larger endpoints than tirzepatide in early research.</li>
        <li>Tolerance endpoints (GI effects) scale roughly with efficacy — more receptor coverage typically means more tolerability work in protocol design.</li>
      </UL>

      <H2>Where do cagrilintide stacks fit?</H2>
      <P>
        Cagrilintide is a long-acting amylin analog — a completely different receptor
        system. Amylin is co-secreted with insulin and regulates satiety and gastric
        emptying through its own pathway. Combining cagrilintide with a GLP-1-class
        compound adds a fourth receptor to the stack:
      </P>
      <UL>
        <li><strong>Cagri-Sema</strong> — cagrilintide + semaglutide. Amylin + GLP-1.</li>
        <li><strong>Cagri-Reta</strong> — cagrilintide + retatrutide. Amylin + GLP-1 + GIP + glucagon.</li>
      </UL>
      <P>
        Cagri-Reta represents the broadest receptor coverage available in the current
        pre-blended research stacks.
      </P>

      <H2>Survodutide and mazdutide</H2>
      <P>
        Two dual agonists in a different pair than tirzepatide:
      </P>
      <H3>Survodutide</H3>
      <P>GLP-1 + glucagon (no GIP). A different take on the dual-agonist idea.</P>
      <H3>Mazdutide</H3>
      <P>GLP-1 + glucagon, developed from Chinese research pipelines.</P>

      <H2>Which one fits which research question?</H2>
      <UL>
        <li><strong>Baseline GLP-1 biology</strong> — semaglutide. Largest literature to compare against.</li>
        <li><strong>Dual-agonist research</strong> — tirzepatide (GIP) or survodutide/mazdutide (glucagon).</li>
        <li><strong>Triple-agonist research</strong> — retatrutide.</li>
        <li><strong>Quad receptor coverage</strong> — Cagri-Reta.</li>
      </UL>

      <H2>Practical protocol notes</H2>
      <P>
        Weekly dosing is standard across the class. Reconstitute in bacteriostatic water
        to the target concentration — higher dilutions for smaller research doses, more
        concentrated for larger. Aliquot before freezing. Reconstituted vials keep
        ~28 days refrigerated.
      </P>

      <H2>Research-use notice</H2>
      <P>
        These compounds are not substitutes for prescribed pharmaceuticals. Every vial
        sold through {SITE.name} is for laboratory research only. Nothing on this page
        is medical advice.
      </P>
    </GuideLayout>
  )
}
