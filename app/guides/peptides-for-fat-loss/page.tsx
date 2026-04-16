import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Peptides for Fat Loss: GLP-1, GIP, and Beyond',
  description:
    'Semaglutide, tirzepatide, retatrutide, cagrilintide, 5-Amino-1MQ — the current lineup of metabolic peptides, how they compare, and where each fits.',
  alternates: { canonical: `${SITE.baseUrl}/guides/peptides-for-fat-loss` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Fat Loss Guide"
      title="Peptides for Fat Loss: GLP-1, GIP, and Beyond"
      lead="The peptide fat-loss space has exploded. What used to be a single-drug conversation (semaglutide) is now a receptor-coverage arms race — dual agonists, triple agonists, and combinations with amylin analogs. Here's how the major players compare."
      related={['semaglutide-6mg', 'tirzepatide-15mg', 'retatrutide-10mg', 'cagri-sema-blend-5mg-cagrilintide-5mg-sema-10mg']}
      crossLinks={['sema', 'stacks', 'calc', 'recon', 'wheretobuy', 'products']}
    >
      <H2>Semaglutide: the GLP-1 benchmark</H2>
      <P>
        Semaglutide is a long-acting GLP-1 receptor agonist with an engineered fatty-acid
        side chain that extends its half-life to about a week. It's the compound that put
        the whole GLP-1 class on the map. Research models consistently show reduced
        appetite, slower gastric emptying, and glucose-dependent insulin release. In the
        catalogue it comes in 3, 6, 12, 20, and 30 mg vials — choose based on how long
        your protocol runs and your target concentration.
      </P>

      <H2>Tirzepatide: dual GIP + GLP-1</H2>
      <P>
        Tirzepatide activates both the GLP-1 and GIP receptors. GIP is a second incretin
        hormone that enhances insulin release and affects adipocyte function. The dual
        mechanism is the reason research reports stronger metabolic endpoints at lower
        GLP-1-driven GI burden. Weekly dosing, like semaglutide. Available in 15, 30, and
        60 mg research vials.
      </P>

      <H2>Retatrutide: triple agonist</H2>
      <P>
        Retatrutide goes one further: GLP-1 + GIP + glucagon receptor. The glucagon-receptor
        addition brings an energy-expenditure component on top of the appetite and
        insulinotropic effects of the incretin pathways. In early research comparisons, the
        broader receptor coverage produces larger effect sizes than tirzepatide in many
        models. Available in 10, 15, 20, and 30 mg vials.
      </P>

      <H2>Cagrilintide: the amylin co-agonist</H2>
      <P>
        Cagrilintide is a long-acting amylin analog. Amylin is co-secreted with insulin
        and has separate satiety and gastric-emptying effects from GLP-1. On its own,
        cagrilintide has modest effects. In combination with GLP-1 class compounds, it
        produces additive endpoints. That's the logic behind the pre-blended stacks:
      </P>
      <UL>
        <li><strong>Cagri-Sema</strong> — cagrilintide + semaglutide. Dual satiety pathway.</li>
        <li><strong>Cagri-Reta</strong> — cagrilintide + retatrutide. Quad-pathway (amylin + GLP-1 + GIP + glucagon).</li>
      </UL>

      <H2>Other metabolic compounds worth knowing</H2>
      <H3>5-Amino-1MQ</H3>
      <P>
        Not a peptide — a small-molecule NNMT inhibitor. NNMT consumes both nicotinamide
        (an NAD+ precursor) and SAM (the universal methyl donor). Blocking NNMT raises
        nicotinamide availability, which is studied in adipocyte and metabolic research.
        Oral capsules and injectable formats both exist.
      </P>
      <H3>AOD9604</H3>
      <P>
        A synthetic fragment of human growth hormone (residues 176–191) engineered to
        keep the lipolytic activity of GH without the growth signaling. Different mechanism
        from the GLP-1 class — it acts on adipocyte lipolysis rather than central appetite.
      </P>
      <H3>AICAR</H3>
      <P>
        An AMPK activator studied for its effects on fatty-acid oxidation and glucose
        uptake. AMPK is sometimes called the cell's "fuel gauge" — activating it mimics
        a low-energy state.
      </P>
      <H3>Tesofensine</H3>
      <P>
        A triple monoamine reuptake inhibitor (not a peptide) — affects dopamine,
        norepinephrine, and serotonin. Studied extensively for appetite suppression in
        obesity research. Available in capsule and tablet formats.
      </P>
      <H3>SLU-PP-332</H3>
      <P>
        An ERR (estrogen-related receptor) agonist studied as an exercise-mimetic — the
        idea being that ERR activation reproduces some of the mitochondrial-biogenesis
        and fatty-acid-oxidation effects of training.
      </P>

      <H2>Survodutide and mazdutide</H2>
      <P>
        Two newer entries. <strong>Survodutide</strong> is a dual GLP-1 / glucagon receptor
        agonist — similar to retatrutide but without GIP. <strong>Mazdutide</strong> is
        another dual GLP-1 / glucagon agonist being developed out of the Chinese research
        pipeline. Both belong to the dual-agonist lane alongside tirzepatide, with a
        different receptor pair.
      </P>

      <H2>How to think about which one fits</H2>
      <UL>
        <li><strong>Benchmark research</strong> — semaglutide. Largest published literature.</li>
        <li><strong>Stronger endpoints, same class</strong> — tirzepatide (dual) or retatrutide (triple).</li>
        <li><strong>Combination research</strong> — Cagri-Sema or Cagri-Reta pre-blends.</li>
        <li><strong>Non-GLP-1 mechanism</strong> — 5-Amino-1MQ, AOD9604, AICAR.</li>
        <li><strong>Monoamine route</strong> — tesofensine (capsule or tablet).</li>
      </UL>

      <H2>Titration, tolerance, and protocol notes</H2>
      <P>
        GLP-1-class compounds are almost universally titrated in research — starting at a
        low concentration and scaling up over 4–8 weeks. This is because the GI-related
        endpoints (nausea, slowed gastric emptying) are dose-dependent. Weekly dosing is
        standard across the class. Reconstitute in bacteriostatic water, aliquot, and
        refrigerate.
      </P>

      <H2>Research-use notice</H2>
      <P>
        These compounds are not substitutes for prescribed medications. Every vial sold
        through {SITE.name} is for laboratory research use only. Nothing here is medical
        advice.
      </P>
    </GuideLayout>
  )
}
