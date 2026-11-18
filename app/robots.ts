import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Tous les moteurs de recherche et assistants IA sont autorisés (sauf le panier, sans intérêt). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/panier" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
