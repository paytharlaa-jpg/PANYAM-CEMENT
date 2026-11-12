"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared motion tokens (seconds) */
export const motion = {
  logo: 0.8,
  headline: 0.9,
  support: 0.7,
  cta: 0.6,
  charStagger: 0.04,
  wordStagger: 0.08,
  ui: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Motion preference. Defaults to the OS "reduce motion" setting, but visitors can
 * override it with the Motion toggle (stored in localStorage as "pc-motion").
 * An inline script in <head> applies `html.reduce-motion` before first paint.
 */
export const MOTION_KEY = "pc-motion";
export const prefersReducedMotion = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduce-motion");

const ok = () => !prefersReducedMotion();
const when = (query: string) => (ok() ? query : "not all");

/** Conditions for gsap.matchMedia — mirror the Tailwind breakpoints and the motion preference */
export const mq = {
  get desktop() { return when("(min-width: 1024px)"); },
  get belowDesktop() { return when("(max-width: 1023px)"); },
  get tablet() { return when("(min-width: 640px) and (max-width: 1023px)"); },
  get mobile() { return when("(max-width: 639px)"); },
  get motionOK() { return when("all"); },
  get reduced() { return ok() ? "not all" : "all"; },
};

export { gsap, ScrollTrigger, useGSAP };
