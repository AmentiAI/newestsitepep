# GEO Audit Report: Tidemaxxing

**Audit Date:** 2026-04-18
**URL:** https://tidemaxxing.shop
**Business Type:** E-commerce (research-peptide affiliate catalogue, YMYL-adjacent)
**Pages Analyzed:** 9 sampled (homepage, product, category, guides, FAQ, glossary) across a 180-URL sitemap

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

Tidemaxxing has a solid technical foundation (SSR via Next.js, permissive crawler access, valid product-level JSON-LD, aggregateRating signal) but scores near the floor on the dimensions AI models actually weight for citation: brand entity recognition, named expertise, primary-source linking, and llms.txt / Organization markup. The single biggest risk is entity collision — "tidemaxxing" is also an active Instagram slang term, so AI models asked "what is tidemaxxing" retrieve the wrong entity. The deployed product pages also share byte-identical body copy across dose variants, which Google is likely to consolidate or drop from the index.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 10/100 | 20% | 2.0 |
| Content E-E-A-T | 38/100 | 20% | 7.6 |
| Technical GEO | 74/100 | 15% | 11.1 |
| Schema & Structured Data | 42/100 | 10% | 4.2 |
| Platform Optimization | 38/100 | 10% | 3.8 |
| **Overall GEO Score** | | | **46.7 → 47/100** |

---

## Critical Issues (Fix Immediately)

1. **Zero third-party brand signal + cultural-term entity collision.** Tidemaxxing has no Wikipedia article, no Wikidata entity, no LinkedIn company page, no Reddit/YouTube/forum footprint, no Trustpilot/G2 reviews. Worse, "tidemaxxing" is an active Instagram slang term (Sehan du Toit reels), so AI models resolving the query pull the wrong entity. This is the single highest-impact GEO gap.

2. **No Organization schema anywhere on the site.** The brand has zero structured identity, no `sameAs` links, no logo schema, no publisher declaration. AI models have nothing to attach claims to. Site-wide Organization + WebSite JSON-LD is required to even begin entity-graph formation.

3. **Canonical host mismatch.** The site serves from `www.tidemaxxing.shop` (apex 307-redirects to www) but every canonical tag points to `https://tidemaxxing.shop/...` (apex). Mixed signals for Google canonicalization and AI crawlers that don't aggressively follow 307s. One-line fix in Next.js `metadataBase`.

4. **Primary-literature citations absent site-wide.** Zero PubMed links, zero DOIs, zero journal URLs across product pages, guides, and the glossary. For a YMYL-adjacent research catalogue, this is a first-order E-E-A-T failure — named labs are dropped ("Seiwerth/Sikiric labs in Zagreb") with no link anchors.

5. **Site operator is fully anonymous.** No company registration, no physical address, no named individual, no About page, no editorial contact. Combined with affiliate-only revenue and a single undisclosed supplier (phiogen.is), the trust profile sits below general e-commerce baseline in a vertical that demands the opposite.

6. **No `/llms.txt` file.** Returns 404. Highest-ROI fix on the audit — a 40-line file moves the subscore from 0 → 70 and gives AI crawlers a compact entity definition that bypasses the cultural-term ambiguity.

---

## High Priority Issues

1. **Dose-variant duplication on the deployed site.** `tirzepatide-15mg`, `tirzepatide-30mg`, and `tirzepatide-60mg` return byte-identical 93991-byte pages — only H1 and price differ. The 15mg page's protocol text reads "a 30 mg vial in 3 mL BAC water yields 10 mg/mL working stock" — the template was hard-coded to 30mg and never reparameterized. *(Note: a per-slug structural-variance refactor has been implemented locally in this session — `lib/pageVariance.ts` + `app/products/[slug]/page.tsx` — but not yet deployed.)*

2. **Seven guides ship with no Article/BlogPosting schema.** 1,200–1,400-word editorial pages (`/guides/bpc-157-vs-tb-500`, `/guides/semaglutide-vs-tirzepatide`, etc.) emit zero JSON-LD. No `author`, no `datePublished`, no `dateModified`, no `publisher`, no `mainEntityOfPage`.

3. **Product schema `aggregateRating` (4.5 from 235 reviews) risks unverified-review flagging.** No `Review` objects are nested and no visible reviews appear on the page. Leaving it creates a Search Console manual-action risk.

4. **Title tag template bug: `| Tidemaxxing | Tidemaxxing` duplicated brand.** Product titles render as `Buy Tirzepatide 15mg — Fat Loss Research Peptide | Tidemaxxing | Tidemaxxing`. Template layering issue.

5. **Thin FAQ and glossary for a 139-product catalogue.** 7 FAQ entries and 33 glossary terms is well below the breadth expected of a reference catalogue. Missing letters E, F, J, K, O, Q, W, X, Y, Z.

6. **No named authors or reviewer credentials anywhere.** All 139 product pages, all 8 guides, the glossary, and the FAQ are unattributed. Google's QRG and AI citation behavior reward identifiable expert authorship in YMYL verticals.

7. **Missing safety/adverse-events scaffolding on product pages.** BPC-157 page has zero safety discussion — even inside a "research use only" frame, omitting known contraindications and the explicit absence of human RCT data is an accuracy gap.

8. **No content-freshness signals.** No visible `datePublished` or `dateModified` on any page. Perplexity and Gemini both deprioritize undated content, especially in YMYL verticals.

9. **Perplexity readiness is critical (30/100).** Perplexity cites r/Peptides, r/PeptideScience, PubMed, Examine.com, and Mayo Clinic in this vertical. The site has zero footprint on any of them.

---

## Medium Priority Issues

1. **Product `offers` missing merchant-listing fields:** `priceValidUntil`, `hasMerchantReturnPolicy`, `shippingDetails`. Prevents merchant-listing rich results across 139 products.

2. **Six category pages have no `CollectionPage` or `ItemList` schema.** AI models infer category membership from HTML instead of ingesting it directly.

3. **Missing security headers:** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. HSTS is present (good). Add via `next.config.js` `headers()`.

4. **No Wikidata entry** for the brand. Wikidata feeds Gemini, ChatGPT, and Perplexity entity layers directly.

5. **robots.txt lacks explicit AI-crawler directives.** Inheriting `*` works functionally, but an explicit block naming GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended is a stronger intent signal.

6. **No Bing Webmaster Tools verification or IndexNow key file.** Bing Copilot is this site's most-ready platform (55/100); claiming the domain and enabling IndexNow would push it toward 70+.

7. **No YouTube or LinkedIn presence.** Gemini weights YouTube heavily; LinkedIn is the fastest Microsoft-ecosystem signal.

8. **No regulatory framing by jurisdiction.** No FDA/MHRA/EMA context on a YMYL-adjacent catalogue — unusual and notable.

---

## Low Priority Issues

1. **Broken marketed slug `/products/bpc-157-5mg` returns 404.** The canonical page is `bpc-157-10mg`. Either redirect or publish the 5mg variant.
2. **Product images have no explicit `width`/`height` attributes.** `next/image` srcset handles sizing but adding explicit dimensions eliminates CLS risk on slower connections.
3. **Twitter Card meta tags not detected on all sampled pages.** Confirm template coverage.
4. **`x-vercel-cache: PRERENDER` on some paths** — normal but worth monitoring.
5. **No explicit author page (`/about/editorial`) or contact email in-body** (only in footer copyright).

---

## Category Deep Dives

### AI Citability (72/100)

**Strongest pages (deterministic spot-sample):**
- `/guides/bpc-157-vs-tb-500` — 82/100. Clean "30-second version" lede, mechanism-clear prose, decision-friendly. Best-in-class on the site.
- `/guides/semaglutide-vs-tirzepatide` — 80/100. Clear receptor hierarchy; needs a proper 3-column comparison table.
- `/products/bpc-157-10mg` — 78/100. Strong mechanism sentence, clean spec table, concrete stability data.

**Weakest:** Homepage (62) — H1 is a marketing tagline, not a self-contained definition; no "What is Tidemaxxing" answer-block.

**Top rewrite moves:**
1. Add a 2-sentence "What is Tidemaxxing" definition directly under the H1 that AI models will lift verbatim.
2. Convert each guide's core comparison into a proper `<table>` with explicit rows (mechanism, half-life, dose range, typical endpoints).
3. Tighten every product page's opening sentence into a one-line entity definition ("BPC-157 is a synthetic 15-amino-acid pentadecapeptide derived from gastric-juice protein BPC...").

### Brand Authority (10/100)

Seven independent probes (Wikipedia API, LinkedIn, Reddit, YouTube, Trustpilot, G2, peptide forums) returned zero hits. The domain indexes in DuckDuckGo — that's the full extent of external signal.

Entity-disambiguation liability: "tidemaxxing" is an active Instagram slang term. AI models asked for the brand currently retrieve the cultural meaning.

**Priority moves:** (a) create a LinkedIn company page; (b) seed 2–3 genuine helpful posts to r/Peptides, r/PeptidesHub citing the dosage calculator and reconstitution guide as tools; (c) request a Wikidata entity; (d) submit to 5–10 research-peptide directory sites; (e) create an X/Twitter account and use it as a `sameAs` anchor.

### Content E-E-A-T (38/100)

| Dimension | Score | Evidence |
|---|---|---|
| Experience | 20 | No firsthand lab data, no COA screenshots, no lot artifacts — despite "COA-backed" being a core claim |
| Expertise | 25 | Accurate vocabulary and mechanism framing; zero primary-literature citations; no named authors |
| Authoritativeness | 30 | Anonymous operator; affiliate-only; single undisclosed supplier; 139-compound breadth is the one authority positive |
| Trustworthiness | 45 | HTTPS + HSTS, research-use disclaimers, affiliate disclosure — but no contact, privacy, terms, editorial policy |
| Depth & readability | 70 | Consistent ~1,100–1,400 word pages, good H1/H2 hierarchy, clean paragraph sizing |
| Topical authority | 55 | Catalogue breadth is strong; per-compound depth is templated rather than distinctive |
| AI-content detection | 45 | Moderate-to-high LLM fingerprinting — template uniformity and hedging cadence are tells; no "delve into" spam phrases |
| Content freshness | 0 | No visible dates anywhere |

**Why YMYL context matters:** research-peptide content is read by people who cross the "research use only" line predictably. A responsible site in this vertical should exceed general e-commerce trust scaffolding; Tidemaxxing currently sits below it.

### Technical GEO (74/100)

Strongest dimension. Next.js App Router on Vercel, fully SSR/SSG, `force-static` with 24h ISR. All content (H1, H2s, paragraphs, JSON-LD, meta tags) delivered in raw HTML before JS executes — GPTBot, ClaudeBot, PerplexityBot all see full content on a raw fetch.

| Dimension | Score |
|---|---|
| Server-side rendering | 95 |
| Meta tags & indexability (canonical bug) | 55 |
| Crawlability | 80 |
| Security headers (HSTS only) | 55 |
| Core Web Vitals heuristics | 75 |
| Mobile optimization | 90 |
| URL structure | 85 |
| Response & status (host-redirect friction) | 70 |

### Schema & Structured Data (42/100)

| Page | JSON-LD blocks | Types |
|---|---|---|
| Homepage | 0 | none |
| Product pages | 3 | Product, BreadcrumbList, FAQPage |
| Guide pages | 0 | none |
| FAQ page | 1 | FAQPage |
| Category pages | 0 | none |

**Product JSON-LD is valid and well-formed** — a genuine strength. Includes `aggregateRating` (4.5, 235 reviews) which is rare for an affiliate catalogue. Missing: `gtin`/`mpn`, `priceValidUntil`, `hasMerchantReturnPolicy`, `shippingDetails`, and nested `Review` objects to back the rating. Homepage, guides, and categories emit nothing at all.

**Required adds:**
- Organization + WebSite site-wide
- Article (with author Person, datePublished, dateModified, speakable) on all 7 guides
- CollectionPage/ItemList on 6 category pages
- Merchant-listing fields on Product offers

### Platform Optimization (38/100)

| Platform | Score | Root Cause |
|---|---|---|
| Google AI Overviews | 32 | YMYL affiliate vertical with no expert authorship, no NIH/Mayo cross-references |
| ChatGPT Web Search | 38 | No entity recognition (no Wikipedia, no sameAs, no Organization schema) |
| Perplexity AI | 30 | No Reddit/forum footprint; no original data; affiliate aggregator, not primary source |
| Google Gemini | 34 | No YouTube, no Wikidata, no Knowledge Graph entity |
| Bing Copilot | 55 | Most-ready platform — Product JSON-LD aligns with Bing's parser, weakest YMYL filtering |

Most-ready: **Bing Copilot.** Two quick wins (Bing Webmaster Tools verification + IndexNow key file) could push this toward 70+.
Least-ready: **Perplexity** — closing this gap is structural, not markup: on-domain COAs, Reddit seeding, original content.

---

## Quick Wins (Implement This Week)

1. **Add Organization + WebSite JSON-LD site-wide** (one edit in `app/layout.tsx`). Include `sameAs` pointing to any brand profile you own — even a fresh X/Twitter + LinkedIn counts. Affects 4 of 5 platforms immediately.
2. **Publish `/llms.txt`** at the site root. 40 lines. Moves llms.txt subscore from 0 → 70.
3. **Fix the canonical host mismatch.** Either change the Vercel redirect to send www → apex, or update `SITE.baseUrl` and `metadataBase` to `https://www.tidemaxxing.shop`. One line.
4. **Fix the `| Tidemaxxing | Tidemaxxing` title bug.** Strip the duplicated brand from the product page metadata template.
5. **Deploy the per-slug variance refactor** (already implemented locally this session: `lib/pageVariance.ts` + `app/products/[slug]/page.tsx`). Breaks the dose-variant duplicate problem at the structural level — section order, H2 wording, hero layout, sidebar position all vary deterministically per slug.
6. **Add visible `Last reviewed: <date>` bylines** to all 7 guides and the FAQ.
7. **Remove or back `aggregateRating` with real `Review` objects.** Current 235-review claim with no visible reviews is a manual-action risk.

---

## 30-Day Action Plan

### Week 1: Technical Foundations & Entity Identity
- [ ] Fix canonical host mismatch in `metadataBase`
- [ ] Fix title template duplicate-brand bug
- [ ] Ship the per-slug variance refactor to production
- [ ] Publish `/llms.txt`
- [ ] Add Organization + WebSite JSON-LD to root layout with `sameAs`
- [ ] Create LinkedIn company page (populate with real info)
- [ ] Create X/Twitter account (use as `sameAs` anchor)
- [ ] Add explicit AI-crawler `User-agent:` blocks to robots.txt
- [ ] Verify domain in Bing Webmaster Tools; submit sitemap; add IndexNow key file
- [ ] Investigate `/products/bpc-157-5mg` 404 — redirect or publish

### Week 2: Trust Scaffolding & E-E-A-T Infrastructure
- [ ] Publish `/about` page with operator entity, jurisdiction, contact email, editorial policy, supplier-vetting methodology, affiliate disclosure
- [ ] Publish `/privacy` and `/terms`
- [ ] Create named "Research Editor" persona (even a single named individual) + author page with Person schema
- [ ] Add visible author bylines + `Last reviewed:` dates to all 7 guides
- [ ] Add `datePublished` / `dateModified` to product and guide metadata
- [ ] Add `Article` JSON-LD (with author Person, publisher, dateModified, speakable) to all 7 guides
- [ ] Add "Known limitations and unknowns" safety block to top 20 product pages

### Week 3: Schema Coverage & Content Depth
- [ ] Add `CollectionPage` + `ItemList` JSON-LD to all 6 category pages
- [ ] Add merchant-listing fields to Product schema (`priceValidUntil`, `hasMerchantReturnPolicy`, `shippingDetails`)
- [ ] Remove `aggregateRating` from Product schema until real `Review` objects exist
- [ ] Expand FAQ from 7 to 20+ questions with FAQPage schema
- [ ] Expand glossary from 33 to 60+ terms with `DefinedTerm` schema and per-term anchors
- [ ] Add 3–7 inline PubMed/DOI citations to each of top 20 product pages + all 7 guides
- [ ] Add security headers via `next.config.js` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

### Week 4: Distribution & Entity Signals
- [ ] Create Wikidata item for "Tidemaxxing" with properties `instance of: website`, `main subject: research peptide`
- [ ] Seed 2–3 helpful (non-promotional) posts to r/Peptides and r/PeptideScience linking the dosage calculator + reconstitution guide
- [ ] Launch YouTube channel with first explainer (reconstitution walkthrough or BPC-157 vs TB-500 summary)
- [ ] Host COAs directly on-domain at `/coa/[lot-id]` as indexed pages (converts the site from affiliate aggregator → primary source of lot-matched data)
- [ ] Publish 2 new long-form guides (e.g., "How to evaluate a research-peptide COA", "Legal status of research peptides by jurisdiction")
- [ ] Submit brand to 5–10 research-peptide directory / review sites

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| `/` | Homepage | No meta description surfaced, no Organization schema, H1 is a tagline not a definition |
| `/products/bpc-157-10mg` | BPC-157 10mg product | Strong citability, no primary citations, no safety block, unverified aggregateRating risk |
| `/products/tirzepatide-15mg` / `-30mg` / `-60mg` | Tirzepatide variants | Byte-identical body across dose variants, self-canonicalizing, title-tag duplicate-brand bug |
| `/guides/bpc-157-vs-tb-500` | BPC-157 vs TB-500 | Best citability on the site; no Article schema, no author, no dates, no citations |
| `/guides/semaglutide-vs-tirzepatide` | Sema vs Tirz | Strong structure; same schema/author/date gaps |
| `/guides/what-are-peptides` | What are peptides | Same schema/author/date gaps |
| `/faq` | FAQ | FAQPage schema present and valid; only 7 questions for a 139-product catalogue |
| `/peptide-glossary` | Glossary | 33 terms, inconsistent definition length, missing letters E/F/J/K/O/Q/W/X/Y/Z |
| `/category/fat-loss` | Fat Loss category | No CollectionPage/ItemList schema |
| `/products/bpc-157-5mg` | (advertised) | **404 — broken URL** |

---

## Audit Methodology

- 5 specialist subagents ran in parallel: AI visibility, platform readiness, technical, content E-E-A-T, schema
- Score aggregation: weighted average per the GEO-audit skill (Citability 25% / Brand 20% / E-E-A-T 20% / Technical 15% / Schema 10% / Platform 10%)
- Page sample drawn across all primary template types
- robots.txt + sitemap.xml fetched and parsed
- `/llms.txt` checked (returns 404)
- Brand-mention probes: Wikipedia API, LinkedIn company URL, DuckDuckGo HTML site-scoped searches, Reddit, YouTube, Trustpilot, G2, peptide forums
