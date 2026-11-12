import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPosts } from "@/lib/cms";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { company } from "@/data/company";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return { ...pageMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.cover }), openGraph: { type: "article", title: p.title, description: p.excerpt, images: [p.cover] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    image: p.cover.startsWith("http") ? p.cover : `${siteUrl}${p.cover}`,
    author: { "@type": "Organization", name: company.shortName },
    publisher: { "@type": "Organization", name: company.legalName },
  };
  return (
    <article className="pb-24 pt-32 lg:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x max-w-3xl">
        <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-bold text-brand-deep"><ArrowLeft aria-hidden className="h-4 w-4" /> All articles</Link>
        <p className="eyebrow mt-6 text-brand-deep">{p.category} · {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {p.readMinutes} min read</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">{p.title}</h1>
        <p className="mt-6 text-xl text-slate">{p.excerpt}</p>
      </div>
      <div className="container-x my-12 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem]">
          <Image src={p.cover} alt="" fill priority sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-x max-w-3xl space-y-6 text-lg leading-relaxed text-charcoal/90">
        {p.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i} className="pt-4 font-display text-2xl font-bold sm:text-3xl">{b.text}</h2>
          ) : b.type === "ul" ? (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand">{b.items!.map((it) => <li key={it}>{it}</li>)}</ul>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
        <div className="mt-12 flex flex-wrap gap-3 border-t border-stone pt-8">
          <MagneticButton href="/calculator">Cement calculator</MagneticButton>
          <MagneticButton href="/contact?type=quote" variant="ghost-dark">Request a quote</MagneticButton>
        </div>
      </div>
    </article>
  );
}
