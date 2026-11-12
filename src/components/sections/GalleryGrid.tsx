"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { useLenis } from "@/components/layout/SmoothScroll";

const cats = ["All", "Plant", "Products", "Brand"] as const;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) { d.showModal(); lenis?.stop(); }
    if (open === null && d.open) { d.close(); lenis?.start(); }
  }, [open, lenis]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % shown.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + shown.length) % shown.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown.length]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${cat === c ? "bg-charcoal text-white" : "bg-white text-charcoal hover:bg-stone"}`}>
            {c}
          </button>
        ))}
      </div>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {shown.map((it, i) => (
          <li key={it.id} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} className="group sheen relative block w-full overflow-hidden rounded-3xl bg-white" aria-label={`Open: ${it.alt}`}>
              <Image
                src={it.kind === "video" ? it.poster ?? it.src : it.src}
                alt={it.alt}
                width={it.width}
                height={it.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={`h-auto w-full transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-105 ${it.category === "Products" ? "bg-paper p-8" : ""}`}
              />
              {it.kind === "video" && (
                <span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-white/90"><Play aria-hidden className="h-6 w-6 text-charcoal" /></span></span>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm font-semibold text-white transition-transform duration-500 group-hover:translate-y-0">{it.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} onClose={() => setOpen(null)} className="m-0 h-full max-h-none w-full max-w-none bg-black/95 p-0 backdrop:bg-black/80" aria-label="Gallery viewer">
        {current && (
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-16">
            {current.kind === "video" ? (
              <video key={current.src} src={current.src} poster={current.poster} controls autoPlay muted playsInline className="max-h-full max-w-full rounded-xl" />
            ) : (
              <Image key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="100vw" className="max-h-full w-auto max-w-full rounded-xl object-contain" />
            )}
            <p className="absolute inset-x-0 bottom-4 text-center text-sm text-white/80">{current.alt}</p>
            <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close viewer"><X /></button>
            <button type="button" onClick={() => setOpen((o) => (o! - 1 + shown.length) % shown.length)} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous"><ChevronLeft /></button>
            <button type="button" onClick={() => setOpen((o) => (o! + 1) % shown.length)} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next"><ChevronRight /></button>
          </div>
        )}
      </dialog>
    </>
  );
}
