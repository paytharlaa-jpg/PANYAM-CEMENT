import { PageHero } from "@/components/layout/PageHero";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How Panyam Cement collects and uses information submitted through this website.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy." crumbs={[{ label: "Privacy Policy" }]} />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-6 text-lg text-slate [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-charcoal">
          <p className="text-sm">Draft for review by {company.legalName} before publication.</p>
          <h2>Information we collect</h2>
          <p>When you submit an enquiry, quote request, dealership application, visit booking or job application, we collect the details you provide — such as your name, phone number, email address, city, and any message or attachment.</p>
          <h2>How we use it</h2>
          <p>We use this information only to respond to your request, process your application, and contact you about it. We do not sell your information.</p>
          <h2>Sharing</h2>
          <p>Submissions are delivered by email to the relevant company team through our email service provider. Information may be shared with our authorised dealers only where needed to fulfil your request.</p>
          <h2>Retention</h2>
          <p>We keep enquiry information for as long as needed to respond and for legitimate business records, after which it is deleted.</p>
          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies. Your browser may store small preferences (such as whether the intro animation has played) for your session.</p>
          <h2>Contact</h2>
          <p>For any privacy question, write to <a href={`mailto:${company.investorContact.email}`} className="font-semibold text-brand-deep underline">{company.investorContact.email}</a> or {company.legalName}, {company.offices[1].lines.join(", ")}.</p>
        </div>
      </section>
    </>
  );
}
