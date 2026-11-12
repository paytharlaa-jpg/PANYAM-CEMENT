import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { SpecTable } from "@/components/products/SpecTable";
import { company, labFacilities, salientFeatures } from "@/data/company";
import { getProduct } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing & Quality",
  description: "A completely refurbished plant at Cement Nagar with state-of-the-art kiln and coolers, Narji limestone and in-house chemical, physical and X-ray laboratories.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  const prestige = getProduct("panyam-prestige")!;
  const power = getProduct("panyam-power")!;
  return (
    <>
      <PageHero
        eyebrow="Manufacturing & Quality"
        title="Refurbished. Tested. Trusted."
        italic={["Trusted."]}
        intro={`Our cement works at Cement Nagar, Nandyal District, have been completely refurbished with state-of-the-art kiln and coolers — ${company.capacity.toLowerCase()} of installed capacity, with a second line in the pipeline.`}
        image="/images/web/factory-aerial-dusk.webp"
        imageAlt="The Panyam Cement plant illuminated at dusk"
        crumbs={[{ label: "Manufacturing & Quality" }]}
      />

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-6 sm:grid-cols-3">
          {[
            { k: company.capacityShort, v: "Installed capacity", s: "1 Million Metric Tonnes per Annum" },
            { k: "2nd line", v: "In the pipeline", s: "Planned expansion of production" },
            { k: "1955", v: "Established", s: "Seven decades of cement making" },
          ].map((s) => (
            <Reveal key={s.v} className="rounded-[2rem] bg-white p-8">
              <p className="font-display text-5xl font-extrabold text-brand-deep">{s.k}</p>
              <p className="mt-2 font-bold">{s.v}</p>
              <p className="text-sm text-slate">{s.s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessFlow />

      <section className="py-24 lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Raw material</p>
            <RevealText text="Narji limestone — the foundation of every bag." italic={["foundation"]} className="display-md" />
            <p className="mt-6 text-lg text-slate">Narji limestone is known for producing strong and durable cement. It gives Panyam cement its consistent chemistry — the starting point for strength, workability and durability.</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {salientFeatures.map((f) => (
                <li key={f} className="rounded-2xl bg-brand-mint px-4 py-3 text-center font-bold text-brand-deep">{f}</li>
              ))}
            </ul>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/images/web/factory-portrait-close.webp" alt="Loading bay at the Panyam Cement plant in the evening" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-night py-24 text-white lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-4 text-sun">Laboratory testing facilities</p>
          <RevealText text="Every batch, verified in-house." italic={["verified"]} className="display-md max-w-3xl" />
          <Reveal stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {labFacilities.map((f, i) => (
              <div key={f.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-500 hover:bg-white/[0.08]">
                <p className="font-display text-5xl font-extrabold text-sun/30">0{i + 1}</p>
                <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-white/70">{f.text}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-10 max-w-2xl text-lg text-white/80">Panyam Cement not just meets the parameters of BIS but surpasses them by a huge margin.</p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x space-y-16">
          {[prestige, power].map((p) => (
            <div key={p.slug}>
              <h2 className="display-md mb-8">{p.name} <span className="story-italic font-normal text-brand-deep">· {p.shortType}</span></h2>
              <SpecTable product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
