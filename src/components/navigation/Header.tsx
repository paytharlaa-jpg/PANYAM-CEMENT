"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { navigation } from "@/data/navigation";
import { company } from "@/data/company";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Internal routes use Next links (prefetched); files such as the PDF brochure use a plain anchor. */
function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (/\.pdf$/i.test(href)) return <a href={href} className={className} target="_blank" rel="noopener">{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

/** Pages whose first section is a dark full-bleed hero (header starts transparent). */
const DARK_HERO = ["/", "/about", "/manufacturing", "/network", "/products"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);

  const transparent = DARK_HERO.includes(pathname) && !scrolled && !mobile;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state when the route changes
    setMobile(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); setMobile(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  const enter = (label: string) => { window.clearTimeout(closeTimer.current); setOpen(label); };
  const leave = () => { closeTimer.current = window.setTimeout(() => setOpen(null), 160); };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only z-[90] rounded bg-sun px-4 py-2 font-bold text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,box-shadow,color] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !mobile ? "-translate-y-full" : "translate-y-0"
        } ${transparent ? "bg-transparent text-white" : "bg-paper/90 text-charcoal shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur-xl"}`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Panyam Cement — home">
            <Image src="/images/web/panyam-logo.webp" alt="" width={52} height={52} priority className="h-11 w-11 lg:h-[52px] lg:w-[52px]" />
            <span className="hidden leading-none sm:block lg:hidden xl:block">
              <span className="block font-display text-lg font-extrabold uppercase tracking-[0.12em]">Panyam</span>
              <span className="eyebrow block text-[0.62rem] opacity-70">Cement · Since 1955</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.label} className="relative" onMouseEnter={() => item.children && enter(item.label)} onMouseLeave={leave}>
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={open === item.label}
                      aria-haspopup="true"
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      onFocus={() => enter(item.label)}
                      className={`flex min-h-11 items-center gap-1 rounded-full px-3 text-[0.92rem] font-semibold xl:px-4 transition-colors ${isActive(item.href) ? "text-brand" : ""} hover:bg-current/10`}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex min-h-11 items-center rounded-full px-3 text-[0.92rem] font-semibold xl:px-4 transition-colors hover:bg-current/10 ${isActive(item.href) ? "text-brand" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)] ${
                        open === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                      }`}
                      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) leave(); }}
                    >
                      <ul className="overflow-hidden rounded-2xl border border-stone bg-white p-2 text-charcoal shadow-[0_30px_60px_-20px_rgb(6_38_26/0.35)]">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <NavLink href={c.href} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-mint focus-visible:bg-brand-mint">
                              <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-stone transition-colors group-hover:bg-brand" />
                              <span>
                                <span className="block font-bold">{c.label}</span>
                                {c.description && <span className="block text-sm text-slate">{c.description}</span>}
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={company.primaryPhoneHref} className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold xl:flex" aria-label={`Call ${company.primaryPhone}`}>
              <Phone aria-hidden className="h-4 w-4" /> {company.primaryPhone}
            </a>
            <span className="hidden sm:block">
              <MagneticButton href="/contact" variant={transparent ? "sun" : "primary"}>
                Enquire
              </MagneticButton>
            </span>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full lg:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] bg-paper pt-[72px] transition-[clip-path,visibility] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          mobile ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        data-lenis-prevent
      >
        <nav aria-label="Mobile" className="container-x h-full overflow-y-auto pb-32 pt-4">
          <ul className="divide-y divide-stone">
            <li><Link href="/" className="flex min-h-14 items-center font-display text-2xl font-bold">Home</Link></li>
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex min-h-14 w-full items-center justify-between font-display text-2xl font-bold"
                      aria-expanded={mobileSub === item.label}
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className={`h-6 w-6 transition-transform ${mobileSub === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ${mobileSub === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul className="min-h-0" hidden={mobileSub !== item.label}>
                        <li><Link href={item.href} className="flex min-h-12 items-center pl-4 font-semibold text-brand-deep">Overview</Link></li>
                        {item.children.map((c) => (
                          <li key={c.href}><NavLink href={c.href} className="flex min-h-12 items-center pl-4 font-semibold text-slate">{c.label}</NavLink></li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="flex min-h-14 items-center font-display text-2xl font-bold">{item.label}</Link>
                )}
              </li>
            ))}
            <li><Link href="/contact" className="flex min-h-14 items-center font-display text-2xl font-bold">Contact</Link></li>
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <MagneticButton href="/contact" className="justify-center">Enquire now</MagneticButton>
            <a href={company.primaryPhoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal/20 font-bold">
              <Phone aria-hidden className="h-4 w-4" /> {company.primaryPhone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
