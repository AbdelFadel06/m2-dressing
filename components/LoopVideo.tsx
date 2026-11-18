"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo muette qui démarre seule et tourne en boucle, sans bouton play.
 * Elle ne joue que lorsqu'elle est visible à l'écran (économise la batterie
 * et les données mobiles).
 * Elle démarre même si le système demande de réduire les animations
 * (c'est une vidéo d'ambiance muette, comme le carrousel).
 */
export function LoopVideo({
  src,
  poster,
  label,
  className = "",
  threshold = 0.25,
  preload = "auto",
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  /** Part de la vidéo qui doit être visible pour qu'elle joue (0 à 1). */
  threshold?: number;
  /** « metadata » : ne télécharge la vidéo qu'au moment de la jouer (carrousels). */
  preload?: "auto" | "metadata";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // `muted` doit être posé sur l'élément lui-même : sinon le navigateur bloque la lecture auto.
    video.muted = true;
    video.defaultMuted = true;

    let visible = false;
    const tryPlay = () => {
      if (visible && video.paused) {
        video.play().catch(() => {
          /* lecture auto bloquée (mode économie d'énergie) : le poster reste affiché */
        });
      }
    };
    // si la vidéo n'était pas encore chargée au moment où elle est devenue visible, on relance dès qu'elle est prête
    video.addEventListener("canplay", tryPlay);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [threshold]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      autoPlay={preload === "auto"}
      loop
      playsInline
      preload={preload}
      aria-label={label}
      className={`absolute inset-0 h-full w-full object-cover object-top ${className}`}
    />
  );
}
