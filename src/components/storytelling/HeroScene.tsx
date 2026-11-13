"use client";
import { getImageProps } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, mq, motion, isCompact, osReducedMotion } from "@/animations/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { company } from "@/data/company";

/**
 * Set to a supplied plant film (e.g. "/videos/hero.mp4") to replace the
 * animated still with video. A WebM twin with the same name is used if present.
 */
const HERO_VIDEO: string | null = null;

/** Art-directed hero still: landscape aerial on tablet/desktop, portrait aerial on phones. */
function HeroPicture() {
  const common = { alt: "The Panyam Cement plant at dusk, its preheater tower lit against the Rayalaseema hills", fill: true, sizes: "100vw", quality: 75, priority: true } as const;
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: "/images/web/factory-aerial-dusk.webp" });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: "/images/web/factory-portrait.webp" });
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktop} sizes="100vw" />
      <source media="(max-width: 639px)" srcSet={mobile} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied via rest props */}
      <img {...rest} className="h-full w-full object-cover sm:object-[60%_center]" />
    </picture>
  );
}

export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOK, () => {
        // Opening sequence (logo 0.8s → headline 0.9s → support 0.7s → CTA 0.6s)
        const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-media]"), { scale: 1.25, duration: 2.4, ease: "power2.out" }, 0)
          .from(q("[data-eyebrow]"), { autoAlpha: 0, y: 20, duration: motion.logo }, 0.2)
          .from(q("[data-char]"), { yPercent: 115, duration: motion.headline, stagger: motion.charStagger }, 0.35)
          .from(q("[data-line2]"), { autoAlpha: 0, y: 30, duration: motion.headline }, 0.75)
          .from(q("[data-support]"), { autoAlpha: 0, y: 24, duration: motion.support }, 1.0)
          .from(q("[data-cta] > *"), { autoAlpha: 0, y: 20, duration: motion.cta, stagger: 0.1 }, 1.2)
          .from(q("[data-stats] > *"), { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.08 }, 1.3)
          .from(q("[data-cue]"), { autoAlpha: 0, duration: 0.6 }, 1.6);

        let introSeen = false;
        try { introSeen = sessionStorage.getItem("pc-intro") === "1"; } catch {}
        const play = () => intro.play();
        if (introSeen) play();
        else window.addEventListener("pc:intro-done", play, { once: true });

        // Slow living camera drift on the still image
        if (!isCompact() && !osReducedMotion()) gsap.to(q("[data-drift]"), { scale: 1.08, xPercent: -2, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll-out: content lifts, image pushes in and darkens
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to(q("[data-content]"), { yPercent: -35, autoAlpha: 0, ease: "none" }, 0)
          .to(q("[data-parallax]"), { yPercent: 18, scale: 1.1, ease: "none" }, 0)
          .to(q("[data-shade]"), { opacity: 0.85, ease: "none" }, 0);

        return () => window.removeEventListener("pc:intro-done", play);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const word = "PANYAM";

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate h-svh min-h-[560px] overflow-hidden bg-brand-night text-white">
      <div data-parallax className="absolute inset-0 -z-20 will-change-transform">
        <div data-media className="absolute inset-0">
          <div data-drift className="absolute inset-0">
            {HERO_VIDEO ? (
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/web/factory-aerial-dusk-md.webp" aria-hidden>
                <source src={HERO_VIDEO.replace(/\.mp4$/, ".webm")} type="video/webm" />
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <HeroPicture />
            )}
          </div>
        </div>
      </div>
      {/* atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-night/60 via-transparent to-brand-night/90 max-sm:via-brand-night/45" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-brand-night/80 via-brand-night/20 to-transparent sm:block" />
      <div data-shade aria-hidden className="absolute inset-0 -z-10 bg-brand-night opacity-0" />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div data-content className="container-x flex h-full flex-col justify-end pb-24 pt-32 sm:pb-28 lg:justify-center lg:pb-0">
        <p data-eyebrow className="eyebrow mb-5 flex items-center gap-3 text-sun">
          <span aria-hidden className="h-px w-10 bg-sun" /> Trust and confidence since {company.founded}
        </p>
        <h1 id="hero-title" className="max-w-5xl" aria-label={`${company.shortName} — ${company.tagline}`}>
          <span aria-hidden className="display-xl block overflow-hidden leading-[0.88]">
            {word.split("").map((c, i) => (
              <span key={i} data-char className="inline-block">{c}</span>
            ))}
          </span>
          <span aria-hidden data-line2 className="mt-2 block text-[clamp(1.6rem,4.2vw,3.6rem)] leading-[1.05]">
            <span className="font-display font-extrabold uppercase tracking-tight">Lasting strength</span>{" "}
            <span className="story-italic text-sun">for generations.</span>
          </span>
        </h1>
        <p data-support className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          Cement that built the dams of South India and the sleepers of its railways — made today in a fully refurbished plant at Cement Nagar, Andhra Pradesh.
        </p>
        <div data-cta className="mt-8 flex flex-wrap gap-3">
          <MagneticButton href="/products" variant="sun">Explore products</MagneticButton>
          <MagneticButton href="/contact?type=quote" variant="ghost-light">Request a quote</MagneticButton>
        </div>
        <dl data-stats className="mt-12 hidden max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-6 sm:grid">
          <div><dt className="eyebrow text-white/60">Established</dt><dd className="font-display text-3xl font-extrabold">1955</dd></div>
          <div><dt className="eyebrow text-white/60">Installed capacity</dt><dd className="font-display text-3xl font-extrabold">{company.capacityShort}</dd></div>
          <div><dt className="eyebrow text-white/60">States served</dt><dd className="font-display text-3xl font-extrabold">{company.presence.length}</dd></div>
        </dl>
      </div>

      <div data-cue aria-hidden className="absolute bottom-8 right-6 hidden flex-col items-center gap-2 text-white/70 lg:flex xl:right-10">
        <span className="eyebrow text-[0.65rem]">Scroll to explore</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-sun motion-safe:animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}
