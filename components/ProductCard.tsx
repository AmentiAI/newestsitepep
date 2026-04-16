import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import Rating from './Rating'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
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
        {p.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-brand-400 px-2 py-0.5 text-xs font-bold text-ink-900">
            {p.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">{p.category}</div>
        <div className="font-semibold text-ink-900">{p.name}</div>
        <Rating slug={p.slug} compact />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-ink-900">{p.price}</span>
          <span className="text-xs font-semibold text-brand-600">View →</span>
        </div>
      </div>
    </Link>
  )
}
