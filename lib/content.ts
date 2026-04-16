// Per-compound research content. Keyed by "family" — the compound name
// without dose/format. Multiple SKUs (e.g. semaglutide-3mg, -6mg, -12mg)
// share the same family entry.
//
// This is deliberately research-literature framing — no medical advice,
// no dosing recommendations. Rewrite before launch if you want a
// specific editorial voice.

export interface CompoundContent {
  overview: string
  mechanism: string
  highlights: string[]
  protocolNotes: string
  storage: string
  stackingNotes: string
  faqs: { q: string; a: string }[]
}

const DEFAULT_STORAGE =
  'Lyophilized powder is stable at ambient shipping temperatures. Once reconstituted with bacteriostatic water, store at 2–8 °C and use within 28 days. For long-term storage of unreconstituted vials, freeze at −20 °C and protect from light.'

const DEFAULT_PROTOCOL =
  'Reconstitute under sterile technique with bacteriostatic water. Typical volumes range from 1–3 mL depending on the target working concentration. Swirl gently — do not shake — to avoid peptide shearing.'

export const CONTENT: Record<string, CompoundContent> = {
  'bpc-157': {
    overview:
      'BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from a protective protein found in gastric juice. It has been one of the most widely studied peptides in pre-clinical repair and soft-tissue research over the past two decades, with a literature record spanning tendon, ligament, gut, and vascular models.',
    mechanism:
      'Research describes BPC-157 acting on the VEGFR2 pathway, promoting angiogenesis at the site of injury. It also modulates the nitric oxide (NO) system and has been shown in rodent models to upregulate growth-hormone receptor expression in injured tissue — a proposed explanation for its observed tendon-to-bone healing effects.',
    highlights: [
      'Studied across tendon, ligament, muscle, and gut-lining models',
      'Stable in gastric juice — one of few peptides robust to pH extremes in vitro',
      'Examined in both systemic (injectable) and local-application research protocols',
      'Research literature spans 1990s to present, largely from Seiwerth/Sikiric labs in Zagreb',
    ],
    protocolNotes:
      'In rodent studies, systemic doses are commonly reported in the 10–20 µg/kg range. Researchers typically reconstitute 10 mg vials in 2 mL of bacteriostatic water to yield 5 mg/mL working stock. Peptide integrity is sensitive to repeated freeze-thaw cycles — aliquot where possible.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'In comparative research, BPC-157 is frequently studied alongside TB-500 (Thymosin Beta-4). The two are thought to act on complementary repair pathways — BPC-157 on vascular/angiogenic signaling, TB-500 on cell migration via actin sequestration. Pre-blended stacks are offered for convenience.',
    faqs: [
      {
        q: 'What does BPC-157 stand for?',
        a: 'Body Protection Compound-157 — a 15-amino-acid fragment of a larger protein isolated from human gastric juice.',
      },
      {
        q: 'Is BPC-157 stable when taken orally in research?',
        a: 'Unusually for a peptide, yes — research shows BPC-157 retains biological activity after exposure to gastric pH, which is why both oral-gavage and injected routes appear in the literature.',
      },
      {
        q: 'How does BPC-157 compare to TB-500 in repair research?',
        a: 'The two are complementary in published models. BPC-157 is angiogenic (new vessel formation); TB-500 promotes cellular migration. Stacks combining both are common in comparative repair studies.',
      },
      {
        q: 'What is a certificate of analysis and is one included?',
        a: 'A COA is an independent lab report confirming identity and purity (typically by HPLC and mass spectrometry). Every lot ships with a matching COA — request it from the supplier if it is not linked on the product page.',
      },
    ],
  },

  'tb-500': {
    overview:
      'TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring 43-amino-acid peptide present at high concentrations in platelets and wound fluid. Research interest in TB-500 centers on its role in actin sequestration and cellular migration, which underpins its frequent appearance in tissue-repair and cardiovascular models.',
    mechanism:
      'Thymosin Beta-4 binds and sequesters G-actin monomers, regulating the dynamic actin pool available for cytoskeletal remodeling. This is the proposed basis for its effects on cell migration, wound closure, and the recruitment of progenitor cells to sites of injury in animal models.',
    highlights: [
      'Derived from Thymosin Beta-4, one of the most abundant intracellular proteins',
      'Studied in models of dermal wound healing, cardiac remodeling, and corneal repair',
      'Frequently paired with BPC-157 in repair-comparison protocols',
      'Reported half-life in circulation is longer than most research peptides — days rather than hours',
    ],
    protocolNotes:
      'Rodent studies commonly use 2–10 mg/kg administered 1–3× weekly. A 10 mg vial reconstituted in 2 mL BAC water yields 5 mg/mL. Use sterile technique and aliquot to minimize freeze-thaw exposure.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'BPC-157 + TB-500 is the most common blend in the literature — the two peptides address different arms of the repair response. Pre-mixed stacks are available to simplify multi-peptide research designs.',
    faqs: [
      {
        q: 'Is TB-500 the same as Thymosin Beta-4?',
        a: 'TB-500 is an active fragment of the full 43-residue Thymosin Beta-4 peptide, containing the actin-binding sequence. They are used somewhat interchangeably in research but TB-500 is the synthetic form most labs work with.',
      },
      {
        q: 'What is its proposed mechanism?',
        a: 'G-actin sequestration — binding free actin monomers and regulating the cytoskeletal pool that drives cell migration and tissue remodeling.',
      },
      {
        q: 'Why stack it with BPC-157?',
        a: 'They hit different repair pathways. Comparative studies report additive outcomes in some soft-tissue models.',
      },
      {
        q: 'How should TB-500 be stored after reconstitution?',
        a: '2–8 °C for up to 28 days. Never re-freeze a reconstituted solution.',
      },
    ],
  },

  'semaglutide': {
    overview:
      'Semaglutide is a long-acting GLP-1 receptor agonist that has become one of the most discussed compounds in incretin biology. In research settings, it is used to study energy balance, gastric emptying, and the central-nervous-system effects of GLP-1 pathway activation.',
    mechanism:
      'GLP-1 receptor agonism increases glucose-dependent insulin secretion, slows gastric emptying, and acts centrally on appetite-regulating nuclei in the hypothalamus. Semaglutide is engineered with a fatty-acid side chain that extends its half-life to roughly one week in animal studies.',
    highlights: [
      'GLP-1 analog with extended half-life (~7 days in research)',
      'Featured across metabolic, cardiovascular, and neurological research models',
      'Slower titration schedules are used in protocols to manage known GI-tolerance endpoints',
      'Benchmarked in the literature against tirzepatide, retatrutide, and cagrilintide',
    ],
    protocolNotes:
      'Most research protocols reconstitute semaglutide in bacteriostatic water and administer once weekly. Titration schedules that begin at a low concentration and scale over several weeks are common to study tolerability endpoints.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Cagri-sema (cagrilintide + semaglutide) is a frequently studied dual-incretin/amylin combination. Tirzepatide and retatrutide are distinct compounds often compared against semaglutide in head-to-head metabolic research.',
    faqs: [
      {
        q: 'Is semaglutide the same as Ozempic or Wegovy?',
        a: 'Those are commercial pharmaceutical formulations of semaglutide. Research-grade material sold here is for laboratory use only and is not a substitute for a prescribed product.',
      },
      {
        q: 'What is the difference between semaglutide and tirzepatide in research?',
        a: 'Semaglutide is a GLP-1 agonist. Tirzepatide is a dual GIP/GLP-1 agonist — it activates two incretin receptors. Retatrutide adds a glucagon receptor, making it a triple agonist.',
      },
      {
        q: 'Why does it come in multiple vial sizes?',
        a: 'Research protocols vary widely in concentration and duration. Larger vials (20–30 mg) reduce per-mg cost for long-running studies; smaller vials are used for short pilots.',
      },
      {
        q: 'Is a COA provided?',
        a: 'Yes — each lot is independently tested. Request the matching document from the supplier.',
      },
    ],
  },

  'tirzepatide': {
    overview:
      'Tirzepatide is a synthetic dual agonist of the GIP and GLP-1 receptors — two incretin pathways that collaborate in glucose and energy-balance regulation. Research interest centers on whether dual agonism produces additive or synergistic effects compared with GLP-1-only compounds such as semaglutide.',
    mechanism:
      'Unlike pure GLP-1 agonists, tirzepatide activates both the GIP (glucose-dependent insulinotropic polypeptide) receptor and the GLP-1 receptor. GIP signaling contributes to insulin release and adipocyte function; the combination is theorized to drive stronger metabolic endpoints at lower GLP-1-driven GI burden.',
    highlights: [
      'Dual GIP/GLP-1 receptor agonist — a class distinct from semaglutide',
      'Weekly-dosing research profile, typically studied over 12–40 week windows',
      'Frequently benchmarked against semaglutide and retatrutide',
      'Available in 15, 30, and 60 mg research vial sizes',
    ],
    protocolNotes:
      'Research protocols commonly titrate from low to target concentrations over 4–8 weeks. Reconstitute in bacteriostatic water; a 30 mg vial in 3 mL BAC water yields 10 mg/mL working stock. Aliquot to limit freeze-thaw cycles.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Tirzepatide is usually studied alone in head-to-head comparisons with other incretin compounds. Stacking with cagrilintide or with fat-loss-adjacent compounds like 5-Amino-1MQ appears in some comparative protocols.',
    faqs: [
      {
        q: 'How does tirzepatide differ from semaglutide?',
        a: 'Tirzepatide activates both the GIP and GLP-1 receptors; semaglutide activates only GLP-1. Research studies report stronger metabolic endpoints for tirzepatide in many models.',
      },
      {
        q: 'Why are there 15, 30, and 60 mg vial sizes?',
        a: 'Larger vials reduce per-mg cost for longer studies; smaller sizes suit pilot and titration work.',
      },
      {
        q: 'Is tirzepatide the same as Mounjaro or Zepbound?',
        a: 'Those are commercial pharmaceutical formulations. The material sold here is research-grade and not for human use.',
      },
      {
        q: 'What is a typical reconstitution?',
        a: 'Common research dilutions use 1–3 mL of bacteriostatic water per vial. Aliquot before freezing to reduce freeze-thaw stress.',
      },
    ],
  },

  'retatrutide': {
    overview:
      'Retatrutide is a triple agonist targeting the GLP-1, GIP, and glucagon receptors — the broadest incretin/counterregulatory activation profile studied in peptide research to date. It is frequently benchmarked in the literature against dual agonists like tirzepatide and pure GLP-1 agonists like semaglutide.',
    mechanism:
      'By recruiting glucagon-receptor signaling alongside the two incretin receptors, retatrutide is proposed to add an energy-expenditure component on top of the appetite-suppression and insulinotropic effects typical of GLP-1/GIP activation. This triple-agonist design is the current frontier of peptide metabolic research.',
    highlights: [
      'Triple agonist: GLP-1 + GIP + glucagon receptor',
      'Available in 10, 15, 20, and 30 mg research vials',
      'Among the most-discussed new research compounds in metabolic studies',
      'Studied head-to-head with tirzepatide in comparative protocols',
    ],
    protocolNotes:
      'Weekly-dosing protocols dominate the research literature. Reconstitution in BAC water with careful aliquoting is standard. Lower starting concentrations are typical during titration phases.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Reta-Cagri (retatrutide + cagrilintide) blends appear in comparative amylin-co-agonism research. Retatrutide is rarely stacked with other GLP-1 compounds.',
    faqs: [
      {
        q: 'Why is retatrutide called a "triple agonist"?',
        a: 'It activates three distinct receptors — GLP-1, GIP, and glucagon — rather than one (semaglutide) or two (tirzepatide).',
      },
      {
        q: 'Is retatrutide more potent than tirzepatide in research models?',
        a: 'Published comparisons report stronger endpoints in some metabolic models, though the full picture is still being characterized in ongoing studies.',
      },
      {
        q: 'What is the typical half-life in research?',
        a: 'Weekly dosing schedules are standard, consistent with a multi-day pharmacokinetic profile.',
      },
      {
        q: 'How should multiple vial sizes be chosen?',
        a: 'Match total study duration × weekly concentration to choose the most cost-efficient vial size.',
      },
    ],
  },

  'ipamorelin': {
    overview:
      'Ipamorelin is a selective growth-hormone secretagogue and ghrelin-receptor agonist. Among GHRPs, it is noted in the research literature for its selectivity — stimulating GH release with minimal impact on cortisol or prolactin in the rodent models where it has been characterized.',
    mechanism:
      'Ipamorelin binds the GHS-R1a (ghrelin) receptor in the anterior pituitary, triggering pulsatile growth-hormone release. Unlike earlier GHRPs such as GHRP-2 and GHRP-6, ipamorelin shows limited activity on the HPA axis in research, which is the basis for its "clean" reputation in comparative studies.',
    highlights: [
      'Selective GH release — minimal cortisol/prolactin impact in research',
      'Short half-life (~2 hours) supporting pulsatile dosing studies',
      'Commonly stacked with CJC-1295 for sustained GH-axis research',
      'One of the most widely studied secretagogues in the pentapeptide class',
    ],
    protocolNotes:
      'A 10 mg vial reconstituted in 2 mL BAC water yields 5 mg/mL. Multiple-daily protocols are common in GH-pulse research.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Ipamorelin + CJC-1295 is the canonical growth-axis research stack — CJC-1295 as the GHRH-analog driver, ipamorelin as the ghrelin-pathway amplifier. Ipamorelin + Tesamorelin is another well-characterized pairing.',
    faqs: [
      {
        q: 'Why combine ipamorelin with CJC-1295?',
        a: 'They target complementary receptors — GHRH and ghrelin — and research reports synergistic GH release when the two pulses are aligned.',
      },
      {
        q: 'How selective is ipamorelin compared to GHRP-6?',
        a: 'Research shows substantially less cortisol/prolactin elevation with ipamorelin than with GHRP-6 at comparable GH-release endpoints.',
      },
      {
        q: 'What is the typical half-life?',
        a: 'Around 2 hours in research models, supporting multi-daily pulsed protocols.',
      },
      {
        q: 'Is a COA included?',
        a: 'Yes — per-lot independent testing is standard.',
      },
    ],
  },

  'cjc-1295': {
    overview:
      'CJC-1295 is a growth-hormone-releasing hormone (GHRH) analog engineered for extended stability. Two variants dominate the research literature: CJC-1295 "No DAC" — a shorter-acting GHRH analog — and CJC-1295 "with DAC" — which includes a Drug Affinity Complex that binds albumin and dramatically extends circulating half-life.',
    mechanism:
      'Both variants bind the GHRH receptor in the anterior pituitary, stimulating growth-hormone release. The "with DAC" version carries a lysine-reactive maleimide linker that covalently binds serum albumin, extending half-life from hours (No DAC) to days (with DAC).',
    highlights: [
      'Two research variants: No DAC (short-acting) and with DAC (long-acting)',
      'GHRH analog — different receptor than ghrelin-pathway secretagogues',
      'Frequently paired with ipamorelin for dual-pathway GH research',
      'Well-documented pharmacokinetic profiles in both variants',
    ],
    protocolNotes:
      'No DAC protocols typically use multi-daily dosing to match natural GH pulsatility. With DAC protocols use once-weekly schedules due to the extended half-life. Reconstitute in BAC water and aliquot.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'CJC-1295 + Ipamorelin is the standard dual-pathway GH research combination. Tesamorelin is an alternative GHRH-analog for researchers who prefer not to work with DAC-linked compounds.',
    faqs: [
      {
        q: 'What does "DAC" mean?',
        a: 'Drug Affinity Complex — a chemical modification that allows the peptide to covalently bind serum albumin, extending its circulating half-life from hours to days.',
      },
      {
        q: 'Should I choose DAC or No DAC?',
        a: 'Depends on protocol design. No DAC is used when mimicking natural pulsatile GH release; with DAC is used for sustained-level research where weekly dosing is preferable.',
      },
      {
        q: 'How does it differ from ipamorelin?',
        a: 'CJC-1295 is a GHRH analog. Ipamorelin is a ghrelin-receptor agonist. They work on different receptors and are often combined.',
      },
      {
        q: 'Is it stable long-term?',
        a: 'Unreconstituted vials are stable at −20 °C for extended periods. Reconstituted solutions follow standard peptide handling — 2–8 °C, 28 days.',
      },
    ],
  },

  'ghk-cu': {
    overview:
      'GHK-Cu (copper tripeptide-1) is a naturally occurring peptide that binds copper ions to form a biologically active complex. It is one of the longest-studied peptides in skin, hair-follicle, and wound-healing research, with a literature dating back to the 1970s.',
    mechanism:
      'The peptide-copper complex modulates expression of genes involved in collagen synthesis, extracellular-matrix remodeling, and antioxidant response. In skin research, GHK-Cu has been shown to upregulate elastin, glycosaminoglycans, and decorin while suppressing markers of senescence.',
    highlights: [
      'One of the most extensively studied cosmetic and repair peptides',
      'Research spans skin, hair-follicle, bone, and vascular models',
      'Dual role as signaling peptide and copper carrier',
      'Frequently used in topical research formulations',
    ],
    protocolNotes:
      'Both injectable and topical research protocols appear in the literature. For topical formulations, the peptide is typically prepared in a non-reactive vehicle at 0.1–2% depending on the study.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'GLOW and KLOW blends (containing GHK-Cu alongside BPC-157, TB-500, and related peptides) are pre-mixed research formulations for multi-peptide repair and cosmetic studies.',
    faqs: [
      {
        q: 'Why is it called "copper peptide"?',
        a: 'GHK has high affinity for Cu(II) ions. The peptide binds copper at physiological concentrations to form the biologically active complex.',
      },
      {
        q: 'What is the difference between 50 mg and 100 mg vials?',
        a: 'Same compound, different total mass — 100 mg is typically used for longer or higher-concentration research designs.',
      },
      {
        q: 'Is GHK-Cu studied topically or systemically?',
        a: 'Both. Topical research dominates the cosmetic literature; systemic models appear in wound-healing and anti-senescence studies.',
      },
      {
        q: 'What are GLOW and KLOW blends?',
        a: 'Pre-mixed multi-peptide research blends built around GHK-Cu plus repair peptides like BPC-157 and TB-500.',
      },
    ],
  },

  'epitalon': {
    overview:
      'Epitalon (Epithalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) developed from pineal-gland extracts. It is one of the most studied peptides in telomere-biology and circadian-regulation research, with a multi-decade literature primarily from Russian and Eastern European groups.',
    mechanism:
      'Research describes epitalon as a telomerase-activating peptide — upregulating telomerase reverse transcriptase (TERT) expression in somatic cells. It is also reported to normalize melatonin rhythms and modulate pineal-axis function in aging models.',
    highlights: [
      'Tetrapeptide: Ala-Glu-Asp-Gly',
      'Studied in telomere-biology, circadian, and longevity research',
      'Developed by Prof. Khavinson at the St. Petersburg Institute of Bioregulation',
      'Available in 10 mg and 50 mg research vials',
    ],
    protocolNotes:
      'Both injectable and intranasal research routes appear in the literature. Short courses (10–20 days) are more common than continuous protocols.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Epitalon is commonly studied alongside Pinealon and other short bioregulator peptides from the Khavinson series.',
    faqs: [
      {
        q: 'Is Epitalon the same as Epithalon?',
        a: 'Yes — two transliterations of the same Russian-developed tetrapeptide.',
      },
      {
        q: 'What is NA-Epitalon?',
        a: 'N-acetylated Epitalon — a modified form with improved stability profile in some research protocols.',
      },
      {
        q: 'How long are research courses typically run?',
        a: 'Short pulsed courses (10–20 days, 1–2× annually in animal models) dominate the literature, not continuous dosing.',
      },
      {
        q: 'What is telomerase activation?',
        a: 'Upregulation of the enzyme that extends telomeres at chromosome ends — a central mechanism studied in cellular aging.',
      },
    ],
  },

  'nad': {
    overview:
      'NAD+ (nicotinamide adenine dinucleotide) is a coenzyme central to cellular metabolism, redox reactions, and sirtuin/PARP signaling. Injectable NAD+ research concentrates on whether parenteral delivery raises tissue NAD+ pools more efficiently than oral precursor supplementation.',
    mechanism:
      'NAD+ is the substrate for sirtuins (SIRT1–7), PARPs, and CD38 — enzymes central to DNA repair, mitochondrial function, and inflammaging biology. NAD+ levels decline with age, and restoring the pool is a major axis of longevity research.',
    highlights: [
      'Available in 500 mg and 1000 mg research vials',
      'Studied as both NAD+ direct and as NAD+ precursors (NMN, NR)',
      'Central cofactor for sirtuin and PARP signaling',
      'One of the most discussed compounds in longevity research',
    ],
    protocolNotes:
      'Injectable NAD+ research typically reconstitutes large quantities (500 mg+) in proportionally larger BAC-water volumes. Slower delivery is common in research protocols due to documented tolerance endpoints at rapid infusion rates.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'NAD+ research is frequently paired with mitochondrial-support compounds like MOTS-c and SS-31 in longevity designs.',
    faqs: [
      {
        q: 'Why inject NAD+ instead of taking NMN or NR orally?',
        a: 'Research compares parenteral delivery to oral-precursor routes — there is ongoing work on which approach raises tissue NAD+ more efficiently.',
      },
      {
        q: 'What are sirtuins?',
        a: 'A family of NAD+-dependent enzymes (SIRT1–7) central to longevity-axis research.',
      },
      {
        q: 'Why is NAD+ research interesting?',
        a: 'NAD+ levels decline substantially with age, and restoring the pool is a central hypothesis in cellular aging biology.',
      },
      {
        q: 'What is the difference between 500 mg and 1000 mg vials?',
        a: 'Total NAD+ mass — choose based on study duration and concentration requirements.',
      },
    ],
  },

  'mots-c': {
    overview:
      'MOTS-c is a 16-amino-acid mitochondrial-derived peptide encoded in the 12S rRNA region of the mitochondrial genome. It is one of the most interesting entries in the "mitokine" class — peptides produced by mitochondria that signal metabolic state to the rest of the cell.',
    mechanism:
      'MOTS-c modulates AMPK signaling and has been studied as a regulator of insulin sensitivity, glucose homeostasis, and exercise-response biology. Research describes it translocating to the nucleus under metabolic stress to regulate gene expression.',
    highlights: [
      'Mitochondrial-derived peptide (a "mitokine")',
      'Encoded within the 12S rRNA region of mtDNA',
      'Studied in insulin-sensitivity, exercise, and longevity models',
      'Available in 10, 20, and 40 mg research vials',
    ],
    protocolNotes:
      'Research protocols typically use multi-weekly injection schedules. Reconstitute in BAC water; 20 mg vial in 2 mL yields 10 mg/mL stock.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'MOTS-c is frequently paired with NAD+ and SS-31 in mitochondrial-biology research stacks.',
    faqs: [
      {
        q: 'What is a mitokine?',
        a: 'A signaling peptide produced by mitochondria — MOTS-c and humanin are the best-characterized members of this class.',
      },
      {
        q: 'How was MOTS-c discovered?',
        a: 'Through mining short ORFs in the mitochondrial genome — a 2015 paper from the Lee lab at USC put it on the research map.',
      },
      {
        q: 'What is its connection to exercise?',
        a: 'Research reports increased MOTS-c release during exercise and some evidence that exogenous administration mimics exercise-like metabolic endpoints.',
      },
      {
        q: 'Why multiple vial sizes?',
        a: 'Longer studies at higher concentrations use the 40 mg vial; shorter pilots use 10 mg.',
      },
    ],
  },

  'ss-31': {
    overview:
      'SS-31 (elamipretide) is a mitochondria-targeting tetrapeptide that concentrates in the inner mitochondrial membrane by binding cardiolipin. It is one of the most actively studied compounds in mitochondrial-medicine research.',
    mechanism:
      'SS-31 binds cardiolipin — a phospholipid exclusive to the inner mitochondrial membrane — stabilizing cristae architecture and protecting electron-transport-chain function under oxidative stress. Research spans cardiac, neurological, and renal ischemia-reperfusion models.',
    highlights: [
      'Cardiolipin-binding mitochondrial peptide',
      'Also known as elamipretide (Bendavia, MTP-131)',
      'Studied in cardiac, renal, and neurodegeneration models',
      'Available in 10, 25, and 50 mg research vials',
    ],
    protocolNotes:
      'Injectable research protocols dominate. Daily or alternate-day administration is typical in mitochondrial-dysfunction models.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Mitochondrial research stacks frequently combine SS-31 with MOTS-c and NAD+ for orthogonal mitochondrial-support coverage.',
    faqs: [
      {
        q: 'What is the difference between SS-31 and elamipretide?',
        a: 'Same compound, different names — SS-31 is the research designation, elamipretide is the pharmaceutical name.',
      },
      {
        q: 'What is cardiolipin?',
        a: 'A phospholipid unique to the inner mitochondrial membrane. SS-31 binds it selectively, which is why the peptide accumulates in mitochondria.',
      },
      {
        q: 'Which tissues have been studied most?',
        a: 'Cardiac ischemia-reperfusion models dominate the literature, followed by renal and neurological research.',
      },
      {
        q: 'Can SS-31 be stacked with other mitochondrial peptides?',
        a: 'Research designs commonly combine SS-31 with MOTS-c and NAD+ to cover distinct mitochondrial-support pathways.',
      },
    ],
  },

  'pt-141': {
    overview:
      'PT-141 (bremelanotide) is a synthetic melanocortin-receptor agonist developed from the α-MSH peptide lineage. It is one of the best-known entries in the melanocortin-pathway research literature, with a focus on central-nervous-system activation.',
    mechanism:
      'PT-141 acts primarily on MC4R (melanocortin-4 receptor) in the central nervous system. MC4R is a key node in both energy-balance and central-sexual-response circuits — the basis for the two main lines of PT-141 research.',
    highlights: [
      'MC4R-selective melanocortin agonist',
      'CNS-active — crosses the blood-brain barrier',
      'Studied in both sexual-response and appetite-regulation research',
      'Shorter half-life than melanotan analogs',
    ],
    protocolNotes:
      'Research protocols commonly reconstitute in BAC water and use subcutaneous administration. Pulsed protocols dominate over continuous dosing.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'PT-141 is typically studied alone rather than in stacks. Melanotan I/II are related compounds but have different receptor selectivity profiles.',
    faqs: [
      {
        q: 'Is PT-141 the same as Vyleesi?',
        a: 'Vyleesi is a pharmaceutical formulation of bremelanotide (PT-141). Research-grade material sold here is for laboratory use only.',
      },
      {
        q: 'How does it differ from Melanotan II?',
        a: 'Melanotan II is a broader-spectrum melanocortin agonist that also activates MC1R (pigmentation). PT-141 is more MC4R-selective and does not drive pigmentation to the same degree.',
      },
      {
        q: 'What is MC4R?',
        a: 'Melanocortin-4 receptor — a central-nervous-system target involved in appetite regulation and sexual-response circuits.',
      },
      {
        q: 'What is its half-life?',
        a: 'Short — hours rather than days. Research protocols reflect this with pulsed dosing.',
      },
    ],
  },

  'melanotan-1': {
    overview:
      'Melanotan I (afamelanotide) is a synthetic α-MSH analog engineered for stability, studied primarily in pigmentation and photoprotection research. It is more selective for MC1R than Melanotan II.',
    mechanism:
      'Melanotan I is a potent MC1R agonist. MC1R activation on melanocytes drives eumelanin synthesis — the basis for its use in research on erythropoietic protoporphyria and other photosensitivity models.',
    highlights: [
      'MC1R-selective α-MSH analog',
      'Also known as afamelanotide',
      'Studied in photoprotection and pigmentation research',
      'More selective profile than Melanotan II',
    ],
    protocolNotes:
      'Research protocols use subcutaneous administration with gradual titration schedules. Reconstitute in BAC water and aliquot.',
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone.',
    faqs: [
      {
        q: 'What is the difference between MT1 and MT2?',
        a: 'Melanotan I is more MC1R-selective. Melanotan II activates multiple melanocortin receptors, which is why it has broader research applications but also broader endpoint profiles.',
      },
      {
        q: 'What is afamelanotide?',
        a: 'The pharmaceutical name for Melanotan I — marketed as Scenesse for erythropoietic protoporphyria.',
      },
      {
        q: 'How is pigmentation studied?',
        a: 'Through melanocyte-activity assays and in-vivo models of UV-response and photoprotection.',
      },
      {
        q: 'Is a COA included?',
        a: 'Yes — each lot ships with independent testing.',
      },
    ],
  },

  'melanotan-2': {
    overview:
      'Melanotan II is a synthetic cyclic heptapeptide α-MSH analog with broad melanocortin-receptor activity (MC1R, MC3R, MC4R, MC5R). Its wide receptor profile is why it shows up across pigmentation, appetite, and sexual-response research.',
    mechanism:
      'By activating multiple melanocortin receptors, Melanotan II produces a broader endpoint profile than more selective analogs. MC1R activation drives pigmentation; MC4R activation engages central appetite and sexual-response circuits.',
    highlights: [
      'Broad-spectrum melanocortin agonist',
      'Cyclic heptapeptide structure for improved stability',
      'Studied in pigmentation, appetite, and CNS-response models',
      'Parent compound to the more selective PT-141',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone.',
    faqs: [
      {
        q: 'Why is Melanotan II broader than PT-141?',
        a: 'PT-141 is MC4R-selective. Melanotan II activates MC1R, MC3R, MC4R, and MC5R — which is why its research endpoints span pigmentation, appetite, and sexual response.',
      },
      {
        q: 'How does it differ from Melanotan I?',
        a: 'MT1 is more MC1R-focused. MT2 is broader-spectrum. Research selection depends on which receptor profile the study requires.',
      },
      {
        q: 'Is MT2 still studied?',
        a: 'Yes — it remains a benchmark in melanocortin-pathway research despite newer, more selective analogs.',
      },
      {
        q: 'What are common research concerns?',
        a: 'Broad receptor activation produces multiple endpoints simultaneously — researchers design protocols to isolate specific effects.',
      },
    ],
  },

  'selank': {
    overview:
      'Selank is a synthetic heptapeptide analog of tuftsin developed at the Institute of Molecular Genetics of the Russian Academy of Sciences. It is primarily studied in anxiolytic, immunomodulatory, and cognitive-enhancement research contexts.',
    mechanism:
      'Selank modulates GABAergic and serotonergic neurotransmission and has documented effects on cytokine expression and BDNF levels in rodent research. It is often studied for its combination of anxiolytic and nootropic-like properties.',
    highlights: [
      'Synthetic analog of the natural immunomodulator tuftsin',
      'Studied in anxiolytic, nootropic, and immune-research contexts',
      'Available as injectable Selank and stabilized NA-Selank (N-acetylated)',
      'Developed in the Russian neuropharmacology tradition',
    ],
    protocolNotes:
      'Both intranasal and injectable research routes appear in the literature. NA-Selank (N-acetylated) offers improved stability for extended protocols.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Selank and Semax are frequently compared and occasionally stacked in cognitive-research designs.',
    faqs: [
      {
        q: 'What is the difference between Selank and NA-Selank?',
        a: 'NA-Selank is N-acetylated, giving it improved metabolic stability compared to plain Selank — useful in longer research protocols.',
      },
      {
        q: 'How does Selank differ from Semax?',
        a: 'Both are Russian-developed short peptides. Selank is more anxiolytic-focused; Semax is more cognitive/neurotrophic-focused. They share some overlapping effects in research.',
      },
      {
        q: 'What is tuftsin?',
        a: 'A naturally occurring tetrapeptide with immunomodulatory activity — Selank is a synthetic analog engineered for improved stability.',
      },
      {
        q: 'Intranasal or injectable?',
        a: 'Both routes appear in the literature. Intranasal is often used in cognitive-research protocols; injectable in immune-research work.',
      },
    ],
  },

  'semax': {
    overview:
      'Semax is a synthetic heptapeptide derived from ACTH(4-10), developed in Russia as a nootropic and neuroprotective research compound. It has a substantial literature base in cognitive, stroke-recovery, and BDNF-modulation research.',
    mechanism:
      'Semax upregulates BDNF and NGF expression in rodent brain research, and modulates dopaminergic and serotonergic signaling. It has been studied across learning, memory, and post-ischemic-recovery models.',
    highlights: [
      'Derived from ACTH(4-10) — the non-corticotropic fragment',
      'Strong BDNF/NGF upregulation in research models',
      'N-Acetyl Semax Amidate version offers extended stability',
      'One of the most extensively studied Russian research nootropics',
    ],
    protocolNotes:
      'Intranasal delivery is standard in Russian research protocols. Injectable routes also appear. N-Acetyl Semax Amidate is preferred for longer research windows.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Often compared to or paired with Selank in cognitive-research designs.',
    faqs: [
      {
        q: 'What is N-Acetyl Semax Amidate?',
        a: 'A stabilized form of Semax with both N-terminal acetylation and C-terminal amidation — improved half-life for longer protocols.',
      },
      {
        q: 'How does Semax compare to Selank?',
        a: 'Semax is more cognitive/neurotrophic; Selank is more anxiolytic. Related research lineages but different research applications.',
      },
      {
        q: 'What is BDNF?',
        a: 'Brain-Derived Neurotrophic Factor — a key growth factor in neuronal survival and synaptic plasticity. Semax is one of the more potent research peptides for BDNF upregulation.',
      },
      {
        q: 'Injectable or intranasal?',
        a: 'Intranasal is standard in the Russian research tradition; injectable protocols also appear.',
      },
    ],
  },

  'dsip': {
    overview:
      'DSIP (Delta Sleep-Inducing Peptide) is a nine-amino-acid peptide first isolated from cerebral venous blood of sleeping rabbits in the 1970s. It is primarily studied in sleep-architecture, stress-response, and neuroendocrine-modulation research.',
    mechanism:
      'DSIP has been reported to modulate delta-wave EEG activity, stress-axis signaling, and certain neuroendocrine parameters. Its exact receptor target remains an open question in the research literature — a rare case of a well-studied peptide without a definitively identified receptor.',
    highlights: [
      'Nine-amino-acid peptide first isolated in 1977',
      'Studied in sleep, stress, and neuroendocrine research',
      'Available in 5, 10, and 15 mg research vials',
      'Receptor target remains an active research question',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone in sleep-research designs.',
    faqs: [
      {
        q: 'Does DSIP have a known receptor?',
        a: 'Despite decades of study, a specific DSIP receptor has not been definitively identified — an unusual situation for such a well-characterized peptide.',
      },
      {
        q: 'What EEG endpoints have been studied?',
        a: 'Delta-wave activity modulation — the namesake of the peptide.',
      },
      {
        q: 'Why multiple vial sizes?',
        a: 'Protocol concentration and duration vary — 5 mg for short pilots, 15 mg for longer research windows.',
      },
      {
        q: 'Is it widely used in current research?',
        a: 'Less than in the 1980s–90s peak, but still a documented entry in sleep-peptide research.',
      },
    ],
  },

  'kpv': {
    overview:
      'KPV is the C-terminal tripeptide (Lys-Pro-Val) of α-MSH, isolated and studied for its anti-inflammatory activity independent of MC1R-driven pigmentation effects. It features prominently in gut-inflammation and wound-repair research.',
    mechanism:
      'KPV exerts anti-inflammatory effects through mechanisms that include suppression of NF-κB signaling. Unlike the full α-MSH peptide, KPV does not drive pigmentation — making it a "pure" anti-inflammatory research tool in melanocortin-adjacent work.',
    highlights: [
      'C-terminal tripeptide of α-MSH',
      'Anti-inflammatory without pigmentation effects',
      'Studied in IBD, colitis, and skin-inflammation models',
      'Small size confers good stability and bioavailability',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'KPV is sometimes combined with BPC-157 in gut-repair research designs.',
    faqs: [
      {
        q: 'How does KPV relate to melanotan compounds?',
        a: 'KPV is the last three residues of α-MSH. Melanotan compounds are engineered analogs of α-MSH. KPV isolates the anti-inflammatory tail without the pigmentation-driving MC1R activity.',
      },
      {
        q: 'What models has KPV been studied in?',
        a: 'Colitis, IBD, dermatitis, and other inflammation-driven research models.',
      },
      {
        q: 'Can it be used orally in research?',
        a: 'Its small size confers reasonable oral bioavailability in research, though injectable routes are also used.',
      },
      {
        q: 'Why not just use α-MSH?',
        a: 'α-MSH drives pigmentation via MC1R — a confounding variable in inflammation research. KPV isolates the anti-inflammatory activity.',
      },
    ],
  },

  'll-37': {
    overview:
      'LL-37 (cathelicidin-derived) is a 37-amino-acid human antimicrobial peptide and a central member of the innate-immunity peptide family. It is studied across antimicrobial, immunomodulatory, and wound-repair research contexts.',
    mechanism:
      'LL-37 has direct antimicrobial activity against a broad spectrum of bacteria, fungi, and viruses. It also modulates host immune signaling — chemotaxis, cytokine release, and epithelial repair are all within its documented activity profile.',
    highlights: [
      'Only human cathelicidin-derived antimicrobial peptide',
      'Broad-spectrum antimicrobial activity in vitro',
      'Simultaneously immunomodulatory',
      'Central entry in innate-immunity peptide research',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone in antimicrobial research.',
    faqs: [
      {
        q: 'What is cathelicidin?',
        a: 'A family of antimicrobial peptide precursors. LL-37 is the only mature peptide derived from the human cathelicidin gene (CAMP).',
      },
      {
        q: 'What organisms has it been studied against?',
        a: 'Gram-positive and Gram-negative bacteria, mycobacteria, fungi, and some viruses. It is one of the most broadly active human AMPs.',
      },
      {
        q: 'Is LL-37 studied beyond antimicrobial research?',
        a: 'Yes — wound repair, inflammation modulation, and cancer-adjacent research all appear in the literature.',
      },
      {
        q: 'Why is it called LL-37?',
        a: 'The peptide starts with two leucines (LL) and is 37 residues long.',
      },
    ],
  },

  'pinealon': {
    overview:
      'Pinealon is a short peptide (Glu-Asp-Arg) in the Khavinson bioregulator class, studied primarily for effects on neurological function and aging. It belongs to the broader Russian peptide-bioregulator research tradition.',
    mechanism:
      'The Khavinson peptides are hypothesized to exert tissue-specific effects by binding short DNA motifs and modulating gene expression in tissues matching their peptide origin. Pinealon research focuses on pineal- and brain-tissue-relevant endpoints.',
    highlights: [
      'Tripeptide in the Khavinson bioregulator class',
      'Studied in neurological and aging research',
      'Short pulsed courses are the standard research protocol',
      'Decades of Russian literature behind the compound',
    ],
    protocolNotes:
      'Short pulsed research courses (10–20 days) are standard, consistent with other Khavinson peptides.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Often studied alongside Epitalon and other Khavinson-class peptides.',
    faqs: [
      {
        q: 'What is a Khavinson peptide?',
        a: 'A class of short peptides (usually 2–4 residues) developed by Prof. Vladimir Khavinson for tissue-specific bioregulatory research. Pinealon, Epitalon, and many of the "-gen" series peptides belong to this family.',
      },
      {
        q: 'What is the "short DNA motif" hypothesis?',
        a: 'A mechanistic proposal that short peptides can enter cells and bind specific DNA sequences, modulating gene expression in a tissue-specific way.',
      },
      {
        q: 'Why short pulsed courses?',
        a: 'The research tradition uses 10–20 day cycles rather than continuous dosing, consistent with the bioregulator framework.',
      },
      {
        q: 'What is the difference between 10 mg and 20 mg vials?',
        a: 'Total mass per vial. Choose based on study duration and concentration requirements.',
      },
    ],
  },

  'thymosin-alpha-1': {
    overview:
      'Thymosin Alpha-1 (Tα1) is a 28-amino-acid peptide derived from the thymus gland, central to mature-T-cell development and immune-system regulation. It is one of the most extensively studied immunomodulatory peptides, with a literature spanning viral, oncology, and immune-deficiency research.',
    mechanism:
      'Tα1 modulates T-cell maturation, NK-cell activity, and dendritic-cell function. It has been studied as an immune-system "primer" in models where immune function is compromised or where immune activation is a desired endpoint.',
    highlights: [
      '28-amino-acid thymus-derived peptide',
      'Decades of literature in immune-modulation research',
      'Studied across viral, oncology, and vaccine-adjuvant contexts',
      'Known pharmaceutically as thymalfasin (Zadaxin)',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone in immune-research designs.',
    faqs: [
      {
        q: 'Is Tα1 the same as thymalfasin?',
        a: 'Yes — thymalfasin is the pharmaceutical name for Thymosin Alpha-1. Sold pharmaceutically as Zadaxin in some markets.',
      },
      {
        q: 'How does it relate to Thymosin Beta-4?',
        a: 'Both are thymus-derived but work on different systems — Tα1 is immunomodulatory, Tβ4 (the parent of TB-500) is a cytoskeletal regulator active in repair.',
      },
      {
        q: 'What research contexts are most common?',
        a: 'Viral infection models, oncology immune-modulation, and vaccine-adjuvant research.',
      },
      {
        q: 'Is a COA included?',
        a: 'Yes — per-lot independent testing is standard.',
      },
    ],
  },

  '5-amino-1mq': {
    overview:
      '5-Amino-1MQ is a small-molecule inhibitor of NNMT (nicotinamide N-methyltransferase), an enzyme central to NAD+ salvage and methyl-donor balance. It is actively studied in obesity, metabolic, and sarcopenia research.',
    mechanism:
      'NNMT consumes both nicotinamide (an NAD+ precursor) and SAM (the universal methyl donor). Inhibiting NNMT raises nicotinamide availability for NAD+ synthesis and preserves SAM pools — a mechanism proposed to support both metabolic and muscle-biology endpoints.',
    highlights: [
      'NNMT inhibitor — small molecule, not a peptide',
      'Raises NAD+ precursor availability via NNMT blockade',
      'Studied in adipocyte, muscle, and metabolic research',
      'Available in oral capsule and injectable research formats',
    ],
    protocolNotes:
      'Both oral and injectable research routes appear in the literature. Oral capsule formats are convenient for multi-week protocols.',
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Comparative protocols sometimes combine 5-Amino-1MQ with direct NAD+ supplementation to study combined NNMT-blockade and NAD+-repletion effects.',
    faqs: [
      {
        q: 'Is 5-Amino-1MQ a peptide?',
        a: 'No — it is a small-molecule NNMT inhibitor (a quinoline derivative), not a peptide. It appears in peptide-research catalogs because it targets NAD+-adjacent biology.',
      },
      {
        q: 'What is NNMT?',
        a: 'Nicotinamide N-methyltransferase — an enzyme that consumes nicotinamide and SAM to produce N-methylnicotinamide. Elevated NNMT activity is linked to obesity in research models.',
      },
      {
        q: 'Oral or injectable?',
        a: 'Both formats are used. Oral capsules suit longer research windows; injectable is used when fast PK is desired.',
      },
      {
        q: 'How does it interact with NAD+ supplementation?',
        a: 'NNMT blockade increases the nicotinamide pool available for NAD+ synthesis — a complementary mechanism to direct NAD+/NMN supplementation.',
      },
    ],
  },

  'cagrilintide': {
    overview:
      'Cagrilintide is a long-acting amylin analog studied alongside GLP-1 agonists in combination metabolic research. The Cagri-Sema and Cagri-Reta blends are the canonical dual-hormone research combinations.',
    mechanism:
      'Cagrilintide activates both the amylin and calcitonin receptors — pathways involved in satiety signaling and gastric emptying, distinct from GLP-1 mechanisms. Combination with GLP-1 agonists is proposed to produce additive metabolic endpoints.',
    highlights: [
      'Long-acting amylin analog',
      'Weekly dosing in research protocols',
      'Central to Cagri-Sema and Cagri-Reta combination research',
      'Complementary mechanism to GLP-1 agonism',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Canonical stacks: cagrilintide + semaglutide (Cagri-Sema) or cagrilintide + retatrutide (Cagri-Reta). Pre-blended versions are available.',
    faqs: [
      {
        q: 'What is amylin?',
        a: 'A peptide hormone co-secreted with insulin from pancreatic beta cells, involved in satiety and gastric-emptying regulation.',
      },
      {
        q: 'Why combine with semaglutide?',
        a: 'Different receptor pathways. Research proposes additive effects when amylin and GLP-1 pathways are activated together.',
      },
      {
        q: 'What is Cagri-Sema?',
        a: 'A pre-blended cagrilintide + semaglutide combination. Reduces reconstitution steps for comparative studies.',
      },
      {
        q: 'Weekly dosing?',
        a: 'Yes — the engineered half-life supports once-weekly research protocols.',
      },
    ],
  },

  'aod9604': {
    overview:
      'AOD9604 is a synthetic fragment of the human growth hormone (residues 176–191), engineered to retain the lipolytic activity of GH without its growth-promoting effects. It is studied primarily in fat-metabolism research.',
    mechanism:
      'AOD9604 is proposed to mimic the lipolytic tail region of GH, stimulating lipolysis and inhibiting lipogenesis in adipocytes without activating the full GH-receptor signaling cascade. This separation of effects is the engineering rationale.',
    highlights: [
      'Modified fragment of hGH 176–191',
      'Engineered to isolate lipolytic from growth-promoting effects',
      'Studied in adipocyte and body-composition research',
      'Multiple research vial sizes (2, 5, 10 mg)',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Sometimes studied alongside other metabolic-research compounds.',
    faqs: [
      {
        q: 'Is AOD9604 the same as growth hormone?',
        a: 'No — it is a small modified fragment corresponding to residues 176–191 of hGH. The fragment isolates lipolytic activity from the full GH signaling profile.',
      },
      {
        q: 'What does "AOD" stand for?',
        a: 'Anti-Obesity Drug — the original research designation when the compound was developed by Metabolic Pharmaceuticals.',
      },
      {
        q: 'Why multiple vial sizes?',
        a: 'Research concentration and duration vary. 2 mg for short pilots, 10 mg for longer protocols.',
      },
      {
        q: 'How does it compare to tirzepatide/semaglutide?',
        a: 'Different mechanism entirely — AOD9604 acts on adipocyte lipolysis; GLP-1-class compounds act on appetite and insulin signaling.',
      },
    ],
  },

  'tesamorelin': {
    overview:
      'Tesamorelin is a stabilized GHRH (1-44) analog studied for its effects on the growth-hormone axis and visceral-adiposity endpoints. It is one of the most clinically documented GHRH analogs in the research literature.',
    mechanism:
      'Tesamorelin binds the GHRH receptor in the anterior pituitary, stimulating endogenous growth-hormone release. The compound is engineered for improved stability over native GHRH, supporting daily-dose research protocols.',
    highlights: [
      'Stabilized GHRH (1-44) analog',
      'Known pharmaceutically as Egrifta',
      'Studied in visceral-fat and GH-axis research',
      'Daily-dose research profile',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Tesamorelin + ipamorelin is a dual-pathway GH stack (GHRH analog + ghrelin agonist). Pre-blended IPA/TESA research blends are available.',
    faqs: [
      {
        q: 'Is tesamorelin the same as Egrifta?',
        a: 'Egrifta is the pharmaceutical formulation of tesamorelin. Research material sold here is for laboratory use only.',
      },
      {
        q: 'How does it differ from CJC-1295?',
        a: 'Both are GHRH analogs. Tesamorelin is closer to native GHRH structurally; CJC-1295 "with DAC" uses an albumin-binding modification for extended half-life.',
      },
      {
        q: 'Why stack with ipamorelin?',
        a: 'GHRH analog + ghrelin agonist research stacks target two receptors for amplified GH release.',
      },
      {
        q: 'Daily or weekly dosing?',
        a: 'Daily dosing is standard in the tesamorelin research literature.',
      },
    ],
  },

  'glutathione': {
    overview:
      'Glutathione is the major intracellular antioxidant tripeptide (γ-Glu-Cys-Gly). Injectable glutathione research centers on whether parenteral delivery raises tissue glutathione pools more efficiently than oral precursor approaches.',
    mechanism:
      'Glutathione buffers oxidative stress through the GSH/GSSG redox cycle and participates in phase-II detoxification via glutathione-S-transferases. Oral glutathione is largely hydrolyzed; parenteral delivery bypasses this route.',
    highlights: [
      'Master intracellular antioxidant (tripeptide)',
      'Available in 200, 600, and 1500 mg research vials',
      'Studied in redox-biology, hepatology, and skin research',
      'Parenteral delivery avoids gut hydrolysis',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone.',
    faqs: [
      {
        q: 'Why inject glutathione instead of taking it orally?',
        a: 'Oral glutathione is largely hydrolyzed before absorption. Parenteral routes bypass this and are the focus of research on tissue-level GSH elevation.',
      },
      {
        q: 'What are the three amino acids?',
        a: 'γ-glutamate, cysteine, and glycine. The γ-linkage (instead of α) makes glutathione resistant to most peptidases.',
      },
      {
        q: 'What is GSH/GSSG?',
        a: 'GSH is reduced glutathione. GSSG is oxidized glutathione (glutathione disulfide). The ratio is a standard redox-state readout.',
      },
      {
        q: 'Why 200, 600, and 1500 mg?',
        a: 'Research protocols vary in dose and duration. Larger vials are more cost-efficient per mg for longer studies.',
      },
    ],
  },

  'methylene-blue': {
    overview:
      'Methylene blue is a phenothiazine-derived compound with a long history in both biomedical research and as a redox indicator. It is studied in mitochondrial, neurological, and antimicrobial-adjacent research contexts.',
    mechanism:
      'At low concentrations, methylene blue acts as an alternative electron carrier in the mitochondrial electron-transport chain, bypassing certain complex dysfunctions. At higher concentrations, its redox cycling can generate oxidative stress — the biphasic profile is central to dose-design in research.',
    highlights: [
      'Phenothiazine-derived small molecule',
      'Biphasic redox profile (low-dose vs high-dose research)',
      'Studied in mitochondrial and neurological models',
      '50 mL bottle at 10 mg/mL research concentration',
    ],
    protocolNotes:
      'Research protocols emphasize dose-dependent effects. Low concentrations are used in mitochondrial-support studies; higher concentrations appear in antimicrobial and redox-stress research.',
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Typically studied alone.',
    faqs: [
      {
        q: 'Is methylene blue a peptide?',
        a: 'No — it is a small-molecule phenothiazine derivative. It appears in peptide-research catalogs because of its mitochondrial-research applications.',
      },
      {
        q: 'What is the biphasic dose profile?',
        a: 'Low concentrations support electron transport; high concentrations drive redox cycling and oxidative stress. Dose selection is critical in research design.',
      },
      {
        q: 'What mitochondrial research uses methylene blue?',
        a: 'Complex I/IV dysfunction models, neurodegeneration research, and ischemic-stress protocols.',
      },
      {
        q: 'Why research-grade matters?',
        a: 'Pharmaceutical-grade methylene blue is engineered for purity and low zinc/chromium contamination — research-grade versions are tested to similar standards.',
      },
    ],
  },

  'hexarelin': {
    overview:
      'Hexarelin is a potent hexapeptide GHRP (growth-hormone-releasing peptide) studied for its strong GH-release profile and cardiovascular-research applications. It is one of the more potent members of the GHRP family on a per-mg basis.',
    mechanism:
      'Hexarelin is a ghrelin-receptor agonist driving pulsatile GH release. Additionally, research describes direct cardiomyocyte effects — binding sites in cardiac tissue independent of the GH-release pathway.',
    highlights: [
      'Potent GHRP hexapeptide',
      'Direct cardiac tissue binding reported in research',
      'Short half-life supporting pulsed protocols',
      'Used in GH-research and cardiovascular-model studies',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Sometimes combined with GHRH analogs (CJC-1295, Tesamorelin) in dual-pathway GH research.',
    faqs: [
      {
        q: 'How does hexarelin differ from GHRP-2 and GHRP-6?',
        a: 'More potent per-mg, with reportedly direct cardiac effects that GHRP-2 and -6 do not share to the same degree.',
      },
      {
        q: 'What about cortisol/prolactin impact?',
        a: 'Less selective than ipamorelin — hexarelin research reports meaningful cortisol and prolactin elevation at higher research doses.',
      },
      {
        q: 'Is it still used in current research?',
        a: 'Yes — particularly in cardiovascular-model research leveraging its direct cardiac-tissue activity.',
      },
      {
        q: 'What is the typical half-life?',
        a: 'Short — under an hour in research models.',
      },
    ],
  },

  'bac-water': {
    overview:
      'Bacteriostatic water is sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative. It is the standard reconstitution solvent for lyophilized research peptides — the preservative allows multi-dose use from a single vial over a research window.',
    mechanism:
      'Benzyl alcohol at 0.9% inhibits bacterial proliferation in the reconstituted solution, enabling multi-draw protocols without compromising sterility. Without a bacteriostatic agent, reconstituted peptide solutions must be used or discarded immediately.',
    highlights: [
      'Standard reconstitution solvent for lyophilized peptides',
      '0.9% benzyl alcohol preservative',
      'Enables multi-draw research protocols',
      'Sterile-filtered, USP-grade options available',
    ],
    protocolNotes:
      'Use sterile technique when drawing from the vial. Most research protocols use 1–3 mL of BAC water per peptide vial to achieve the target working concentration.',
    storage:
      'Store at 20–25 °C. Protect from light. Expires 28 days after first puncture per standard bacteriostatic-water handling.',
    stackingNotes: 'N/A — this is the reconstitution solvent, not a research compound.',
    faqs: [
      {
        q: 'What is the difference between BAC water and sterile water?',
        a: 'BAC water contains 0.9% benzyl alcohol as a bacteriostatic agent. Sterile water contains only sterile water — no preservative, meaning reconstituted solutions must be used immediately.',
      },
      {
        q: 'Why 28-day expiry?',
        a: 'The bacteriostatic action of 0.9% benzyl alcohol is reliable for approximately 28 days from first puncture. Beyond that, sterility can no longer be assumed.',
      },
      {
        q: 'What is USP-grade BAC water?',
        a: 'Meeting United States Pharmacopeia standards for purity, sterility, and preservative concentration.',
      },
      {
        q: 'Can I use it for any peptide?',
        a: 'Standard practice in research, with rare exceptions — a small number of peptides interact with benzyl alcohol and require sterile water instead.',
      },
    ],
  },

  'sermorelin': {
    overview:
      'Sermorelin is a truncated GHRH (1-29) analog, one of the shortest GHRH fragments that retains full biological activity. It is studied as a "natural" GH-axis research tool — driving endogenous GH release via the GHRH receptor.',
    mechanism:
      'Sermorelin binds the GHRH receptor in the anterior pituitary, stimulating endogenous growth-hormone release. Its short sequence (29 residues) is the minimal GHRH fragment that preserves receptor activity.',
    highlights: [
      'GHRH (1-29) — the minimal active GHRH fragment',
      'Stimulates endogenous GH release',
      'Shorter half-life than tesamorelin or CJC-1295',
      'Long history in GH-axis research',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Sometimes combined with ghrelin agonists (ipamorelin) for dual-pathway GH research.',
    faqs: [
      {
        q: 'How does sermorelin compare to tesamorelin?',
        a: 'Tesamorelin is a stabilized GHRH (1-44) analog with better half-life. Sermorelin is the shorter GHRH (1-29) fragment — simpler structure but less protease-resistant.',
      },
      {
        q: 'How does it compare to CJC-1295?',
        a: 'CJC-1295 is GHRH (1-29) with additional stabilizing modifications (plus DAC in the longer-acting version). Sermorelin is the unmodified baseline.',
      },
      {
        q: 'Why short half-life?',
        a: 'Sermorelin lacks the protease-resistance modifications present in tesamorelin and CJC-1295. Half-life is measured in minutes rather than hours.',
      },
      {
        q: 'Is it still used in research?',
        a: 'Yes — its short action profile is desirable in some research designs precisely because it mimics native GHRH pulsatility.',
      },
    ],
  },

  'ghrp-2': {
    overview:
      'GHRP-2 is a hexapeptide ghrelin-receptor agonist, one of the earliest GHRPs developed. It is a benchmark compound in growth-hormone-secretagogue research — studied alongside newer analogs like ipamorelin and hexarelin.',
    mechanism:
      'GHRP-2 binds the GHS-R1a (ghrelin) receptor in the anterior pituitary and hypothalamus, driving GH release and appetite signaling. Its HPA-axis engagement (cortisol/prolactin) is greater than newer selective analogs.',
    highlights: [
      'Early-generation hexapeptide GHRP',
      'Strong GH-release profile in research',
      'Appetite-stimulating effects via ghrelin receptor',
      'Benchmark comparison compound for newer secretagogues',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes:
      'Often combined with GHRH analogs (CJC-1295, Tesamorelin) in dual-pathway GH research.',
    faqs: [
      {
        q: 'How does GHRP-2 differ from ipamorelin?',
        a: 'GHRP-2 has stronger HPA-axis effects (cortisol, prolactin). Ipamorelin is more selective for GH release. Both act on the same ghrelin receptor.',
      },
      {
        q: 'How does it differ from GHRP-6?',
        a: 'GHRP-6 produces substantially more appetite stimulation and prolactin elevation. GHRP-2 is "cleaner" but less selective than ipamorelin.',
      },
      {
        q: 'What is its half-life?',
        a: 'Short — under 30 minutes in research models.',
      },
      {
        q: 'Is it combined with GHRH analogs?',
        a: 'Yes — dual-pathway GH research stacks GHRH + GHRP for amplified release.',
      },
    ],
  },

  'ghrp-6': {
    overview:
      'GHRP-6 is an early hexapeptide ghrelin-receptor agonist notable for its strong appetite-stimulatory profile in addition to GH release. It is a benchmark compound in both GH-secretagogue and ghrelin-pathway research.',
    mechanism:
      'GHRP-6 is a potent ghrelin-receptor agonist driving both GH release and appetite signaling. Its appetite-stimulation endpoints are substantially stronger than other GHRPs — a feature used in some research contexts and avoided in others.',
    highlights: [
      'Early hexapeptide GHRP',
      'Strong appetite-stimulation profile',
      'Well-documented benchmark compound',
      'Short half-life supports pulsed protocols',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Sometimes combined with GHRH analogs.',
    faqs: [
      {
        q: 'Why is GHRP-6 known for appetite effects?',
        a: 'Ghrelin is the primary appetite-stimulating hormone. GHRP-6 is a particularly strong ghrelin-receptor agonist, which is why appetite stimulation is prominent.',
      },
      {
        q: 'When would researchers choose GHRP-6 over ipamorelin?',
        a: 'Research contexts where appetite stimulation is an endpoint of interest, or comparative studies against the "cleaner" selective secretagogues.',
      },
      {
        q: 'What is the typical half-life?',
        a: 'Short — under an hour in research models.',
      },
      {
        q: 'Is it still widely used?',
        a: 'Less than in its 1990s–2000s peak, but still a benchmark in ghrelin-pathway literature.',
      },
    ],
  },

}

// Map product slug → compound family key.
// Order matters: longer prefixes first so bpc-157-tb-500-blend-* matches
// the "blend" family rather than "bpc-157".
export function familyForSlug(slug: string): string | null {
  const MAP: [RegExp, string][] = [
    [/^bpc-157-tb-500-blend/, 'blend-bpc-tb'],
    [/^ipamorelin-cjc-1295-blend/, 'blend-ipa-cjc'],
    [/^ipamorelin-tesamorelin-blend/, 'blend-ipa-tesa'],
    [/^ipa-tesa-blend/, 'blend-ipa-tesa'],
    [/^cagri-reta/, 'blend-cagri-reta'],
    [/^cagri-sema-blend/, 'blend-cagri-sema'],
    [/^reta-cagri/, 'blend-cagri-reta'],
    [/^glow-blend/, 'blend-glow'],
    [/^klow-blend/, 'blend-klow'],
    [/^bpc-157/, 'bpc-157'],
    [/^tb-500/, 'tb-500'],
    [/^semaglutide/, 'semaglutide'],
    [/^tirzepatide/, 'tirzepatide'],
    [/^retatrutide/, 'retatrutide'],
    [/^ipamorelin/, 'ipamorelin'],
    [/^cjc-1295/, 'cjc-1295'],
    [/^ghk-cu/, 'ghk-cu'],
    [/^epitalon|^na-epitalon/, 'epitalon'],
    [/^nad/, 'nad'],
    [/^mots-c/, 'mots-c'],
    [/^ss-31/, 'ss-31'],
    [/^pt-141/, 'pt-141'],
    [/^melanotan-1/, 'melanotan-1'],
    [/^melanotan-2/, 'melanotan-2'],
    [/^selank|^na-selank/, 'selank'],
    [/^n-acetyl-semax/, 'semax'],
    [/^dsip/, 'dsip'],
    [/^kpv/, 'kpv'],
    [/^ll-37/, 'll-37'],
    [/^pinealon/, 'pinealon'],
    [/^thymosin-alpha-1/, 'thymosin-alpha-1'],
    [/^5-amino-1mq/, '5-amino-1mq'],
    [/^cagrilintide/, 'cagrilintide'],
    [/^aod9604/, 'aod9604'],
    [/^tesamorelin/, 'tesamorelin'],
    [/^glutathione/, 'glutathione'],
    [/^methylene-blue/, 'methylene-blue'],
    [/^hexarelin/, 'hexarelin'],
    [/^bacteriostatic-water|^usp-bacteriostatic/, 'bac-water'],
    [/^sermorelin/, 'sermorelin'],
    [/^ghrp-2/, 'ghrp-2'],
    [/^ghrp-6/, 'ghrp-6'],
  ]
  for (const [re, key] of MAP) {
    if (re.test(slug)) return key
  }
  return null
}

// Blend entries (lightweight — rely on stacking logic for full description)
const BLEND_CONTENT: Record<string, CompoundContent> = {
  'blend-bpc-tb': {
    overview:
      'Pre-blended BPC-157 + TB-500 research stack — the canonical soft-tissue repair combination co-lyophilized in a single vial. Reduces reconstitution steps in multi-peptide research designs.',
    mechanism:
      'BPC-157 drives angiogenic signaling via the VEGFR2 pathway; TB-500 promotes cellular migration via actin sequestration. The two peptides target complementary arms of the tissue-repair response, which is why the blend is a research standard.',
    highlights: [
      'Co-lyophilized BPC-157 + TB-500',
      'Single-reconstitution convenience for combined research',
      'Each component COA-verified per lot',
      'Available in 10 mg and 20 mg total-mass formats',
    ],
    protocolNotes:
      'Reconstitute the full vial at once per standard peptide technique. Aliquot if the research design calls for extended protocols.',
    storage: DEFAULT_STORAGE,
    stackingNotes: 'This is the stack — no further combination typically.',
    faqs: [
      {
        q: 'Why choose the blend over separate vials?',
        a: 'One reconstitution step, one injection volume, cleaner research logistics. The per-component mass is fixed at the blend ratio — you cannot adjust the ratio independently with a pre-blend.',
      },
      {
        q: 'What is the component ratio?',
        a: 'The 20 mg format is 10 mg BPC-157 + 10 mg TB-500. The 10 mg format is 5 mg + 5 mg. Ratios are 1:1 in both formats.',
      },
      {
        q: 'Can both components be assayed?',
        a: 'Yes — per-lot COAs include identity and purity data for each component.',
      },
      {
        q: 'How is it reconstituted?',
        a: 'Single-vial reconstitution with BAC water — no different from reconstituting a single peptide.',
      },
    ],
  },
  'blend-ipa-cjc': {
    overview:
      'Pre-blended Ipamorelin + CJC-1295 research stack — the canonical dual-pathway GH-axis combination. GHRH analog + ghrelin receptor agonist co-lyophilized in a single vial.',
    mechanism:
      'CJC-1295 drives GH release through the GHRH receptor; ipamorelin amplifies release through the separate ghrelin (GHS-R1a) receptor. Activating both pathways is reported to produce greater GH pulses than either compound alone.',
    highlights: [
      'Dual-pathway GH research stack',
      'Co-lyophilized 5 mg + 5 mg',
      'Each component COA-verified',
      'Single-reconstitution convenience',
    ],
    protocolNotes:
      'Protocols using the CJC-1295 No DAC version typically align multiple daily pulses to mimic physiological GH release.',
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Pre-stacked — typically studied as-is.',
    faqs: [
      {
        q: 'Is this the "No DAC" version?',
        a: 'Yes — pre-blended CJC-1295 stacks use the No DAC variant to match ipamorelin pulsing. The long-acting DAC version is not typically co-blended.',
      },
      {
        q: 'Why combine the two?',
        a: 'Different receptors — GHRH and ghrelin — drive GH release through orthogonal pathways. Combined activation produces research-reported synergistic release.',
      },
      {
        q: 'How often is it dosed in research?',
        a: 'Multi-daily pulsing is standard to mimic natural GH release rhythms.',
      },
      {
        q: 'What does the v2 version differ from?',
        a: 'The v2 uses the same compounds in slightly different lyophilization or ratio — see the product page specs for exact composition.',
      },
    ],
  },
  'blend-ipa-tesa': {
    overview:
      'Pre-blended Ipamorelin + Tesamorelin research stack. Combines a ghrelin-receptor agonist (ipamorelin) with a stabilized GHRH analog (tesamorelin) for dual-pathway GH-axis research.',
    mechanism:
      'Tesamorelin activates the GHRH receptor; ipamorelin activates the ghrelin receptor. Combined activation produces research-reported amplified GH release compared to either compound alone.',
    highlights: [
      'Dual-pathway GH stack',
      'Stabilized GHRH analog + selective ghrelin agonist',
      'Co-lyophilized for single-reconstitution convenience',
      'Multiple ratio options across product variants',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Pre-stacked — typically studied as-is.',
    faqs: [
      {
        q: 'How does this differ from an Ipamorelin + CJC-1295 blend?',
        a: 'Tesamorelin is a more native-GHRH-like compound; CJC-1295 is an engineered longer-acting analog. The tesamorelin blend is closer to a "natural" GH-pulse research design.',
      },
      {
        q: 'What ratios are available?',
        a: 'Two formats: IPA 3mg + TESA 10mg, and IPA 5mg + TESA 10mg. Choose based on the target ratio for your research.',
      },
      {
        q: 'Is a COA provided per component?',
        a: 'Yes — identity and purity are verified independently for each component.',
      },
      {
        q: 'What is IPA/TESA?',
        a: 'Shorthand for ipamorelin (IPA) + tesamorelin (TESA).',
      },
    ],
  },
  'blend-cagri-sema': {
    overview:
      'Pre-blended Cagrilintide + Semaglutide research stack — amylin analog combined with GLP-1 agonist for dual-hormone metabolic research.',
    mechanism:
      'Cagrilintide activates amylin/calcitonin receptors; semaglutide activates GLP-1. Combination targets two distinct satiety pathways and is a central research design in next-generation incretin biology.',
    highlights: [
      'Dual amylin + GLP-1 research stack',
      'Co-lyophilized cagrilintide + semaglutide',
      'Research-grade material, per-component COA',
      'Weekly-dosing research profile',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Pre-stacked research design.',
    faqs: [
      {
        q: 'What ratio is the blend?',
        a: '5 mg cagrilintide + 10 mg semaglutide in the standard format.',
      },
      {
        q: 'Why combine the two?',
        a: 'Amylin and GLP-1 target different satiety pathways. Combined activation is proposed to produce additive or synergistic metabolic endpoints.',
      },
      {
        q: 'How is it reconstituted?',
        a: 'Single-vial reconstitution with BAC water — standard peptide handling.',
      },
      {
        q: 'Weekly or more frequent?',
        a: 'Both components have multi-day half-lives, supporting weekly research protocols.',
      },
    ],
  },
  'blend-cagri-reta': {
    overview:
      'Pre-blended Cagrilintide + Retatrutide research stack — amylin analog combined with a triple-agonist (GLP-1/GIP/glucagon) compound. One of the most advanced incretin-combination research designs available.',
    mechanism:
      'Retatrutide activates GLP-1, GIP, and glucagon receptors; cagrilintide adds amylin/calcitonin receptor activation. Four-receptor coverage across incretin and satiety signaling.',
    highlights: [
      'Quad-pathway metabolic research coverage',
      'Co-lyophilized cagrilintide + retatrutide',
      'Weekly-dosing research profile',
      'Frontier combination in peptide-metabolic research',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'Pre-stacked — rarely combined further.',
    faqs: [
      {
        q: 'What ratios are available?',
        a: '5mg + 5mg and 10mg formats — see product specs for exact composition.',
      },
      {
        q: 'How does this compare to Cagri-Sema?',
        a: 'Cagri-Sema pairs cagrilintide with the GLP-1-only agonist semaglutide. Cagri-Reta uses the triple-agonist retatrutide instead — broader receptor coverage.',
      },
      {
        q: 'Is this the most potent metabolic research stack?',
        a: 'By receptor-coverage breadth, yes — it spans GLP-1, GIP, glucagon, and amylin pathways.',
      },
      {
        q: 'Weekly dosing?',
        a: 'Yes — both components support weekly research protocols.',
      },
    ],
  },
  'blend-glow': {
    overview:
      'GLOW is a pre-blended multi-peptide research combination built around GHK-Cu and repair peptides, intended for cosmetic-research and tissue-study designs. The exact formulation varies by concentration format (50 mg vs 70 mg).',
    mechanism:
      'Combines GHK-Cu (copper-peptide collagen/ECM modulator) with supporting repair peptides. Designed as a single-reconstitution research tool for combined cosmetic and tissue-research endpoints.',
    highlights: [
      'Multi-peptide research blend',
      'Built around GHK-Cu',
      'Single-vial reconstitution',
      'Available in 50 mg and 70 mg total-mass formats',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'This is the stack.',
    faqs: [
      {
        q: 'What is in the GLOW blend?',
        a: 'GHK-Cu plus complementary research peptides (typically BPC-157 and TB-500 variants). See the supplier product page for exact per-component specs.',
      },
      {
        q: 'What is the difference between 50 mg and 70 mg?',
        a: 'Total peptide mass per vial. The 70 mg format typically uses larger per-component masses rather than adding new components.',
      },
      {
        q: 'What is it used for in research?',
        a: 'Combined cosmetic/repair research — skin models, wound-healing studies, ECM-remodeling protocols.',
      },
      {
        q: 'Is each component COA-verified?',
        a: 'Yes — per-lot testing covers each component.',
      },
    ],
  },
  'blend-klow': {
    overview:
      'KLOW is a pre-blended multi-peptide research combination expanding on the GLOW formulation with an additional KPV component. Used in combined cosmetic, repair, and anti-inflammatory research designs.',
    mechanism:
      'Combines GHK-Cu, repair peptides, and KPV (anti-inflammatory α-MSH tripeptide). The KPV addition broadens the research profile into inflammation-modulation territory.',
    highlights: [
      'Extended GLOW formulation with KPV',
      '80 mg total-mass format',
      'Combined cosmetic + repair + anti-inflammatory research',
      'Single-vial reconstitution',
    ],
    protocolNotes: DEFAULT_PROTOCOL,
    storage: DEFAULT_STORAGE,
    stackingNotes: 'This is the stack.',
    faqs: [
      {
        q: 'What is the difference between GLOW and KLOW?',
        a: 'KLOW adds KPV to the GLOW formulation — extending the research profile to include anti-inflammatory endpoints.',
      },
      {
        q: 'What is KPV?',
        a: 'The C-terminal tripeptide of α-MSH, studied for anti-inflammatory activity without pigmentation effects.',
      },
      {
        q: 'What research is it designed for?',
        a: 'Multi-endpoint cosmetic, repair, and inflammation studies.',
      },
      {
        q: 'Is each component COA-verified?',
        a: 'Yes.',
      },
    ],
  },
}

export function contentFor(slug: string): CompoundContent | null {
  const family = familyForSlug(slug)
  if (!family) return null
  return CONTENT[family] ?? BLEND_CONTENT[family] ?? null
}
