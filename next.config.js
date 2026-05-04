/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Security headers — applied to every response. CSP is intentionally permissive
  // for first-party assets; tightening it (script-src self only) would require
  // moving any inline scripts (Next.js sometimes injects small ones for hydration)
  // to nonces, which is a bigger refactor. The other headers are zero-cost trust
  // signals that GEO/SEO crawlers and security scanners look for.
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // Next.js injects inline runtime scripts during hydration; allow them.
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join('; '),
      },
    ]
    return [
      { source: '/:path*', headers: securityHeaders },
    ]
  },
}

module.exports = nextConfig
