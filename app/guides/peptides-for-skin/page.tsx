import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P, UL } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Peptides for Skin, Hair, and Anti-Aging',
  description:
    'GHK-Cu, epitalon, NA-Epitalon, GLOW and KLOW blends — the peptides that show up in cosmetic and anti-aging research.',
  alternates: { canonical: `${SITE.baseUrl}/guides/peptides-for-skin` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Skin & Anti-Aging Guide"
      title="Peptides for Skin, Hair, and Anti-Aging"
      lead="Cosmetic peptide research has a much longer history than most people assume. GHK-Cu appeared in the dermatology literature in the 1970s. Here's what the current catalogue of skin-and-aging peptides actually covers and how the formats differ."
      related={['ghk-cu-50mg', 'epitalon-50mg', 'glow-blend-50mg', 'klow-blend-80mg']}
    >
      <H2>GHK-Cu: the copper peptide</H2>
      <P>
        GHK-Cu is the backbone of cosmetic-peptide research. It's a naturally occurring
        tripeptide (glycyl-histidyl-lysine) that binds copper ions to form the biologically
        active complex. Research describes it upregulating collagen, elastin, decorin, and
        glycosaminoglycans — the structural proteins and polysaccharides that keep skin
        firm and hydrated.
      </P>
      <UL>
        <li><strong>50 mg</strong> — standard research vial. Suits both injectable and topical protocols.</li>
        <li><strong>100 mg</strong> — same compound, larger vial for extended research.</li>
      </UL>
      <P>
        Research protocols span injected (subcutaneous) and topical formulations. Topical
        is the dominant cosmetic application; injected routes appear in wound-healing
        and systemic anti-aging research.
      </P>

      <H2>Epitalon: telomerase and circadian research</H2>
      <P>
        Epitalon (ala-glu-asp-gly) is a synthetic tetrapeptide developed in the Russian
        research tradition, studied for telomerase activation and pineal-axis regulation.
        Research protocols typically use short pulsed courses (10–20 days) rather than
        continuous dosing. Available in 10 mg and 50 mg vials.
      </P>
      <P>
        <strong>NA-Epitalon</strong> is the N-acetylated version — improved stability for
        longer protocols.
      </P>

      <H2>GLOW and KLOW blends</H2>
      <P>
        Pre-mixed multi-peptide blends built around GHK-Cu plus repair peptides. The
        idea is to hit collagen synthesis (GHK-Cu), vascular / repair signaling (BPC-157),
        and cellular migration (TB-500) all at once. KLOW extends GLOW by adding KPV — the
        α-MSH tripeptide that delivers anti-inflammatory activity without MC1R pigmentation
        effects.
      </P>
      <UL>
        <li><strong>GLOW 50 mg / 70 mg</strong> — collagen + repair blend.</li>
        <li><strong>KLOW 80 mg</strong> — collagen + repair + anti-inflammatory.</li>
      </UL>

      <H2>Melanotan I and II</H2>
      <P>
        α-MSH analogs. Melanotan I (afamelanotide) is more MC1R-selective — pigmentation
        with a narrower endpoint profile. Melanotan II is broader-spectrum (MC1R, MC3R,
        MC4R, MC5R) — faster pigmentation but wider downstream effects including appetite
        and central sexual-response circuits.
      </P>

      <H2>RU-58841: topical hair research</H2>
      <P>
        Not a peptide — a topical anti-androgen studied in hair-follicle research. Binds
        androgen receptors locally without systemic absorption at typical research
        concentrations. Available as 50 mg in 30 mL and 60 mL solution formats.
      </P>

      <H2>Supporting compounds for skin research</H2>
      <H3>Glutathione</H3>
      <P>
        The major intracellular antioxidant tripeptide. Injected glutathione research
        focuses on tissue GSH elevation — which downstream connects to skin brightness,
        redox balance, and detoxification endpoints. Available in 200, 600, and 1500 mg
        vials.
      </P>
      <H3>Methylene Blue</H3>
      <P>
        A phenothiazine-derived compound (not a peptide) studied in mitochondrial and
        redox-biology research. Shows up in longevity stacks alongside NAD+.
      </P>
      <H3>FOXO4-DRI</H3>
      <P>
        A senolytic peptide designed to disrupt the FOXO4-p53 interaction that protects
        senescent cells from apoptosis. Specialty longevity-research compound.
      </P>

      <H2>Which format: injectable or topical?</H2>
      <P>
        For cosmetic GHK-Cu research, topical formulations dominate published protocols
        because skin is the target tissue. Systemic (injected) GHK-Cu appears in
        wound-healing and broader anti-aging research. Most research-grade suppliers sell
        the same lyophilized vial — researchers reconstitute into whichever vehicle their
        study requires.
      </P>

      <H2>A typical starting stack</H2>
      <UL>
        <li><strong>GHK-Cu 50 mg</strong> — anchor compound.</li>
        <li><strong>BPC-157 10 mg</strong> — repair support (also useful for training recovery).</li>
        <li><strong>Optional: GLOW or KLOW</strong> — if you want the multi-peptide blend rather than DIY.</li>
      </UL>
      <P>
        Add Epitalon as a longevity-axis adjunct if the protocol calls for pulsed bioregulator
        research. Melanotan compounds add pigmentation — a separate research axis.
      </P>

      <H2>Storage and handling</H2>
      <P>
        All peptides ship lyophilized. Reconstitute with bacteriostatic water. Store
        reconstituted vials at 2–8 °C and use within ~28 days. Freeze unreconstituted
        vials for long-term stability.
      </P>

      <H2>Research-use notice</H2>
      <P>
        Compounds on {SITE.name} are for laboratory research only. Nothing on this page
        is medical or cosmetic advice.
      </P>
    </GuideLayout>
  )
}
