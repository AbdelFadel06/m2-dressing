/**
 * Réglages du site (WhatsApp, ateliers, réseaux…), modifiables par le styliste dans Sanity
 * (fiche « Réglages du site »). Les valeurs de lib/site.ts servent de repli.
 * Ce fichier ne contient que des types et des fonctions pures : utilisable côté serveur et navigateur.
 */
import { site } from "./site";

export type Workshop = {
  name: string;
  area: string;
  /** Repère ou adresse précise, ex : « Face à la pharmacie X » */
  address?: string;
  hours: string;
  mapUrl: string;
};

export type Settings = {
  name: string;
  tagline: string;
  /** Numéro WhatsApp au format international, chiffres uniquement (ex : 2290194381496) */
  whatsapp: string;
  phoneDisplay: string;
  email?: string;
  tiktok: { url: string; handle: string; localVideos: { src: string; poster?: string }[]; videoIds: string[] };
  facebook?: string;
  instagram?: string;
  workshops: Workshop[];
};

/** 2290194381496 → « +229 01 94 38 14 96 » */
export function formatPhone(n: string) {
  const d = n.replace(/\D/g, "");
  const [cc, rest] = d.startsWith("229") ? ["229", d.slice(3)] : [d.slice(0, 3), d.slice(3)];
  return `+${cc} ${rest.match(/.{1,2}/g)?.join(" ") ?? ""}`.trim();
}

/** https://www.tiktok.com/@m2dressing → « @m2dressing » */
export function tiktokHandle(url: string) {
  return url.match(/@[\w.]+/)?.[0] ?? "TikTok";
}

export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultSettings: Settings = {
  name: site.name,
  tagline: site.tagline,
  whatsapp: site.whatsapp,
  phoneDisplay: site.phoneDisplay,
  tiktok: site.tiktok,
  facebook: site.facebook,
  workshops: site.workshops,
};
