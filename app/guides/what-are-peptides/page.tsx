import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'What Are Peptides? A Plain-English Beginner\'s Guide',
  description:
    'Peptides are short chains of amino acids — the same building blocks as proteins, just shorter. Here\'s how they work, the main research families, and why they matter.',
  alternates: { canonical: `${SITE.baseUrl}/guides/what-are-peptides` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Guide"
      title="What Are Peptides? A Beginner's Guide"
      lead="Peptides are short chains of amino acids — the same building blocks proteins are made of, just smaller. That size difference turns out to matter a lot for biology, pharmacology, and the way peptides have come to dominate the research-compound space."
      related={['bpc-157-10mg', 'semaglutide-6mg', 'ghk-cu-50mg', 'ipamorelin-10mg']}
      crossLinks={['glossary', 'recon', 'calc', 'wheretobuy', 'stacks', 'products']}
    >
      <H2>Peptide vs protein: where's the line?</H2>
      <P>
        Convention: fewer than ~50 amino acids is a peptide; longer than that is a
        protein. It's a soft line — insulin is 51 residues and is often called a peptide
        hormone. The functional difference is that shorter chains fold less, are often
        more stable, and can be chemically synthesized at scale. That last point matters:
        peptides can be manufactured by solid-phase synthesis rather than through living
        cell lines, which keeps research-grade material affordable.
      </P>

      <H2>How peptides signal</H2>
      <P>
        Most research peptides act by binding cell-surface receptors — the same way
        hormones do. GLP-1 agonists bind the GLP-1 receptor. GHRPs bind the ghrelin
        receptor. Melanocortin agonists bind MC1R/MC3R/MC4R/MC5R. The receptor determines
        the downstream effect, which is why a small difference in peptide structure can
        mean a completely different endpoint profile.
      </P>

      <H2>The main research families</H2>
      <H3>Growth-axis peptides</H3>
      <P>
        GHRPs (GHRP-2, GHRP-6, ipamorelin, hexarelin) bind the ghrelin receptor and
        stimulate growth-hormone release. GHRH analogs (sermorelin, tesamorelin, CJC-1295)
        bind a separate receptor and produce the same outcome via a different route. The
        two classes are commonly stacked because activating both receptors produces
        stronger GH release than either alone.
      </P>
      <H3>Incretin peptides (GLP-1 class)</H3>
      <P>
        Semaglutide, tirzepatide, retatrutide, survodutide, mazdutide — these are the
        fat-loss / metabolic peptides that have dominated news cycles. They act on the
        GLP-1 receptor (and in some cases GIP and glucagon), affecting insulin secretion,
        gastric emptying, and central appetite regulation.
      </P>
      <H3>Repair and soft-tissue peptides</H3>
      <P>
        BPC-157 and TB-500 are the two most-studied compounds here. BPC-157 drives
        angiogenesis and has a huge rodent-model literature behind it. TB-500 promotes
        cellular migration. They hit different parts of the repair pathway, which is why
        stacks combining both are popular.
      </P>
      <H3>Cosmetic and skin peptides</H3>
      <P>
        GHK-Cu is the anchor — decades of literature in skin, hair, and wound research.
        Blends like GLOW and KLOW extend this with repair and anti-inflammatory peptides.
      </P>
      <H3>Cognitive / sleep peptides</H3>
      <P>
        Selank, semax, DSIP, pinealon — short peptides with nootropic, anxiolytic, or
        sleep-modulating profiles. Most of this literature comes from Russian research
        groups going back to the 1980s.
      </P>
      <H3>Longevity peptides</H3>
      <P>
        Epitalon (telomerase activation), NAD+ (sirtuin substrate), MOTS-c (mitochondrial
        signaling), SS-31 (mitochondrial membrane support). This is where the newest
        research keeps popping up.
      </P>

      <H2>Why peptides come as lyophilized powder</H2>
      <P>
        Peptides are unstable in solution at room temperature. Freeze-drying them
        (lyophilization) removes water and locks them in a stable form for shipping and
        storage. Researchers reconstitute with bacteriostatic water just before use.
        Unreconstituted vials stay stable for months to years in a freezer.
      </P>

      <H2>Certificate of analysis: what to look for</H2>
      <P>
        A COA is an independent lab report verifying that the vial contains what the
        label says. Key items: identity (mass spectrometry confirming the molecular
        weight), purity (HPLC showing the % main peak), and absence of common
        contaminants. Anything without a COA is a guess.
      </P>

      <H2>Reading a product label</H2>
      <UL>
        <li><strong>Name + dose</strong> — "BPC-157 10mg" means 10 mg of BPC-157 total in the vial.</li>
        <li><strong>Format</strong> — vial (injectable), capsule (oral), or bulk powder.</li>
        <li><strong>Purity</strong> — % main peak by HPLC. 98%+ is the standard to expect.</li>
        <li><strong>Storage</strong> — room temp for unreconstituted, refrigerate once mixed.</li>
      </UL>

      <H2>Where to go next</H2>
      <P>
        The catalogue on {SITE.name} is organised by research pathway rather than by
        compound name — if you know what endpoint you're researching, start there. If
        you know the compound name, the full catalogue has every vial indexed.
      </P>
    </GuideLayout>
  )
}
