/**
 * Le site est statique (Cloudflare Pages) : il n'y a pas de serveur pour redimensionner les images.
 *   - Photos Sanity : redimensionnées et compressées par le service d'images de Sanity.
 *   - Fichiers de /public : servis tels quels (déjà optimisés).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("fit", "max");
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return `${src}?w=${width}`;
}
