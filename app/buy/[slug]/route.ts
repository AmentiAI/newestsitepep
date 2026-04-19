import { NextResponse } from 'next/server'
import { parents, findVariant } from '@/lib/catalog'
import { SITE } from '@/lib/site'

// Buy-button affiliate redirect. Each variant's affiliateUrl points to the
// matching product page on the supplier site (e.g. phiogen.is/products/<slug>).
// Parent slugs fall through to the parent's default variant. The path is
// /buy/* rather than /out/* or /go/* because those paths are on common
// ad-blocker blocklists (EasyPrivacy, uBlock Origin) which silently drop
// the click before the redirect fires. "shop" is the sitewide shop-root key.

const PARENT_DEFAULT = new Map<string, string>(
  parents.map((p) => [p.slug, p.defaultVariant.affiliateUrl]),
)

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  if (params.slug === 'shop') {
    return NextResponse.redirect(SITE.shopUrl, {
      status: 302,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }
  const variantHit = findVariant(params.slug)
  const dest =
    variantHit?.variant.affiliateUrl ??
    PARENT_DEFAULT.get(params.slug) ??
    SITE.shopUrl
  return NextResponse.redirect(dest, {
    status: 302,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
