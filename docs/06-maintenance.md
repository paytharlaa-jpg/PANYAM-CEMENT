# 06 — Maintenance Guide

| Task | Who | How |
|---|---|---|
| Publish a blog post | Client | Sanity Studio → Blog post → Publish (appears within about 5 min) |
| Add gallery photos/videos | Client | Sanity Studio → Gallery item |
| Add a quarterly result / notice PDF | Agency (or client, phase 2) | Put the PDF in `public/panyam files/`, add one line to `src/data/investor-docs.ts`, redeploy |
| Change product text/specs | Agency | `src/data/products.ts` |
| Change contacts, board, timeline | Agency | `src/data/company.ts` |
| Update FAQ | Agency | `src/data/faq.ts` |
| Swap hero to video | Agency | Add `/videos/hero.mp4` (+ `.webm`), set `HERO_VIDEO` in `src/components/storytelling/HeroScene.tsx` |
| Replace a scene image | Agency | Add the original, register it in `scripts/optimize-assets.mjs`, `npm run assets`, update the path |
| Change where enquiries go | Agency | Vercel env vars `ENQUIRY_TO_*` (no code change) |

## Animation notes for developers

- All GSAP code runs inside `useGSAP` (auto-cleanup) and `gsap.matchMedia()` using the conditions in `src/animations/gsap.ts`. Use `mq.motionOK`, `mq.desktop` and so on, **never** raw `prefers-reduced-motion` queries. The visitor's toggle overrides the OS setting via `html.reduce-motion`.
- Long scenes use `position: sticky` containers plus a scrubbed timeline (no pin-spacers). Scene length = the section's `h-[…vh]` class.
- Only `transform`, `opacity`, `clip-path`, `mask` and CSS variables are animated. Never animate width or height.
- After changing images inside a pinned scene, ScrollTrigger refreshes automatically on load and font-ready.

## Dependency updates

Versions are pinned exactly in `package.json`. Update quarterly: `npm outdated`, bump one major at a time, then run `npm run typecheck && npm run lint && npm run build` and click through the home page at desktop and mobile sizes.
