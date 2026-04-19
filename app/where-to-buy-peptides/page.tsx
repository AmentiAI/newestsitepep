import type { Metadata } from 'next'
import Link from 'next/link'
import RelatedLinks from '@/components/RelatedLinks'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: `Where to Buy Peptides Online — 2026 Buyer's Guide`,
  description:
    'How to buy peptides online safely — what to check on CoAs, red flags, shipping realities, and how the vetted partner on Tidemaxxing is selected.',
  alternates: { canonical: `${SITE.baseUrl}/where-to-buy-peptides` },
  openGraph: {
    title: 'Where to Buy Peptides Online (2026 Buyer\'s Guide)',
    description: 'How to buy peptides online safely — CoA checks, red flags, shipping realities.',
    url: `${SITE.baseUrl}/where-to-buy-peptides`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Buy Peptides Online',
    description: 'How to buy peptides online safely — CoA checks, red flags, shipping realities.',
  },
}

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
        Buying Guide
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
        Where to Buy Peptides Online
      </h1>
      <p className="mt-4 text-lg text-ink-700 leading-relaxed">
        Buying peptides online is a crowded market with wildly different quality.
        This guide covers what to check before you buy, the red flags that separate
        real labs from resellers, and why {SITE.name} only ranks a single partner
        across the catalogue.
      </p>

      <div className="mt-10 space-y-8 prose-body">
        <section>
          <h2 className="text-2xl font-bold text-ink-900">The five things that actually matter</h2>
          <ol className="mt-3 space-y-3 list-decimal pl-5">
            <li>
              <strong>Lot-matched certificate of analysis.</strong> A real COA names
              the lot number, the testing lab, the test method (HPLC, mass spec),
              and the purity figure. Generic "all our products are 99%+" marketing
              copy is not a COA.
            </li>
            <li>
              <strong>Independent testing.</strong> In-house testing is a conflict of
              interest. The COA should be signed by a third-party lab, not the vendor.
            </li>
            <li>
              <strong>Lyophilized shipping.</strong> Peptides ship as a dry powder.
              Vendors who ship pre-reconstituted "ready-to-use" vials are doing
              something wrong — most peptides degrade in solution over weeks.
            </li>
            <li>
              <strong>USP-grade bacteriostatic water available.</strong> A vendor who
              sells research peptides but doesn't stock BAC water is either new or
              outsourcing the hardware side. Not a dealbreaker, but a signal.
            </li>
            <li>
              <strong>Specific, consistent product copy.</strong> If the product page
              lists generic copy that could apply to any peptide, the vendor is
              drop-shipping. Real labs write per-compound spec pages.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Red flags</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>"99.99% pure" claims with no COA attached.</li>
            <li>Prices dramatically below the market median — usually underdosed or mislabeled.</li>
            <li>No physical lab address anywhere on the site.</li>
            <li>Customer service only via WhatsApp or Telegram.</li>
            <li>Pressure to pay in crypto with no conventional option at all.</li>
            <li>Shipping only from a country with no research-chemical regulation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Why one vendor, not a list</h2>
          <p>
            Affiliate sites that list ten vendors are optimising for commission, not
            for the reader. Every additional vendor dilutes the reader's attention
            and almost always includes lower-tier options padded into the list.
          </p>
          <p>
            {SITE.name} indexes research peptides from a single vendor we verified
            meets all five criteria above — lot-matched COAs, independent testing,
            lyophilized shipping, stocked bac water, and specific per-compound copy.
            The catalogue is the vendor's full range: no cherry-picking high-margin
            items.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">What to check on arrival</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Vial label matches the ordered compound and mass.</li>
            <li>Lyophilized cake is intact, not shattered or liquefied.</li>
            <li>Lot number on the vial matches the COA.</li>
            <li>Stopper is seated, no visible tampering.</li>
          </ul>
          <p>
            Store unopened vials in the refrigerator. Reconstituted vials keep
            roughly 28 days refrigerated — longer for compounds with added
            stabilisers, shorter for more fragile ones.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-900">Legal note</h2>
          <p>
            Research peptides are sold for in-vitro laboratory research only in most
            jurisdictions. They are not approved as medicines, supplements, or
            consumer products. Import rules vary by country — check your local
            regulations before ordering.
          </p>
        </section>
      </div>

      <RelatedLinks keys={['products', 'recon', 'calc', 'glossary', 'basics', 'stacks']} />

      <section className="mt-10 card bg-brand-50 border-brand-400 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink-900">Start browsing</h2>
        <p className="mt-2 text-ink-700">
          {SITE.name} catalogues 139 compounds across six research pathways. Every
          product page links to a lot-matched vial.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/products" className="btn-yellow">Buy research peptides →</Link>
          <Link href="/guides" className="btn-outline">Read the guides</Link>
        </div>
      </section>
    </div>
  )
}
