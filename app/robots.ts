import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Applebot-Extended',
  'Bytespider',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'cohere-ai',
  'DuckAssistBot',
  'Timpibot',
  'Diffbot',
  'Amazonbot',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/go/', '/out/', '/buy/'] },
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: ['/api/', '/go/', '/out/', '/buy/'],
      })),
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    host: SITE.baseUrl,
  }
}
