"use client";
import Image from "next/image";
import { useRef } from "react";
import { PaintReveal } from "./PaintReveal";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { legacyProjects, institutionalClients } from "@/data/company";

export function LegacyScene() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const brushes = q<SVGPathElement>("[data-brush]");
        brushes.forEach((p) => {
          const len = Math.ceil(p.getTotalLength()) + 2;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(q("[data-wash]"), { opacity: 0 });
        gsap.timeline({ scrollTrigger: { trigger: q("[data-art]")[0], start: "top 75%", end: "bottom 45%", scrub: 1 } })
          .from(q("[data-pump]"), { xPercent: -25, autoAlpha: 0, duration: 0.25, ease: "power2.out" }, 0)
          .to(q("[data-brush=dab]"), { strokeDashoffset: 0, duration: 0.06, stagger: 0.02 }, 0.25)
          .to(q("[data-brush=sweep]"), { strokeDashoffset: 0, duration: 0.06, stagger: 0.015 }, 0.32)
          .to(q("[data-wash]"), { opacity: 1, duration: 0.06 }, 0.8)
          .to(q("[data-pump-sketch]"), { autoAlpha: 0, duration: 0.06 }, 0.84);
        gsap.from(q("[data-project]"), { x: -30, autoAlpha: 0, stagger: 0.07, duration: 0.7, scrollTrigger: { trigger: q("[data-projects]")[0], start: "top 80%", once: true } });
      });
      
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="legacy-title" className="relative overflow-hidden bg-paper py-24 lg:py-36">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div data-art className="relative rounded-[2rem] bg-white p-4 shadow-[0_40px_80px_-40px_rgb(6_38_26/0.35)] sm:p-8">
            <div data-pump className="relative w-full" style={{ aspectRatio: "1671 / 746" }}>
              <div data-pump-sketch className="absolute inset-0 motion-reduce:hidden">
                <Image src="/images/web/pump-line.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
              </div>
              <PaintReveal id="paint-pump" src="/images/web/pump-color.webp" width={1671} height={746} focus={[1400, 300]} className="absolute inset-0 h-full w-full" />
            </div>
            <div aria-hidden className="mx-auto mt-1 h-3 w-[90%] rounded-[50%] bg-black/15 blur-sm" />
            <p className="mt-4 text-center text-sm text-slate">Illustration — concrete boom pump at a project site</p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-brand-deep">Chapter 06 · Infrastructure</p>
            <h2 id="legacy-title" className="display-lg">
              Built into <span className="story-italic font-normal text-brand-deep">the landmarks.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-slate">
              Irrigation and power projects that have stood the test of time and harsh environments were built with Panyam Cement.
            </p>
            <ul data-projects className="mt-10 divide-y divide-stone border-y border-stone">
              {legacyProjects.map((p) => (
                <li key={p.name} data-project className="group flex items-center justify-between py-4 transition-[padding] duration-500 ease-[var(--ease-out-expo)] hover:pl-3">
                  <span className="font-display text-xl font-bold sm:text-2xl">{p.name}</span>
                  <span className="text-sm font-semibold text-slate transition-colors group-hover:text-brand-deep">{p.state}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Institutional relationships marquee */}
      <div className="relative mt-24">
        <p className="container-x eyebrow mb-6 text-slate">Longstanding relationships with</p>
        <div className="group relative flex overflow-hidden border-y border-stone bg-white py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center gap-12 pr-12 motion-safe:animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
              {institutionalClients.map((c) => (
                <li key={c} className="whitespace-nowrap font-display text-lg font-bold text-charcoal/80 sm:text-xl">
                  <span aria-hidden className="mr-12 text-brand">◆</span>{c}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
