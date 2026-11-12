# 01 — Existing Website Audit (panyamcements.in)

Audited 12 Nov 2026. Sources: every page of https://www.panyamcements.in and the brochure supplied at `public/Brouchure/Big Brouchure 2.pdf`.

## Existing pages

| Page | URL | Content found | New-site destination |
|---|---|---|---|
| Home | `/index.html` | History, highlights, legacy projects | `/` (+ 301 redirect) |
| About / Promoters | `/about-us.html` | MD and director profiles | `/about#leadership` |
| Directors | `/directors.html` | Board table (DIN), 14 policy PDFs | `/investors#board` |
| Strengths | `/strengths.html` | Kiln history, company history | `/manufacturing`, `/about` |
| Gallery – Factory reopening | `/gallery1.html` | Empty page (no images render) | `/gallery` |
| Products | `/products.html` | 4 products listed (OPC 53, OPC 43, PPC, PSC) | `/products` |
| Investors | `/investors.html` | ~330 statutory PDFs | `/investors` |
| Code of Conduct, Corporate Governance | `/codeofconduct.html`, `/corporate.html` | Policy and CG PDFs | `/investors` |
| Careers | `/careers.html` | Actually a **product enquiry form** (cement type, quantity) | `/careers` (real careers form) + `/contact` quote |
| CIRP | `/cirp.html` | 22 insolvency-process PDFs | `/investors#cirp` |
| Contact (Marketing) | `/marketing.html` | 4 offices, investor contact, RTA | `/contact`, `/investors` |
| Privacy Policy | `/Privacy Policy code.html` | — | `/privacy` |

All old URLs are 301-redirected in `next.config.ts`, so search rankings and external links survive the switch.

## Verified company facts used on the new site

- **Legal name:** Panyam Cements & Mineral Industries Ltd. · **CIN** L26940AP1955PLC000546 · BSE-listed
- **Incorporated:** 23 June 1955 (promoted by Padmasri Somappa and others). First bag: 1957
- **Plant:** Cement Nagar – 518206, Nandyal District, Andhra Pradesh (Rayalaseema)
- **Capacity history:** 200 TPD kiln → +300 TPD +600 TPD kilns → 2,200 TPD dry process by 1997
- **Today (brochure):** installed capacity **1 Million Metric Tonnes per Annum**, second line in the pipeline; refurbished with state-of-the-art kiln and coolers
- **Raw material:** Narji limestone
- **Products (brochure):** Panyam Prestige (OPC 53), Panyam Super (OPC 43), Panyam Power (PPC, fly-ash based), Panyam 53-S (railway sleeper grade)
- **Specifications:** published only for Prestige and Power (reproduced exactly on the site)
- **Legacy projects:** Srisailam, Nagarjuna Sagar, Almatti, Koyana, Jayakawadi, Upper Krishna, Malaprabha; first to supply sleeper-grade cement to the Railways
- **Institutional relationships:** 15 organisations listed in the brochure
- **Presence:** Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Goa
- **Promoters (post-CIRP):** Dr. Srinisha Jagathrakshakan with RV Consulting Services Pvt. Ltd. and Sagar Power Ltd. Parent group: **Accord Group** (confirmed by client)
- **Board:** J. Srinisha (MD), N. Elamaran (Non-Exec), V. Raghavan (Independent), R. Balachandran (Independent)
- **Contacts:** corporate, marketing and purchase offices in Madhapur, Hyderabad; works at Cement Nagar; Company Secretary Ch Seshi Kumar; RTA XL Softech Systems

## Discrepancies found — **client must confirm**

1. **PSC product.** The old products page lists Portland Slag Cement (PSC), but the brochure lists **53-S** instead. The new site follows the brochure (4 products: Prestige, Super, Power, 53-S).
2. **PPC fineness standard.** The brochure prints **225 m²/kg** as the IS 1489 requirement for PPC; IS 1489 (Part 1):2015 specifies **300 m²/kg minimum**. The site currently shows the brochure figure, marked in `src/data/products.ts`.
3. **Panyam Super and Panyam 53-S** have no published test values. The site shows "available on request" until the client supplies them.
4. **Narji limestone origin, quarry location, certifications** (BIS licence numbers, ISO etc.) are not published. Nothing has been invented; send us the details to add.
5. **Old "Careers" page** is really an order-enquiry form. The new site separates careers and enquiries.
6. **Copyright year** on the old site reads 2016.

## Existing SEO structure

- Titles such as "Home |Panyam" and "Strengths | Panyam" (the Investors page is titled "Strengths"). There are no meta descriptions, no Open Graph tags, no sitemap.xml, no structured data and no canonical URLs.
- Jumbled WOW-Slider markup and a "wowslider.com" link on every page (third-party branding).
- The new site adds unique titles and descriptions, OG/Twitter cards, `sitemap.xml`, `robots.txt`, canonicals, Organization/Product/Article/FAQ JSON-LD, and 301 redirects.

## Investor documents — must be migrated before launch

The ~325 investor PDFs live at `https://www.panyamcements.in/panyam files/…`. When the domain points to the new site, those files disappear unless they are copied. `npm run investor-docs` downloads them into `public/` at **the same paths**, so existing links (BSE filings, emails) keep working. The list is in `src/data/investor-docs.ts`.
