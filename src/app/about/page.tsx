import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Timeline } from "@/components/sections/Timeline";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { company, leaders, legacyProjects, institutionalClients } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Panyam Cement",
  description: "Since 1955, Panyam Cement has built dams, railways and homes across South India. Discover our history, leadership and the Accord Group.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Panyam"
        title="Trust and confidence since 1955."
        italic={["1955."]}
        intro="Seventy years ago a cement plant was set up in Rayalaseema to help build a newly independent India. Today, completely refurbished, it is producing again."
        image="/images/web/factory-aerial-wide.webp"
        imageAlt="Aerial view of the Panyam Cement plant"
        crumbs={[{ label: "About" }]}
      />

      <section id="story" className="scroll-mt-24 py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Our story</p>
            <RevealText text="A name that stands for strength, quality and reputation." italic={["strength,", "quality", "reputation."]} className="display-md" />
          </div>
          <Reveal className="space-y-5 text-lg text-slate">
            <p>
              {company.legalName} was promoted by Padmasri Somappa and others and incorporated on {company.incorporated} with a vision to manufacture cement and be a part of the infrastructural development of the State and the new independent India.
            </p>
            <p>
              The plant was set up in the Rayalaseema region, providing employment across the district. One 200 TPD kiln grew to three, the wet-process kilns were converted to dry process, and capacity reached 2,200 TPD — making Panyam one of the largest cement manufacturing units in the country.
            </p>
            <p>
              After a challenging period, the company went through the Corporate Insolvency Resolution Process under the IBC, 2016. Dr. Srinisha Jagathrakshakan along with M/s. RV Consulting Services Pvt. Ltd. and M/s. Sagar Power Ltd. became the new promoters and revived the company. The plant has been completely refurbished and has begun production, marketing its cement in and around Andhra Pradesh.
            </p>
          </Reveal>
        </div>
      </section>

      <Timeline />

      <section id="leadership" className="scroll-mt-24 py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-4 text-brand-deep">Leadership</p>
          <RevealText text="Guided by experience." italic={["experience."]} className="display-md mb-14" />
          <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-2">
            {leaders.map((l) => (
              <article key={l.name} className="hover-lift rounded-[2rem] border border-stone bg-white p-8 lg:p-10">
                <div aria-hidden className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand-mint font-display text-2xl font-extrabold text-brand-deep">
                  {l.name.replace(/^(Dr\.|Mr\.)\s*/, "").split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="font-display text-2xl font-bold">{l.name}</h3>
                <p className="story-italic text-xl text-brand-deep">{l.role}</p>
                <p className="mt-4 text-slate">{l.bio}</p>
              </article>
            ))}
          </Reveal>
          <p className="mt-8 text-slate">
            The full Board of Directors and committee composition is published on the <a href="/investors#board" className="font-semibold text-brand-deep underline">Investors</a> page.
          </p>
        </div>
      </section>

      <section id="legacy" className="scroll-mt-24 bg-brand-night py-24 text-white lg:py-32">
        <div className="container-x">
          <p className="eyebrow mb-4 text-sun">Legacy projects</p>
          <RevealText text="Cement that shaped a region." italic={["region."]} className="display-md max-w-3xl" />
          <Reveal stagger={0.05} className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {legacyProjects.map((p) => (
              <div key={p.name} className="bg-brand-night p-6 transition-colors duration-500 hover:bg-brand-deep">
                <p className="font-display text-xl font-bold">{p.name}</p>
                <p className="mt-1 text-sm text-white/60">{p.state}</p>
              </div>
            ))}
            <div className="bg-sun p-6 text-charcoal">
              <p className="font-display text-xl font-bold">Indian Railways</p>
              <p className="mt-1 text-sm">First to supply sleeper grade cement</p>
            </div>
          </Reveal>
          <div className="mt-20">
            <p className="eyebrow mb-6 text-white/60">Longstanding relationships</p>
            <ul className="grid gap-x-8 gap-y-3 text-white/85 sm:grid-cols-2 lg:grid-cols-3">
              {institutionalClients.map((c) => <li key={c} className="border-b border-white/10 py-2">{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="group" className="scroll-mt-24 py-24 lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="grid place-items-center rounded-[2rem] bg-white p-10">
            <Image src="/images/web/accord-logo.webp" alt="Accord Group" width={320} height={320} className="h-auto w-56" />
          </Reveal>
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Our group</p>
            <RevealText text="A company of the Accord Group." italic={["Accord", "Group."]} className="display-md" />
            <p className="mt-6 max-w-xl text-lg text-slate">
              Panyam Cements &amp; Mineral Industries Ltd. is a company of the Accord Group. Under its new promoters the plant has been completely refurbished and is preparing for its next phase of growth, with a second production line in the pipeline.
            </p>
            <div className="mt-8"><MagneticButton href="/contact">Get in touch</MagneticButton></div>
          </div>
        </div>
      </section>
    </>
  );
}
