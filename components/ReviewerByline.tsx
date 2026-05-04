import Link from 'next/link'
import { type Reviewer, displayName } from '@/lib/reviewers'

/** Compact byline used at the top of product and guide pages. */
export default function ReviewerByline({ reviewer }: { reviewer: Reviewer }) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-2 rounded-md border border-ink-200 bg-white/60 px-3 py-2 text-sm">
      <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
        Verified
      </span>
      <span className="text-ink-600">Scientific review:</span>
      <Link
        href={`/reviewers/${reviewer.slug}`}
        className="font-semibold text-ink-900 hover:text-brand-700"
      >
        {displayName(reviewer)}
      </Link>
      <span className="text-ink-500">· {reviewer.role}</span>
    </div>
  )
}
