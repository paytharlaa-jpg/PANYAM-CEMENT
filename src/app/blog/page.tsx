import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Blog & Updates",
  description: "Building guides, product advice and news from Panyam Cement.",
  path: "/blog",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="Blog & updates" title="Notes from the plant and the site." italic={["site."]} crumbs={[{ label: "Blog" }]} />
      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          {lead && (
            <Link href={`/blog/${lead.slug}`} className="group hover-lift sheen mb-10 grid overflow-hidden rounded-[2rem] bg-white lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image src={lead.cover} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="p-8 lg:p-12">
                <p className="eyebrow text-brand-deep">{lead.category} · {fmt(lead.date)}</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{lead.title}</h2>
                <p className="mt-4 text-lg text-slate">{lead.excerpt}</p>
                <p className="mt-6 font-bold text-brand-deep">Read article · {lead.readMinutes} min</p>
              </div>
            </Link>
          )}
          <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group hover-lift overflow-hidden rounded-[2rem] bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-brand-deep">{p.category} · {fmt(p.date)}</p>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug">{p.title}</h2>
                  <p className="mt-3 text-slate">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
