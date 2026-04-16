'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

export default function HeroCarousel({ items }: { items: Product[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 4000)
    return () => clearInterval(id)
  }, [items.length])

  const p = items[i]

  return (
    <div className="relative w-full">
      <div className="card overflow-hidden bg-white shadow-lg">
        <div className="relative aspect-square bg-ink-50">
          <Image
            key={p.slug}
            src={p.image}
            alt={p.name}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-contain p-6 transition-opacity duration-500"
          />
          <div className="absolute left-3 top-3 rounded-md bg-brand-400 px-2.5 py-1 text-xs font-bold text-ink-900">
            Featured
          </div>
        </div>
        <div className="border-t-4 border-brand-400 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
            {p.category}
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <Link
              href={`/products/${p.slug}`}
              className="text-lg font-bold text-ink-900 hover:text-brand-700"
            >
              {p.name}
            </Link>
            <span className="text-lg font-bold text-ink-900">{p.price}</span>
          </div>
          <Link
            href={`/go/${p.slug}`}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="mt-3 block w-full rounded-md bg-brand-400 px-4 py-2.5 text-center text-sm font-bold text-ink-900 hover:bg-brand-300"
          >
            Shop now →
          </Link>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((it, idx) => (
          <button
            key={it.slug}
            onClick={() => setI(idx)}
            aria-label={`Show ${it.name}`}
            className={`h-2 rounded-full transition-all ${
              idx === i ? 'w-8 bg-brand-500' : 'w-2 bg-ink-300 hover:bg-ink-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
