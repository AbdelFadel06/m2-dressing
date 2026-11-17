import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { LoopVideo } from "./LoopVideo";

/** Bande vidéo sous le carrousel. N'apparaît que si le fichier vidéo existe dans /public. */
export function VideoBand() {
  const { src, poster, title } = site.showcaseVideo;
  if (!existsSync(path.join(process.cwd(), "public", src))) return null;

  return (
    <section className="relative h-[70svh] min-h-[420px] overflow-hidden bg-ink text-white">
      <LoopVideo src={src} poster={poster} label={title} className="object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h2 className="section-title absolute bottom-8 left-4 md:left-6">{title}</h2>
    </section>
  );
}
