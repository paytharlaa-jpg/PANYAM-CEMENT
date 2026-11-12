# 03 — CMS Recommendation

## Recommendation: Sanity (free plan) for Blog and Gallery

The brief says the client will update **blog posts and photos/gallery** themselves. Everything else (products, specifications, board, investor documents) changes rarely and needs careful review, so it lives in version-controlled data files (`src/data/*`) that the agency updates.

| Option | Verdict |
|---|---|
| **Sanity** (headless) | ✅ Recommended. Free plan (3 users, 10k documents, 100 GB bandwidth/month) covers this site. Hosted editor at `<project>.sanity.studio`, image CDN, no server to maintain. |
| WordPress (headless) | ❌ Needs hosting, plugin updates and security patching — more maintenance for little gain |
| Strapi / Payload (self-hosted) | ❌ Needs a server and database |
| Custom admin dashboard | ❌ Explicitly to be avoided |

**Recurring cost:** ₹0 on the Sanity free plan. Growth plan only if more than 3 editors are needed (about US$15 per seat/month).

## How it is wired

- `src/lib/cms.ts` queries Sanity's HTTP API when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set. Pages revalidate every 5 minutes.
- If Sanity isn't configured, or returns nothing, the site uses the starter content in `src/data/posts.ts` and `src/data/gallery.ts`, so the site never breaks.
- Schemas for the two document types are in `sanity/schemas.ts`.

## Set-up (about 20 minutes, agency)

1. `npm create sanity@latest -- --project-name "Panyam Cement" --dataset production --template clean` in a separate folder (for example `panyam-studio/`).
2. Copy `sanity/schemas.ts` from this repo into the studio and register `post` and `galleryItem` in `sanity.config.ts`.
3. `npx sanity deploy` to host the studio. Invite the client's staff as **Editors**.
4. In Sanity → API → CORS, add the website domain.
5. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in Vercel and redeploy.

## Maintenance implications

- Content edits appear within about 5 minutes (ISR). No developer is needed for blog or gallery changes.
- Products, specifications and investor documents: the agency edits `src/data/*.ts` (or adds the PDF to `public/panyam files/` plus one line in `investor-docs.ts`) and redeploys. Optional phase 2: move investor documents into Sanity too, so the Company Secretary can upload quarterly filings directly.
