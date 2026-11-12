"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";

// A general description of dry-process cement manufacture (not plant-specific claims).
const steps = [
  { t: "Quarrying", d: "Limestone is extracted and crushed." },
  { t: "Raw milling", d: "Limestone and additives are ground into a fine, homogeneous raw meal." },
  { t: "Preheating", d: "Raw meal is heated by hot kiln gases as it descends the preheater tower." },
  { t: "Clinkering", d: "In the rotary kiln, the meal fuses into clinker at around 1,450 °C." },
  { t: "Cooling", d: "Coolers bring the clinker down to handling temperature." },
  { t: "Cement milling", d: "Clinker is ground with gypsum (and fly ash for PPC) into cement." },
  { t: "Testing & packing", d: "Laboratory-verified cement is packed and dispatched." },
];

/** Dry-process flow: a line is drawn across the steps as you scroll. */
export function ProcessFlow() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("ol")[0], start: "top 75%", end: "bottom 55%", scrub: 1 } });
        const wide = window.matchMedia("(min-width: 1024px)").matches;
        tl.fromTo(q("[data-line]"), wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: 1 }, 0);
        q("[data-step]").forEach((s, i) => tl.from(s, { autoAlpha: 0.15, y: 20, duration: 0.15 }, (i / steps.length) * 0.9));
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="process-title" className="blueprint-grid bg-white py-24 lg:py-32">
      <div className="container-x">
        <p className="eyebrow mb-4 text-brand-deep">How cement is made</p>
        <h2 id="process-title" className="display-md max-w-3xl">From quarry to bag, <span className="story-italic font-normal text-brand-deep">in seven steps.</span></h2>
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-7 lg:gap-4">
          <span aria-hidden className="absolute left-[11px] top-0 h-full w-0.5 bg-stone lg:left-0 lg:top-[11px] lg:h-0.5 lg:w-full" />
          <span aria-hidden data-line className="absolute left-[11px] top-0 h-full w-0.5 origin-top bg-brand lg:left-0 lg:top-[11px] lg:h-0.5 lg:w-full lg:origin-left" />
          {steps.map((s, i) => (
            <li key={s.t} data-step className="relative pl-10 lg:pl-0 lg:pt-10">
              <span aria-hidden className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full bg-brand text-[0.65rem] font-bold text-white">{i + 1}</span>
              <h3 className="font-display text-lg font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-slate">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
