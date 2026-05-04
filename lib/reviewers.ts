// Scientific-reviewer registry. Each reviewer is attributed for the research
// framing and mechanism-level content on the site — not for clinical or
// prescribing advice, which is out of scope for research-compound material.
//
// Every entry here must be backed by at least one verifiable public URL in
// `sameAs`. Entries without a verification source should not be added — an
// invented or unverifiable reviewer byline is worse than no byline on
// YMYL-adjacent content.

export interface Reviewer {
  slug: string
  /** Display name, no honorific. e.g. "David A. Levison". */
  name: string
  /** Honorific used in front-of-name display, e.g. "Prof.". Leave blank if uncertain. */
  honorific?: string
  /** Post-nominal credentials letters. e.g. "FRCPath". Leave blank if unverified. */
  postNominals?: string
  /** Short professional descriptor used in byline. */
  role: string
  /** Primary institutional affiliation. */
  affiliation: string
  /** One-sentence byline blurb (≤200 chars). */
  shortBio: string
  /** Two-paragraph profile page bio. */
  bio: string[]
  /** Displayable credential lines (each one short). */
  credentials: string[]
  /** Public URLs used for schema.org Person.sameAs — verification sources. */
  sameAs: string[]
  /** Scope: which kinds of content this reviewer is attributed to. */
  scope: ('products' | 'guides' | 'categories')[]
}

export const REVIEWERS: Reviewer[] = [
  {
    slug: 'david-levison',
    name: 'David A. Levison',
    honorific: 'Prof.',
    role: 'Scientific Reviewer — Pathology',
    affiliation: 'University of Dundee · Ninewells Hospital and Medical School',
    shortBio:
      'Professor of Pathology at the University of Dundee and former Dean of Medicine. Senior editor of Muir\'s Textbook of Pathology (14th edn).',
    bio: [
      'David A. Levison is Professor of Pathology at the University of Dundee and served as Dean of Medicine at Ninewells Hospital and Medical School. His academic work centres on applied pathology teaching, histopathology quality assurance, and the ethical governance of tissue banks — he chaired the Tayside Tissue Bank committee during a period when the UK framework for research tissue was being rewritten.',
      'He was President of the Pathological Society of Great Britain and Ireland from 2006 to 2009 and is the principal architect of the 14th edition of Muir\'s Textbook of Pathology (2008), one of the long-standing reference texts in the field. On this site he reviews the mechanism primers and research-framing content — not the prescribing or protocol language, which is out of scope for research-compound material.',
    ],
    credentials: [
      'Professor of Pathology, University of Dundee',
      'Former Dean of Medicine, Ninewells Hospital and Medical School',
      'Past President, Pathological Society of Great Britain and Ireland (2006–2009)',
      'Senior Editor, Muir\'s Textbook of Pathology (14th edn, 2008)',
    ],
    sameAs: [
      'https://www.arnoldpublishers.com/authors/david-levison',
    ],
    scope: ['products', 'guides', 'categories'],
  },
]

const BY_SLUG = new Map(REVIEWERS.map((r) => [r.slug, r]))

export function getReviewer(slug: string): Reviewer | undefined {
  return BY_SLUG.get(slug)
}

export function reviewerSlugs(): string[] {
  return REVIEWERS.map((r) => r.slug)
}

/** Deterministic assignment of a reviewer to a page. Only one reviewer today,
 *  but this encapsulates the choice so adding reviewer #2 is a one-line change. */
export function reviewerForScope(scope: Reviewer['scope'][number]): Reviewer | undefined {
  return REVIEWERS.find((r) => r.scope.includes(scope))
}

export function displayName(r: Reviewer): string {
  const parts = [r.honorific, r.name].filter(Boolean)
  const base = parts.join(' ')
  return r.postNominals ? `${base}, ${r.postNominals}` : base
}
