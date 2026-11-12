# 02 — Sitemap, Visual Direction & Technical Architecture

## Final sitemap

```
/                         Home — cinematic storytelling (7 scenes)
├── /about                Our story · Milestones · Leadership · Legacy projects · Accord Group
├── /products             Product range
│   ├── /products/panyam-prestige   OPC 53
│   ├── /products/panyam-super      OPC 43
│   ├── /products/panyam-power      PPC
│   └── /products/panyam-53s        Railway sleeper grade
├── /calculator           Cement quantity calculator → quote
├── /manufacturing        Manufacturing & Quality (plant, process, Narji limestone, labs, specs)
├── /network              Presence in 6 states · Become a dealer
├── /gallery              Plant / Products / Brand media (CMS-managed)
├── /blog  /blog/[slug]   Building guides & news (CMS-managed)
├── /faq                  FAQ (with FAQPage schema)
├── /investors            ~325 statutory documents (searchable) · Board · Policies · Grievances · CIRP
├── /careers              Application form with resume upload
├── /contact              Enquiry · Quote builder · Dealer · Plant-visit booking · All offices
└── /privacy              Privacy policy (draft for client review)
```

**Navigation:** About ▾ · Products ▾ · Manufacturing · Network · Media ▾ (Gallery, Blog, FAQ, Brochure) · Investors · Careers · [Enquire]

### How the onboarding brief maps to a cement company

| Brief asked for | Delivered as |
|---|---|
| Services / Service details | Products / Product details |
| Gallery / portfolio | Gallery + Legacy projects |
| Reviews | Institutional relationships (verified). Testimonials can be added once the client supplies real ones |
| Cost calculator / Price estimator | Cement quantity calculator (bags, sand, aggregate, bricks) |
| Quote builder | Multi-product quote request, pre-filled from the calculator |
| Appointment booking | Plant visit / meeting request with date and time slot |
| Blog, FAQ, Contact | As named |
| Client updates Blog + Photos | Sanity CMS (see 03) |

## Home page storytelling

| # | Scene | Technique |
|---|---|---|
| 1 | Hero — "Lasting strength for generations" | Art-directed still (landscape/portrait) with a slow camera drift; staged intro (logo 0.8s → headline 0.9s with 0.04s character stagger → support 0.7s → CTA 0.6s); scroll-out parallax. Swap in video by setting `HERO_VIDEO`. |
| 2 | Drawn in 1955 → Refurbished | **Sketch-to-real:** SVG blueprint strokes draw → a pencil sketch *generated from the real plant photo* is revealed by a moving pencil-edge mask → the colour photograph blooms out from the preheater tower. Sticky scene, scrubbed. |
| 2b | (detail) | The photograph is **painted in** — an SVG mask of ragged brush strokes (turbulence + displacement filter) sweeps across the sketch, starting at the preheater tower, while colour saturates. |
| 3 | Narji limestone & quality | Parallax limestone strata, lab line-art drawn on scroll, animated strength bars versus IS 269 |
| 3b | High-quality production (packing plant) | Illustrated Panyam packer (hopper, drum, nozzle, falling cement) over a conveyor. Scroll moves the bags: left of the nozzle they are pencil sketches, right of it they become real Panyam bags. |
| 4 | Four cements | Desktop: pinned horizontal track, packs rise into place, 3D tilt + glare on hover. Mobile: stacked cards. |
| 5 | The journey | **Branded Panyam truck** (detailed SVG, rotating wheels, exhaust, headlights) drives across 4 parallax layers: plant → dam → railway → city. Sky moves from dawn to dusk; city windows light up. |
| 6 | Built into the landmarks | Dam outline drawn then shaded; legacy-project list; institutional-client marquee |
| — | Calculator teaser | Live estimator |
| 7 | Finale | Fort mark drawn → filled; tagline; CTAs; Accord Group |

## Colour palette (sampled from the official logo)

| Token | HEX | Use |
|---|---|---|
| Panyam Green (primary) | `#00A85A` | Logo green — graphics, accents, large text |
| Deep Green (secondary) | `#0A5C36` | Text-safe green, buttons (8.4:1 on paper) |
| Forest Night | `#06261A` | Dark cinematic sections, footer |
| Mint tint | `#E3F4EA` | Light panels |
| Panyam Yellow (accent) | `#FFF315` | Logo yellow — on green or dark only |
| Kiln Orange | `#E8771E` | Warm accent (Khyber direction), focus ring |
| Charcoal (text) | `#1A1D1B` | Primary text (16:1 on paper) |
| Slate (text) | `#4A514C` | Secondary text (8.2:1 on paper) |
| Concrete | `#8B918C` | Neutral |
| Stone | `#E4E1D8` | Lines, borders |
| Paper (background) | `#F6F4EE` | Off-white background |

Rule: never place yellow text on white, or logo green (#00A85A) for small text on white (3.1:1). Use Deep Green instead.

## Typography (self-hosted WOFF2 via `next/font`, `font-display: swap`)

- **Display:** Archivo (variable, width axis at 104–118%), bold industrial headlines
- **Body:** Manrope, clean and highly legible
- **Storytelling italic:** Instrument Serif Italic, used for brand moments ("for generations.")

## Technical architecture

| Layer | Choice | Version (pinned, at least 2 weeks old) |
|---|---|---|
| Framework | Next.js App Router, React Server Components | next 16.4.3, react 19.3.0 |
| Language | TypeScript (strict) | 5.9.3 |
| Styling | Tailwind CSS v4 (tokens in `globals.css` `@theme`) | 4.3.3 |
| Scroll animation | GSAP + ScrollTrigger via `@gsap/react` `useGSAP` (auto-cleanup) | gsap 3.15.0 |
| Smooth scroll | Lenis on GSAP's ticker (`lenis.on('scroll', ScrollTrigger.update)`) | 1.3.27 |
| UI motion | CSS transitions plus small GSAP tweens (Framer Motion deliberately **not** used, to avoid two animation engines) | — |
| Icons | lucide-react | 1.63.0 |
| Forms | Route handler `/api/enquiry` + zod validation + Resend email | zod 4.6.7, resend 6.35.0 |
| CMS | Sanity via HTTP API (no SDK dependency), local fallback content | — |
| Images | `next/image` (AVIF/WebP, responsive), pre-optimised masters from `npm run assets` | sharp 0.34.5 |

**Motion and accessibility:** animations follow the OS "reduce motion" setting by default. Visitors can override it with the **Animations: On/Off** toggle in the footer, and a small notice appears when animations were reduced automatically. Every scene has a static reduced-motion layout.

```
src/
├── animations/gsap.ts        plugin registration, motion tokens, motion preference + matchMedia conditions
├── app/                      routes, layout, sitemap, robots, api/enquiry
├── components/
│   ├── calculator/           CementCalculator
│   ├── forms/                EnquiryForm (5 enquiry types)
│   ├── illustrations/        PanyamTruck, Landscape layers
│   ├── layout/               SmoothScroll, Preloader, ScrollProgress, Footer, PageHero
│   ├── navigation/           Header (dropdowns + mobile menu)
│   ├── products/             TiltBag, SpecTable
│   ├── sections/             Timeline, ProcessFlow, PresenceMap, GalleryGrid, InvestorDocs, CalculatorTeaser
│   ├── storytelling/         Hero, SketchToReal, Quality, ProductShowcase, TruckJourney, Legacy, Finale
│   └── ui/                   MagneticButton, Reveal/RevealText, PanyamMark, MotionToggle
├── data/                     verified company data, products, FAQ, posts, gallery, investor docs
└── lib/                      cms, seo, calculator, enquiry-schema
```
