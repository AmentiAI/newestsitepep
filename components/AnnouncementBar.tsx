import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function AnnouncementBar() {
  return (
    <div className="bg-ink-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs font-semibold sm:flex-row sm:gap-3 sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
          <span>
            <span className="text-brand-400">10% OFF</span> all research peptides with code{' '}
            <span className="rounded bg-brand-400 px-1.5 py-0.5 font-black text-ink-900">{SITE.promoCode}</span>
          </span>
        </span>
        <Link
          href="/go/shop"
          target="_blank"
          rel="noopener nofollow sponsored"
          className="text-brand-400 underline-offset-2 hover:underline"
        >
          Shop now →
        </Link>
      </div>
    </div>
  )
}
