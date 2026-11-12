import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TiltBag } from "@/components/products/TiltBag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { products } from "@/data/products";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cement Products",
  description: "Panyam Prestige OPC 53, Panyam Super OPC 43, Panyam Power PPC and Panyam 53-S railway sleeper grade cement — BIS-standard cement made with Narji limestone.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Four cements. One standard of strength."
        italic={["One", "standard", "of", "strength."]}
        intro="Every Panyam cement is made with Narji limestone and tested in our own laboratories — from OPC 53 for high-strength RCC to sleeper grade cement for the railways."
        image="/images/web/factory-aerial-alt.webp"
        imageAlt="Panyam Cement plant"
        crumbs={[{ label: "Products" }]}
      />
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group sheen hover-lift relative grid grid-cols-[0.8fr_1fr] items-center gap-6 overflow-hidden rounded-[2rem] bg-white p-6 sm:p-10"
              >
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40" style={{ background: p.accent }} />
                <TiltBag src={p.image} alt={`${p.name} cement bag`} width={p.imageWidth} height={p.imageHeight} sizes="(min-width: 768px) 20vw, 40vw" />
                <div className="relative">
                  <p className="eyebrow text-slate">{p.shortType}</p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold leading-none sm:text-4xl">{p.name}</h2>
                  <p className="story-italic mt-2 text-lg text-brand-deep">{p.type}</p>
                  <p className="mt-4 hidden text-slate sm:block">{p.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand-deep">
                    View details <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-brand-night p-8 text-white sm:flex-row sm:items-center sm:p-12">
            <div>
              <p className="font-display text-3xl font-bold">Not sure which cement to use?</p>
              <p className="mt-2 text-white/75">Estimate quantities with our calculator, or ask our team for a recommendation.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/calculator" variant="sun">Cement calculator</MagneticButton>
              <MagneticButton href={company.brochure} variant="ghost-light" download>Brochure (PDF)</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
