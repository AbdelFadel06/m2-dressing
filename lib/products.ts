/**
 * ============================================================
 *  CATALOGUE — modèles de couture et pagnes/tissus
 *  ⚠️ Les noms et prix ci-dessous sont des EXEMPLES à remplacer.
 *
 *  Pour mettre une vraie photo : déposez l'image dans /public/images
 *  puis ajoutez   image: "/images/mon-modele.jpg"   sur l'article.
 *  Sans `image`, un motif de pagne est affiché à la place.
 * ============================================================
 */

export type PatternKey =
  | "circles"
  | "diamonds"
  | "stripes"
  | "waves"
  | "squares"
  | "leaves";

export type Colors = [string, string, string];

export const modelCategories = ["Femme", "Homme", "Enfant", "Couple & Famille"] as const;
export type ModelCategory = (typeof modelCategories)[number];

export type Model = {
  id: string;
  name: string;
  category: ModelCategory;
  /** Prix "à partir de" (façon), en FCFA */
  price: number;
  description: string;
  pattern: PatternKey;
  colors: Colors;
  image?: string;
  /** Partie de la photo à garder visible (ex: "50% 20%"), réglée dans Sanity. */
  position?: string;
  /**
   * Vidéo optionnelle (ex: "/videos/agbada-ivoire.mp4") : elle remplace la photo,
   * démarre seule, sans son, en boucle. La photo `image` sert d'aperçu au chargement.
   */
  video?: string;
  tag?: "Nouveau" | "Populaire";
};

export const fabricTypes = ["Good Luck", "Wax", "Bazin", "Dentelle"] as const;
export type FabricType = (typeof fabricTypes)[number];

export type Fabric = {
  id: string;
  name: string;
  type: FabricType;
  /** Prix de l'unité de vente, en FCFA */
  price: number;
  /** Unité de vente affichée (ex: "pagne de 6 yards") */
  unit: string;
  pattern: PatternKey;
  colors: Colors;
  image?: string;
  /** Partie de la photo à garder visible (ex: "50% 20%"), réglée dans Sanity. */
  position?: string;
  /**
   * Vidéo optionnelle (ex: "/videos/agbada-ivoire.mp4") : elle remplace la photo,
   * démarre seule, sans son, en boucle. La photo `image` sert d'aperçu au chargement.
   */
  video?: string;
  tag?: "Nouveau" | "Populaire";
};

export const models: Model[] = [
  // ---- Homme ---- (photos : Pexels, licence libre, voir README)
  {
    id: "agbada-marine-brode",
    name: "Agbada bleu nuit brodé",
    category: "Homme",
    price: 60000,
    description: "Grand agbada trois pièces, arabesques brodées en blanc sur le plastron.",
    pattern: "diamonds",
    colors: ["#1c2757", "#f0e5d0", "#0d0d0d"],
    image: "/images/stock/hero-agbada-marine-brode.jpg",
    tag: "Nouveau",
  },
  {
    id: "aso-oke-indigo",
    name: "Agbada aso-oke indigo",
    category: "Homme",
    price: 75000,
    description: "Aso-oke tissé à rayures indigo et fuchsia, porté avec sa toque assortie.",
    pattern: "stripes",
    colors: ["#2a2f7a", "#c2357e", "#f0e5d0"],
    image: "/images/stock/aso-oke-indigo.jpg",
    tag: "Populaire",
  },
  {
    id: "agbada-bordeaux",
    name: "Agbada bordeaux",
    category: "Homme",
    price: 55000,
    description: "Agbada ample bordeaux, broderie dorée au col et au plastron.",
    pattern: "circles",
    colors: ["#5a1420", "#c9a46a", "#0d0d0d"],
    image: "/images/stock/agbada-bordeaux.jpg",
  },
  {
    id: "agbada-gris-brode",
    name: "Agbada gris brodé",
    category: "Homme",
    price: 50000,
    description: "Gris anthracite, plastron brodé de motifs géométriques verts et blancs.",
    pattern: "squares",
    colors: ["#4a4d55", "#2e7d5b", "#f0e5d0"],
    image: "/images/stock/agbada-gris-brode.jpg",
    tag: "Nouveau",
  },
  {
    id: "agbada-blanc-brode",
    name: "Agbada blanc brodé",
    category: "Homme",
    price: 55000,
    description: "Blanc immaculé, broderies géométriques bordeaux sur le devant.",
    pattern: "diamonds",
    colors: ["#f5f5f5", "#7a2030", "#c9c9c9"],
    image: "/images/stock/hero-agbada-blanc.jpg",
  },
  {
    id: "aso-oke-chocolat",
    name: "Agbada aso-oke chocolat",
    category: "Homme",
    price: 65000,
    description: "Aso-oke brun chocolat à rayures, chemise blanche et toque assortie.",
    pattern: "stripes",
    colors: ["#4a2a1a", "#c9a46a", "#f0e5d0"],
    image: "/images/stock/aso-oke-chocolat.jpg",
    tag: "Populaire",
  },
  {
    id: "agbada-bleu-ciel",
    name: "Agbada bleu ciel",
    category: "Homme",
    price: 50000,
    description: "Bazin bleu ciel, broderie ton sur ton, pour mariages et baptêmes.",
    pattern: "waves",
    colors: ["#7fa8d9", "#cfe0f3", "#1c2757"],
    image: "/images/stock/agbada-bleu-ciel.jpg",
  },
  {
    id: "agbada-turquoise",
    name: "Agbada turquoise",
    category: "Homme",
    price: 50000,
    description: "Bazin turquoise brillant, coupe ample et finitions brodées.",
    pattern: "waves",
    colors: ["#1aa0b8", "#a8e3ec", "#0d0d0d"],
    image: "/images/stock/agbada-turquoise.jpg",
  },
  {
    id: "agbada-ivoire-dentelle",
    name: "Agbada ivoire en dentelle",
    category: "Homme",
    price: 70000,
    description: "Dentelle ivoire légère sur fond uni, pour les grandes cérémonies.",
    pattern: "leaves",
    colors: ["#f0e5d0", "#c9b48a", "#8a7a5a"],
    image: "/images/stock/agbada-ivoire-dentelle.jpg",
  },
  {
    id: "agbada-blanc-violet",
    name: "Agbada blanc et violet",
    category: "Homme",
    price: 55000,
    description: "Blanc et gris perle, broderie violette du col jusqu'aux pans.",
    pattern: "squares",
    colors: ["#ececec", "#6b3f8a", "#9a9a9a"],
    image: "/images/stock/agbada-blanc-jardin.jpg",
  },
  {
    id: "aso-oke-vert",
    name: "Agbada aso-oke vert",
    category: "Homme",
    price: 65000,
    description: "Aso-oke vert profond rayé de blanc, toque brodée assortie.",
    pattern: "stripes",
    colors: ["#0f5d4a", "#f0e5d0", "#0d0d0d"],
    image: "/images/stock/hero-aso-oke-vert.jpg",
  },

  // ---- Couple & Famille ----
  {
    id: "couple-ceremonie-or",
    name: "Couple cérémonie or",
    category: "Couple & Famille",
    price: 150000,
    description: "Agbada brodé pour lui, robe en dentelle perlée pour elle, accordés en tons dorés.",
    pattern: "leaves",
    colors: ["#c9a46a", "#f0e5d0", "#5a4320"],
    image: "/images/couple-ceremonie-or.jpg",
    tag: "Populaire",
  },
  {
    id: "couple-aso-oke-vert",
    name: "Couple aso-oke vert",
    category: "Couple & Famille",
    price: 90000,
    description: "Tissu tissé rayé vert et or : agbada pour lui, ensemble et châle pour elle.",
    pattern: "stripes",
    colors: ["#0f5d4a", "#c9a46a", "#8a8a8a"],
    image: "/images/couple-aso-oke-vert.jpg",
  },
  {
    id: "tenue-famille-good-luck",
    name: "Tenue famille Good Luck",
    category: "Couple & Famille",
    price: 40000,
    description: "Plusieurs tenues coordonnées pour toute la famille (devis selon nombre).",
    pattern: "diamonds",
    colors: ["#0f5d4a", "#c58b2b", "#faf4e8"],
  },

  // ---- Femme ---- (exemples sans photo : ajoutez image: "/images/....jpg")
  {
    id: "robe-kaba-elegance",
    name: "Robe Kaba Élégance",
    category: "Femme",
    price: 15000,
    description: "Kaba cintré, coupe soignée, idéal pour cérémonies et mariages.",
    pattern: "circles",
    colors: ["#1c2757", "#c58b2b", "#faf4e8"],
  },
  {
    id: "ensemble-pagne-2-pieces",
    name: "Ensemble pagne 2 pièces",
    category: "Femme",
    price: 18000,
    description: "Haut ajusté et jupe assortie, finitions propres.",
    pattern: "diamonds",
    colors: ["#b4432b", "#f0b84a", "#17120f"],
  },
  {
    id: "robe-sirene-wax",
    name: "Robe sirène wax",
    category: "Femme",
    price: 20000,
    description: "Coupe sirène qui épouse la silhouette, évasée en bas.",
    pattern: "waves",
    colors: ["#0f5d4a", "#f3d98b", "#faf4e8"],
  },
  {
    id: "boubou-femme-brode",
    name: "Boubou femme brodé",
    category: "Femme",
    price: 25000,
    description: "Grand boubou ample avec broderies à la main.",
    pattern: "leaves",
    colors: ["#6b2d5c", "#e8b4d0", "#faf4e8"],
  },

  // ---- Enfant ---- (exemples sans photo)
  {
    id: "robe-fillette-wax",
    name: "Robe fillette wax",
    category: "Enfant",
    price: 6000,
    description: "Robe évasée et confortable pour les petites princesses.",
    pattern: "circles",
    colors: ["#e8742c", "#fbe3a8", "#6b2d5c"],
  },
  {
    id: "ensemble-garcon",
    name: "Ensemble garçon",
    category: "Enfant",
    price: 7000,
    description: "Chemise et short assortis pour fêtes et cérémonies.",
    pattern: "stripes",
    colors: ["#1c2757", "#e8b44a", "#faf4e8"],
  },
];

export const fabrics: Fabric[] = [
  {
    id: "good-luck-royal",
    image: "/images/stock/tissus/good-luck-royal.jpg",
    name: "Good Luck Royal",
    type: "Good Luck",
    price: 20000,
    unit: "pagne de 6 yards",
    pattern: "diamonds",
    colors: ["#1c2757", "#c58b2b", "#faf4e8"],
    tag: "Populaire",
  },
  {
    id: "good-luck-soleil",
    image: "/images/stock/tissus/good-luck-soleil.jpg",
    name: "Good Luck Soleil",
    type: "Good Luck",
    price: 20000,
    unit: "pagne de 6 yards",
    pattern: "circles",
    colors: ["#e8742c", "#fbe3a8", "#17120f"],
  },
  {
    id: "good-luck-emeraude",
    image: "/images/stock/tissus/good-luck-emeraude.jpg",
    name: "Good Luck Émeraude",
    type: "Good Luck",
    price: 22000,
    unit: "pagne de 6 yards",
    pattern: "leaves",
    colors: ["#0f5d4a", "#e7c76b", "#faf4e8"],
    tag: "Nouveau",
  },
  {
    id: "wax-hollandais-bleu",
    image: "/images/stock/tissus/wax-hollandais-bleu.jpg",
    name: "Wax hollandais bleu",
    type: "Wax",
    price: 25000,
    unit: "pagne de 6 yards",
    pattern: "circles",
    colors: ["#17306b", "#7f93d9", "#faf4e8"],
  },
  {
    id: "wax-fleurs-rouge",
    image: "/images/stock/tissus/wax-fleurs-rouge.jpg",
    name: "Wax fleurs rouge",
    type: "Wax",
    price: 15000,
    unit: "pagne de 6 yards",
    pattern: "leaves",
    colors: ["#b4432b", "#f0b84a", "#17120f"],
    tag: "Populaire",
  },
  {
    id: "wax-geometrique",
    image: "/images/stock/tissus/wax-geometrique.jpg",
    name: "Wax géométrique",
    type: "Wax",
    price: 15000,
    unit: "pagne de 6 yards",
    pattern: "squares",
    colors: ["#17120f", "#c58b2b", "#faf4e8"],
  },
  {
    id: "wax-vagues",
    image: "/images/stock/tissus/wax-vagues.jpg",
    name: "Wax vagues",
    type: "Wax",
    price: 18000,
    unit: "pagne de 6 yards",
    pattern: "waves",
    colors: ["#6b2d5c", "#f0b84a", "#faf4e8"],
    tag: "Nouveau",
  },
  {
    id: "bazin-riche-blanc",
    image: "/images/stock/tissus/bazin-riche-blanc.jpg",
    name: "Bazin riche blanc",
    type: "Bazin",
    price: 20000,
    unit: "5 mètres",
    pattern: "stripes",
    colors: ["#faf4e8", "#e6dcc6", "#c9b78b"],
  },
  {
    id: "bazin-riche-bleu",
    image: "/images/stock/tissus/bazin-riche-bleu.jpg",
    name: "Bazin riche bleu nuit",
    type: "Bazin",
    price: 22000,
    unit: "5 mètres",
    pattern: "stripes",
    colors: ["#1c2757", "#2d3c80", "#7f93d9"],
  },
  {
    id: "bazin-riche-bordeaux",
    image: "/images/stock/tissus/bazin-riche-bordeaux.jpg",
    name: "Bazin riche bordeaux",
    type: "Bazin",
    price: 22000,
    unit: "5 mètres",
    pattern: "stripes",
    colors: ["#6b1d2a", "#8c2c3c", "#d98c9a"],
  },
  {
    id: "dentelle-dore",
    image: "/images/stock/tissus/dentelle-doree.jpg",
    name: "Dentelle dorée",
    type: "Dentelle",
    price: 35000,
    unit: "5 yards",
    pattern: "leaves",
    colors: ["#f0e5d0", "#c58b2b", "#8a5a14"],
    tag: "Populaire",
  },
  {
    id: "dentelle-ivoire",
    image: "/images/stock/tissus/dentelle-ivoire.jpg",
    name: "Dentelle ivoire",
    type: "Dentelle",
    price: 30000,
    unit: "5 yards",
    pattern: "squares",
    colors: ["#faf4e8", "#e6dcc6", "#b9a77b"],
  },
];
