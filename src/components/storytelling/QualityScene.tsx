"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq, SCRUB } from "@/animations/gsap";
import { products } from "@/data/products";
import { company, labFacilities } from "@/data/company";

const prestige = products.find((p) => p.slug === "panyam-prestige")!;
const strength = prestige.specs!.filter((s) => s.parameter.startsWith("Compressive"));

/** Line-art lab instruments, drawn by scroll */
function LabIcons() {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 480 140" className="h-auto w-full text-sun" aria-hidden>
      {/* control room screens */}
      <g {...s}>
        <path data-line d="M10 40 h80 v52 h-80 Z M100 40 h80 v52 h-80 Z M50 92 v14 M140 92 v14 M30 106 h130" />
        <path data-line d="M20 80 l14 -16 l14 10 l18 -22 l14 12 M110 70 h24 M110 58 h50 M110 80 h36" />
      </g>
      {/* x-ray analyser */}
      <g {...s}>
        <path data-line d="M210 60 h100 v46 h-100 Z M220 60 v-18 h80 v18 M232 76 h56 v18 h-56 Z" />
        <path data-line d="M240 52 h40" />
      </g>
      {/* beaker + flask */}
      <g {...s}>
        <path data-line d="M350 30 v40 l-22 44 q-4 10 8 10 h50 q12 0 8 -10 l-22 -44 v-40 Z M344 30 h28" />
        <path data-line d="M336 100 h44" />
        <path data-line d="M420 40 v74 q0 10 10 10 h16 q10 0 10 -10 v-74 M414 40 h48 M420 84 h36" />
      </g>
    </svg>
  );
}

export function QualityScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const lines = q<SVGPathElement>("[data-line]");
        lines.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        // limestone strata parallax
        q("[data-stratum]").forEach((el, i) => {
          gsap.to(el, { yPercent: -12 * (i + 1), ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.timeline({ scrollTrigger: { trigger: q("[data-lab]")[0], start: "top 75%", end: "bottom 60%", scrub: SCRUB } })
          .to(lines, { strokeDashoffset: 0, stagger: 0.05, ease: "none" });

        // strength bars + counters
        q("[data-bar]").forEach((bar) => {
          const target = Number(bar.dataset.value);
          const counter = bar.closest("li")?.querySelector<HTMLElement>("[data-num]");
          if (!counter) return;
          const o = { v: 0 };
          gsap.timeline({ scrollTrigger: { trigger: bar, start: "top 85%", once: true } })
            .from(bar, { scaleX: 0, duration: 1.4, ease: "power3.out" }, 0)
            .to(o, { v: target, duration: 1.4, ease: "power3.out", onUpdate: () => (counter.textContent = String(Math.round(o.v))) }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="quality-title" className="relative overflow-hidden bg-brand-night text-white">
      {/* Narji limestone strata */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-60">
        {["#0e3a27", "#124631", "#18553b", "#1e6345"].map((c, i) => (
          <div key={c} data-stratum className="absolute inset-x-[-10%] will-change-transform" style={{ bottom: `${-10 + i * -8}%`, height: "60%", background: c, clipPath: `polygon(0 ${30 + i * 6}%, 20% ${22 + i * 5}%, 45% ${34 + i * 3}%, 70% ${20 + i * 6}%, 100% ${30 + i * 4}%, 100% 100%, 0 100%)` }} />
        ))}
      </div>

      <div className="container-x relative py-24 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow mb-4 text-sun">Chapter 04 · From the earth</p>
            <h2 id="quality-title" className="display-lg">
              Made with <span className="story-italic font-normal text-sun">Narji limestone.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              {company.limestone.charAt(0).toUpperCase() + company.limestone.slice(1)} is known for producing strong and durable cement. Every batch is checked in our own laboratories before a single bag is filled.
            </p>
            <div data-lab className="mt-12 max-w-lg">
              <LabIcons />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {labFacilities.map((f) => (
                  <li key={f.title} className="border-t border-white/15 pt-4">
                    <p className="font-display text-lg font-bold">{f.title}</p>
                    <p className="mt-1 text-sm text-white/70">{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:pt-20">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-10">
              <p className="eyebrow text-white/60">Panyam Prestige · OPC 53 vs IS 269:2015</p>
              <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">Compressive strength (MPa)</p>
              <ul className="mt-8 space-y-8">
                {strength.map((s) => (
                  <li key={s.parameter}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-semibold">{s.parameter.replace("Compressive strength — ", "")}</span>
                      <span className="font-display text-3xl font-extrabold text-sun">
                        <span data-num>{s.panyam}</span>
                        <span className="ml-2 text-sm font-semibold text-white/60">vs {s.standard} required</span>
                      </span>
                    </div>
                    <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-white/30" style={{ width: `${(Number(s.standard) / 70) * 100}%` }} />
                      <div data-bar data-value={s.panyam} className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-brand to-sun" style={{ width: `${(Number(s.panyam) / 70) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-white/60">
                Values from Panyam’s published technical specifications. Panyam Cement not just meets the parameters of BIS — it surpasses them by a huge margin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
