"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { products } from "@/data/products";
import { TiltBag } from "@/components/products/TiltBag";

/**
 * Scene 4 — product showcase. Desktop: pinned horizontal track driven by scroll,
 * each pack rising and turning into place. Mobile/tablet: vertical cards with reveals.
 */
export function ProductShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.desktop, () => {
        const track = q("[data-track]")[0];
        const distance = () => track.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        tl.to(track, { x: () => -distance(), duration: 1 }, 0);
        q("[data-panel]").forEach((panel, i) => {
          const bag = panel.querySelector("[data-bag]");
          const at = Math.max(0, (i - 0.9) / (products.length + 0.4));
          tl.from(bag, { yPercent: 30, rotate: -8, autoAlpha: 0.2, duration: 0.18, ease: "power2.out" }, at);
          tl.from(panel.querySelectorAll("[data-copy] > *"), { y: 40, autoAlpha: 0, stagger: 0.02, duration: 0.12 }, at + 0.03);
        });
        tl.to(q("[data-bar]"), { scaleX: 1, duration: 1 }, 0);
      });
      mm.add(mq.belowDesktop, () => {
        q("[data-panel]").forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-bag], [data-copy] > *"), {
            y: 50, autoAlpha: 0, stagger: 0.08, duration: 0.8,
            scrollTrigger: { trigger: panel, start: "top 80%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="products-title" className="relative bg-paper lg:motion-safe:h-[480vh]">
      <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-svh lg:motion-safe:overflow-hidden">
        <div className="container-x pt-24 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-0 lg:motion-safe:z-10 lg:pt-28">
          <p className="eyebrow mb-3 text-brand-deep">Chapter 05 · The range</p>
          <h2 id="products-title" className="display-lg max-w-4xl lg:text-[clamp(2.5rem,4.6vw,4.75rem)]">
            Four cements. <span className="story-italic font-normal text-brand-deep">One standard.</span>
          </h2>
        </div>

        <div data-track className="container-x flex flex-col gap-4 pb-24 pt-10 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:flex-row lg:motion-safe:items-end lg:motion-safe:gap-0 lg:motion-safe:px-0 lg:motion-safe:pb-[7svh] lg:motion-safe:pt-0 lg:motion-safe:will-change-transform">
          <div aria-hidden className="hidden w-[18vw] shrink-0 lg:motion-safe:block" />
          {products.map((p, i) => (
            <article
              key={p.slug}
              data-panel
              className="relative grid shrink-0 items-center gap-6 overflow-hidden rounded-3xl bg-white p-6 sm:grid-cols-[0.9fr_1.1fr] sm:p-10 lg:motion-safe:mr-[4vw] lg:motion-safe:h-[62svh] lg:motion-safe:min-h-[430px] lg:motion-safe:w-[64vw] lg:motion-safe:max-w-[1050px] lg:p-10 xl:p-14 lg:rounded-[2.5rem] lg:p-14"
            >
              <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: p.accent }} />
              <div data-bag className="relative mx-auto w-[62%] max-w-[300px] sm:w-full lg:max-w-[min(340px,38svh)]">
                <TiltBag src={p.image} alt={`${p.name} ${p.shortType} cement bag`} width={p.imageWidth} height={p.imageHeight} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 60vw" />
              </div>
              <div data-copy className="relative">
                <p className="eyebrow text-slate">0{i + 1} / 0{products.length} · {p.standard}</p>
                <h3 className="mt-3 font-display text-4xl font-extrabold leading-none sm:text-5xl xl:text-6xl">{p.name}</h3>
                <p className="mt-2 story-italic text-2xl text-brand-deep">{p.type}</p>
                <p className="mt-5 max-w-md text-slate">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2 lg:[@media(max-height:860px)]:hidden">
                  {p.idealFor.slice(0, 3).map((u) => (
                    <li key={u} className="rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-charcoal">{u}</li>
                  ))}
                </ul>
                <Link href={`/products/${p.slug}`} className="group mt-8 inline-flex min-h-12 items-center gap-3 font-bold text-brand-deep">
                  <span className="link-underline">View {p.name}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-deep text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
          <div aria-hidden className="hidden w-[8vw] shrink-0 lg:motion-safe:block" />
        </div>

        <div aria-hidden className="absolute bottom-6 left-1/2 hidden w-48 -translate-x-1/2 lg:motion-safe:block">
          <div className="h-1 overflow-hidden rounded-full bg-stone">
            <div data-bar className="h-full origin-left scale-x-0 bg-brand-deep" />
          </div>
        </div>
      </div>
    </section>
  );
}
