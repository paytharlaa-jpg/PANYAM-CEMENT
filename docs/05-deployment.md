# 05 — Deployment

## Recommended hosting: Vercel

Free Hobby plan for review; **Pro (US$20/month)** is recommended for a commercial production site.

### Steps

1. Push this folder to a private GitHub repository.
2. In Vercel: **Add New → Project →** import the repo. The framework preset is detected as Next.js. No build settings are needed.
3. **Environment variables** (Project → Settings → Environment Variables), from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL=https://www.panyamcements.in`
   - `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` (for example `website@panyamcements.in`)
   - `ENQUIRY_TO_SALES`, `ENQUIRY_TO_CORPORATE`, `ENQUIRY_TO_CAREERS`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (when the CMS is set up)
4. **Email (Resend):** create a free account (3,000 emails/month), add the domain `panyamcements.in`, add the DNS records it shows (SPF/DKIM), then create an API key.
   Without these variables the forms return a "please call/email us" message in production instead of failing silently.
5. **Investor PDFs (before switching the domain):** run `npm run investor-docs` once. This copies about 325 PDFs from the current site into `public/` at the same paths. Commit them (about 300 MB; consider Git LFS) or upload them to a storage bucket and set `NEXT_PUBLIC_DOCS_ORIGIN`.
6. **Domain:** Vercel → Domains → add `panyamcements.in` and `www.panyamcements.in`, then update DNS at the registrar (A record `76.76.21.21`, CNAME `www → cname.vercel-dns.com`). SSL is automatic.
7. Submit `https://www.panyamcements.in/sitemap.xml` in Google Search Console.

## Local development

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run assets         # regenerate optimised images after adding originals
npm run typecheck && npm run lint
```

Requires Node.js 20.9+ (tested on Node 24).

## Pre-launch checklist

- [ ] Client confirms the discrepancies in `01-website-audit.md`
- [ ] Privacy policy reviewed by the company
- [ ] Resend domain verified; test each enquiry type end to end
- [ ] Investor PDFs migrated and spot-checked
- [ ] Real plant photography swapped in for the AI visualisations (or the client approves them)
- [ ] Google Search Console and analytics (if wanted) set up

## Hostinger (Node.js web app)

Hostinger's build servers run an older Linux (glibc < 2.29), so Next.js cannot load its native SWC compiler and falls back to the WebAssembly build. Two settings in this repo make that work:

- The config is plain JavaScript: `next.config.mjs` (a `.ts` config needs SWC to load).
- `npm run build` runs `next build --webpack` (Turbopack needs the native compiler).

Hostinger settings: Node.js **20 or 22**, build command `npm run build`, start command `npm start`, output directory `.next`. Add the environment variables from `.env.example` in the Hostinger panel. The first build is slower (WASM compiler download, about 1–2 min extra).
