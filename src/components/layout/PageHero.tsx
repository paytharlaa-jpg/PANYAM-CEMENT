import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RevealText } from "@/components/ui/Reveal";

interface Crumb { label: string; href?: string }

/** Hero banner for inner pages. `image` makes it a dark cinematic banner. */
export function PageHero({
  eyebrow,
  title,
  italic,
  intro,
  image,
  imageAlt = "",
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  italic?: string[];
  intro?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
}) {
  const dark = Boolean(image);
  return (
    <section className={`relative isolate overflow-hidden ${dark ? "bg-brand-night text-white" : "bg-paper text-charcoal"}`}>
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-night via-brand-night/70 to-brand-night/30" />
        </>
      )}
      {!dark && <div aria-hidden className="blueprint-grid absolute inset-0 -z-10 opacity-60" />}
      <div className={`container-x ${dark ? "pb-16 pt-40 lg:pb-24 lg:pt-56" : "pb-12 pt-32 lg:pb-16 lg:pt-44"}`}>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className={`flex flex-wrap items-center gap-1 text-sm ${dark ? "text-white/70" : "text-slate"}`}>
            <li><Link href="/" className="link-underline">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                {c.href ? <Link href={c.href} className="link-underline">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className={`eyebrow mb-4 ${dark ? "text-sun" : "text-brand-deep"}`}>{eyebrow}</p>
        <RevealText as="h1" text={title} italic={italic} trigger="load" className="display-lg max-w-5xl" />
        {intro && <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-white/80" : "text-slate"}`}>{intro}</p>}
      </div>
    </section>
  );
}
