import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { RevealText } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career with Panyam Cement — a refurbished plant at Cement Nagar, Andhra Pradesh, with a legacy since 1955.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build what lasts — with us."
        italic={["lasts"]}
        intro="A refurbished plant, a second line in the pipeline and a legacy since 1955. We welcome applications from engineers, chemists, technicians, sales and support professionals."
        crumbs={[{ label: "Careers" }]}
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <RevealText text="Send us your application." italic={["application."]} className="display-md" />
            <p className="mt-6 text-lg text-slate">There are no open positions listed right now. Share your details and resume, and our team will contact you when a suitable role opens.</p>
          </div>
          <Suspense fallback={<div className="h-[600px] rounded-[2rem] bg-white" />}>
            <EnquiryForm fixedType="career" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
