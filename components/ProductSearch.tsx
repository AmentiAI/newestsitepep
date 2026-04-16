'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { discountedFmt } from '@/lib/price'

const INDEX = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: discountedFmt(p.priceNum),
  haystack: `${p.name} ${p.category} ${p.tags?.join(' ') ?? ''}`.toLowerCase(),
}))

export default function ProductSearch({ className = '' }: { className?: string }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return INDEX.filter((p) => p.haystack.includes(term)).slice(0, 8)
  }, [q])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => setActive(0), [q])

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      window.location.href = `/products/${results[active].slug}`
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search 139 peptides…"
          aria-label="Search peptides"
          className="w-full rounded-md border-2 border-ink-200 bg-white pl-9 pr-3 py-2 text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:border-brand-400 focus:outline-none"
        />
      </div>

      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border-2 border-ink-200 bg-white shadow-lg">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-ink-500">No matches for "{q}"</div>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${
                      i === active ? 'bg-brand-50' : 'hover:bg-ink-50'
                    }`}
                  >
                    <span>
                      <span className="font-semibold text-ink-900">{r.name}</span>
                      <span className="ml-2 text-xs font-bold uppercase tracking-wide text-brand-600">
                        {r.category}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-ink-900">{r.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="block border-t border-ink-200 bg-ink-50 px-4 py-2 text-center text-xs font-bold text-brand-600 hover:bg-ink-100"
          >
            Browse all 139 compounds →
          </Link>
        </div>
      )}
    </div>
  )
}
