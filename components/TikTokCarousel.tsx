"use client";

import { useEffect, useRef, useState } from "react";
import type { TikTokClip } from "@/lib/site";
import { LoopVideo } from "./LoopVideo";

export function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.2v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.1 6.1 0 1 0 5.2 6V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.8Z" />
    </svg>
  );
}

/**
 * Carrousel de clips verticaux.
 *   - téléphone : un seul clip par écran, centré, on fait glisser au doigt ;
 *   - tablette : 2 clips, ordinateur : les 4 côte à côte.
 * Seuls les clips visibles jouent (sans son, en boucle). Chaque clip ouvre sa vidéo sur TikTok.
 */
export function TikTokCarousel({ clips }: { clips: TikTokClip[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setScrollable(el.scrollWidth > el.clientWidth + 4);
      const slide = el.children[0] as HTMLElement | undefined;
      if (slide) setActive(Math.round(el.scrollLeft / (slide.offsetWidth + 16)));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const slide = el?.children[Math.max(0, Math.min(clips.length - 1, i))] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-white disabled:opacity-0 sm:flex";

  return (
    <div className="relative" aria-roledescription="carrousel" aria-label="Vidéos TikTok">
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {clips.map((c, i) => (
          <li key={c.src} className="w-full shrink-0 snap-center snap-always sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[9/16] overflow-hidden rounded bg-ink"
              aria-label={`${c.label} — voir la vidéo ${i + 1} sur TikTok`}
            >
              <LoopVideo src={c.src} poster={c.poster} label={c.label} threshold={0.6} preload="metadata" className="object-center" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/30 to-transparent p-4 pt-16 text-white">
                <p className="font-bold leading-tight">{c.label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors group-hover:text-white">
                  <TikTokIcon className="h-3.5 w-3.5" /> Voir sur TikTok
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {scrollable && (
        <>
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} className={`${arrow} -left-2`} aria-label="Vidéo précédente">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active >= clips.length - 1} className={`${arrow} -right-2`} aria-label="Vidéo suivante">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
          <div className="mt-4 flex justify-center gap-1" role="tablist" aria-label="Choisir une vidéo">
            {clips.map((c, i) => (
              <button key={c.src} type="button" role="tab" aria-selected={i === active} aria-label={c.label} onClick={() => go(i)} className="p-1.5">
                <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-2 bg-ink/25"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
