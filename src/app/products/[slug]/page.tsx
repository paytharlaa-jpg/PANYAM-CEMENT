import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, FileText } from "lucide-react";
import { TiltBag } from "@/components/products/TiltBag";
import { SpecTable } from "@/components/products/SpecTable";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { products, getProduct } from "@/data/products";
import { company } from "@/data/company";
import { pageMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — ${p.shortType} Cement`, description: `${p.name}: ${p.type}. ${p.summary}`, path: `/products/${p.slug}`, image: p.image });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const others = products.filter((o) => o.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    category: p.type,
    image: `${siteUrl}${p.image}`,
    brand: { "@type": "Brand", name: company.shortName },
    manufacturer: { "@type": "Organization", name: company.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-paper pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div aria-hidden className="absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl" style={{ background: p.accent }} />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate">
              <li><Link href="/" className="link-underline">Home</Link></li>
              <li className="flex items-center gap-1"><ChevronRight aria-hidden className="h-3.5 w-3.5" /><Link href="/products" className="link-underline">Products</Link></li>
              <li className="flex items-center gap-1"><ChevronRight aria-hidden className="h-3.5 w-3.5" /><span aria-current="page">{p.name}</span></li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="mx-auto w-full max-w-[420px]">
              <TiltBag src={p.image} alt={`${p.name} ${p.shortType} cement bag`} width={p.imageWidth} height={p.imageHeight} priority sizes="(min-width: 1024px) 35vw, 80vw" />
            </div>
            <div>
              <p className="eyebrow text-brand-deep">{p.shortType} · {p.standard}</p>
              <RevealText as="h1" text={p.name} trigger="load" className="display-lg mt-3" />
              <p className="story-italic mt-3 text-2xl text-brand-deep sm:text-3xl">{p.type}</p>
              <div className="mt-6 space-y-4 text-lg text-slate">
                {p.description.map((d) => <p key={d}>{d}</p>)}
              </div>
              <h2 className="mt-8 text-sm font-bold uppercase tracking-widest">Ideal for</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.idealFor.map((u) => (
                  <li key={u} className="flex items-center gap-2 font-semibold"><Check aria-hidden className="h-5 w-5 text-brand" />{u}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href={`/contact?type=quote&product=${p.slug}`}>Request a quote</MagneticButton>
                <MagneticButton href={`/calculator`} variant="ghost-dark">Calculate bags</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <p className="eyebrow mb-4 text-brand-deep">Technical specifications</p>
          <h2 className="display-md mb-10">Tested beyond the standard.</h2>
          {p.specs ? (
            <Reveal><SpecTable product={p} /></Reveal>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-3xl border border-stone bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-lg text-slate"><FileText aria-hidden className="h-6 w-6 text-brand" /> Detailed test values for {p.name} are available on request from our marketing team.</p>
              <MagneticButton href={`/contact?type=general`} variant="ghost-dark">Request spec sheet</MagneticButton>
            </div>
          )}
          <p className="mt-4 text-sm text-slate">Values from Panyam’s published technical specifications. Manufactured to {p.standard}.</p>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <h2 className="display-md mb-10">Other Panyam cements</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="group hover-lift sheen flex items-center gap-4 rounded-3xl bg-paper p-5">
                <div className="w-20 shrink-0"><TiltBag src={o.image} alt="" width={o.imageWidth} height={o.imageHeight} sizes="80px" /></div>
                <div>
                  <p className="font-display text-xl font-bold">{o.name}</p>
                  <p className="text-sm text-slate">{o.shortType}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
