# 07 — QA Report

Date: 12 Nov 2026 · Build: Next.js 16.4.3 production build · Tested in the Claude desktop built-in browser (Chromium) at 1440×900, 1024×768, 768×1024 (tablet) and 375×812 (mobile).

## Results

| Area | Check | Result |
|---|---|---|
| Build | `tsc --noEmit` | ✅ 0 errors |
| | `eslint .` | ✅ 0 errors / warnings |
| | `next build` | ✅ 26 routes generated |
| Console | Production home page, full scroll | ✅ 0 errors |
| Routes | All 17 pages + sitemap + robots + brochure + video | ✅ 200; unknown URL → custom 404 |
| Redirects | Old `.html` URLs | ✅ 301 to new pages |
| Hero | Preloader → staged intro → scroll-out parallax | ✅ |
| Sketch-to-real | Blueprint strokes → pencil sweep → photo bloom; copy panels readable | ✅ |
| Quality | Strength bars + counters | ✅ (fixed a counter null error found in testing) |
| Products | Desktop horizontal pinned track; mobile stacked cards; tilt hover | ✅ (compacted for 768 px tall laptops) |
| Truck journey | 4 parallax layers, wheel rotation, sky dawn → dusk, captions | ✅ (fixed a wheel pivot bug and livery overlap) |
| Legacy | Dam line art → shaded fill, marquee | ✅ |
| Responsive | No horizontal overflow at 375 / 768 / 1024 / 1440 | ✅ |
| Navigation | Dropdowns (hover + keyboard + Esc), mobile full-screen menu with accordions, skip link | ✅ |
| Forms | Validation errors per field, focus moves to first error, success state, honeypot, rate limit | ✅ Tested: invalid quote → 422 with field errors; valid quote → 200 and logged server-side (dev) |
| Calculator | Concrete / plaster / brickwork, m / ft, quote hand-off with product + bags | ✅ |
| Performance | Local prod: LCP 1.87 s, CLS 0.000 | ✅ within targets (LCP < 2.5 s, CLS < 0.1); re-measure on live hosting |
| | Page weight | ✅ Fixed: the menu's brochure link was prefetching the 11 MB PDF; now a plain link |
| | Images | AVIF/WebP via next/image; 30 MB originals → 90–300 KB masters |
| Accessibility | Semantic landmarks, one h1 per page, labelled forms, `aria-live` status, visible focus ring, 44 px+ targets, alt text, reduced-motion layouts, motion toggle | ✅ by inspection; run axe/Lighthouse on the live URL |
| SEO | Unique titles/descriptions, canonical, OG/Twitter, JSON-LD (Organization, Product, Article, FAQPage), sitemap, robots | ✅ |
| Branding | No Khyber assets, names or copy; only Panyam/Accord assets | ✅ |
| Content | Only verified facts; open questions listed in `01-website-audit.md` | ✅ |

## Known limitations / not yet verified

- **Email delivery** is not live until Resend keys and the domain are configured. In production without keys, forms show a clear "call/email us" fallback.
- **Investor PDFs** link to `/panyam files/…`. They resolve only after `npm run investor-docs` has been run (or while the old site still serves them).
- **Plant imagery** in the hero and sketch scenes comes from the supplied AI-generated visualisations. Replace with real photography before public launch (see 04).
- **Lighthouse / axe** were not run (no Lighthouse in this environment). Run them on the Vercel preview URL.
- **Safari / Firefox / real iOS and Android devices** were not tested. Only Chromium was.
- Sanity CMS integration is coded with a local fallback. It was not tested against a live Sanity project (none exists yet).
- The privacy policy is a draft for the company to approve.
