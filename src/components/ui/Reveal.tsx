"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, mq } from "@/animations/gsap";

/** Fades/slides children in when they enter the viewport. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  stagger = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** When > 0, direct children animate in sequence. */
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        const targets = stagger ? Array.from(ref.current!.children) : ref.current;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Word-by-word masked reveal for headings. Text stays fully readable
 * to screen readers (aria-label on the wrapper, words aria-hidden).
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  italic,
  delay = 0,
  trigger = "scroll",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words (exact match) rendered in the italic storytelling face */
  italic?: string[];
  delay?: number;
  trigger?: "scroll" | "load";
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOK, () => {
        gsap.from(ref.current!.querySelectorAll("[data-w]"), {
          yPercent: 110,
          rotate: 4,
          duration: 0.9,
          delay,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-w className={`inline-block ${italic?.includes(w) ? "story-italic font-normal" : ""}`}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
