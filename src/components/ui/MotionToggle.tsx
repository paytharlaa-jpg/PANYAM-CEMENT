"use client";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { MOTION_KEY, prefersReducedMotion } from "@/animations/gsap";

function setPref(on: boolean) {
  try { localStorage.setItem(MOTION_KEY, on ? "on" : "off"); } catch {}
  window.location.reload();
}

/** Footer switch: lets any visitor turn animations on or off (overrides the OS setting). */
export function MotionToggle() {
  const [reduced, setReduced] = useState<boolean | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- read client-only preference after mount
  useEffect(() => setReduced(prefersReducedMotion()), []);
  if (reduced === null) return null;
  return (
    <button
      type="button"
      onClick={() => setPref(reduced)}
      aria-pressed={!reduced}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white/80 hover:bg-white/10"
    >
      <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${reduced ? "bg-white/40" : "bg-brand"}`} />
      Animations: {reduced ? "Off" : "On"}
    </button>
  );
}

/**
 * Shown only when animations are off because of the device's "reduce motion"
 * setting and the visitor has not made a choice yet.
 */
export function MotionNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let chosen: string | null = null;
    try { chosen = localStorage.getItem(MOTION_KEY) ?? sessionStorage.getItem("pc-motion-notice"); } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only check after mount
    setShow(prefersReducedMotion() && !chosen);
  }, []);
  if (!show) return null;
  const dismiss = () => {
    try { sessionStorage.setItem("pc-motion-notice", "1"); } catch {}
    setShow(false);
  };
  return (
    <div role="region" aria-label="Animation preference" className="fixed bottom-4 left-4 right-4 z-[65] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-brand-night p-3 pl-4 text-sm text-white shadow-2xl sm:right-auto">
      <Sparkles aria-hidden className="h-5 w-5 shrink-0 text-sun" />
      <p className="flex-1">Animations are reduced to match your device settings.</p>
      <button type="button" onClick={() => setPref(true)} className="min-h-10 shrink-0 rounded-full bg-sun px-4 font-bold text-charcoal">Turn on</button>
      <button type="button" onClick={dismiss} aria-label="Dismiss" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-white/10"><X className="h-4 w-4" /></button>
    </div>
  );
}
