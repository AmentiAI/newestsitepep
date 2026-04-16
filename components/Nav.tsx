'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SITE } from '@/lib/site'
import ProductSearch from './ProductSearch'

const LINKS = [
  { href: '/products', label: 'Catalogue' },
  { href: '/looksmaxxing', label: 'Looksmaxxing' },
  { href: '/guides', label: 'Guides' },
  { href: '/dosage-calculator', label: 'Calculator' },
  { href: '/peptide-glossary', label: 'Glossary' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-4 border-brand-400 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 sm:py-5 md:py-6 lg:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={44}
            height={44}
            className="h-9 w-9 rounded-full object-contain sm:h-11 sm:w-11"
            priority
          />
          <span className="text-xl font-black tracking-tight text-ink-900 sm:text-2xl">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop search — center */}
        <div className="hidden flex-1 md:block lg:max-w-md xl:max-w-lg">
          <ProductSearch />
        </div>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-5 text-base font-semibold text-ink-700 lg:flex xl:gap-7">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-600">
              {l.label}
            </Link>
          ))}
          <Link
            href="/go/shop"
            target="_blank"
            rel="noopener nofollow sponsored"
            className="rounded-md bg-brand-400 px-5 py-2.5 font-bold text-ink-900 hover:bg-brand-300"
          >
            Shop →
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-ink-200 text-ink-900 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile search */}
      <div className="border-t border-ink-100 bg-white px-4 py-3 sm:px-6 md:hidden">
        <ProductSearch />
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-ink-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 text-base font-semibold text-ink-800">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-100 py-3 hover:text-brand-600"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/go/shop"
              target="_blank"
              rel="noopener nofollow sponsored"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 rounded-md bg-brand-400 px-5 py-3 text-center font-bold text-ink-900"
            >
              Shop →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
