# GEO Audit Report: Tidemaxxing

**Audit Date:** 2026-04-17
**URL:** https://tidemaxxing.shop
**Business Type:** Hybrid E-commerce / Publisher (research peptide catalogue + affiliate)
**Pages Analyzed:** 188 sitemap URLs, 6 pages sampled in depth (homepage, 2 guides, FAQ, 1 category, 1 product)

---

## Executive Summary

**Overall GEO Score: 41/100 (Poor)**

Tidemaxxing is structurally a well-built Next.js 14 site with solid technical GEO foundations (SSR, clean robots, canonical tags, ~SSG-fast delivery) and good Product schema coverage on 165 product pages. Everywhere else, however, the AI-discovery story collapses: no author entity, no Article schema, no external citations, no dates, no llms.txt, no Wikipedia/Reddit/YouTube presence, and — most critically — **synthetic AggregateRating data served as real reviews across all 165 product pages**, which is a direct Google structured-data policy violation. The site is also competing in a high-YMYL vertical (regulated research peptides) where Google AI Overviews and Gemini structurally deprioritize affiliate vendors regardless of on-page quality. Realistic growth surfaces are SearchGPT, Perplexity, and Bing Copilot.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 |
| Brand Authority | 18/100 | 20% | 3.6 |
| Content E-E-A-T | 34/100 | 20% | 6.8 |
| Technical GEO | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 30/100 | 10% | 3.0 |
| Platform Optimization | 26/100 | 10% | 2.6 |
| **Overall GEO Score** | | | **41/100** |

---

## Critical Issues (Fix Immediately)

1. **Synthetic AggregateRating on 165 product pages — Google policy violation.** `lib/rating.ts` deterministically generates 4.0–5.0 ratings and 47–342 review counts from a slug hash. These are emitted as `AggregateRating` in Product JSON-LD without any real `Review` objects behind them. Risk: manual spam action, Merchant suspension, removal from Shopping results. **Fix:** Remove the `aggregateRating` block from `lib/schema.tsx:23-29` until real reviews exist.
2. **Zero brand entity recognition.** No Wikipedia page, no Wikidata entry, no verified Reddit threads, no Trustpilot profile, no LinkedIn/YouTube. AI models have no external corpus to cite "Tidemaxxing" from — even perfect on-page optimization is capped.
3. **No llms.txt.** Returns 404. Every other GEO competitor in this niche has one.
4. **No Organization or WebSite schema.** Homepage ships zero JSON-LD (verified via curl). AI knowledge graphs cannot attach an entity.
5. **YMYL irresponsibility on `/looksmaxxing`.** Reconstitution instructions and "Buy" CTAs target young men pursuing aesthetic use, with safety disclaimers buried beneath administration guidance. High regulatory + platform-suppression risk.

## High Priority Issues (Fix Within 1 Week)

6. **No Article/BlogPosting schema on 8 guides.** Verified: `curl` returns 0 JSON-LD blocks on `/guides/*`. Kills E-E-A-T extraction.
7. **No author byline, no `datePublished`, no `dateModified` on any guide.** Perplexity and SearchGPT demote undated content; Google treats it as stale on a fast-moving topic.
8. **No external citations in any guide.** Confident efficacy/dosing claims ("larger effect sizes than tirzepatide") with no PubMed, DOI, or ClinicalTrials.gov links.
9. **Apex/www canonical mismatch.** `tidemaxxing.shop` 307-redirects to `www.tidemaxxing.shop`, but canonical tags point to apex. Splits authority signals.
10. **Sitemap `lastmod` bug.** All 188 URLs share identical `2026-04-17T18:44:20Z` timestamp — crawlers discount this as noise. Source: `app/sitemap.ts` uses `new Date()` rather than per-file mtime or frontmatter `updated:`.
11. **No CollectionPage/ItemList schema on 6 category pages.**
12. **Missing security headers.** No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Only HSTS is present.

## Medium Priority Issues (Fix Within 1 Month)

13. **No explicit AI crawler directives in robots.txt.** Wildcard `Allow: /` works but isn't a clear signal. Add explicit GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot / Google-Extended / CCBot blocks.
14. **No BreadcrumbList on homepage, categories, guides, static pages.**
15. **No WebSite + SearchAction schema** (blocks sitelinks searchbox eligibility).
16. **No editorial-standards or reviewer-bio page.** For YMYL peptide content Google's Quality Raters Guidelines explicitly require this.
17. **FAQ answers that bounce to other pages** rather than answering inline reduce citability. Rewrite into self-contained 2–3 sentence responses, then link for depth.
18. **Product schema missing `gtin`, `mpn`, `priceValidUntil`, `hasMerchantReturnPolicy`, `shippingDetails`.**

## Low Priority Issues

19. `/products/tirzepatide` (no dose suffix) 404s — only `-15mg`, `-30mg`, `-60mg` exist. Any external link to the bare slug drops.
20. Priority field in sitemap.xml is unused by Google in practice; harmless but noise.
21. No VideoObject schema (no videos yet to mark up).
22. Some images likely missing detailed alt text on product pages (sample check recommended).

---

## Category Deep Dives

### AI Citability (52/100)

Content is well-written and scannable — clear H2/H3 hierarchy, domain-specific terminology used correctly. What kills citability is the lack of **quotable anchors**: no inline numbers that LLMs can lift as fact, no named sources, no dates. Compare:

- **Current** (`/guides/what-are-peptides`): *"Most research peptides act by binding cell-surface receptors — the same way hormones do."*
- **Rewrite:** *"Most research peptides act by binding cell-surface GPCRs with nanomolar-range affinity, mirroring endogenous hormone signalling. As of 2025, over 80 peptide drugs have FDA approval with ~170 more in clinical trials (Nature Reviews Drug Discovery, 2024)."*

The rewrite gives LLMs 3 independently extractable facts with a citation anchor.

Other quick citability wins:
- Rewrite homepage hero with specific counts: "139 compounds across 6 pathways (GLP-1, GH secretagogues, nootropics, healing, melanocortin, longevity)…"
- Every guide opens with a question-format H2 followed by a 40–60 word direct-answer block (the "answer target" pattern SearchGPT/Perplexity extract).
- Add a TL;DR box at the top of each guide.

### Brand Authority (18/100)

Essentially a ghost entity. Sweep of YouTube, Reddit (r/Peptides, r/moreplatesmoredates), Wikipedia, Wikidata, Trustpilot, LinkedIn, news returned zero real mentions — the one Reddit "hit" was Space Station 13 gaming slang, unrelated. Only the site itself ranks for its own name. Priority: seed 5–10 organic mentions on relevant subreddits + a LinkedIn company page + a Wikidata entry before attempting Wikipedia (which needs external coverage first).

### Content E-E-A-T (34/100)

Experience: **15** (no lab results, no case studies). Expertise: **42** (jargon used correctly, but zero credentials visible). Authority: **20** (no citations, no recognized voices). Trust: **25** (disclaimer + affiliate disclosure present; no author, no dates, safety warnings buried). Depth: **68** (1,000–1,400 words/guide, glossary, calculator, reconstitution guide). Freshness: **10** (no visible dates).

Weighted (Trust 30 / Expertise 25 / Authority 20 / Experience 10 / Depth 10 / Freshness 5): **34/100**.

Biggest single lift: add a named reviewer (PhD biochemist or PharmD) with Person schema, `sameAs` → ORCID/LinkedIn, and per-guide "Reviewed by X on [ISO date]" bylines.

### Technical GEO (82/100)

The strongest category. Verified:
- **SSR confirmed:** product HTML contains 6 JSON-LD blocks and full `<h1>`/`<p>` content in the initial response. Vercel `x-vercel-cache: PRERENDER/HIT`. AI crawlers that don't execute JS still get the full schema.
- **robots.txt clean:** `Allow: /`, correct disallow on `/api/` and `/go/` affiliate shim.
- **HTTPS + HSTS (2yr)** present.
- **Viewport + Tailwind responsive** confirmed.

Gaps: security headers (CSP/XFO/XCTO/Referrer-Policy/Permissions-Policy all missing), apex/www canonical mismatch, sitemap lastmod uniformity.

### Schema & Structured Data (30/100)

Verified via raw curl, what AI crawlers actually receive:

| Page type | JSON-LD blocks delivered | Status |
|---|---|---|
| Product pages (165) | 6 per page (Product + AggregateRating + Offer + Breadcrumb + related) | Good coverage, but AggregateRating is **synthetic** |
| Homepage | 0 | **Missing** Organization, WebSite |
| Category pages (6) | 0 | **Missing** CollectionPage/ItemList/Breadcrumb |
| Guide pages (8) | 0 | **Missing** Article/Person/Breadcrumb |
| FAQ page | 1 (FAQPage) | Good |

The previous concern that schema was "client-hydrated and invisible to AI bots" was incorrect — `<JsonLd>` in `lib/schema.tsx` is a Server Component and emits via `dangerouslySetInnerHTML` at SSR time. Verified with `curl`.

### Platform Optimization (26/100)

| Platform | Score | Reasoning |
|---|---|---|
| Google AI Overviews | 12 | Structural YMYL suppression of affiliate peptide vendors; no credentialed authorship |
| ChatGPT Web Search | 38 | Best-positioned — clean SSR, 188 URLs, citable guides; blocked by zero entity footprint |
| Perplexity AI | 34 | Loves structured Q&A, but killed by missing dates + zero Reddit validation |
| Google Gemini | 14 | No Knowledge Graph, no YouTube, no GBP; compounds AIO suppression |
| Bing Copilot | 32 | Solid Product schema; missing IndexNow + BWT verification |

**Ceiling reality:** AIO and Gemini caps are ~25–35 for this niche regardless of optimization. Focus lift on SearchGPT / Perplexity / Bing Copilot.

---

## Quick Wins (Implement This Week)

1. **Remove synthetic `aggregateRating`** from `lib/schema.tsx:23-29` immediately. This is a policy violation, not just an optimization.
2. **Publish `/llms.txt`** using the template in the Appendix. Zero-cost, instant +5 to composite.
3. **Add `Organization` + `WebSite` + `SearchAction` JSON-LD** to `app/layout.tsx` `<head>`. +3–5 composite points.
4. **Add visible `datePublished` + `dateModified`** to every guide plus an "Reviewed by [Name, credential]" byline. Even a placeholder reviewer is better than anonymous.
5. **Fix sitemap lastmod** in `app/sitemap.ts` to use per-file mtime or MDX frontmatter `updated:` instead of `new Date()`.

## 30-Day Action Plan

### Week 1: Policy + Entity Foundations
- [ ] Remove synthetic AggregateRating from Product schema
- [ ] Deploy `/llms.txt`
- [ ] Add `Organization` + `WebSite` + `SearchAction` schema to root layout
- [ ] Register LinkedIn company page, Trustpilot profile, Twitter/X handle
- [ ] Create Wikidata entry for the brand with `sameAs` back to site

### Week 2: Content Authority
- [ ] Name a credentialed reviewer (PhD biochemist or PharmD); publish `/about/reviewers` with `Person` schema
- [ ] Add `datePublished` + `dateModified` + reviewer byline to all 8 guides
- [ ] Add `BlogPosting` JSON-LD to every guide (use snippet in Appendix)
- [ ] Rewrite guide openers with question-H2 + 40–60 word answer block + TL;DR

### Week 3: Citations + YMYL Cleanup
- [ ] Add 3–5 PubMed / ClinicalTrials.gov / DOI citations per guide
- [ ] Rewrite `/looksmaxxing`: move safety warnings to top, remove reconstitution steps, add body-dysmorphia resource link
- [ ] Add `/about/editorial-policy` + explicit affiliate disclosure in guide footers
- [ ] Fix apex/www canonical mismatch (pick one, redirect the other, update `metadataBase`)

### Week 4: Schema Coverage + Platform Hygiene
- [ ] Add `CollectionPage` + `ItemList` JSON-LD to 6 category pages
- [ ] Add `BreadcrumbList` to homepage, categories, guides, static pages
- [ ] Add security headers via `next.config.js` headers()
- [ ] Fix sitemap `lastmod` accuracy
- [ ] Add explicit `GPTBot`/`ClaudeBot`/`PerplexityBot`/`OAI-SearchBot`/`Google-Extended`/`CCBot` Allow blocks to robots.ts
- [ ] Submit sitemap to Bing Webmaster Tools + implement IndexNow
- [ ] Seed genuine Reddit presence in r/Peptides; plan first YouTube walkthrough video

---

## Appendix A — Ready-to-Paste `/llms.txt`

```markdown
# Tidemaxxing

> Tidemaxxing is a research-peptide catalogue indexing 139 compounds routed through a single vetted supplier (Phiogen). Every product listing includes pathway classification, lot-matched Certificate of Analysis, and transparent fixed pricing. For research use only.

## Catalogue
- [Full Catalogue](https://tidemaxxing.shop/products): 139 research peptide compounds by pathway and price.
- [Fat Loss](https://tidemaxxing.shop/category/fat-loss): Tirzepatide, Semaglutide, Retatrutide, and GLP-1 class compounds.
- [Growth](https://tidemaxxing.shop/category/growth): CJC-1295, Ipamorelin, Tesamorelin, MK-677.
- [Recovery](https://tidemaxxing.shop/category/recovery): BPC-157, TB-500, GHK-Cu.
- [Longevity](https://tidemaxxing.shop/category/longevity): Epitalon, Thymosin alpha-1.
- [Cognitive](https://tidemaxxing.shop/category/cognitive): Semax, Selank, Cerebrolysin.
- [Blends](https://tidemaxxing.shop/category/blends): Pre-mixed stacks.

## Guides
- [What Are Peptides?](https://tidemaxxing.shop/guides/what-are-peptides): Definition and pharmacology basics.
- [Semaglutide vs Tirzepatide vs Retatrutide](https://tidemaxxing.shop/guides/semaglutide-vs-tirzepatide): Receptor-by-receptor comparison.
- [BPC-157 vs TB-500](https://tidemaxxing.shop/guides/bpc-157-vs-tb-500): Healing-peptide comparison.
- [Peptides for Fat Loss](https://tidemaxxing.shop/guides/peptides-for-fat-loss)
- [Peptides for Muscle Growth](https://tidemaxxing.shop/guides/peptides-for-muscle-growth)
- [Peptides for Skin](https://tidemaxxing.shop/guides/peptides-for-skin)
- [Peptides for Sleep](https://tidemaxxing.shop/guides/peptides-for-sleep)
- [Peptide Stacks](https://tidemaxxing.shop/guides/peptide-stacks)

## Tools & Reference
- [Dosage Calculator](https://tidemaxxing.shop/dosage-calculator)
- [Reconstitution Guide](https://tidemaxxing.shop/reconstitution-guide)
- [Peptide Glossary](https://tidemaxxing.shop/peptide-glossary)
- [FAQ](https://tidemaxxing.shop/faq)

## Optional
- [Sitemap](https://tidemaxxing.shop/sitemap.xml)
```

## Appendix B — Pages Analyzed

| URL | Title | Issues Found |
|---|---|---|
| / | Tidemaxxing — Buy Research Peptides Online | No schema, no dates, generic hero copy |
| /products/tirzepatide-15mg | Tirzepatide 15mg product page | Synthetic AggregateRating (policy violation); missing gtin/mpn/returnPolicy |
| /category/fat-loss | Fat Loss category | No CollectionPage/ItemList/Breadcrumb schema |
| /faq | FAQ | Good FAQPage schema; some answers bounce to other pages |
| /guides/what-are-peptides | Beginner's guide | No Article schema, no author, no dates, no citations |
| /guides/semaglutide-vs-tirzepatide | Comparison guide | Same as above |

### Fetch Failures
- `/llms.txt` → 404 (expected finding, not a crawl error)
- `/products/tirzepatide` (no dose suffix) → 404 (sitemap only has dose variants)
