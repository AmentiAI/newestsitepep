export const SITE = {
  name: 'Tidemaxxing',
  // Brand-form domain — used as Organization.alternateName, not for URL routing.
  domain: 'tidemaxxing.shop',
  // Canonical host for every URL the site emits (canonicals, og:url, sitemap entries,
  // robots.txt Host directive, llms.txt links, schema URLs). MUST match the host that
  // the Vercel domain config serves content from — currently apex 308-redirects to
  // www, so canonicals must point to www to avoid the canonical/redirect-loop trap
  // that gets YMYL content de-indexed.
  baseUrl: 'https://www.tidemaxxing.shop',
  tagline: 'Buy research peptides — one-stop catalogue, lot-matched COAs.',
  description:
    'Buy research peptides online at Tidemaxxing — the one-stop index of research compounds across six pathways with lot-matched certificates of analysis, transparent pricing, and a single vetted supplier. For research use only.',
  shopUrl: 'https://phiogen.is/?ref=PEPS',
  ref: 'PEPS',
  promoCode: 'TIDE10',
  promoPercent: 10,
  contactEmail: 'hello@tidemaxxing.shop',
}
