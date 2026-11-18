import type { Settings } from "@/lib/settings";
import { TikTokCarousel, TikTokIcon } from "./TikTokCarousel";

/** Section vidéo : carrousel des clips TikTok + bouton vers la page TikTok. */
export function TikTokSection({ settings: site }: { settings: Settings }) {
  const { clips, url, handle } = site.tiktok;
  if (!clips.length) return null;

  return (
    <section className="border-t border-line bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">En direct de notre TikTok</p>
          <h2 className="section-title mt-2 [&::after]:mx-auto">Nos créations en mouvement</h2>
          <p className="mt-4 max-w-lg text-ink/60">
            Essayages, détails de broderie et nouveautés de la boutique {site.name}. Touchez une vidéo pour la voir sur TikTok.
          </p>
        </div>

        <div className="mt-8">
          <TikTokCarousel clips={clips} />
        </div>

        <div className="mt-8 flex justify-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            <TikTokIcon /> Suivre {handle} sur TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
