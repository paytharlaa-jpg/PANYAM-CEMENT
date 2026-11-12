import { PageHero } from "@/components/layout/PageHero";
import { faqs } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about Panyam Cement products, buying, dealership, plant visits and investor services.",
  path: "/faq",
});

export default function FaqPage() {
  const groups = [...new Set(faqs.map((f) => f.category))];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Questions, answered." italic={["answered."]} crumbs={[{ label: "FAQ" }]} />
      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2.2fr]">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-32 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {groups.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase()}`} className="inline-flex min-h-11 items-center rounded-full bg-white px-5 font-bold hover:bg-brand-mint">{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {groups.map((g) => (
              <div key={g} id={g.toLowerCase()} className="scroll-mt-28">
                <h2 className="mb-5 font-display text-3xl font-extrabold">{g}</h2>
                <div className="divide-y divide-stone overflow-hidden rounded-3xl bg-white">
                  {faqs.filter((f) => f.category === g).map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-bold [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-mint text-brand-deep transition-transform duration-300 group-open:rotate-45">+</span>
                      </summary>
                      <p className="px-6 pb-6 text-slate">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-3xl bg-brand-night p-8 text-white">
              <p className="font-display text-2xl font-bold">Still have a question?</p>
              <div className="mt-5"><MagneticButton href="/contact" variant="sun">Contact our team</MagneticButton></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
