"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: 0.3 } },
    );
  });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-brand via-sun to-kiln" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
