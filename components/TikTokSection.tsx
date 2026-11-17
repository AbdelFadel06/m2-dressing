import { site } from "@/lib/site";
import { LoopVideo } from "./LoopVideo";

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.2v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.1 6.1 0 1 0 5.2 6V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.8Z" />
    </svg>
  );
}

/**
 * Lecteur officiel TikTok, réglé pour jouer seul, en boucle, sans son et sans boutons.
 * Paramètres : https://developers.tiktok.com/doc/embed-player
 */
function tiktokPlayerUrl(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    loop: "1",
    force_muted: "1", // sans son : condition des navigateurs pour la lecture automatique
    controls: "0",
    play_button: "0",
    progress_bar: "0",
    volume_control: "0",
    fullscreen_button: "0",
    timestamp: "0",
    description: "0",
    music_info: "0",
    closed_caption: "0",
    rel: "0",
    native_context_menu: "0",
  });
  return `https://www.tiktok.com/player/v1/${id}?${params}`;
}

const frame = "relative mx-auto aspect-[9/16] w-full overflow-hidden rounded bg-ink md:max-w-[400px]";

/**
 * Une seule vidéo : presque plein écran sur téléphone (petite marge), centrée sur ordinateur.
 * Ordre de priorité : fichier MP4 (localVideos[0]) > vidéo TikTok (videoIds[0]) > carte vers TikTok.
 */
export function TikTokSection() {
  const { localVideos, videoIds, url, handle } = site.tiktok;
  const local = localVideos[0];
  const id = videoIds[0];

  return (
    <section className="border-t border-line bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-2 md:px-4">
        <div className="flex flex-col items-center px-2 text-center">
          <h2 className="section-title [&::after]:mx-auto">Nos créations en mouvement</h2>
          <p className="mt-4 max-w-lg text-ink/60">
            Coulisses, nouveautés et clients habillés par {site.name}, en direct de notre TikTok.
          </p>
        </div>

        <div className="mt-8">
          {local ? (
            // 1. Votre fichier MP4 : lecture auto, en boucle, sans son
            <a href={url} target="_blank" rel="noopener noreferrer" className={`${frame} block`}>
              <LoopVideo src={local.src} poster={local.poster} label={`Vidéo ${site.name}`} className="object-center" />
            </a>
          ) : id ? (
            // 2. Vidéo TikTok (lecteur officiel : auto, en boucle, sans son, sans boutons)
            <div className={frame}>
              <iframe
                src={tiktokPlayerUrl(id)}
                title={`Vidéo TikTok ${site.name}`}
                loading="lazy"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : (
            // 3. Aucune vidéo configurée : carte qui renvoie vers TikTok
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${frame} group flex flex-col items-center justify-center p-6 text-center text-white`}
            >
              <TikTokIcon className="h-12 w-12 transition-transform group-hover:scale-110" />
              <p className="mt-5 text-base font-bold uppercase tracking-wider">Nos dernières créations</p>
              <p className="mt-1 text-sm text-white/60">Voir sur TikTok</p>
            </a>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            <TikTokIcon /> Suivre {handle}
          </a>
        </div>
      </div>
    </section>
  );
}
