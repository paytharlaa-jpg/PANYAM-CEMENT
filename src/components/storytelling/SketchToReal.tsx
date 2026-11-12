"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { company } from "@/data/company";
import { PaintReveal } from "./PaintReveal";

/**
 * Feature 2 — line drawing → pencil sketch → photograph.
 *  1. Blueprint construction lines draw themselves (SVG stroke-dash).
 *  2. A pencil rendering of the real plant is "drawn" in behind a moving pencil edge (mask).
 *  3. The colour photograph blooms out from the preheater tower (expanding clip mask).
 * The sketch is generated from the supplied plant photograph, so all three layers align.
 * Coordinates below are in the photo's own 1280 × 614 space.
 */
const blueprint = [
  // horizon + ground
  "M0 112 C220 100 420 104 640 110 S1060 120 1280 116",
  "M0 560 L1280 520",
  // preheater tower
  "M742 352 V96 L752 88 V54 H762 V88 L790 84 V50 L812 48 V90 L818 96 V352",
  "M742 140 H818 M742 185 H818 M742 230 H818 M742 275 H818 M742 320 H818",
  // silos
  "M962 430 V264 Q985 252 1008 264 V430",
  "M1008 430 V258 Q1018 252 1028 258 V430",
  "M832 450 V380 Q856 370 880 380 V450",
  // stack
  "M492 416 V282 H502 V416",
  // long shed
  "M80 500 V440 L120 395 L470 355 L490 380 V455 L120 500 Z",
  "M120 395 V500 M470 355 V455",
  // conveyor + process building
  "M400 470 L640 430",
  "M520 470 V330 H600 V470",
  // gate
  "M998 540 V492 L1192 520 V560",
];

const labels = [
  { x: 828, y: 150, text: "Preheater tower" },
  { x: 1040, y: 300, text: "Silos" },
  { x: 508, y: 296, text: "Stack" },
  { x: 150, y: 382, text: "Plant & storage" },
];

export function SketchToReal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const paths = q<SVGPathElement>("[data-line]");
      const mm = gsap.matchMedia();

      mm.add(mq.motionOK, () => {
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(q("[data-sketch]"), { "--reveal": "0%" });
        const brushes = q<SVGPathElement>("[data-brush]");
        brushes.forEach((p) => {
          const len = Math.ceil(p.getTotalLength()) + 2;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(q("[data-wash]"), { opacity: 0 });
        gsap.set(q("[data-photo-shade]"), { opacity: 0 });
        gsap.set(q("[data-paint]"), { filter: "saturate(0.55) contrast(1.1)" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1 },
        });
        tl.to(q("[data-copy=a]"), { autoAlpha: 1, duration: 0.03 }, 0)
          .to(q("[data-copy=a] > *"), { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.08, ease: "power2.out" }, 0)
          .to(paths, { strokeDashoffset: 0, duration: 0.3, stagger: 0.012 }, 0.02)
          .to(q("[data-label]"), { autoAlpha: 1, duration: 0.05, stagger: 0.02 }, 0.2)
          // pencil sweep
          .to(q("[data-sketch]"), { "--reveal": "115%", duration: 0.28 }, 0.3)
          .fromTo(q("[data-pencil]"), { left: "-5%", autoAlpha: 1 }, { left: "105%", duration: 0.28 }, 0.3)
          .to(q("[data-pencil]"), { autoAlpha: 0, duration: 0.02 }, 0.58)
          .to(q("[data-copy=a]"), { autoAlpha: 0, y: -30, duration: 0.06 }, 0.52)
          .to(q("[data-copy=b]"), { autoAlpha: 1, duration: 0.03 }, 0.55)
          .to(q("[data-copy=b] > *"), { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.56)
          // the photograph is painted in: dabs on the tower, then broad sweeps
          .to(q("[data-brush=dab]"), { strokeDashoffset: 0, duration: 0.05, stagger: 0.02, ease: "power1.inOut" }, 0.6)
          .to(q("[data-brush=sweep]"), { strokeDashoffset: 0, duration: 0.05, stagger: 0.009, ease: "power1.inOut" }, 0.66)
          .to(q("[data-wash]"), { opacity: 1, duration: 0.05 }, 0.86)
          .to(q("[data-paint]"), { filter: "saturate(1) contrast(1)", duration: 0.2 }, 0.72)
          .to(q("[data-photo-shade]"), { opacity: 1, duration: 0.08 }, 0.82)
          .to(q("[data-svg]"), { autoAlpha: 0, duration: 0.15 }, 0.7)
          .to(q("[data-media]"), { scale: 1.06, duration: 0.4 }, 0.6)
          .to(q("[data-copy=b]"), { autoAlpha: 0, y: -30, duration: 0.06 }, 0.84)
          .to(q("[data-copy=c]"), { autoAlpha: 1, duration: 0.03 }, 0.87)
          .to(q("[data-copy=c] > *"), { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.88);
      });

      mm.add(mq.reduced, () => {
        gsap.set(q("[data-copy], [data-copy] > *"), { autoAlpha: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="sketch-title"
      className="relative bg-paper motion-safe:h-[420vh] max-sm:motion-safe:h-[340vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative">
        <div data-media className="absolute inset-0 will-change-transform">
          {/* 0 — drafting paper */}
          <div aria-hidden className="blueprint-grid absolute inset-0 bg-paper" />
          {/* 1 — pencil sketch, revealed by a moving pencil edge */}
          <div
            data-sketch
            aria-hidden
            className="absolute inset-0 motion-reduce:hidden"
            style={{
              WebkitMaskImage: "linear-gradient(100deg, #000 calc(var(--reveal, 0%) - 12%), transparent var(--reveal, 0%))",
              maskImage: "linear-gradient(100deg, #000 calc(var(--reveal, 0%) - 12%), transparent var(--reveal, 0%))",
            }}
          >
            <Image src="/images/web/factory-sketch.webp" alt="" fill sizes="100vw" className="hidden object-cover sm:block" />
            <Image src="/images/web/factory-portrait-sketch.webp" alt="" fill sizes="100vw" className="object-cover sm:hidden" />
          </div>
          <div data-pencil aria-hidden className="pointer-events-none absolute top-0 h-full w-24 -translate-x-1/2 opacity-0 motion-reduce:hidden">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>
          {/* 2 — photograph */}
          <div data-photo className="absolute inset-0" role="img" aria-label="Aerial photograph of the Panyam Cement plant and its preheater tower at golden hour">
            <div data-paint className="absolute inset-0">
              <PaintReveal id="paint-d" src="/images/web/factory-aerial-dusk.webp" width={2560} height={1227} focus={[1560, 400]} className="absolute inset-0 hidden h-full w-full sm:block" />
              <PaintReveal id="paint-m" src="/images/web/factory-portrait.webp" width={1080} height={1935} focus={[600, 480]} className="absolute inset-0 h-full w-full sm:hidden" />
            </div>
            <div data-photo-shade aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-night/85 via-brand-night/20 to-brand-night/40" />
          </div>
          {/* blueprint vector layer (desktop/tablet framing) */}
          <svg data-svg aria-hidden viewBox="0 0 1280 614" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 hidden h-full w-full sm:block">
            <g fill="none" stroke="#0a5c36" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {blueprint.map((d, i) => <path key={i} data-line d={d} vectorEffect="non-scaling-stroke" />)}
            </g>
            {labels.map((l) => (
              <g key={l.text} data-label opacity="0">
                <circle cx={l.x - 10} cy={l.y - 4} r="3" fill="#e8771e" />
                <text x={l.x} y={l.y} fontSize="13" fontWeight="700" letterSpacing="2" fill="#0a5c36" fontFamily="var(--font-manrope), sans-serif" style={{ textTransform: "uppercase" }}>
                  {l.text}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Narrative copy */}
        <div className="container-x relative z-10 flex h-full items-start pt-28 lg:items-center lg:pt-0 motion-reduce:h-auto motion-reduce:py-24">
          <div className="relative w-full max-w-xl">
            <div data-copy="a" className="rounded-3xl bg-paper/85 p-6 shadow-[0_30px_60px_-30px_rgb(6_38_26/0.35)] backdrop-blur-md sm:p-8 motion-safe:invisible motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:opacity-0">
              <p className="eyebrow mb-4 text-brand-deep opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">Chapter 01 · The blueprint</p>
              <h2 id="sketch-title" className="display-lg text-charcoal opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                Drawn in <span className="story-italic font-normal text-brand-deep">1955.</span>
              </h2>
              <p className="mt-5 text-lg text-slate opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                Incorporated on {company.incorporated}, Panyam was planned to help build the infrastructure of a newly independent India — from one of the most backward regions of Rayalaseema.
              </p>
            </div>
            <div data-copy="b" className="rounded-3xl bg-paper/85 p-6 shadow-[0_30px_60px_-30px_rgb(6_38_26/0.35)] backdrop-blur-md sm:p-8 motion-safe:invisible motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:opacity-0 motion-reduce:mt-12">
              <p className="eyebrow mb-4 text-brand-deep opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">Chapter 02 · Built to grow</p>
              <p className="display-md text-charcoal opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                From 200 to <span className="story-italic font-normal text-brand-deep">2,200 tonnes</span> a day.
              </p>
              <p className="mt-5 text-lg text-slate opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                One kiln became three. Wet process became dry. By 1997 Panyam had grown into one of the largest cement manufacturing units in the country.
              </p>
            </div>
            <div data-copy="c" className="rounded-3xl bg-brand-night/75 p-6 backdrop-blur-md sm:p-8 motion-safe:invisible motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:opacity-0 motion-reduce:mt-12">
              <p className="eyebrow mb-4 text-sun opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">Chapter 03 · Today</p>
              <p className="display-md text-white opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                Refurbished. <span className="story-italic font-normal text-sun">Re-energised.</span>
              </p>
              <p className="mt-5 text-lg text-white/85 opacity-0 [transform:translateY(30px)] motion-reduce:opacity-100">
                A completely refurbished plant with state-of-the-art kiln and coolers — {company.capacity.toLowerCase()} of installed capacity, with a second line in the pipeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
