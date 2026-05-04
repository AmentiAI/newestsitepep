import { parents, categories } from '@/lib/catalog'
import { SITE } from '@/lib/site'
import { categoryContentFor } from '@/lib/categoryContent'

export const dynamic = 'force-static'
export const revalidate = 86400

const toSlug = (c: string) => c.toLowerCase().replace(/\s+/g, '-')

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
