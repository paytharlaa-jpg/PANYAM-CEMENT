import { Suspense } from "react";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { PresenceMap } from "@/components/sections/PresenceMap";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Distribution Network",
  description: "Panyam Cement is marketed across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala and Goa. Find a dealer or apply to become one.",
  path: "/network",
});

export default function NetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Network & presence"
        title="Reaching six states from Rayalaseema."
        italic={["six", "states"]}
        intro="From our works at Cement Nagar, Panyam Cement travels to builders, contractors and institutions across South India and Goa."
        image="/images/web/factory-portrait-close.webp"
        imageAlt="Trucks at the Panyam Cement loading bay"
        crumbs={[{ label: "Network" }]}
      />
      <section className="py-24 lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <PresenceMap />
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Where we are</p>
            <RevealText text="Panyam Cement is available in" className="display-md" />
            <Reveal stagger={0.06} as="ul" className="mt-8 grid grid-cols-2 gap-3">
              {company.presence.map((s) => (
                <li key={s} className="flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 font-bold">
                  <MapPin aria-hidden className="h-5 w-5 text-brand" />{s}
                </li>
              ))}
            </Reveal>
            <p className="mt-8 text-slate">
              Looking for the nearest dealer? Call our marketing office on <a href={company.primaryPhoneHref} className="font-semibold text-brand-deep underline">{company.primaryPhone}</a> or email <a href={`mailto:${company.salesEmail}`} className="font-semibold text-brand-deep underline">{company.salesEmail}</a>.
            </p>
          </div>
        </div>
      </section>
      <section id="dealer" className="scroll-mt-24 bg-brand-mint py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Partner with us</p>
            <RevealText text="Become a Panyam dealer." italic={["dealer."]} className="display-md" />
            <p className="mt-6 text-lg text-slate">Grow with a brand builders have trusted since 1955. Share your details and our marketing team will contact you.</p>
          </div>
          <Suspense fallback={<div className="h-[600px] rounded-[2rem] bg-white" />}>
            <EnquiryForm fixedType="dealer" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
