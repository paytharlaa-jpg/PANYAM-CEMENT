"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";

/** Technical line drawing of a transit mixer, "drawn" left-to-right by scroll and rolling in. */
export function LineMixer({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 35%", scrub: 1 } })
          .fromTo(ref.current!.querySelector("[data-draw]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
          .fromTo(ref.current, { x: 120 }, { x: 0, ease: "power2.out" }, 0)
          .fromTo(ref.current!.querySelector("[data-pen]"), { left: "0%", autoAlpha: 1 }, { left: "100%", autoAlpha: 0, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} aria-hidden className={`relative ${className}`} style={{ aspectRatio: "1234 / 551" }}>
      <div data-draw className="absolute inset-0">
        <Image src="/images/web/mixer-sketch-lineart.webp" alt="" fill sizes="40vw" className="object-contain opacity-80" />
      </div>
      <span data-pen className="absolute top-0 h-full w-px bg-brand opacity-0 shadow-[0_0_12px_2px_rgba(0,168,90,0.6)]" />
    </div>
  );
}
