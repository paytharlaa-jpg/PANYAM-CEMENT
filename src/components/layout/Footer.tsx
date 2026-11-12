import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Download } from "lucide-react";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { MotionToggle } from "@/components/ui/MotionToggle";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About Panyam", href: "/about" },
      { label: "Manufacturing & Quality", href: "/manufacturing" },
      { label: "Distribution Network", href: "/network" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Products",
    links: [...products.map((p) => ({ label: `${p.name} · ${p.shortType}`, href: `/products/${p.slug}` })), { label: "Cement Calculator", href: "/calculator" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Blog & Updates", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  const works = company.offices[0];
  const corp = company.offices[1];
  return (
    <footer className="relative overflow-hidden bg-brand-night text-white">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="container-x relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="Panyam Cement — home">
              <Image src="/images/web/panyam-logo.webp" alt="" width={72} height={72} className="h-16 w-16" />
              <span>
                <span className="block font-display text-2xl font-extrabold uppercase tracking-[0.12em]">Panyam Cement</span>
                <span className="story-italic text-lg text-sun">{company.tagline}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-white/70">
              {company.legalName} — manufacturing cement in the Rayalaseema region of Andhra Pradesh since {company.founded}. A company of the {company.parentGroup}.
            </p>
            <a
              href={company.brochure}
              download
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-5 text-sm font-bold transition-colors hover:bg-sun hover:text-charcoal"
            >
              <Download aria-hidden className="h-4 w-4" /> Download brochure (PDF)
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="eyebrow mb-5 text-sun">{c.title}</h2>
                <ul className="space-y-1">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline inline-flex min-h-10 items-center text-white/80 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <address className="not-italic text-white/75">
            <p className="eyebrow mb-3 text-white">{works.title}</p>
            <p className="flex gap-2"><MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" />{works.lines.join(", ")}</p>
            <p className="mt-2 flex gap-2"><Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" />{works.phones.join(" · ")}</p>
          </address>
          <address className="not-italic text-white/75">
            <p className="eyebrow mb-3 text-white">{corp.title}</p>
            <p className="flex gap-2"><MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" />{corp.lines.join(", ")}</p>
            <p className="mt-2 flex gap-2"><Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" /><a href={company.primaryPhoneHref} className="link-underline">{company.primaryPhone}</a></p>
          </address>
          <div className="text-white/75">
            <p className="eyebrow mb-3 text-white">Sales enquiries</p>
            <p className="flex gap-2"><Mail aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sun" /><a href={`mailto:${company.salesEmail}`} className="link-underline">{company.salesEmail}</a></p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-white/50">A company of</span>
              <Image src="/images/web/accord-logo-white.webp" alt="Accord Group" width={96} height={65} className="h-14 w-auto" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName} All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p>CIN: {company.cin}</p>
            <MotionToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
