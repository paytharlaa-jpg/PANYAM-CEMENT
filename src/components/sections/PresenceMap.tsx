"use client";
import { useRef } from "react";
import { gsap, useGSAP, mq, osReducedMotion } from "@/animations/gsap";

// Schematic (not to scale): routes from the works at Cement Nagar to each state served.
const plant = { x: 300, y: 250 };
const nodes = [
  { name: "Telangana", x: 330, y: 110 },
  { name: "Andhra Pradesh", x: 440, y: 260 },
  { name: "Karnataka", x: 170, y: 270 },
  { name: "Goa", x: 70, y: 170 },
  { name: "Tamil Nadu", x: 360, y: 430 },
  { name: "Kerala", x: 200, y: 470 },
];

export function PresenceMap() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const routes = q<SVGPathElement>("[data-route]");
        routes.forEach((p) => {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        });
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", once: true } })
          .from(q("[data-plant]"), { scale: 0, transformOrigin: "center", duration: 0.6, ease: "back.out(2)" })
          .to(routes, { strokeDashoffset: 0, duration: 1, stagger: 0.12, ease: "power2.inOut" }, 0.3)
          .from(q("[data-node]"), { scale: 0, autoAlpha: 0, transformOrigin: "center", stagger: 0.12, duration: 0.5, ease: "back.out(2)" }, 0.9);
        if (!osReducedMotion()) gsap.to(q("[data-pulse]"), { scale: 2.4, opacity: 0, duration: 1.8, repeat: -1, ease: "sine.out", transformOrigin: "center" });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className="relative overflow-hidden rounded-[2rem] bg-brand-night p-4 sm:p-8">
      <svg viewBox="0 0 520 540" className="h-auto w-full" role="img" aria-label="Schematic map of routes from Cement Nagar to Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala and Goa">
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#ffffff" opacity="0.12" /></pattern>
        </defs>
        {/* stylised peninsula silhouette */}
        <path d="M60 40 L470 20 L500 180 L470 300 L400 400 L330 520 L250 530 L160 420 L110 320 L60 200 Z" fill="url(#dots)" />
        {nodes.map((n) => {
          const mx = (plant.x + n.x) / 2 + (n.y - plant.y) * 0.15;
          const my = (plant.y + n.y) / 2 - (n.x - plant.x) * 0.15;
          return <path key={n.name} data-route d={`M${plant.x} ${plant.y} Q${mx} ${my} ${n.x} ${n.y}`} fill="none" stroke="#fff315" strokeWidth="2" strokeDasharray="4 6" opacity="0.85" />;
        })}
        {nodes.map((n) => (
          <g key={n.name} data-node>
            <circle cx={n.x} cy={n.y} r="7" fill="#00a85a" stroke="#fff" strokeWidth="2" />
            <text x={n.x} y={n.y - 16} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700" fontFamily="var(--font-manrope), sans-serif">{n.name}</text>
          </g>
        ))}
        <g data-plant>
          <circle data-pulse cx={plant.x} cy={plant.y} r="12" fill="#fff315" opacity="0.5" />
          <circle cx={plant.x} cy={plant.y} r="12" fill="#fff315" stroke="#06261a" strokeWidth="3" />
          <text x={plant.x} y={plant.y + 34} textAnchor="middle" fill="#fff315" fontSize="14" fontWeight="800" letterSpacing="2" fontFamily="var(--font-manrope), sans-serif">CEMENT NAGAR</text>
        </g>
      </svg>
      <p className="mt-2 text-center text-xs text-white/50">Schematic — not to scale</p>
    </div>
  );
}
