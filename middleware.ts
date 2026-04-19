import { NextRequest, NextResponse } from 'next/server'
import { legacyVariantRedirects } from '@/lib/catalog'

// Legacy per-size product URLs redirect to their consolidated parent URL.
// Variant slugs still resolve at /out/[slug] for the affiliate redirect, but
// the consumer-facing /products/{variant-slug} page is gone — every size
// lives on /products/{parent-slug}.
const PRODUCT_REDIRECTS = new Map<string, string>(
  legacyVariantRedirects().map((r) => [r.from, r.to]),
)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const m = pathname.match(/^\/products\/([^/]+)\/?$/)
  if (!m) return NextResponse.next()
  const parentSlug = PRODUCT_REDIRECTS.get(m[1])
  if (!parentSlug) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = `/products/${parentSlug}`
  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ['/products/:slug'],
}
