"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { HeroSlide } from "@/lib/catalog";
import { site } from "@/lib/site";

const DURATION = 5000; // ms par image

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Hero plein écran : uniquement les images, en fondu, avec un léger zoom lent.
 * Points ronds en bas pour changer d'image (plein = image affichée).
 * Défilement automatique toutes les 5 s, dans tous les cas.
 * Si l'utilisateur a demandé de réduire les animations, seul le zoom est désactivé.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const running = slides.length > 1;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [running, index, go]);

  return (
    <section
      className="relative mt-16 h-[calc((100svh-4rem)*0.8)] min-h-[420px] overflow-hidden bg-ink"
      aria-roledescription="carrousel"
      aria-label="Nos créations"
    >
      <h1 className="sr-only">{site.name}, couture sur mesure à Parakou</h1>

      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={90}
            className={`object-cover ${i === index && !reduced ? "hero-zoom" : ""}`}
            style={{ objectPosition: s.position ?? "center 20%" }}
          />
        </div>
      ))}

      {/* voile en bas pour que le texte et les points restent lisibles */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-20 px-6 text-center text-white">
        <p className="mx-auto max-w-6xl text-[clamp(1.9rem,4.6vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em]">
          Sur mesure, <span className="text-gold-metal">sans attendre</span>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-xl">
          Vos tenues confectionnées à vos mesures, dans des tissus de qualité, prêtes en un temps record.
        </p>
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1" role="tablist" aria-label="Choisir une image">
            {slides.map((s, i) => (
              <button
                key={s.image}
                onClick={() => go(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Image ${i + 1} : ${s.alt}`}
                className="group p-1.5"
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full border border-white transition-colors ${
                    i === index ? "bg-white" : "bg-transparent group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
