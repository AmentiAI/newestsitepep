#!/usr/bin/env node
// Generates lib/products.ts from the raw catalog below.
// Copy in this file is intentionally thin — rewrite taglines/descriptions
// per product with your own angle before launch (see playbook §9).

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// [slug, name, price, category]
const RAW = [
  // Fat Loss / Metabolic
  ['tirzepatide-15mg', 'Tirzepatide 15mg', 149.99, 'Fat Loss'],
  ['tirzepatide-30mg', 'Tirzepatide 30mg', 249.99, 'Fat Loss'],
  ['tirzepatide-60mg', 'Tirzepatide 60mg', 399.99, 'Fat Loss'],
  ['semaglutide-3mg', 'Semaglutide 3mg', 49.99, 'Fat Loss'],
  ['semaglutide-6mg', 'Semaglutide 6mg', 79.99, 'Fat Loss'],
  ['semaglutide-12mg', 'Semaglutide 12mg', 129.99, 'Fat Loss'],
  ['semaglutide-20mg', 'Semaglutide 20mg', 189.99, 'Fat Loss'],
  ['semaglutide-30mg', 'Semaglutide 30mg', 249.99, 'Fat Loss'],
  ['retatrutide-10mg', 'Retatrutide 10mg', 149.99, 'Fat Loss'],
  ['retatrutide-15mg', 'Retatrutide 15mg', 199.99, 'Fat Loss'],
  ['retatrutide-20mg', 'Retatrutide 20mg', 249.99, 'Fat Loss'],
  ['retatrutide-30mg', 'Retatrutide 30mg', 329.99, 'Fat Loss'],
  ['survodutide-10mg', 'Survodutide 10mg', 159.99, 'Fat Loss'],
  ['mazdutide-6mg', 'Mazdutide 6mg', 129.99, 'Fat Loss'],
  ['cagrilintide-5mg', 'Cagrilintide 5mg', 99.99, 'Fat Loss'],
  ['cagrilintide-10mg', 'Cagrilintide 10mg', 169.99, 'Fat Loss'],
  ['5-amino-1mq-5mg', '5-Amino-1MQ 5mg', 19.99, 'Fat Loss'],
  ['5-amino-1mq-50mg', '5-Amino-1MQ 50mg', 79.99, 'Fat Loss'],
  ['5-amino-1mq-capsules-50mg-x-60-capsules', '5-Amino-1MQ 50mg x60 Capsules', 119.99, 'Fat Loss'],
  ['aicar-50mg', 'AICAR 50mg', 69.99, 'Fat Loss'],
  ['aod9604-2mg', 'AOD9604 2mg', 39.99, 'Fat Loss'],
  ['aod9604-5mg', 'AOD9604 5mg', 69.99, 'Fat Loss'],
  ['aod9604-10mg', 'AOD9604 10mg', 119.99, 'Fat Loss'],
  ['adipotide-fttp-5mg', 'Adipotide (FTPP) 5mg', 89.99, 'Fat Loss'],
  ['adipotide-fttp-10mg', 'Adipotide (FTPP) 10mg', 149.99, 'Fat Loss'],
  ['bam-15-30mg-ml-30ml', 'BAM-15 30mg/mL 30mL', 89.99, 'Fat Loss'],
  ['bam-15-50mg-ml-30ml', 'BAM-15 50mg/mL 30mL', 129.99, 'Fat Loss'],
  ['l-carnitine-400mg-ml', 'L-Carnitine 400mg/mL', 39.99, 'Fat Loss'],
  ['l-carnitine-600mg-ml', 'L-Carnitine 600mg/mL', 49.99, 'Fat Loss'],
  ['l-carnitine-5-pack-600mg', 'L-Carnitine 5-Pack 600mg', 89.99, 'Fat Loss'],
  ['o-304-atx-304-100mg-x-60-capsules', 'O-304 (ATX-304) 100mg x60 Capsules', 119.99, 'Fat Loss'],
  ['slu-pp-332-1mg-x-30-capsules', 'SLU-PP-332 1mg x30 Capsules', 39.99, 'Fat Loss'],
  ['slu-pp-332-100mg-x-30-capsules', 'SLU-PP-332 100mg x30 Capsules', 59.99, 'Fat Loss'],
  ['slu-pp-332-100mg-x-120-capsules', 'SLU-PP-332 100mg x120 Capsules', 159.99, 'Fat Loss'],
  ['slu-pp-332-1mg-ml-30ml', 'SLU-PP-332 1mg/mL 30mL', 79.99, 'Fat Loss'],
  ['slu-pp-332-5mg-ml-30ml', 'SLU-PP-332 5mg/mL 30mL', 99.99, 'Fat Loss'],
  ['tesofensine-500mcg-x-30-capsules', 'Tesofensine 500mcg x30 Capsules', 99.99, 'Fat Loss'],
  ['tesofensine-500mcg-x-30-tablets', 'Tesofensine 500mcg x30 Tablets', 99.99, 'Fat Loss'],

  // Growth Peptides
  ['igf-1-lr3-1mg', 'IGF-1 LR3 1mg', 79.99, 'Growth'],
  ['ipamorelin-10mg', 'Ipamorelin 10mg', 59.99, 'Growth'],
  ['cjc-1295-no-dac-5mg', 'CJC-1295 No DAC 5mg', 49.99, 'Growth'],
  ['cjc-1295-no-dac-10mg', 'CJC-1295 No DAC 10mg', 79.99, 'Growth'],
  ['cjc-1295-with-dac-10mg', 'CJC-1295 with DAC 10mg', 99.99, 'Growth'],
  ['ghrp-2-10mg', 'GHRP-2 10mg', 49.99, 'Growth'],
  ['ghrp-6-10mg', 'GHRP-6 10mg', 49.99, 'Growth'],
  ['gonadorelin-acetate', 'Gonadorelin Acetate', 49.99, 'Growth'],
  ['hexarelin-5mg', 'Hexarelin 5mg', 59.99, 'Growth'],
  ['kisspeptin-10-5mg', 'Kisspeptin-10 5mg', 59.99, 'Growth'],
  ['kisspeptin-10-10mg', 'Kisspeptin-10 10mg', 99.99, 'Growth'],
  ['peg-mgf-2mg', 'PEG-MGF 2mg', 69.99, 'Growth'],
  ['sermorelin-2mg', 'Sermorelin 2mg', 39.99, 'Growth'],
  ['sermorelin-5mg', 'Sermorelin 5mg', 69.99, 'Growth'],
  ['sermorelin-10mg', 'Sermorelin 10mg', 119.99, 'Growth'],
  ['tesamorelin-10mg', 'Tesamorelin 10mg', 119.99, 'Growth'],
  ['tesamorelin-20mg', 'Tesamorelin 20mg', 199.99, 'Growth'],

  // Recovery & Healing
  ['bpc-157-10mg', 'BPC-157 10mg', 59.99, 'Recovery'],
  ['tb-500-thymosin-beta-4-10mg', 'TB-500 (Thymosin Beta-4) 10mg', 59.99, 'Recovery'],
  ['ara-290-10mg', 'ARA-290 10mg', 89.99, 'Recovery'],
  ['bpc-157-capsules-500mcg-x-60-capsules', 'BPC-157 Capsules 500mcg x60', 79.99, 'Recovery'],
  ['bacteriostatic-water-30ml', 'Bacteriostatic Water 30mL', 12.99, 'Recovery'],
  ['usp-bacteriostatic-water-30ml', 'Bacteriostatic Water USP 30mL', 14.99, 'Recovery'],
  ['bronchogen-20mg', 'Bronchogen 20mg', 79.99, 'Recovery'],
  ['cardiogen-20mg', 'Cardiogen 20mg', 79.99, 'Recovery'],
  ['cartalax-20mg', 'Cartalax 20mg', 79.99, 'Recovery'],
  ['chonluten-20mg', 'Chonluten 20mg', 79.99, 'Recovery'],
  ['cortagen-20mg', 'Cortagen 20mg', 79.99, 'Recovery'],
  ['crystagen-20mg', 'Crystagen 20mg', 79.99, 'Recovery'],
  ['kpv-5mg', 'KPV 5mg', 59.99, 'Recovery'],
  ['kpv-10mg', 'KPV 10mg', 99.99, 'Recovery'],
  ['ll-37-10mg', 'LL-37 10mg', 99.99, 'Recovery'],
  ['livagen-20mg', 'Livagen 20mg', 79.99, 'Recovery'],
  ['mots-c-10mg', 'MOTS-c 10mg', 129.99, 'Recovery'],
  ['mots-c-20mg', 'MOTS-c 20mg', 219.99, 'Recovery'],
  ['mots-c-40mg', 'MOTS-c 40mg', 379.99, 'Recovery'],
  ['ovagen-20mg', 'Ovagen 20mg', 79.99, 'Recovery'],
  ['oxytocin-8mg', 'Oxytocin 8mg', 69.99, 'Recovery'],
  ['oxytocin-10mg', 'Oxytocin 10mg', 79.99, 'Recovery'],
  ['pancragen-20mg', 'Pancragen 20mg', 79.99, 'Recovery'],
  ['prostamax-20mg', 'Prostamax 20mg', 79.99, 'Recovery'],
  ['ss-31-10mg', 'SS-31 10mg', 99.99, 'Recovery'],
  ['ss-31-25mg', 'SS-31 25mg', 189.99, 'Recovery'],
  ['ss-31-50mg', 'SS-31 50mg', 329.99, 'Recovery'],
  ['testagen-20mg', 'Testagen 20mg', 89.99, 'Recovery'],
  ['thymogen-20mg', 'Thymogen 20mg', 79.99, 'Recovery'],
  ['thymosin-alpha-1-5mg', 'Thymosin Alpha-1 5mg', 69.99, 'Recovery'],
  ['thymosin-alpha-1-10mg', 'Thymosin Alpha-1 10mg', 119.99, 'Recovery'],
  ['thymulin-10mg', 'Thymulin 10mg', 59.99, 'Recovery'],
  ['vip-5mg', 'VIP 5mg', 79.99, 'Recovery'],
  ['vip-10mg', 'VIP 10mg', 139.99, 'Recovery'],
  ['vesilute-20mg', 'Vesilute 20mg', 79.99, 'Recovery'],
  ['vesugen-20mg', 'Vesugen 20mg', 79.99, 'Recovery'],
  ['vilon-20mg', 'Vilon 20mg', 79.99, 'Recovery'],

  // Anti-Aging & Longevity
  ['epitalon-10mg', 'Epitalon 10mg', 59.99, 'Longevity'],
  ['epitalon-50mg', 'Epitalon 50mg', 139.99, 'Longevity'],
  ['ghk-cu-50mg', 'GHK-Cu 50mg', 50.00, 'Longevity'],
  ['ghk-cu-100mg', 'GHK-Cu 100mg', 89.99, 'Longevity'],
  ['nad-500mg', 'NAD+ 500mg', 79.99, 'Longevity'],
  ['nad-1000mg', 'NAD+ 1000mg', 139.99, 'Longevity'],
  ['ace-031-1mg', 'ACE-031 1mg', 199.99, 'Longevity'],
  ['abaloparatide-3mg', 'Abaloparatide 3mg', 149.99, 'Longevity'],
  ['fox04-dri-10mg', 'FOXO4-DRI 10mg', 149.99, 'Longevity'],
  ['glutathione-200mg', 'Glutathione 200mg', 49.99, 'Longevity'],
  ['glutathione-600mg', 'Glutathione 600mg', 89.99, 'Longevity'],
  ['glutathione-1500mg', 'Glutathione 1500mg', 179.99, 'Longevity'],
  ['melanotan-1-10mg', 'Melanotan I 10mg', 59.99, 'Longevity'],
  ['melanotan-2-10mg', 'Melanotan II 10mg', 59.99, 'Longevity'],
  ['methylene-blue-10mg-ml-50ml', 'Methylene Blue 10mg/mL 50mL', 59.99, 'Longevity'],
  ['na-epitalon-10mg', 'NA-Epitalon 10mg', 79.99, 'Longevity'],
  ['p21-10mg', 'P21 10mg', 89.99, 'Longevity'],
  ['pnc-27-30mg', 'PNC-27 30mg', 119.99, 'Longevity'],
  ['pt-141-10mg', 'PT-141 10mg', 69.99, 'Longevity'],
  ['ru-58841-50mg-x-30ml', 'RU-58841 50mg x30mL', 79.99, 'Longevity'],
  ['ru-58841-50mg-x-60ml', 'RU-58841 50mg x60mL', 129.99, 'Longevity'],
  ['snap-8-10mg', 'SNAP-8 10mg', 45.00, 'Longevity'],

  // Cognitive & Nootropic
  ['adamax-10mg', 'Adamax 10mg', 99.99, 'Cognitive'],
  ['dsip-delta-sleep-inducing-peptide-5mg', 'DSIP 5mg', 49.99, 'Cognitive'],
  ['dsip-delta-sleep-inducing-peptide-10mg', 'DSIP 10mg', 79.99, 'Cognitive'],
  ['dsip-delta-sleep-inducing-peptide-15mg', 'DSIP 15mg', 99.99, 'Cognitive'],
  ['n-acetyl-semax-amidate-30mg', 'N-Acetyl Semax Amidate 30mg', 149.99, 'Cognitive'],
  ['na-selank-amidate-10mg', 'NA-Selank Amidate 10mg', 79.99, 'Cognitive'],
  ['na-selank-amidate-30mg', 'NA-Selank Amidate 30mg', 179.99, 'Cognitive'],
  ['pe-22-28-10mg', 'PE-22-28 10mg', 79.99, 'Cognitive'],
  ['pinealon-10mg', 'Pinealon 10mg', 69.99, 'Cognitive'],
  ['pinealon-20mg', 'Pinealon 20mg', 119.99, 'Cognitive'],
  ['selank-10mg', 'Selank 10mg', 69.99, 'Cognitive'],

  // Blends & Stacks
  ['bpc-157-tb-500-blend-bpc-157-10mg-tb-500-10mg', 'BPC-157 + TB-500 Blend 20mg', 99.99, 'Blends'],
  ['bpc-157-tb-500-blend-bpc-157-5mg-tb-500-5mg', 'BPC-157 + TB-500 Blend 10mg', 59.99, 'Blends'],
  ['ipamorelin-cjc-1295-blend-cjc-1295-5mg-ipa-5mg', 'Ipamorelin/CJC-1295 Blend 10mg', 89.99, 'Blends'],
  ['ipamorelin-cjc-1295-blend-cjc-1295-5mg-ipamorelin-5mg', 'Ipamorelin/CJC-1295 Blend 10mg v2', 89.99, 'Blends'],
  ['ipamorelin-tesamorelin-blend-ipa-3mg-tesa-10mg', 'Ipamorelin/Tesamorelin Blend 13mg', 129.99, 'Blends'],
  ['ipamorelin-tesamorelin-blend-ipa-5mg-tesa-10mg', 'Ipamorelin/Tesamorelin Blend 15mg', 149.99, 'Blends'],
  ['ipa-tesa-blend-ipa-5mg-tesa-10mg-15mg', 'IPA/TESA Blend 15mg', 149.99, 'Blends'],
  ['cagri-reta-5mg', 'Cagri-Reta 5mg', 129.99, 'Blends'],
  ['cagri-reta-10mg', 'Cagri-Reta 10mg', 189.99, 'Blends'],
  ['cagri-sema-blend-5mg-cagrilintide-5mg-sema-10mg', 'Cagri-Sema Blend 10mg', 179.99, 'Blends'],
  ['reta-cagri-5mg-5mg', 'Reta-Cagri 5mg/5mg', 149.99, 'Blends'],
  ['glow-blend-50mg', 'GLOW Blend 50mg', 89.99, 'Blends'],
  ['glow-blend-70mg', 'GLOW Blend 70mg', 109.99, 'Blends'],
  ['klow-blend-80mg', 'KLOW Blend 80mg', 119.99, 'Blends'],
]

const CATEGORY_FRAME = {
  'Fat Loss': {
    tag: 'Metabolic support for body recomposition research.',
    desc: 'Research-grade compound studied for metabolic and appetite-regulation pathways. Shipped from a cGMP facility with third-party purity testing.',
    tags: ['fat-loss', 'metabolic', 'glp-1'],
  },
  'Growth': {
    tag: 'Studied for growth-axis and performance research.',
    desc: 'Secretagogue peptide investigated for its role in the growth-hormone axis. Lyophilized, vacuum-sealed, independently assayed.',
    tags: ['growth', 'performance', 'secretagogue'],
  },
  'Recovery': {
    tag: 'Investigational support for tissue-repair research.',
    desc: 'Peptide compound studied in repair, inflammation, and cellular-signaling contexts. Each vial carries a batch-specific COA.',
    tags: ['recovery', 'healing', 'repair'],
  },
  'Longevity': {
    tag: 'Compounds used in longevity and anti-senescence research.',
    desc: 'Well-characterized compound featured across aging-biology literature. Shipped lyophilized with stability and purity documentation.',
    tags: ['longevity', 'anti-aging', 'cellular-health'],
  },
  'Cognitive': {
    tag: 'Nootropic research compound for cognitive studies.',
    desc: 'Neuropeptide investigated in learning, stress-resilience, and sleep research. Supplied lyophilized with lot-matched purity data.',
    tags: ['nootropic', 'cognitive', 'sleep'],
  },
  'Blends': {
    tag: 'Pre-blended stack for comparative research work.',
    desc: 'Co-lyophilized blend reducing reconstitution steps for comparative studies. Each blend carries per-component COA data.',
    tags: ['blend', 'stack', 'combo'],
  },
}

const PHIOGEN_SLUG = (s) => s // identical slug — affiliate platform uses same slugs
const REF = 'PEPS'

const products = RAW.map(([slug, name, price, category]) => {
  const frame = CATEGORY_FRAME[category]
  return {
    slug,
    name,
    tagline: frame.tag,
    shortDescription: `${name} — ${frame.desc}`,
    category,
    price: `$${price.toFixed(2)}`,
    priceNum: price,
    image: `https://phiogen.is/images/products/${slug}.png`,
    affiliateUrl: `https://phiogen.is/products/${PHIOGEN_SLUG(slug)}?ref=${REF}`,
    protocol: 'For research use only. Reconstitute with bacteriostatic water per your research protocol.',
    tags: frame.tags,
  }
})

const ts = `// AUTO-GENERATED by scripts/generate-products.mjs — run \`npm run generate:products\` to regenerate.
// Placeholder copy: taglines/descriptions are category-framed defaults.
// Before launch, rewrite per-product to avoid duplicate content across affiliates.

export interface Product {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  category: string
  price: string
  priceNum: number
  image: string
  affiliateUrl: string
  protocol: string
  tags: string[]
  badge?: string
  seoTitle?: string
}

export const products: Product[] = ${JSON.stringify(products, null, 2)}

export const categories = Array.from(new Set(products.map(p => p.category)))

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}
`

const out = resolve(__dirname, '..', 'lib', 'products.ts')
writeFileSync(out, ts)
console.log(`Wrote ${products.length} products -> ${out}`)
