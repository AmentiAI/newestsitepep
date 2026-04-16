import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-ink-600 sm:px-6 sm:py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 text-lg font-black text-ink-900">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-400 text-ink-900 text-sm">T</span>
            {SITE.name}
          </div>
          <p className="mt-3 max-w-md">{SITE.description}</p>
        </div>
        <div>
          <div className="font-semibold text-ink-900">Explore</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/products" className="hover:text-brand-600">Full Catalogue</Link></li>
            <li><Link href="/looksmaxxing" className="hover:text-brand-600">Looksmaxxing</Link></li>
            <li><Link href="/guides" className="hover:text-brand-600">Guides</Link></li>
            <li><Link href="/where-to-buy-peptides" className="hover:text-brand-600">Where to Buy</Link></li>
            <li><Link href="/dosage-calculator" className="hover:text-brand-600">Dosage Calculator</Link></li>
            <li><Link href="/reconstitution-guide" className="hover:text-brand-600">Reconstitution</Link></li>
            <li><Link href="/peptide-glossary" className="hover:text-brand-600">Glossary</Link></li>
            <li><Link href="/faq" className="hover:text-brand-600">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-ink-900">Legal</div>
          <ul className="mt-2 space-y-1">
            <li>For research use only</li>
            <li>Not for human consumption</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200 py-4 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} {SITE.name}. Affiliate links throughout.
      </div>
    </footer>
  )
}
