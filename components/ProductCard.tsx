import Link from 'next/link'
import Image from 'next/image'
import type { Parent } from '@/lib/catalog'
import { discountedFmt } from '@/lib/price'
import { SITE } from '@/lib/site'

export default function ProductCard({ p }: { p: Parent }) {
  const multi = p.variants.length > 1
  const primary = p.cheapest
  return (
    <Link
      href={`/products/${p.slug}`}
      aria-label={`Buy ${p.name}`}
      className="card group flex flex-col overflow-hidden transition hover:border-brand-400 hover:shadow-md"
    >
      <div className="relative aspect-square bg-ink-50">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-4 transition group-hover:scale-105"
        />
        {multi && (
          <span className="absolute left-2 top-2 rounded-md bg-brand-400 px-2 py-0.5 text-xs font-bold text-ink-900">
            {p.variants.length} sizes
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-red-600 px-2 py-0.5 text-xs font-black text-white shadow-sm">
          -{SITE.promoPercent}%
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">{p.category}</div>
        <div className="font-semibold text-ink-900">{p.name}</div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
          ≥98% HPLC · lot CoA
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-baseline gap-1.5">
            {multi && <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">from</span>}
            <span className="font-bold text-ink-900">{discountedFmt(primary.priceNum)}</span>
            <span className="text-xs font-medium text-ink-400 line-through">{primary.price}</span>
          </span>
          <span className="text-xs font-bold text-brand-600">Buy {p.name} →</span>
        </div>
      </div>
    </Link>
  )
}
