"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";
import { PackerMachine } from "@/components/illustrations/PackerMachine";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { products } from "@/data/products";

const BAGS = 5;
const HOPPER_X = 0.62; // packer position as a fraction of viewport width
const HANG = 0.33; // how far (× bag height) a bag hangs above the belt while on the spout
const VB_W = 900;
const VB_H = 1170;

/** Faint line-art of the packing hall behind the line, drawn on scroll */
const hall = [
  "M0 120 H1600",
  "M120 120 V720 M420 120 V720 M1180 120 V720 M1480 120 V720",
  "M120 260 H420 M1180 260 H1480",
  "M180 120 V40 Q240 0 300 40 V120 M1240 120 V30 Q1300 -10 1360 30 V120",
  "M1180 380 H1480 M1180 520 H1480",
];

/**
 * A bag that fills from the bottom up: an empty, pale, creased sack underneath and the
 * full bag revealed by a granular cement "mound" that rises inside it.
 */
function FillingBag({ i }: { i: number }) {
  const p = products[i % products.length];
  const id = `fill-${i}`;
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <filter id={`${id}-empty`}>
          <feColorMatrix type="saturate" values="0.25" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.55" intercept="0.42" />
            <feFuncG type="linear" slope="0.55" intercept="0.42" />
            <feFuncB type="linear" slope="0.55" intercept="0.4" />
          </feComponentTransfer>
        </filter>
        <filter id={`${id}-grain`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed={i + 3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="-100" y="-300" width={VB_W + 200} height={VB_H + 600}>
          <g data-level transform={`translate(0 ${VB_H + 140})`}>
            {/* cement heaps in the middle, granular edge */}
            <path filter={`url(#${id}-grain)`} d={`M-80 ${VB_H + 300} V60 C120 30 280 -40 450 -55 C620 -40 780 30 ${VB_W + 80} 60 V${VB_H + 300} Z`} fill="#fff" />
          </g>
        </mask>
      </defs>
      {/* empty sack */}
      <g data-empty>
        <image href={p.image} width={VB_W} height={VB_H} preserveAspectRatio="xMidYMax meet" filter={`url(#${id}-empty)`} />
        <g stroke="#6b726e" strokeOpacity="0.45" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M120 260 q120 80 90 220 M760 200 q-90 120 -60 260 M200 820 q160 -40 260 40 M520 900 q120 -60 200 -10 M330 420 q60 60 20 140" />
        </g>
      </g>
      {/* full bag rising from the bottom */}
      <image href={p.image} width={VB_W} height={VB_H} preserveAspectRatio="xMidYMax meet" mask={`url(#${id}-mask)`} />
    </svg>
  );
}

export function PackingLine() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const lines = q<SVGPathElement>("[data-hall]");
        lines.forEach((p) => {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        });
        const bags = q("[data-bag]");
        const W = () => bags[0].offsetWidth;
        const H = () => bags[0].offsetHeight;
        const S = () => W() * 1.55; // spacing on the belt
        const weight = q<SVGTextElement>("[data-weight]")[0];
        const kg = { v: 0 };
        const showKg = () => {
          if (weight) weight.textContent = `${kg.v.toFixed(1)} kg`;
        };

        gsap.set(bags, { autoAlpha: 0, x: () => -W() * 1.3, y: () => -H() * HANG, transformOrigin: "50% 0%", scaleX: 0.8, scaleY: 0.94, rotation: -10 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        tl.from(q("[data-copy] > *"), { y: 40, autoAlpha: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }, 0)
          .to(lines, { strokeDashoffset: 0, stagger: 0.1, duration: 1.5 }, 0)
          .from(q("[data-machine]"), { yPercent: -20, autoAlpha: 0, duration: 0.8, ease: "power2.out" }, 0.1);

        let t = 0.8;
        bags.forEach((bag, i) => {
          const level = bag.querySelector("[data-level]");
          const empty = bag.querySelector("[data-empty]");
          // 1. applicator swings an empty bag onto the spout
          tl.to(bag, { autoAlpha: 1, x: 0, rotation: 0, duration: 0.6, ease: "power2.out" }, t);
          t += 0.6;
          // 2. filling: cement rises inside, bag inflates and vibrates, scale counts to 50 kg
          tl.fromTo(kg, { v: 0 }, { v: 50, duration: 1.6, ease: "power1.out", onUpdate: showKg, immediateRender: false }, t)
            .to(q("[data-dust]"), { opacity: 1, duration: 0.15 }, t)
            .fromTo(level, { attr: { transform: `translate(0 ${VB_H + 140})` } }, { attr: { transform: "translate(0 -160)" }, duration: 1.6, ease: "power1.inOut", immediateRender: false }, t)
            .to(bag, { scaleX: 1, scaleY: 1, duration: 1.6, ease: "power2.out" }, t)
            .to(bag, { x: 1.5, duration: 0.08, repeat: 15, yoyo: true, ease: "sine.inOut" }, t + 0.1)
            .to(empty, { opacity: 0, duration: 0.4 }, t + 1.3)
            .to(q("[data-dust]"), { opacity: 0, duration: 0.15 }, t + 1.6);
          t += 1.7;
          // 3. bag released onto the belt
          tl.to(bag, { y: 0, x: 0, duration: 0.45, ease: "bounce.out" }, t);
          t += 0.5;
          // 4. belt indexes every filled bag one position to the right
          bags.slice(0, i + 1).forEach((b, k) => {
            tl.to(b, { x: () => S() * (i - k + 1), duration: 0.8, ease: "power2.inOut" }, t);
          });
          tl.to(q("[data-belt]"), { x: () => S() * (i + 1), duration: 0.8, ease: "power2.inOut" }, t);
          t += 0.9;
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="packing-title"
      className="relative bg-paper motion-safe:h-[560vh] max-sm:motion-safe:h-[460vh]"
      style={{ ["--bag" as string]: "clamp(96px, min(11vw, 16svh), 220px)", ["--belt" as string]: "calc(var(--bag) * 0.14)" }}
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative max-sm:[--bag:min(28vw,13svh)]">
        <div aria-hidden className="blueprint-grid absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_60%,rgba(255,255,255,0.9),transparent_60%)]" />
        <svg aria-hidden viewBox="0 0 1600 720" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
          <g fill="none" stroke="#0a5c36" strokeOpacity="0.2" strokeWidth="1.5">
            {hall.map((d, i) => <path key={i} data-hall d={d} vectorEffect="non-scaling-stroke" />)}
          </g>
        </svg>

        {/* Copy */}
        <div className="container-x relative z-30 pt-24 lg:pt-32">
          <div data-copy className="max-w-md max-sm:rounded-2xl max-sm:bg-paper/90 max-sm:p-4 max-sm:shadow-lg max-sm:backdrop-blur-md">
            <p className="eyebrow mb-3 text-brand-deep">The packing plant</p>
            <h2 id="packing-title" className="display-md text-charcoal">
              High-quality <span className="story-italic font-normal text-brand-deep">production.</span>
            </h2>
            <p className="mt-4 text-sm text-slate sm:text-lg">
              Our philosophy is simple — quality in every bag. Each batch is verified in our own laboratories before it is packed, and every bag is weighed on the packer.
            </p>
            <div className="mt-6 max-sm:hidden">
              <MagneticButton href="/manufacturing" variant="ghost-dark">Know more</MagneticButton>
            </div>
          </div>
        </div>

        {/* Stage */}
        <div aria-hidden className="absolute inset-0">
          {/* floor shadow under the machine */}
          <div className="absolute bottom-[calc(12svh+var(--belt)-10px)] h-6 w-[calc(var(--bag)*3)] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" style={{ left: `${HOPPER_X * 100}%` }} />
          {/* packer */}
          <div data-machine className="absolute bottom-[calc(12svh+var(--belt))] z-10 -translate-x-1/2" style={{ left: `${HOPPER_X * 100}%`, width: "calc(var(--bag) * 2.2)" }}>
            <PackerMachine className="h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]" />
          </div>

          {/* stack of empty bags waiting at the applicator */}
          <div className="absolute z-10 w-[var(--bag)]" style={{ left: `calc(${HOPPER_X * 100}% - var(--bag) * 2.3)`, bottom: "calc(12svh + var(--belt))" }}>
            {Array.from({ length: 6 }).map((_, k) => (
              <div key={k} className="mx-auto h-[calc(var(--bag)*0.07)] w-full rounded-sm border border-black/10 bg-[linear-gradient(180deg,#f7ef8a,#e2d64f)] shadow-sm" style={{ transform: `translateX(${(k % 2) * 3}px)` }} />
            ))}
            <div className="h-[calc(var(--bag)*0.12)] w-full bg-[repeating-linear-gradient(90deg,#8a6a45_0_14px,#6f5236_14px_18px)]" />
          </div>

          {/* bags */}
          {Array.from({ length: BAGS }).map((_, i) => (
            <div
              key={i}
              data-bag
              className="absolute z-20 w-[var(--bag)] drop-shadow-[0_14px_12px_rgba(0,0,0,0.28)] motion-reduce:hidden"
              style={{ left: `calc(${HOPPER_X * 100}% - var(--bag) / 2)`, bottom: "calc(12svh + var(--belt))", height: "calc(var(--bag) * 1.3)" }}
            >
              <FillingBag i={i} />
            </div>
          ))}

          {/* conveyor */}
          <div className="absolute inset-x-0 bottom-[12svh] z-20 h-[var(--belt)] overflow-hidden rounded-sm bg-[linear-gradient(180deg,#3b403e,#1f2321)] shadow-[inset_0_2px_0_rgba(255,255,255,0.18)]">
            <div data-belt className="absolute inset-y-0 -left-[600vw] w-[700vw] bg-[repeating-linear-gradient(90deg,transparent_0_38px,rgba(255,255,255,0.07)_38px_42px)]" />
          </div>
          <div className="absolute inset-x-0 bottom-[calc(12svh-14px)] z-20 h-[14px] bg-[radial-gradient(circle_at_center,#a3aaa6_4px,#4b524e_6px,transparent_7px)] bg-[length:44px_14px]" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-[calc(12svh-14px)] bg-[repeating-linear-gradient(90deg,transparent_0_calc(12vw-10px),#4b524e_calc(12vw-10px)_12vw)]" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-[3svh] bg-gradient-to-t from-stone to-transparent" />
        </div>
      </div>
    </section>
  );
}
