import { parents, categories } from '@/lib/catalog'
import { SITE } from '@/lib/site'
import { categoryContentFor } from '@/lib/categoryContent'

export const dynamic = 'force-static'
export const revalidate = 86400

const toSlug = (c: string) => c.toLowerCase().replace(/\s+/g, '-')

// Editorial guide registry. Each guide is the most citable form of long-form
// content on the site, so they get top billing in llms.txt — most LLM-agent
// fetches lead with this file to decide which deeper URLs to crawl.
const GUIDES: { path: string; title: string; description: string }[] = [
  {
    path: '/guides/what-are-peptides',
    title: "What Are Peptides? A Beginner's Guide",
    description: 'Definitional primer on peptides vs proteins, why size matters, and how research-peptide pharmacology differs from small-molecule drug research.',
  },
  {
    path: '/guides/peptides-for-fat-loss',
    title: 'Peptides for Fat Loss: GLP-1, GIP, and Beyond',
    description: 'Comparison of semaglutide, tirzepatide, retatrutide, cagrilintide, and the wider metabolic-peptide lineup with inline PubMed citations to STEP 1, SURMOUNT-1, and the retatrutide phase 2 trial.',
  },
  {
    path: '/guides/peptides-for-muscle-growth',
    title: 'Peptides for Muscle Growth and Recovery',
    description: 'Growth-hormone-axis compounds (ipamorelin, CJC-1295, IGF-1 LR3) paired with soft-tissue repair peptides (BPC-157) — how the two lanes are typically combined in published research.',
  },
  {
    path: '/guides/peptides-for-skin',
    title: 'Peptides for Skin, Hair, and Anti-Aging',
    description: 'GHK-Cu, epitalon, and the cosmetic-peptide literature — what is well-documented, what is not, and how the formats differ.',
  },
  {
    path: '/guides/peptides-for-sleep',
    title: 'Peptides for Sleep and Cognitive Support',
    description: 'DSIP, selank, semax, and pinealon — the narrow-but-deep sleep and nootropic peptide literature, much of it from Russian neuropharmacology groups.',
  },
  {
    path: '/guides/peptide-stacks',
    title: 'Popular Peptide Stacks Explained',
    description: 'Why certain peptide combinations recur in research protocols — BPC-157+TB-500, ipamorelin+CJC-1295, cagri-sema, and the logic behind dual-pathway designs.',
  },
  {
    path: '/guides/bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500: Repair Peptide Comparison',
    description: 'Mechanism-level comparison of the two most-studied repair peptides — angiogenesis vs cell-migration pathways — with inline PubMed citations from the Sikiric, Hsieh, Goldstein, and Treadwell groups.',
  },
  {
    path: '/guides/semaglutide-vs-tirzepatide',
    title: 'Semaglutide vs Tirzepatide vs Retatrutide',
    description: 'Single, dual, and triple receptor agonists compared — receptor coverage, dosing structure, and how the published comparative data reads.',
  },
]

export async function GET() {
  const lines: string[] = []
  lines.push(`# ${SITE.name}`)
  lines.push('')
  lines.push(
    `> ${SITE.name} carries ${parents.length} peptide compounds across ${categories.length} classes. Every vial is sealed under nitrogen at ≥98% HPLC purity with a lot-matched certificate of analysis. Tracked US shipping in 3–5 business days; free shipping over $200.`,
  )
  lines.push('')
  lines.push('## Key facts')
  lines.push(`- ${parents.length} peptide compounds in stock`)
  lines.push('- ≥98% HPLC purity with lot-matched certificate of analysis')
  lines.push('- Tracked US shipping 3–5 business days')
  lines.push('- Free US shipping on orders over $200')
  lines.push('- Laboratory-use only — not for human consumption')
  lines.push('')

  lines.push('## Guides')
  for (const g of GUIDES) {
    lines.push(`- [${g.title}](${SITE.baseUrl}${g.path}): ${g.description}`)
  }
  lines.push('')

  lines.push('## Store classes')
  for (const c of categories) {
    const slug = toSlug(c)
    const content = categoryContentFor(slug)
    const count = parents.filter((p) => p.category === c).length
    const summary = content
      ? content.intro.split('.')[0].replace(/^\s+/, '')
      : `${count} ${c.toLowerCase()} peptide compounds`
    lines.push(`- [${c} Peptides](${SITE.baseUrl}/category/${slug}): ${summary}.`)
  }
  lines.push('')

  lines.push('## Top products')
  const top = [...parents]
    .sort((a, b) => a.cheapest.priceNum - b.cheapest.priceNum)
    .slice(0, 25)
  for (const p of top) {
    const price = p.cheapest.pricePaid.toFixed(2)
    const sizes = p.variants.length > 1 ? ` (${p.variants.length} sizes)` : ''
    lines.push(
      `- [${p.name}](${SITE.baseUrl}/products/${p.slug}) — from $${price}${sizes} — ${p.category} class`,
    )
  }
  lines.push('')

  lines.push('## Buying, shipping, returns')
  lines.push('- Tracked courier to the US in 3–5 business days')
  lines.push('- Free shipping on orders of $200 or more')
  lines.push('- Every vial ships lyophilized in a sealed, nitrogen-purged glass vial')
  lines.push('- Lot-matched certificate of analysis available on request for every batch')
  lines.push('')

  lines.push('## Disclaimer')
  lines.push(
    'All compounds listed are sold strictly for in-vitro and laboratory use. They are not medicines, supplements, or consumer products. Nothing on this site is medical or clinical advice.',
  )

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
