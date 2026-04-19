'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { parents } from '@/lib/catalog'
import { discountedFmt } from '@/lib/price'

type Row = {
  slug: string
  name: string
  category: string
  price: string
  image: string
  nameLower: string
  tokens: string[]
  tags: string[]
  variantCount: number
}

// Index at module scope — parents are stable across renders. Variant names
// flow into `tokens` so a search for "15mg" still hits the parent Tirzepatide.
const INDEX: Row[] = parents.map((p) => {
  const variantTokens = p.variants.flatMap((v) =>
    v.name.toLowerCase().split(/[\s\-\/(),]+/).filter(Boolean),
  )
  const nameTokens = p.name.toLowerCase().split(/[\s\-\/(),]+/).filter(Boolean)
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: discountedFmt(p.cheapest.priceNum),
    image: p.image,
    nameLower: p.name.toLowerCase(),
    tokens: Array.from(new Set([...nameTokens, ...variantTokens])),
    tags: (p.tags ?? []).map((t) => t.toLowerCase()),
    variantCount: p.variants.length,
  }
})

function lev(a: string, b: string, cap = 3) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1
  const m = a.length
  const n = b.length
  const dp: number[] = Array(n + 1)
  for (let j = 0; j <= n; j++) dp[j] = j
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    let rowMin = dp[0]
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j]
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = tmp
      if (dp[j] < rowMin) rowMin = dp[j]
    }
    if (rowMin > cap) return cap + 1
  }
  return dp[n]
}

function scoreToken(row: Row, token: string): number {
  if (!token) return 0
  if (row.nameLower === token) return 1000
  if (row.nameLower.startsWith(token)) return 600
  let best = 0
  for (const t of row.tokens) {
    if (t === token) best = Math.max(best, 550)
    else if (t.startsWith(token)) best = Math.max(best, 420)
    else if (t.includes(token)) best = Math.max(best, 260)
    else if (token.length >= 4) {
      const d = lev(t, token, 2)
      if (d === 1) best = Math.max(best, 200)
      else if (d === 2) best = Math.max(best, 120)
    }
  }
  if (row.nameLower.includes(token)) best = Math.max(best, 180)
  if (row.category.toLowerCase().includes(token)) best = Math.max(best, 90)
  for (const tag of row.tags) {
    if (tag === token) best = Math.max(best, 150)
    else if (tag.includes(token)) best = Math.max(best, 70)
  }
  return best
}

function search(q: string): Row[] {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []
  const scored: Array<{ row: Row; score: number }> = []
  for (const row of INDEX) {
    let total = 0
    let missed = false
    for (const tok of tokens) {
      const s = scoreToken(row, tok)
      if (s === 0) {
        missed = true
        break
      }
      total += s
    }
    if (!missed) scored.push({ row, score: total })
  }
  scored.sort((a, b) => b.score - a.score || a.row.name.length - b.row.name.length)
  return scored.slice(0, 8).map((x) => x.row)
}

export default function ProductSearch({ className = '' }: { className?: string }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => (q.trim() ? search(q.trim()) : []), [q])

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
          placeholder={`Search ${parents.length} peptides…`}
          aria-label="Search peptides"
          className="w-full rounded-md border-2 border-ink-200 bg-white pl-9 pr-3 py-2 text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:border-brand-400 focus:outline-none"
        />
      </div>

      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border-2 border-ink-200 bg-white shadow-xl">
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-ink-500">
              No matches for <span className="font-semibold text-ink-900">"{q}"</span>. Try a
              compound family like "bpc" or "tirzepatide".
            </div>
          ) : (
            <ul className="max-h-[70vh] overflow-y-auto">
              {results.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm ${
                      i === active ? 'bg-brand-50' : 'hover:bg-ink-50'
                    }`}
                  >
                    <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md border border-ink-200 bg-ink-50">
                      <Image
                        src={r.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink-900">
                        {r.name}
                        {r.variantCount > 1 && (
                          <span className="ml-2 text-xs font-medium text-ink-500">
                            · {r.variantCount} sizes
                          </span>
                        )}
                      </span>
                      <span className="block text-xs font-bold uppercase tracking-wide text-brand-600">
                        {r.category}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-ink-900">
                      {r.variantCount > 1 ? `from ${r.price}` : r.price}
                    </span>
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
            Browse all {parents.length} compounds →
          </Link>
        </div>
      )}
    </div>
  )
}
