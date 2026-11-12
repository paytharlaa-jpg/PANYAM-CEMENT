"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { PanyamMark } from "@/components/ui/PanyamMark";

/**
 * First-visit loading experience: the fort mark is drawn line by line,
 * filled with brand colour, then the curtain lifts. Shown once per session.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("pc-intro") === "1"; } catch {}
    const reduced = prefersReducedMotion();
    if (seen || reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip intro immediately
      setDone(true);
      return;
    }
    const el = root.current!;
    document.documentElement.style.overflow = "hidden";
    const paths = el.querySelectorAll<SVGPathElement>("[data-draw]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    const counter = { v: 0 };
    const num = el.querySelector<HTMLSpanElement>("[data-count]")!;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        try { sessionStorage.setItem("pc-intro", "1"); } catch {}
        document.documentElement.style.overflow = "";
        setDone(true);
        window.dispatchEvent(new Event("pc:intro-done"));
      },
    });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12 })
      .to(counter, { v: 100, duration: 1.4, ease: "power1.inOut", onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
      .to(el.querySelector("[data-solid]"), { opacity: 1, scale: 1, duration: 0.5 }, 1.1)
      .to(el.querySelector("[data-word]"), { yPercent: 0, duration: 0.6, ease: "power3.out" }, 1.15)
      .to(el.querySelector("[data-curtain]"), { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 1.9)
      .to(el, { autoAlpha: 0, duration: 0.01 });
    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;
  return (
    <div ref={root} data-preloader className="fixed inset-0 z-[100] [html.intro-seen_&]:hidden [html.reduce-motion_&]:hidden" role="status" aria-label="Loading Panyam Cement">
      <div data-curtain className="absolute inset-0 grid place-items-center bg-brand-night">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-28 w-32 sm:h-36 sm:w-40">
            <PanyamMark variant="outline" className="absolute inset-0 h-full w-full" fortColor="#FFF315" cutColor="#00A85A" />
            <div data-solid className="absolute inset-0 scale-90 opacity-0">
              <PanyamMark className="h-full w-full" />
            </div>
          </div>
          <div className="overflow-hidden">
            <p data-word className="translate-y-full font-display text-2xl font-extrabold uppercase tracking-[0.3em] text-white sm:text-3xl">
              Panyam Cement
            </p>
          </div>
          <p className="eyebrow text-white/60">
            Since 1955 · <span data-count className="tabular-nums">000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
