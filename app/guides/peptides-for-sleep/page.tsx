import type { Metadata } from 'next'
import GuideLayout, { H2, H3, P } from '@/components/GuideLayout'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Peptides for Sleep and Cognitive Support',
  description:
    'DSIP, selank, semax, pinealon, N-Acetyl Semax Amidate — the sleep and nootropic peptides that keep appearing in research.',
  alternates: { canonical: `${SITE.baseUrl}/guides/peptides-for-sleep` },
}

export default function Page() {
  return (
    <GuideLayout
      eyebrow="Sleep & Cognition Guide"
      title="Peptides for Sleep and Cognitive Support"
      lead="The sleep and nootropic peptide space is narrower than the fat-loss or growth-axis categories — but it's dominated by compounds with decades of research behind them, most of it from Russian neuropharmacology groups."
      related={['selank-10mg', 'n-acetyl-semax-amidate-30mg', 'dsip-delta-sleep-inducing-peptide-10mg', 'pinealon-20mg']}
      crossLinks={['basics', 'glossary', 'calc', 'recon', 'stacks', 'products']}
    >
      <H2>DSIP: the original "sleep peptide"</H2>
      <P>
        Delta Sleep-Inducing Peptide was isolated from the cerebral venous blood of
        sleeping rabbits in 1977 — one of the most literal naming conventions in peptide
        research. Nine amino acids. Research describes it modulating delta-wave EEG
        activity, stress-axis signaling, and certain neuroendocrine parameters. Notably,
        despite decades of study, DSIP's specific receptor target remains an open
        research question.
      </P>
      <P>
        Available in 5, 10, and 15 mg vials. Short pulsed research protocols are typical.
      </P>

      <H2>Selank: anxiolytic peptide</H2>
      <P>
        Selank is a synthetic heptapeptide analog of tuftsin, developed at the Institute
        of Molecular Genetics of the Russian Academy of Sciences. It is studied primarily
        for its anxiolytic and immunomodulatory effects, with documented activity on
        GABAergic and serotonergic systems.
      </P>
      <P>
        The <strong>NA-Selank Amidate</strong> version is N-terminally acetylated —
        improved stability for longer research windows. Both intranasal and injectable
        routes appear in the literature.
      </P>

      <H2>Semax: the nootropic heptapeptide</H2>
      <P>
        Semax is derived from ACTH(4-10) — the non-corticotropic fragment of
        adrenocorticotropic hormone. Research reports strong BDNF and NGF upregulation,
        plus modulation of dopaminergic and serotonergic signaling. It has been studied
        across learning, memory, and post-ischemic-recovery research models.
      </P>
      <P>
        <strong>N-Acetyl Semax Amidate</strong> is the stabilized form — N-terminally
        acetylated and C-terminally amidated for extended half-life. This is the version
        most research protocols use for longer studies.
      </P>

      <H2>Selank vs Semax</H2>
      <P>
        Both are Russian-developed short peptides with overlapping but distinct profiles:
      </P>
      <H3>Selank</H3>
      <P>Anxiolytic-focused. GABAergic and serotonergic modulation. Studied more in anxiety and stress-response research.</P>
      <H3>Semax</H3>
      <P>Cognitive-focused. Strong BDNF/NGF upregulation. Studied more in learning, memory, and neuroprotection research.</P>

      <H2>Pinealon: bioregulator research</H2>
      <P>
        Pinealon (Glu-Asp-Arg) is a tripeptide in the Khavinson bioregulator class — a
        family of short peptides developed by Prof. Vladimir Khavinson for tissue-specific
        research. Pinealon targets pineal-gland and neuronal endpoints. Short pulsed
        courses (10–20 days) are the standard research protocol.
      </P>

      <H2>Epitalon (for circadian research)</H2>
      <P>
        Technically a longevity peptide, but included here because of its reported
        effects on pineal-axis function and melatonin rhythms. Some research protocols
        use Epitalon specifically for circadian-research endpoints rather than telomere
        biology.
      </P>

      <H2>Adamax</H2>
      <P>
        A less-commonly-discussed nootropic compound that appears in the cognitive
        research catalogue. Niche option — most researchers stick with Selank or Semax
        as their primary cognitive tools.
      </P>

      <H2>PE-22-28: depression research</H2>
      <P>
        A research peptide studied in mood and depression models. Narrow research
        application but represented in the catalogue.
      </P>

      <H2>Choosing between formats</H2>
      <P>
        Selank and Semax both come in injectable and intranasal research formats.
        Intranasal is the classic Russian-research delivery route — it bypasses the
        blood-brain barrier and reaches CNS targets rapidly. Injectable routes are used
        when researchers need more predictable pharmacokinetics.
      </P>

      <H2>Research-use notice</H2>
      <P>
        These compounds are sold through {SITE.name} for laboratory research only.
        Nothing on this page is medical advice.
      </P>
    </GuideLayout>
  )
}
