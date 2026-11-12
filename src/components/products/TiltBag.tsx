"use client";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { prefersReducedMotion } from "@/animations/gsap";

/** Product pack with a smooth 3D tilt + light glare that follows the pointer. */
export function TiltBag({ src, alt, width, height, sizes = "(min-width: 1024px) 30vw, 70vw", priority = false, className = "" }: {
  src: string; alt: string; width: number; height: number; sizes?: string; priority?: boolean; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(-py * 14).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 18).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      el.style.setProperty("--glare", "1");
    });
  };
  const leave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className={`[perspective:1200px] ${className}`} onPointerMove={move} onPointerLeave={leave}>
      <div
        ref={ref}
        className="relative transition-transform duration-[900ms] ease-[var(--ease-out-expo)] [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="h-auto w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[8%] opacity-[var(--glare,0)] mix-blend-soft-light transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at var(--gx,50%) var(--gy,30%), rgba(255,255,255,0.75), transparent 45%)" }}
        />
      </div>
    </div>
  );
}
