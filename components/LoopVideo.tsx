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
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // `muted` doit être posé sur l'élément lui-même : sinon le navigateur bloque la lecture auto.
    video.muted = true;
    video.defaultMuted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* lecture auto bloquée (mode économie d'énergie) : le poster reste affiché */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      aria-label={label}
      className={`absolute inset-0 h-full w-full object-cover object-top ${className}`}
    />
  );
}
