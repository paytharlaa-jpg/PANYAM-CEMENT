import { Suspense } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Panyam Cement for product enquiries, quotes, dealership and plant visits. Corporate office in Madhapur, Hyderabad; cement works at Cement Nagar, Nandyal District.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something lasting."
        italic={["lasting."]}
        intro="Quotes, dealership, plant visits or a simple question — tell us what you need and the right team will get back to you."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Suspense fallback={<div className="h-[600px] rounded-[2rem] bg-white" />}>
            <EnquiryForm />
          </Suspense>
          <Reveal stagger={0.08} className="space-y-4">
            {company.offices.map((o) => (
              <address key={o.id} className="rounded-3xl border border-stone bg-white p-6 not-italic">
                <h2 className="font-display text-xl font-bold">{o.title}</h2>
                <p className="mt-3 flex gap-2 text-slate"><MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" />{o.lines.join(", ")}</p>
                <p className="mt-2 flex gap-2 text-slate"><User aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" />{o.contact}</p>
                <p className="mt-2 flex gap-2 text-slate"><Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" />{o.phones.join(" · ")}</p>
                <p className="mt-2 flex gap-2"><Mail aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" /><a className="link-underline font-semibold text-brand-deep" href={`mailto:${o.email}`}>{o.email}</a></p>
                {"map" in o && o.map && (
                  <a href={o.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-brand-deep underline">
                    Open in Google Maps
                  </a>
                )}
              </address>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
