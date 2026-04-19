import { NextResponse } from 'next/server'
import { parents, resolveSlug } from '@/lib/catalog'
import { SITE } from '@/lib/site'

// Legacy affiliate redirect path. New per-variant redirects live at
// /out/[slug]. /go/[slug] is kept for older internal links — it resolves
// parent slugs to the parent's default variant, variant slugs to the
// variant's own affiliate URL, and the special "shop" key to SITE.shopUrl.

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
  const hit = resolveSlug(params.slug)
  const dest =
    hit?.variant?.affiliateUrl ??
    (hit?.parent ? PARENT_DEFAULT.get(hit.parent.slug) : undefined) ??
    SITE.shopUrl
  return NextResponse.redirect(dest, {
    status: 302,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
