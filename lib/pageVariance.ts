// Per-slug deterministic variance for dynamic product pages.
//
// Google treats templated pages (same skeleton, variable swap) as duplicate
// content and stops indexing after 1-2 entries. This module gives every
// product a structurally different page — shuffled section order, rotated
// H2 wording, alternate hero/sidebar layouts, optional extra blocks —
// seeded deterministically from the slug so builds stay stable.

function fnv1a(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)]
}

function shuffle<T>(rand: () => number, arr: readonly T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export type SectionKey =
  | 'mechanism'
  | 'highlights'
  | 'protocolNotes'
  | 'stackingNotes'
  | 'storage'
  | 'faqs'

export type HeroLayout = 'image-left' | 'image-right' | 'stacked'
export type SidebarPosition = 'right' | 'left' | 'inline-top' | 'inline-bottom'
export type RelatedPosition = 'before-content' | 'between' | 'after-content'
export type ExtraBlockKey = 'category-context' | 'vial-note' | 'literature-callout' | 'tag-strip'

export interface PageVariance {
  seed: number
  hero: HeroLayout
  sidebar: SidebarPosition
  related: RelatedPosition
  /** Order in which the main content sections render. */
  sectionOrder: SectionKey[]
  /** Deterministically chosen H2 text per section. */
  headings: Record<SectionKey, string>
  /** Deterministically chosen extra-block keys and their positions. */
  extras: { key: ExtraBlockKey; position: 'top' | 'mid' | 'bottom' }[]
  /** Order of rows in the "quick specs" card. */
  specsOrder: ('compound' | 'category' | 'price' | 'format' | 'coa' | 'use')[]
  /** H2 for the related-products block. */
  relatedHeading: string
}

const HEADINGS: Record<SectionKey, readonly string[]> = {
  mechanism: [
    'Proposed mechanism',
    'How it is thought to work',
    'Signaling and biology in the literature',
    'Pathway notes',
    'What the studies describe',
  ],
  highlights: [
    'Research highlights',
    'Key points from the literature',
    'Notable findings',
    'What the studies show',
    'At a glance',
  ],
  protocolNotes: [
    'Research protocol notes',
    'Reconstitution and working-concentration notes',
    'Lab protocol guidance',
    'Handling in research settings',
    'Protocol considerations',
  ],
  stackingNotes: [
    'Stacking and comparative studies',
    'Combination research',
    'Paired-compound studies',
    'Comparative literature',
    'How it is studied alongside others',
  ],
  storage: [
    'Handling and storage',
    'Storage and shelf-life',
    'Vial handling guidance',
    'Storage notes',
    'Keeping material stable',
  ],
  faqs: [
    'Frequently asked',
    'Common questions',
    'Questions from researchers',
    'Researcher FAQ',
    'Asked often',
  ],
}

const RELATED_HEADINGS = [
  'Related in {cat}',
  'Also studied in {cat}',
  'More {cat} research compounds',
  'Other {cat} entries',
  'Nearby in the {cat} literature',
  'Compare with other {cat} compounds',
]

const HEROES: HeroLayout[] = ['image-left', 'image-right', 'stacked']
const SIDEBARS: SidebarPosition[] = ['right', 'left', 'inline-top', 'inline-bottom']
const RELATEDS: RelatedPosition[] = ['before-content', 'between', 'after-content']

const ALL_SECTIONS: SectionKey[] = [
  'mechanism',
  'highlights',
  'protocolNotes',
  'stackingNotes',
  'storage',
  'faqs',
]

const ALL_EXTRAS: ExtraBlockKey[] = [
  'category-context',
  'vial-note',
  'literature-callout',
  'tag-strip',
]

const SPEC_ROWS: PageVariance['specsOrder'] = [
  'compound',
  'category',
  'price',
  'format',
  'coa',
  'use',
]

export function varianceFor(slug: string, category: string): PageVariance {
  const seed = fnv1a(slug)
  const rand = mulberry32(seed)

  // Consume random draws in a fixed order so each axis is independently
  // seeded but still deterministic for a given slug.
  const hero = pick(rand, HEROES)
  const sidebar = pick(rand, SIDEBARS)
  const related = pick(rand, RELATEDS)

  const sectionOrder = shuffle(rand, ALL_SECTIONS)

  const headings = ALL_SECTIONS.reduce((acc, key) => {
    acc[key] = pick(rand, HEADINGS[key])
    return acc
  }, {} as Record<SectionKey, string>)

  // Pick 1–2 extra blocks, each placed at a distinct position.
  const extraCount = 1 + Math.floor(rand() * 2)
  const pool = shuffle(rand, ALL_EXTRAS).slice(0, extraCount)
  const positions: ('top' | 'mid' | 'bottom')[] = shuffle(rand, [
    'top',
    'mid',
    'bottom',
  ]).slice(0, extraCount) as ('top' | 'mid' | 'bottom')[]
  const extras = pool.map((key, i) => ({ key, position: positions[i] }))

  const specsOrder = shuffle(rand, SPEC_ROWS)

  const relatedHeading = pick(rand, RELATED_HEADINGS).replace('{cat}', category)

  return {
    seed,
    hero,
    sidebar,
    related,
    sectionOrder,
    headings,
    extras,
    specsOrder,
    relatedHeading,
  }
}
