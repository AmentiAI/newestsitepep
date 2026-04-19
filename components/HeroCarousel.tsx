'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Parent } from '@/lib/catalog'
import { discountedFmt } from '@/lib/price'

export default function HeroCarousel({ items }: { items: Parent[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 4500)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <div className="relative w-full">
      <div className="card overflow-hidden bg-white shadow-lg">
        <div className="relative aspect-square bg-ink-50">
          {items.map((it, idx) => (
            <Image
              key={it.slug}
              src={it.image}
              alt={it.name}
              fill
              priority={idx === 0}
              sizes="(min-width: 768px) 40vw, 90vw"
              className={`object-contain p-6 transition-opacity duration-700 ease-in-out ${
                idx === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-brand-400 px-2.5 py-1 text-xs font-bold text-ink-900">
            Featured
          </div>
        </div>

        <div className="relative border-t-4 border-brand-400">
          {items.map((it, idx) => {
            const primary = it.cheapest
            const multi = it.variants.length > 1
            return (
              <div
                key={it.slug}
                aria-hidden={idx !== i}
                className={`p-5 transition-opacity duration-500 ${
                  idx === i
                    ? 'relative opacity-100'
                    : 'pointer-events-none absolute inset-0 opacity-0'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  {it.category}
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <Link
                    href={`/products/${it.slug}`}
                    className="text-lg font-bold text-ink-900 hover:text-brand-700"
                  >
                    {it.name}
                  </Link>
                  <span className="flex items-baseline gap-1.5">
                    {multi && <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">from</span>}
                    <span className="text-lg font-black text-ink-900">{discountedFmt(primary.priceNum)}</span>
                    <span className="text-xs font-medium text-ink-400 line-through">{primary.price}</span>
                  </span>
                </div>
                <Link
                  href={`/out/${primary.slug}`}
                  target="_blank"
                  rel="noopener nofollow sponsored"
                  className="mt-3 block w-full rounded-md bg-brand-400 px-4 py-2.5 text-center text-sm font-bold text-ink-900 hover:bg-brand-300"
                >
                  Buy {it.name.split(' ')[0]} →
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((it, idx) => (
          <button
            key={it.slug}
            onClick={() => setI(idx)}
            aria-label={`Show ${it.name}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === i ? 'w-8 bg-brand-500' : 'w-2 bg-ink-300 hover:bg-ink-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
