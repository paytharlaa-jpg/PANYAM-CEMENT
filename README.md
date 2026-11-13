# Panyam Cement — Corporate Website

Cinematic, scroll-driven corporate website for **Panyam Cements & Mineral Industries Ltd.** (since 1955), built with Next.js 16, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in the email/CMS keys when available. The site runs fully without them.

## Documentation

| Doc | Contents |
|---|---|
| [01 — Website audit](docs/01-website-audit.md) | Old site inventory, verified facts, discrepancies for the client |
| [02 — Sitemap, design & architecture](docs/02-sitemap-design-architecture.md) | Sitemap, scenes, palette HEX, typography, stack |
| [03 — CMS recommendation](docs/03-cms-recommendation.md) | Sanity set-up, costs, maintenance |
| [04 — Assets](docs/04-asset-requirements-and-mapping.md) | What is used where + checklist of assets to request |
| [05 — Deployment](docs/05-deployment.md) | Vercel, email, domain, investor PDF migration |
| [06 — Maintenance](docs/06-maintenance.md) | Who updates what, animation conventions |
| [07 — QA report](docs/07-qa-report.md) | Test results and known limitations |

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Develop / build / serve |
| `npm run typecheck` / `lint` | Quality checks |
| `npm run assets` | Generate optimised images in `public/images/web` from the originals |
| `npm run investor-docs` | Copy investor PDFs from the old site (run before the domain switch) |

## Animations & accessibility

The scroll-driven scenes always play: they move only as the visitor scrolls. If the device asks for reduced motion (for example Windows *Animation effects* off), the self-running loops (hero camera drift, exhaust smoke, marquee, map pulse) pause. Anyone can switch every animation off with **Animations: On/Off** in the footer.
