/**
 * Lecture du contenu géré dans Sanity (créations, tissus, carrousel).
 * Le site étant statique, ces données sont lues au moment de la construction du site
 * (« build ») : chaque publication dans Sanity relance une construction.
 *
 * Tant qu'une liste est vide dans Sanity, on garde les exemples du code (lib/products.ts, lib/site.ts),
 * pour que le site ne soit jamais vide pendant la mise en place.
 */
import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { fabrics as localFabrics, models as localModels, type Fabric, type Model } from "./products";
import { site } from "./site";
import { defaultSettings, formatPhone, tiktokHandle, type Settings } from "./settings";

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
const builder = createImageUrlBuilder({ projectId, dataset });

type SanityImage = SanityImageSource & { hotspot?: { x: number; y: number } };

/** URL de la photo (avec le recadrage choisi dans Sanity) + point important à garder visible. */
function photo(img?: SanityImage) {
  if (!img) return {};
  return {
    image: builder.image(img).auto("format").url(),
    position: img.hotspot ? `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%` : undefined,
  };
}

async function fetchOr<T>(query: string, fallback: T[], map: (row: never) => T): Promise<T[]> {
  try {
    const rows = (await client.fetch<never[] | null>(query)) ?? [];
    return rows.length ? rows.map(map) : fallback;
  } catch (e) {
    console.warn("[sanity] lecture impossible, exemples du code utilisés :", (e as Error).message);
    return fallback;
  }
}

type ModelRow = Pick<Model, "id" | "name" | "category" | "price" | "priceOwnFabric" | "description" | "video" | "tag"> & { photo?: SanityImage };
type FabricRow = Pick<Fabric, "id" | "name" | "type" | "price" | "unit" | "tag"> & { photo?: SanityImage };

const mono: Model["colors"] = ["#0d0d0d", "#5a5a5a", "#d9d9d9"];

export async function getModels(): Promise<Model[]> {
  return fetchOr(
    `*[_type == "creation" && defined(slug.current)] | order(_createdAt desc) {
      "id": slug.current, "name": nom, "category": categorie, "price": coalesce(prix, 0), "priceOwnFabric": coalesce(prixCouture, prix, 0),
      "description": coalesce(description, ""), photo, "video": video.asset->url, "tag": etiquette
    }`,
    localModels,
    ({ photo: p, ...m }: ModelRow): Model => ({ ...m, video: m.video ?? undefined, tag: m.tag ?? undefined, pattern: "diamonds", colors: mono, ...photo(p) }),
  );
}

export async function getFabrics(): Promise<Fabric[]> {
  return fetchOr(
    `*[_type == "tissu" && defined(slug.current)] | order(_createdAt desc) {
      "id": slug.current, "name": nom, type, "price": coalesce(prix, 0), "unit": coalesce(unite, ""), photo, "tag": etiquette
    }`,
    localFabrics,
    ({ photo: p, ...f }: FabricRow): Fabric => ({ ...f, tag: f.tag ?? undefined, pattern: "squares", colors: mono, ...photo(p) }),
  );
}

export type HeroSlide = { image: string; alt: string; position?: string };

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return fetchOr(
    `*[_id == "accueil"][0].carrousel[defined(asset)]`,
    site.heroSlides,
    (s: SanityImage & { alt?: string }): HeroSlide => {
      const { image = "", position } = photo(s);
      return { image, alt: s.alt ?? "", position };
    },
  );
}

export type Review = { id: string; name: string; city?: string; outfit?: string; text: string; rating: number; image?: string; position?: string };

/** Avis clients : uniquement ceux saisis dans Sanity (aucun avis d'exemple). */
export async function getReviews(): Promise<Review[]> {
  return fetchOr(
    `*[_type == "avis" && defined(texte)] | order(_createdAt desc) {
      "id": _id, "name": prenom, "city": ville, "outfit": tenue, "text": texte, "rating": coalesce(note, 5), photo
    }`,
    [],
    ({ photo: p, ...r }: Review & { photo?: SanityImage }): Review => ({ ...r, ...photo(p) }),
  );
}

type SettingsRow = {
  slogan?: string;
  whatsapp?: string;
  email?: string;
  tiktok?: string;
  facebook?: string;
  instagram?: string;
  ateliers?: { nom?: string; quartier?: string; repere?: string; horaires?: string; lienMaps?: string }[];
};

/** Réglages du site (fiche unique « Réglages du site » dans Sanity), complétés par les valeurs du code. */
export async function getSettings(): Promise<Settings> {
  const [r] = await fetchOr(`*[_id == "reglages"][0..0]`, [] as SettingsRow[], (row: SettingsRow) => row);
  if (!r) return defaultSettings;
  const whatsapp = r.whatsapp?.replace(/\D/g, "") || defaultSettings.whatsapp;
  const workshops = (r.ateliers ?? [])
    .filter((a) => a.nom && a.quartier)
    .map((a) => ({
      name: a.nom!,
      area: a.quartier!,
      address: a.repere,
      hours: a.horaires ?? "",
      mapUrl: a.lienMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.quartier} Parakou Bénin`)}`,
    }));
  const tiktokUrl = r.tiktok || defaultSettings.tiktok.url;
  return {
    ...defaultSettings,
    tagline: r.slogan || defaultSettings.tagline,
    whatsapp,
    phoneDisplay: formatPhone(whatsapp),
    email: r.email,
    tiktok: { ...defaultSettings.tiktok, url: tiktokUrl, handle: tiktokHandle(tiktokUrl) },
    facebook: r.facebook,
    instagram: r.instagram,
    workshops: workshops.length ? workshops : defaultSettings.workshops,
  };
}
