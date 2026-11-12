"use client";
import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/animations/gsap";

type Variant = "primary" | "sun" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  primary: "bg-brand-deep text-white hover:bg-brand-night",
  sun: "bg-sun text-charcoal hover:bg-white",
  "ghost-light": "border border-white/40 text-white hover:bg-white hover:text-charcoal",
  "ghost-dark": "border border-charcoal/25 text-charcoal hover:bg-charcoal hover:text-white",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  external?: boolean;
  download?: boolean;
}

/** CTA with a subtle magnetic pull on pointer devices. */
export function MagneticButton({ href, children, variant = "primary", className = "", icon = true, external, download }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
    if (inner.current) inner.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };

  const cls = `group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] ${styles[variant]} ${className}`;
  const content = (
    <span ref={inner} className="inline-flex items-center gap-3 transition-transform duration-500 ease-[var(--ease-out-expo)]">
      {children}
      {icon && (
        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45" />
      )}
    </span>
  );

  if (external || download) {
    return (
      <a ref={ref} href={href} className={cls} onMouseMove={move} onMouseLeave={leave} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(download ? { download: "" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} onMouseMove={move} onMouseLeave={leave}>
      {content}
    </Link>
  );
}
