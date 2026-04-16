import { NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { SITE } from '@/lib/site'

const AFFILIATE_MAP: Record<string, string> = {
  shop: SITE.shopUrl,
  ...Object.fromEntries(products.map((p) => [p.slug, p.affiliateUrl])),
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const dest = AFFILIATE_MAP[params.slug] ?? SITE.shopUrl
  return NextResponse.redirect(dest, {
    status: 302,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
