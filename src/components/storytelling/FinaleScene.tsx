"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { PanyamMark } from "@/components/ui/PanyamMark";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { company } from "@/data/company";

/** Scene 7 — brand finale: the mark is drawn, filled, and the promise is made. */
export function FinaleScene() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const paths = q<SVGPathElement>("[data-outline] [data-draw]");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 65%", end: "center center", scrub: 1 } })
          .from(q("[data-bg]"), { scale: 1.25, ease: "none", duration: 1 }, 0)
          .to(paths, { strokeDashoffset: 0, stagger: 0.1, duration: 0.5, ease: "none" }, 0)
          .from(q("[data-solid]"), { autoAlpha: 0, scale: 0.85, duration: 0.25 }, 0.5)
          .to(q("[data-outline]"), { autoAlpha: 0, duration: 0.2 }, 0.6)
          .from(q("[data-word]"), { yPercent: 110, stagger: 0.05, duration: 0.3 }, 0.55)
          .from(q("[data-after]"), { autoAlpha: 0, y: 30, stagger: 0.05, duration: 0.25 }, 0.75);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const words = company.tagline.split(" ");
  return (
    <section ref={root} aria-labelledby="finale-title" className="relative isolate overflow-hidden bg-brand-night py-28 text-white lg:py-40">
      <div data-bg className="absolute inset-0 -z-20 will-change-transform">
        <Image src="/images/web/factory-aerial-wide.webp" alt="" fill sizes="100vw" className="object-cover opacity-35" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(6_38_26/0.55),rgb(6_38_26/0.97)_70%)]" />
      <div className="container-x flex flex-col items-center text-center">
        <div className="relative mb-10 h-32 w-36 sm:h-40 sm:w-44">
          <div data-outline className="absolute inset-0"><PanyamMark variant="outline" className="h-full w-full" /></div>
          <div data-solid className="absolute inset-0"><PanyamMark className="h-full w-full" /></div>
        </div>
        <p className="eyebrow mb-6 text-sun">Panyam Cement · Since {company.founded}</p>
        <h2 id="finale-title" className="display-xl max-w-6xl leading-[0.9]" aria-label={company.tagline}>
          {words.map((w, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-2 align-bottom">
              <span data-word className={`inline-block ${i >= 2 ? "story-italic font-normal text-sun" : ""}`}>
                {w}&nbsp;
              </span>
            </span>
          ))}
        </h2>
        <p data-after className="mt-8 max-w-2xl text-lg text-white/80">
          Seventy years of building — and a refurbished plant ready for the next seventy. Talk to us about your project, your dealership, or a visit to Cement Nagar.
        </p>
        <div data-after className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/contact?type=quote" variant="sun">Request a quote</MagneticButton>
          <MagneticButton href="/contact?type=dealer" variant="ghost-light">Become a dealer</MagneticButton>
          <MagneticButton href={company.brochure} variant="ghost-light" download>Brochure (PDF)</MagneticButton>
        </div>
        <div data-after className="mt-16 flex items-center gap-4 text-white/60">
          <span className="text-xs uppercase tracking-[0.3em]">A company of</span>
          <Image src="/images/web/accord-logo-white.webp" alt="Accord Group" width={120} height={81} className="h-12 w-auto" />
        </div>
      </div>
    </section>
  );
}
