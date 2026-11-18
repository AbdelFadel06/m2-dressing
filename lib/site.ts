/**
 * ============================================================
 *  CONFIGURATION DU SITE — M2 Dressing
 *  Modifiez uniquement ce fichier pour changer les infos de base.
 * ============================================================
 */
export const site = {
  name: "M2 Dressing",
  /**
   * Adresse du site en ligne (sans « / » final). Sert à Google, au plan du site et aux partages.
   * À remplacer par le vrai nom de domaine (ou définir la variable SITE_URL sur Cloudflare).
   */
  url: (process.env.SITE_URL ?? "https://m2-dressing.pages.dev").replace(/\/$/, ""),
  tagline: "L'élégance et la noblesse. Couture sur mesure à Parakou.",
  description:
    "M2 Dressing, styliste à Parakou (Bénin) : couture sur mesure, tenues de cérémonie, Good Luck, wax, bazin et dentelle. Commandez par WhatsApp.",

  /** Numéro WhatsApp au format international, SANS le "+" ni espaces (ex: 22997000000) */
  whatsapp: "2290194381496",
  /** Numéro affiché sur le site */
  phoneDisplay: "+229 01 94 38 14 96",

  /**
   * Carrousel plein écran de la page d'accueil.
   * `position` = partie de la photo gardée visible (ex: "center 20%" pour garder les visages).
   */
  heroSlides: [
    { image: "/images/stock/hero-agbada-marine-brode.jpg", alt: "Agbada bleu nuit brodé de blanc", position: "center 4%" },
    { image: "/images/stock/hero-aso-oke-brun.jpg", alt: "Agbada en aso-oke rayé brun et crème", position: "center 20%" },
    { image: "/images/stock/hero-agbada-blanc.jpg", alt: "Agbada blanc à broderies géométriques", position: "center 6%" },
    { image: "/images/stock/hero-aso-oke-vert.jpg", alt: "Agbada en aso-oke vert et blanc", position: "center 10%" },
    { image: "/images/stock/hero-agbada-rouille.jpg", alt: "Agbada rouille brodé ton sur ton", position: "center 32%" },
  ] as { image: string; alt: string; position?: string }[],

  tiktok: {
    handle: "@m2dressing",
    url: "https://www.tiktok.com/@m2dressing",
    /**
     * Une seule vidéo est affichée (la première de la liste).
     * OPTION 1 (recommandée) : votre vidéo en fichier MP4, dans /public/videos/.
     * Lecture automatique, en boucle et sans son garantie sur tous les navigateurs.
     * Ex: { src: "/videos/tiktok-1.mp4", poster: "/images/agbada-ivoire-brode.jpg" }
     */
    localVideos: [
      { src: "/videos/atelier-couture.mp4", poster: "/images/stock/atelier-couture-poster.jpg" },
    ] as { src: string; poster?: string }[],
    /**
     * OPTION 2 : identifiant d'une vidéo TikTok, lue par le lecteur TikTok
     * en automatique, en boucle et sans son. L'ID est le nombre à la fin du lien :
     * https://www.tiktok.com/@m2dressing/video/7312345678901234567  →  "7312345678901234567"
     * Si les deux listes sont vides, une carte qui renvoie vers TikTok est affichée.
     */
    videoIds: [] as string[],
  },

  /** Les deux ateliers à Parakou */
  workshops: [
    {
      name: "Atelier 1",
      area: "Parakou — quartier à renseigner",
      hours: "Lun – Sam · 8h – 19h",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Parakou+Benin",
    },
    {
      name: "Atelier 2",
      area: "Parakou — quartier à renseigner",
      hours: "Lun – Sam · 8h – 19h",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Parakou+Benin",
    },
  ],

  currency: "FCFA",
};

export function formatPrice(n: number) {
  return `${new Intl.NumberFormat("fr-FR").format(n).replace(/\s/g, " ")} ${site.currency}`;
}
