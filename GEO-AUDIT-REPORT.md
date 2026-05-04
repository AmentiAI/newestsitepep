# GEO Audit Report: Tidemaxxing

**Audit Date:** 2026-04-25
**URL:** https://tidemaxxing.shop
**Business Type:** E-commerce + Publisher hybrid (research peptides catalogue + 8 long-form guides; YMYL-adjacent health content)
**Pages Analyzed:** 14 sampled URLs across homepage, products, guides, categories, reviewer route, FAQ, llms.txt, robots.txt, sitemap.xml (115 URLs in sitemap; 95 products / 8 guides / 6 categories / utility pages)

---

## Executive Summary

**Overall GEO Score: 45/100 (Poor)**

The site has genuinely strong content (citability 74) and a mostly-solid technical foundation (58) that is being neutralised by **one critical infrastructure defect** (apex/www canonical loop) and a **gutted YMYL E-E-A-T posture** (anonymous operator, missing safety disclosures, reviewer infrastructure built but undeployed, 6 of 8 guides unsourced). Brand authority is near-zero outside the domain (8/100) — AI models do not recognise "Tidemaxxing" as an entity. The good news: a meaningful share of the deficit is sitting in the working tree as uncommitted code (Article schema, reviewer profile route, byline component, inline PMID citations on 2 guides) and can ship in a single deploy.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 74/100 | 25% | 18.5 |
| Brand Authority | 8/100 | 20% | 1.6 |
| Content E-E-A-T | 28/100 | 20% | 5.6 |
| Technical GEO | 58/100 | 15% | 8.7 |
| Schema & Structured Data | 62/100 | 10% | 6.2 |
| Platform Optimization | 41/100 | 10% | 4.1 |
| **Overall GEO Score** | | | **44.7 → 45/100** |

---

## Critical Issues (Fix Immediately)

### C1. Apex/www canonical loop — likely the single biggest cause of mass de-indexing
- `https://tidemaxxing.shop/` returns **HTTP 308** to `https://www.tidemaxxing.shop/` for every path
- Every page on the live www host emits `<link rel="canonical" href="https://tidemaxxing.shop/...">` (apex, no-www)
- Every `<meta property="og:url">` points at apex
- Every `<loc>` in `/sitemap.xml` is the apex (115 URLs, all 308 on first hit)
- robots.txt declares `Host: https://tidemaxxing.shop` — reinforcing apex as canonical, while the apex itself redirects away
- Result: Google fetches a sitemap URL → 308 to www → renders www page → reads canonical pointing back to apex → revisits apex → 308 again. Documented Google behaviour: ignore the conflicting canonical and treat the page as a soft duplicate. AI crawlers are stricter and frequently drop pages outright.
- **Fix:** Pick one host. Most-likely-correct path: keep apex as canonical, flip Vercel domain config so www→apex (instead of the current apex→www). Alternatively, update `lib/site.ts` `baseUrl` to `https://www.tidemaxxing.shop` and let the sitemap and canonicals regenerate on www. Whichever direction: redirect, canonical, og:url, sitemap entries, and robots.txt `Host:` must all agree.

### C2. YMYL dosing without risk disclosure on product pages
- Sample: `/products/bpc-157` publishes µg/kg dosing ranges with **zero contraindications, zero adverse-event profile, zero drug-interaction warnings, zero research-limitations block**.
- Pattern is sitewide across all 95 product pages.
- Google's March 2026 core update specifically targets YMYL health content lacking expert-grounded risk disclosure — this is the highest-severity pattern under current ranking signals.
- **Fix:** add a "Safety & research limitations" section to every product page covering: known preclinical adverse signals, single-lab/single-species evidence caveats, absence-of-human-trials disclosure (where applicable), and an explicit "this is not a clinical dosing recommendation" framing tied to the existing research-only footer. Mirror as `MedicalWebPage` schema with `lastReviewed` and `reviewedBy`.

### C3. Reviewer / Article-schema / citation infrastructure is built but undeployed
- `components/ReviewerByline.tsx`, `lib/reviewers.ts`, `app/reviewers/`, the new `articleJsonLd` helper in `lib/schema.tsx`, and inline PMID citations on 2 guides are all in the working tree but not pushed to production.
- `https://tidemaxxing.shop/reviewers/david-levison` returns **404**.
- No reviewer byline visible on any live guide.
- No `Article` JSON-LD on any guide — only the layout-level Organization/WebSite/SearchAction.
- Prof David A. Levison (U Dundee, ex-President Pathological Society of GB&I, senior editor Muir's Pathology 14e) is a strong genuine asset that currently provides zero ranking value because nothing ships.
- **Fix:** ship the working-tree changes. Verify after deploy: `/reviewers/david-levison` returns 200, byline renders on all 8 guides, Article+Person JSON-LD is present in raw HTML, `dateModified` exposed.

### C4. Misleading aggregateRating across 95 product pages
- Every Product schema declares `aggregateRating: { ratingValue: 5, ratingCount: 1, reviewCount: 1 }` mapping to a single `Review` whose author is "Independent HPLC Analysis" — a lab purity assay, not a customer review.
- Two violations of Google's review snippet guidelines: (a) self-serving / first-party rating, (b) author-type mismatch (a COA is not a `Review`).
- 95 identical 5/5-from-one-review patterns is a sitewide signal that Google's spam systems detect easily. Risk: manual action for "spammy structured markup" or silent rich-result suppression.
- **Fix:** remove `aggregateRating` and `review` from `productJsonLd` in `lib/schema.tsx:15-66`. Express purity as `additionalProperty: [{ "@type": "PropertyValue", name: "Purity", value: "≥98% HPLC" }, { "@type": "PropertyValue", name: "CoA", value: "Lot-matched, available on request" }]` instead.

---

## High Priority Issues

### H1. Six of eight guides have zero inline citations (YMYL content unsourced)
Guides `peptides-for-muscle-growth`, `peptide-stacks`, `what-are-peptides`, `peptides-for-skin`, `peptides-for-sleep`, `semaglutide-vs-tirzepatide` make mechanistic claims (VEGFR2, ghrelin, GLP-1 receptor binding, etc.) with no PubMed/DOI links. Two guides (`peptides-for-fat-loss`, `bpc-157-vs-tb-500`) have inline citations in the working tree but those are also undeployed. **Fix:** finish the citation rollout to all 8 guides — target 6–10 inline citations per guide (real PMIDs only), add a numbered references list at the foot.

### H2. Brand authority near zero
"Tidemaxxing" returns 0 results on Wikipedia, Reddit, YouTube, Twitter/X, LinkedIn. One incidental Instagram reel is the entire external footprint. AI entity-recognition pipelines will not surface the brand unsolicited. **Fix:** seed Reddit (r/Peptides, r/MoreplatesMoredates) with sourced mentions, file a Wikidata stub (lower bar than Wikipedia), register LinkedIn company page, link these from `Organization.sameAs`.

### H3. Sitemap broadcasts apex URLs that all 308 (crawl budget waste)
Independent of C1: every sitemap entry is the apex, every fetch redirects. Wastes crawler budget on every visit. **Fix:** rewrite sitemap to whichever host C1 picks, resubmit in Search Console.

### H4. Featured-compounds blocks render as concatenated wordsalad
Strings like `"5 sizes-10%Fat LossSemaglutide≥98% HPLC · lot CoAfrom$44.99$49.99Buy Semaglutide →"` appear in raw HTML with no whitespace between badge/price/CTA. AI extractors see one nonsense token instead of structured product info. Lowers citability of every page with a featured-compounds section. **Fix:** add whitespace separators between fragments or wrap each in semantic elements with visually-hidden separators.

### H5. Missing security headers
HSTS is the only security header set. Missing: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. Doesn't block crawling but is a trust-signal demerit. **Fix:** `next.config.js` `async headers()` block — five lines.

### H6. Same H2 sequence across product pages within a class (templating)
Sample (live): `semaglutide` / `tirzepatide` / `retatrutide` all emit identical 10-H2 sequences in identical order — "Vial sizes and price per mg" / "Reconstitution volumes" / "Mechanism in the literature" / "Research use-cases" / "Often paired with" / "Handling in the lab" / "Stacking and paired-compound work" / "Frequently asked" / "More Fat Loss compounds" / "Related reading". `ipamorelin` / `ghk-cu` emit a different but identically-shared sequence. The user-introduced `lib/pageLayoutPlan.ts` varies *between* classes but does not vary *within* a class. Google's de-duplication detects same-skeleton-different-variable patterns (the "dynamic laziness" failure mode). **Fix:** push variation deeper — vary section *bodies* per compound, not just heading order, and re-shuffle section order within a class so the first three H2s of one fat-loss product don't match the next.

---

## Medium Priority Issues

- **M1.** llms.txt missing a `## Guides` section — the 8 long-form guides are the most citable content and aren't enumerated.
- **M2.** llms.txt product count mismatch (says 92, sitemap has 95, footer/CTAs say 139). Pick one number.
- **M3.** No `/llms-full.txt` for full guide text — high-leverage for a publisher hybrid.
- **M4.** `datePublished` / `dateModified` not exposed in deployed HTML on guides — Perplexity and Gemini both demote stale-looking content. (Local Article schema fixes this once shipped via C3.)
- **M5.** No FAQPage schema on product pages despite each having a "Frequently asked" section.
- **M6.** Single-reviewer scope — diversifying with a second reviewer (e.g. an MD or pharmacologist) would strengthen E-E-A-T further.
- **M7.** Robots.txt `Host:` directive declares apex as canonical host — reinforces the canonical loop. (Resolved by C1.)
- **M8.** Anonymous operator with no About page identifying entity, contact, postal address, or editorial policy.

## Low Priority Issues

- **L1.** No IndexNow integration for Bing Copilot freshness signals.
- **L2.** No `msvalidate.01` for Bing Webmaster Tools.
- **L3.** Some product pages have minor `mt-1` vs ` ` className inconsistencies on `<h2>` tags (cosmetic).
- **L4.** `Organization.sameAs` is self-referential — no external entity links.
- **L5.** Open Graph tag completeness on category pages — verify `og:image` dimensions are explicit.

---

## Category Deep Dives

### AI Citability (74/100)

Page-level extractability scores from sampled blocks:

| Page | Best block | Score |
|---|---|---|
| `/guides/peptides-for-fat-loss` | "Semaglutide is a long-acting GLP-1 receptor agonist… extends its half-life to about a week" | 88 |
| `/guides/peptides-for-fat-loss` | "How to think about which one fits" decision-tree bullets | 84 |
| `/guides/bpc-157-vs-tb-500` | "The 30-second version" 3-bullet TL;DR | 92 |
| `/guides/bpc-157-vs-tb-500` | BPC-157 definitional opener | 86 |
| `/products/bpc-157` | Reconstitution table (mg / mL / mg/mL) | 80 |
| `/products/bpc-157` | FAQ block | 82 |

Strengths: textbook-extract style, definitional opening sentences, named mechanisms, specific numerics, head-to-head comparison sections. The TL;DR bullets and FAQ format are exactly what ChatGPT/Perplexity tend to quote. Weakness: featured-compounds whitespace bug (H4) drags every page's effective citability down by mixing structured data into wordsalad strings.

### Brand Authority (8/100)

| Platform | Status | Evidence |
|---|---|---|
| Wikipedia | Absent | API search 0 results; direct URL 404 |
| Reddit | Absent | No indexed mentions |
| YouTube | Absent | No matches |
| Twitter/X | Absent | No matches |
| LinkedIn | Absent | No company page |
| Instagram | Minimal | One incidental reel |

The brand is effectively invisible to entity-recognition pipelines. AI models will not surface "Tidemaxxing" unsolicited.

### Content E-E-A-T (28/100)

| Dimension | Score | Notes |
|---|---|---|
| Experience | 4/25 | No first-person lab content, no original assays, no operator-run experiments |
| Expertise | 8/25 | Strong reviewer recruited but undeployed; 6 of 8 guides unsourced; reviewer profile 404s |
| Authoritativeness | 5/25 | Anonymous operator, no About page, no contact, no postal address, self-referential Organization |
| Trustworthiness | 10/25 | Research-use disclaimer present (good); but YMYL dosing on product pages without contraindications is critical |

The Levison reviewer is a real, verifiable, credentialed asset. The deficit is entirely deployment-side — the asset isn't reaching the live site.

### Technical GEO (58/100)

| Dimension | Score |
|---|---|
| Server-side rendering | 95/100 — full content in raw HTML, no JS dependency for crawlers |
| Mobile / Core Web Vitals | 80–90/100 — viewport set, Next/Image with srcset, edge-cached static |
| Security headers | 40/100 — only HSTS |
| Canonical / host | **0/100 — critical defect (see C1)** |
| robots.txt / llms.txt | 90/100 — well-structured, AI crawlers allowed |
| Sitemap | 50/100 — exists, but every URL 308s |

A foundation that would be 80+ on its own, dragged down by the canonical loop.

### Schema & Structured Data (62/100)

What works: Product/Offer/Brand/BreadcrumbList on product pages structurally valid, FAQPage on `/faq`, CollectionPage+ItemList on category pages, Organization+WebSite+SearchAction sitewide.

What hurts:
1. **aggregateRating-from-purity-Review pattern across 95 pages — policy violation, see C4.**
2. No Article/BlogPosting schema on any guide (local code pending deploy).
3. Reviewer Person schema exists in code but `/reviewers/david-levison` returns 404.
4. No `MedicalEntity`/`Substance`/`Drug` schema on product pages — would let AI bind compounds to pharmacology graphs.
5. `Organization.sameAs` empty/self-referential.

### Platform Optimization (41/100)

| Platform | Score | Status |
|---|---|---|
| Google AI Overviews | 28 | Critical — canonical loop + YMYL E-E-A-T gap make AIO inclusion near-impossible |
| ChatGPT web search | 52 | Best of the five — content is direct, factual, ChatGPT weighs canonical hygiene less |
| Perplexity AI | 44 | Demoted by missing dates + sparse citations |
| Google Gemini | 34 | No Knowledge Graph entity, no ecosystem footprint |
| Bing Copilot | 47 | No IndexNow, no msvalidate, canonical loop hurts here too |

---

## Quick Wins (Implement This Week)

1. **Fix the canonical/host loop in one commit.** Update `lib/site.ts` `baseUrl` to whichever host you pick (recommend: keep `https://tidemaxxing.shop` apex, then flip Vercel domain config to redirect www→apex). All canonicals/og:urls/sitemap entries already use `SITE.baseUrl`, so the codebase change is minimal once the redirect direction is reversed. **Highest single-fix impact on indexation.**
2. **Ship the working-tree changes.** Article JSON-LD, reviewer profile route, byline component, inline PMID citations on 2 guides — all already coded. Verify post-deploy: `/reviewers/david-levison` returns 200, byline renders on guides, Article schema appears in raw HTML, `datePublished`/`dateModified` exposed.
3. **Remove fake aggregateRating from `lib/schema.tsx:57-64`.** Replace with `additionalProperty` PropertyValue entries for purity. Eliminates 95 instances of misleading review markup in one diff.
4. **Add a Safety & Limitations section to top 20 product pages.** Boilerplate template + per-compound specifics. Tie to existing research-only disclaimer.
5. **llms.txt cleanup:** add `## Guides` section listing all 8, fix the 92-vs-95-vs-139 product count, ship `/llms-full.txt` with concatenated guide text.

## 30-Day Action Plan

### Week 1: Unblock indexing
- [ ] **C1** Pick one host, align canonical + redirect + sitemap + og:url + robots.txt `Host:` directive.
- [ ] **C3** Commit and push the local-only reviewer/Article/citation work.
- [ ] **C4** Remove aggregateRating/review block from Product schema; replace with PropertyValue purity entries.
- [ ] Verify in Google Search Console: submit fresh sitemap, request re-indexing of homepage and 5 representative pages.

### Week 2: Close the YMYL safety gap
- [ ] **C2** Add Safety & Limitations block to all 95 product pages (template + per-compound notes).
- [ ] **H1** Backfill inline PubMed citations on remaining 6 guides (peptide-stacks, muscle-growth, skin, sleep, sema-vs-tirz, what-are-peptides). Target 6–10 PMIDs per guide.
- [ ] Add `MedicalWebPage` `lastReviewed`/`reviewedBy` schema to product pages.

### Week 3: Brand authority and entity signals
- [ ] **H2** File Wikidata stub for "Tidemaxxing".
- [ ] Create LinkedIn company page; backlink from `Organization.sameAs`.
- [ ] Seed 2–3 sourced Reddit comments in r/Peptides linking specific guide pages (citation-style, not promo).
- [ ] **M6** Recruit a second reviewer (MD or pharmacologist) for dosing/safety scope.
- [ ] **M8** Add an `/about` page identifying the operating entity, contact, editorial policy.

### Week 4: Templating, headers, and freshness
- [ ] **H6** Push `pageLayoutPlan.ts` variation deeper — vary section bodies per compound, not just heading order. Specifically target the GLP-1 trio (semaglutide/tirzepatide/retatrutide) which currently share identical 10-H2 sequences.
- [ ] **H4** Fix the featured-compounds whitespace bug — semantic separators between badge/price/CTA.
- [ ] **H5** Add CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy in `next.config.js`.
- [ ] **L1/L2** IndexNow integration + Bing Webmaster Tools verification.
- [ ] Re-run this audit. Target: 65+ composite (Good band).

---

## Appendix: Pages Analyzed

| URL | Title | Notable findings |
|---|---|---|
| https://tidemaxxing.shop/ | Tidemaxxing — Peptide Catalogue & Buyer's Index | Org/WebSite/SearchAction; canonical→apex (loop) |
| https://tidemaxxing.shop/products/bpc-157 | Buy BPC-157 — 10 mg Lyophilized Vial | Product+Offer+Review (policy risk); no safety section |
| https://tidemaxxing.shop/products/semaglutide | Semaglutide product page | Same 10-H2 sequence as tirzepatide and retatrutide |
| https://tidemaxxing.shop/products/tirzepatide | Tirzepatide product page | Identical structure to semaglutide |
| https://tidemaxxing.shop/products/retatrutide | Retatrutide product page | Identical structure to semaglutide and tirzepatide |
| https://tidemaxxing.shop/products/ipamorelin | Ipamorelin product page | Different shared structure (Growth class) |
| https://tidemaxxing.shop/products/ghk-cu | GHK-Cu product page | Same shared structure as ipamorelin |
| https://tidemaxxing.shop/category/fat-loss | Fat Loss category | CollectionPage+ItemList valid; canonical→apex |
| https://tidemaxxing.shop/guides/peptides-for-fat-loss | Peptides for Fat Loss guide | No Article schema deployed; no byline; ~2,330 words |
| https://tidemaxxing.shop/guides/bpc-157-vs-tb-500 | BPC-157 vs TB-500 guide | Same as above |
| https://tidemaxxing.shop/reviewers/david-levison | (Reviewer profile) | **404 — undeployed** |
| https://tidemaxxing.shop/llms.txt | llms.txt | 200, well-formed, missing Guides section |
| https://tidemaxxing.shop/robots.txt | robots.txt | All AI crawlers allowed; appropriate disallows |
| https://tidemaxxing.shop/sitemap.xml | Sitemap | 115 URLs, all apex (308 chain) |
| https://tidemaxxing.shop/faq | FAQ | FAQPage schema, valid 7 Q/A |
