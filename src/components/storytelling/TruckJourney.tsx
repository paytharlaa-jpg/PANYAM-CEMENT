"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq, SCRUB } from "@/animations/gsap";
import { PanyamTruck } from "@/components/illustrations/PanyamTruck";
import { FarHills, MidLayer, RoadLayer, ForegroundLayer } from "@/components/illustrations/Landscape";
import { company } from "@/data/company";

const stops = [
  { eyebrow: "Cement Nagar, Nandyal District", title: "Every journey starts", italic: "at the works.", text: "Each bag leaves our plant in the Rayalaseema region of Andhra Pradesh — where Panyam has made cement since 1955." },
  { eyebrow: "Srisailam · Nagarjuna Sagar · Almatti", title: "Into the dams", italic: "that power a state.", text: "Landmark irrigation and power projects that have stood the test of time and harsh environments were built with Panyam Cement." },
  { eyebrow: "Indian Railways", title: "Along the lines", italic: "that connect a nation.", text: "Panyam was the first company to supply railway sleeper grade cement — today’s Panyam 53-S." },
  { eyebrow: "Six states and counting", title: "To the homes", italic: "of South India.", text: `Panyam Cement reaches builders across ${company.presence.slice(0, -1).join(", ")} and ${company.presence.at(-1)}.` },
];

/** Sky palette per stop: [top, bottom, hills, ground] */
const skies = [
  ["#f6c08a", "#fde6c4", "#8e9f8a", "#93ad6d"], // dawn
  ["#8cc7e6", "#e3f2ef", "#7f9c8f", "#8fae6d"], // day
  ["#7fb4d6", "#f5e3c0", "#728f84", "#86a464"], // afternoon
  ["#e98a4f", "#3a2c4a", "#4e5a5a", "#5f7a49"], // dusk
];

export function TruckJourney() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ motion: mq.motionOK, desktop: mq.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const vw = () => window.innerWidth;
        const travel = (sel: string) => () => -(q(sel)[0].getBoundingClientRect().width - vw());

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: SCRUB, invalidateOnRefresh: true },
        });

        // Parallax: each layer travels its own width — far is slowest, foreground fastest.
        tl.to(q("[data-layer=far]"), { x: travel("[data-layer=far]"), duration: 1 }, 0)
          .to(q("[data-layer=mid]"), { x: travel("[data-layer=mid]"), duration: 1 }, 0)
          .to(q("[data-layer=road]"), { x: travel("[data-layer=road]"), duration: 1 }, 0)
          .to(q("[data-layer=fg]"), { x: travel("[data-layer=fg]"), duration: 1 }, 0)
          .to(q("[data-sun]"), { y: () => window.innerHeight * 0.55, x: () => vw() * 0.3, duration: 1 }, 0);

        // Truck: drives in, holds its lane, then exits right (≈150% of viewport travel overall)
        const truck = q("[data-truck]");
        tl.fromTo(truck, { x: () => -vw() * 0.55 }, { x: 0, duration: 0.14, ease: "power2.out" }, 0)
          .to(truck, { x: () => vw() * 0.06, duration: 0.72 }, 0.14)
          .to(truck, { x: () => vw() * 0.95, duration: 0.14, ease: "power2.in" }, 0.86)
          .to(q("[data-wheel]"), { rotation: 360 * (desktop ? 14 : 9), transformOrigin: "50% 50%", duration: 1 }, 0)
          .to(q("[data-truck-body]"), { y: -2, duration: 0.02, repeat: 49, yoyo: true }, 0)
          .to(q("[data-headlight]"), { opacity: 1, duration: 0.1 }, 0.82);

        // Sky and light through the day
        // Sky colour fades repaint the whole screen each frame — desktop only (phones get a fixed daytime sky).
        if (!desktop) gsap.set(root.current, { "--sky-top": skies[1][0], "--sky-bottom": skies[1][1], "--hill-far": skies[1][2], "--ground": skies[1][3] });
        skies.forEach((s, i) => {
          if (i === 0 || !desktop) return;
          tl.to(root.current, { "--sky-top": s[0], "--sky-bottom": s[1], "--hill-far": s[2], "--ground": s[3], duration: 1 / (skies.length - 1) }, (i - 1) / (skies.length - 1));
        });
        if (desktop) tl.to(q("[data-window]"), { fill: "#ffd76a", opacity: 1, duration: 0.08, stagger: { each: 0.0004, from: "random" } }, 0.88);

        // Captions
        const caps = q("[data-stop]");
        caps.forEach((c, i) => {
          const at = i / stops.length;
          if (i > 0) tl.fromTo(c, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.05 }, at);
          if (i < caps.length - 1) tl.to(c, { autoAlpha: 0, y: -40, duration: 0.05 }, at + 1 / stops.length - 0.05);
        });
        tl.to(q("[data-progress]"), { scaleX: 1, duration: 1 }, 0);
      });

      // Continuous exhaust puffs (independent of scroll)
      mm.add(mq.motionOK, () => {
        q("[data-smoke]").forEach((p, i) => {
          gsap.fromTo(p, { opacity: 0.5, scale: 0.5, x: 0, y: 0, transformOrigin: "50% 50%" }, { opacity: 0, scale: 2.6, x: -50, y: -40, duration: 1.8, repeat: -1, delay: i * 0.6, ease: "sine.out" });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className="relative h-auto motion-safe:h-[520vh] max-lg:motion-safe:h-[400vh]"
      style={{ ["--sky-top" as string]: skies[0][0], ["--sky-bottom" as string]: skies[0][1], ["--hill-far" as string]: skies[0][2], ["--ground" as string]: skies[0][3] }}
    >
      <h2 id="journey-title" className="sr-only">The Panyam journey — from our plant to dams, railways and homes</h2>
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:pb-[45svh]" style={{ background: "linear-gradient(to bottom, var(--sky-top), var(--sky-bottom))" }}>
        {/* sun */}
        <div data-sun aria-hidden className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,#fff8d6_0%,#ffd77a_45%,transparent_70%)] lg:h-40 lg:w-40" />
        {/* clouds */}
        <div aria-hidden className="absolute inset-x-0 top-[14%] h-24 opacity-70">
          <div className="absolute left-[30%] h-10 w-56 rounded-full bg-white/70 blur-md" />
          <div className="absolute left-[64%] top-8 h-8 w-72 rounded-full bg-white/60 blur-md" />
        </div>

        {/* Parallax layers (bottom-anchored) */}
        <div data-layer="far" aria-hidden className="absolute bottom-[22%] left-0 h-[38%] w-[180vw] will-change-transform">
          <FarHills className="h-full w-full" />
        </div>
        <div data-layer="mid" aria-hidden className="absolute bottom-[19%] left-0 h-[46%] w-auto max-w-none will-change-transform max-sm:h-[36%]" style={{ aspectRatio: "6400 / 420" }}>
          <MidLayer className="h-full w-full" />
        </div>
        <div data-layer="road" aria-hidden className="absolute bottom-0 left-0 h-[21%] w-[560vw] will-change-transform">
          <RoadLayer className="h-full w-full" />
        </div>

        {/* Truck */}
        <div data-truck className="absolute bottom-[3.5%] left-[6%] w-[min(64vw,620px)] will-change-transform max-sm:left-[2%] max-sm:w-[86vw]">
          <div data-truck-body>
            <PanyamTruck className="h-auto w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)]" />
          </div>
        </div>

        <div data-layer="fg" aria-hidden className="pointer-events-none absolute -bottom-3 left-0 h-[11%] w-[700vw] will-change-transform max-lg:hidden">
          <ForegroundLayer className="h-full w-full" />
        </div>

        {/* Captions */}
        <div className="container-x relative z-10 pt-24 lg:pt-28">
          <div className="relative max-w-[22rem] sm:max-w-sm lg:ml-auto lg:mr-[2vw] motion-safe:min-h-[11rem] motion-reduce:space-y-4">
            {stops.map((s, i) => (
              <div key={s.title} data-stop className={`rounded-2xl bg-white/60 p-5 max-lg:bg-white/90 shadow-[0_20px_40px_-25px_rgb(6_38_26/0.4)] backdrop-blur-md motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 ${i > 0 ? "motion-safe:invisible motion-safe:opacity-0" : ""}`}>
                <p className="eyebrow mb-2 text-[0.65rem] text-brand-night/70">{s.eyebrow}</p>
                <p className="font-display text-2xl font-extrabold leading-[1.05] text-brand-night xl:text-3xl">
                  {s.title} <span className="story-italic block font-normal text-brand-deep">{s.italic}</span>
                </p>
                <p className="mt-3 text-sm font-medium text-brand-night/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* progress */}
        <div aria-hidden className="absolute bottom-6 right-6 z-10 hidden w-40 lg:block">
          <div className="h-1 overflow-hidden rounded-full bg-white/40">
            <div data-progress className="h-full origin-left scale-x-0 bg-brand-night" />
          </div>
        </div>
      </div>
    </section>
  );
}
