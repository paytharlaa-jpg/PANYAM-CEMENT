"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { timeline } from "@/data/company";

/** Vertical timeline whose spine is drawn by scroll. */
export function Timeline() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        gsap.fromTo(q("[data-spine]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("ol")[0], start: "top 70%", end: "bottom 60%", scrub: true } });
        q("[data-item]").forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: el, start: "top 80%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="timeline-title" className="bg-white py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4 text-brand-deep">Milestones</p>
          <h2 id="timeline-title" className="display-md">Seven decades <span className="story-italic font-normal text-brand-deep">in the making.</span></h2>
        </div>
        <ol className="relative space-y-12 pl-10">
          <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-stone" />
          <span aria-hidden data-spine className="absolute bottom-0 left-[7px] top-0 w-0.5 origin-top bg-brand" />
          {timeline.map((t) => (
            <li key={t.year} data-item className="relative">
              <span aria-hidden className="absolute -left-10 top-2 h-4 w-4 rounded-full border-4 border-white bg-brand shadow-[0_0_0_2px_var(--color-brand)]" />
              <p className="font-display text-4xl font-extrabold text-brand-deep sm:text-5xl">{t.year}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
              <p className="mt-2 max-w-xl text-slate">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
