"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { PaintReveal } from "./PaintReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * On site: a transit-mixer arrives as a pencil sketch, is brush-painted into
 * Panyam colours, then drives off to the next pour.
 */
export function MixerScene() {
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
        const vw = () => window.innerWidth;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        tl.from(q("[data-copy] > *"), { y: 40, autoAlpha: 0, stagger: 0.03, duration: 0.12, ease: "power2.out" }, 0)
          .fromTo(q("[data-site]"), { xPercent: 6 }, { xPercent: -6, duration: 1 }, 0)
          // drive in (sketch)
          .fromTo(q("[data-mixer]"), { x: () => -vw() * 0.9 }, { x: 0, duration: 0.25, ease: "power2.out" }, 0)
          .to(q("[data-mixer-body]"), { y: -2, duration: 0.02, repeat: 11, yoyo: true }, 0)
          // paint it
          .to(q("[data-brush=dab]"), { strokeDashoffset: 0, duration: 0.05, stagger: 0.02, ease: "power1.inOut" }, 0.28)
          .to(q("[data-brush=sweep]"), { strokeDashoffset: 0, duration: 0.05, stagger: 0.012, ease: "power1.inOut" }, 0.33)
          .to(q("[data-wash]"), { opacity: 1, duration: 0.05 }, 0.6)
          .to(q("[data-sketch]"), { autoAlpha: 0, duration: 0.05 }, 0.63)
          .fromTo(q("[data-drum-shine]"), { xPercent: -120 }, { xPercent: 220, duration: 0.15 }, 0.62)
          .to(q("[data-copy2]"), { autoAlpha: 1, y: 0, duration: 0.08 }, 0.66)
          // drive off
          .to(q("[data-mixer]"), { x: () => vw() * 1.05, duration: 0.25, ease: "power2.in" }, 0.75)
          .to(q("[data-mixer-body]"), { y: -2, duration: 0.02, repeat: 11, yoyo: true }, 0.75);

        q("[data-smoke]").forEach((p, i) => {
          gsap.fromTo(p, { opacity: 0.45, scale: 0.4, x: 0, y: 0 }, { opacity: 0, scale: 2.2, x: -60, y: -50, duration: 1.8, repeat: -1, delay: i * 0.6, ease: "sine.out" });
        });
      });
      mm.add(mq.reduced, () => gsap.set(q("[data-copy2]"), { autoAlpha: 1, y: 0 }));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="mixer-title" className="relative bg-paper motion-safe:h-[420vh] max-sm:motion-safe:h-[340vh]">
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative">
        <div aria-hidden className="blueprint-grid absolute inset-0" />
        {/* site scenery */}
        <div data-site aria-hidden className="absolute bottom-[14svh] right-[-4vw] w-[min(70vw,980px)] max-sm:w-[130vw] max-sm:right-[-30vw]">
          <Image src="/images/web/construction-site.webp" alt="" width={890} height={890} sizes="70vw" loading="eager" className="h-auto w-full [mask-image:linear-gradient(90deg,transparent,#000_30%,#000_85%,transparent),linear-gradient(0deg,#000_80%,transparent)] [mask-composite:intersect]" />
        </div>

        {/* road */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[14svh] bg-gradient-to-b from-[#3b403e] to-[#252927]">
          <div className="absolute inset-x-0 top-[45%] h-1 bg-[repeating-linear-gradient(90deg,#f4f0dc_0_60px,transparent_60px_110px)]" />
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#cfcabb]" />
        </div>

        {/* copy */}
        <div className="container-x relative z-30 pt-24 lg:pt-32">
          <div data-copy className="max-w-md rounded-3xl bg-paper/80 p-5 backdrop-blur-sm sm:p-6">
            <p className="eyebrow mb-3 text-brand-deep">On site</p>
            <h2 id="mixer-title" className="display-md text-charcoal">
              From bag <span className="story-italic font-normal text-brand-deep">to building.</span>
            </h2>
            <p className="mt-4 text-sm text-slate sm:text-lg">
              Panyam cement becomes the concrete that shapes homes, roads and dams — mixed, delivered and poured with confidence.
            </p>
            <p data-copy2 className="mt-4 translate-y-4 font-semibold text-brand-deep opacity-0">Plan your pour with the cement calculator.</p>
            <div className="mt-5 max-sm:hidden">
              <MagneticButton href="/calculator" variant="ghost-dark">Cement calculator</MagneticButton>
            </div>
          </div>
        </div>

        {/* the mixer */}
        <div data-mixer className="absolute bottom-[calc(14svh-1.2vw)] left-[64%] z-20 w-[min(40vw,620px)] -translate-x-1/2 will-change-transform max-lg:left-1/2 max-lg:w-[min(70vw,560px)] max-sm:w-[88vw]" style={{ aspectRatio: "1518 / 920" }}>
          <div data-mixer-body className="relative h-full w-full">
            {/* exhaust */}
            <div aria-hidden className="absolute left-[64%] top-[30%]">
              {[0, 1, 2].map((i) => <span key={i} data-smoke className="absolute h-6 w-6 rounded-full bg-[#cfd3d0] opacity-0 blur-[2px]" />)}
            </div>
            <div data-sketch className="absolute inset-0 motion-reduce:hidden">
              <Image src="/images/web/mixer-line.webp" alt="" fill sizes="(max-width: 640px) 88vw, 46vw" loading="eager" className="object-contain" />
            </div>
            <PaintReveal id="paint-mixer" src="/images/web/mixer-color.webp" width={1518} height={920} focus={[520, 330]} className="absolute inset-0 h-full w-full drop-shadow-[0_18px_16px_rgba(0,0,0,0.25)]" />
            {/* light sweep across the drum once painted */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-[4%] h-[55%] w-[60%] overflow-hidden [clip-path:polygon(0_22%,58%_0,100%_38%,72%_100%,8%_70%)]">
              <div data-drum-shine className="h-full w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
        <span className="sr-only">Illustration of a Panyam Cement transit mixer truck at a construction site.</span>
      </div>
    </section>
  );
}
