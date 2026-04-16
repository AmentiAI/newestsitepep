import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: `Peptide Glossary — Terms Explained A–Z | ${SITE.name}`,
  description:
    'Plain-language glossary of research peptide terminology — COA, lyophilization, GHRH, GLP-1, amylin, bac water, subcutaneous, HPLC and more.',
  alternates: { canonical: `${SITE.baseUrl}/peptide-glossary` },
}

type Entry = { term: string; body: string }

const ENTRIES: Entry[] = [
  { term: 'AMPK', body: 'AMP-activated protein kinase. Cellular energy sensor that activates catabolic pathways and is a target of several longevity peptides including MOTS-c.' },
  { term: 'Amylin', body: 'Peptide hormone co-secreted with insulin from pancreatic beta cells. Regulates satiety and gastric emptying through a distinct pathway from GLP-1. Cagrilintide is a long-acting amylin analog.' },
  { term: 'Angiogenesis', body: 'Formation of new blood vessels from existing ones. Driven by VEGF signaling. Relevant to tissue-repair peptides like BPC-157.' },
  { term: 'Bacteriostatic water (bac water)', body: 'Sterile water containing 0.9% benzyl alcohol as a preservative. Used to reconstitute lyophilized peptides. Keeps reconstituted solutions stable for ~28 days refrigerated.' },
  { term: 'Certificate of Analysis (COA)', body: 'Lab document reporting purity, identity, and contaminant testing for a specific lot. Should be independent (third-party) and lot-matched to the vial.' },
  { term: 'DAC (Drug Affinity Complex)', body: 'Modification that extends a peptide\'s half-life by binding to serum albumin. CJC-1295 with DAC has a multi-day half-life; CJC-1295 no-DAC has a short pulse profile.' },
  { term: 'GHRH', body: 'Growth hormone–releasing hormone. Hypothalamic peptide that stimulates GH release from the pituitary. Tesamorelin and CJC-1295 are GHRH analogs.' },
  { term: 'Ghrelin receptor', body: 'Also called GHS-R. Activated by ghrelin and by growth-hormone secretagogues like ipamorelin, GHRP-6, and hexarelin. Drives GH release by a mechanism complementary to GHRH.' },
  { term: 'GHK-Cu', body: 'Glycyl-histidyl-lysine copper tripeptide. A copper-binding peptide studied for collagen synthesis, skin remodeling, and vascular signaling.' },
  { term: 'GIP', body: 'Glucose-dependent insulinotropic polypeptide. Incretin hormone. Tirzepatide adds GIP activation to GLP-1 for dual-agonist metabolic effects.' },
  { term: 'GLP-1', body: 'Glucagon-like peptide 1. Incretin hormone that slows gastric emptying, enhances insulin secretion, and engages central appetite regulation. Semaglutide is a GLP-1 agonist.' },
  { term: 'Glucagon receptor', body: 'Third receptor added by retatrutide (GLP-1 + GIP + glucagon). Glucagon increases energy expenditure, balancing the insulinotropic effects of GLP-1 and GIP.' },
  { term: 'HPLC', body: 'High-performance liquid chromatography. Standard purity assay for peptides. Look for HPLC results on COAs; anything under 98% is low-tier for research.' },
  { term: 'Incretin', body: 'Gut-derived hormones (GLP-1, GIP) that enhance insulin secretion after eating. The drug target of semaglutide, tirzepatide, and retatrutide.' },
  { term: 'IU (International Unit)', body: 'Activity-based dosing unit used for some peptides (HCG, HGH). Not interchangeable with mg — consult the specific compound\'s spec sheet.' },
  { term: 'Lyophilization', body: 'Freeze-drying. Removes water from a peptide solution to yield a dry powder (cake) with long shelf life. Reconstitute with bac water before use.' },
  { term: 'MOTS-c', body: 'Mitochondrial-derived peptide. Short ORF encoded within mitochondrial DNA. Studied for AMPK activation and metabolic/longevity endpoints.' },
  { term: 'NAD+', body: 'Nicotinamide adenine dinucleotide. Not a peptide itself but a related research compound in the longevity space — substrate for sirtuins and PARPs.' },
  { term: 'Peptide', body: 'A short chain of amino acids (roughly 2–50). Distinguished from proteins by size. Research peptides in this catalogue are synthesised to pharmaceutical-grade purity.' },
  { term: 'PT-141 (Bremelanotide)', body: 'Melanocortin receptor agonist studied for libido and arousal endpoints. MC4R is the primary receptor of interest.' },
  { term: 'Reconstitution', body: 'The process of dissolving a lyophilized peptide in bac water to create an injectable solution. Add water slowly down the side of the vial; swirl, don\'t shake.' },
  { term: 'Secretagogue', body: 'A compound that stimulates secretion of something. Growth-hormone secretagogues (ipamorelin, ibutamoren) stimulate GH release from the pituitary.' },
  { term: 'Sirtuin', body: 'Family of NAD+-dependent deacetylases involved in longevity and metabolic regulation. Target of several longevity research programs.' },
  { term: 'SS-31 (Elamipretide)', body: 'Small peptide that binds cardiolipin in the inner mitochondrial membrane. Studied for mitochondrial dysfunction models.' },
  { term: 'Subcutaneous (SC)', body: 'Injection into the fat layer below the skin. Standard route for most research peptides — slower absorption than IM or IV, less painful.' },
  { term: 'TB-500', body: 'Synthetic fragment of thymosin beta-4. Drives actin sequestration and cellular migration. Paired with BPC-157 in the canonical soft-tissue repair stack.' },
  { term: 'Titration', body: 'Gradually increasing dose over time to let an organism or model adapt. Standard for GLP-1-class compounds to manage GI endpoints.' },
  { term: 'U-100 syringe', body: 'Insulin syringe calibrated at 100 units per ml. Standard draw tool for subcutaneous research peptide injections. 10 units = 0.1 ml.' },
  { term: 'VEGF', body: 'Vascular endothelial growth factor. Drives angiogenesis. BPC-157 upregulates VEGFR2 expression.' },
]

export default function Page() {
  const letters = Array.from(new Set(ENTRIES.map((e) => e.term[0].toUpperCase()))).sort()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        Glossary
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        Peptide Glossary A–Z
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-700 leading-relaxed">
        Plain-language definitions of the terms you'll encounter across research
        peptide literature, spec sheets, and the rest of the {SITE.name} catalogue.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink-200 font-bold text-ink-900 hover:border-brand-400 hover:bg-brand-50"
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-8">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="border-b-2 border-brand-400 pb-2 text-2xl font-black text-ink-900">
              {letter}
            </h2>
            <dl className="mt-4 space-y-4">
              {ENTRIES.filter((e) => e.term[0].toUpperCase() === letter).map((e) => (
                <div key={e.term} className="card p-4 sm:p-5">
                  <dt className="font-bold text-ink-900">{e.term}</dt>
                  <dd className="mt-1 text-ink-700 leading-relaxed">{e.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-12 card bg-brand-50 border-brand-400 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink-900">Ready to browse compounds?</h2>
        <p className="mt-2 text-ink-700">
          Terms in the glossary link directly to the compound families they describe.
        </p>
        <Link href="/products" className="btn-yellow mt-4 inline-flex">
          Buy research peptides →
        </Link>
      </section>
    </div>
  )
}
