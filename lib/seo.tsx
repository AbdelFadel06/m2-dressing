/**
 * Référencement : mots-clés, questions fréquentes et données structurées (schema.org, JSON-LD)
 * lues par Google, Bing et les assistants IA (ChatGPT, Perplexity, Gemini…).
 */
import type { Fabric, Model } from "./products";
import type { Settings } from "./settings";
import { site } from "./site";

export const keywords = [
  "styliste Parakou",
  "tailleur Parakou",
  "couturier Parakou",
  "couture sur mesure Parakou",
  "atelier de couture Parakou",
  "styliste Bénin",
  "tailleur Bénin",
  "couture homme",
  "couture femme",
  "tenue traditionnelle",
  "tenue traditionnelle homme",
  "tenue traditionnelle femme",
  "tenue africaine",
  "agbada",
  "boubou",
  "grand boubou brodé",
  "kaftan",
  "aso-oke",
  "tenue de mariage",
  "tenue de cérémonie",
  "tenue couple assortie",
  "tenue enfant",
  "pagne Good Luck",
  "Good Luck Parakou",
  "wax hollandais",
  "bazin riche",
  "dentelle",
  "pagne Parakou",
  "Borgou",
];

export const absUrl = (path = "/") => (path.startsWith("http") ? path : `${site.url}${path}`);

/** Questions fréquentes : affichées sur l'accueil ET décrites pour Google et les IA (FAQPage). */
export function faq(s: Settings) {
  const ateliers = s.workshops.map((w) => `${w.name} (${w.area}${w.address ? `, ${w.address}` : ""})`).join(" et ");
  return [
    {
      q: "Où trouver un bon styliste ou tailleur à Parakou ?",
      a: `${s.name} est un styliste et tailleur installé à Parakou, au Bénin, avec deux ateliers : ${ateliers}. Nous cousons sur mesure des tenues traditionnelles et modernes pour homme, femme et enfant.`,
    },
    {
      q: "Faites-vous la couture pour homme et pour femme ?",
      a: "Oui. Nous habillons les hommes (agbada, grand boubou brodé, kaftan, ensembles en aso-oke), les femmes, les enfants, ainsi que les couples et les familles avec des tenues assorties pour les mariages et cérémonies.",
    },
    {
      q: "Vendez-vous des pagnes Good Luck, du wax et du bazin ?",
      a: "Oui, notre boutique propose des pagnes Good Luck, du wax hollandais, du bazin riche et de la dentelle. Vous pouvez acheter le tissu seul ou nous le faire coudre.",
    },
    {
      q: "Puis-je apporter mon propre tissu ?",
      a: "Oui. Avec la formule « Mon tissu », vous apportez votre pagne et ne payez que la couture. Avec la formule « Tout fourni », nous fournissons le tissu et la couture. Les deux prix sont affichés sur chaque création.",
    },
    {
      q: "Comment commander une tenue ?",
      a: `Choisissez une création ou un tissu sur le site, ajoutez-le au panier et envoyez votre commande sur WhatsApp (${s.phoneDisplay}). Vos mesures sont prises à l'atelier ou à distance.`,
    },
    {
      q: "Livrez-vous en dehors de Parakou ?",
      a: "Nous livrons à Parakou et pouvons expédier vers une autre ville. Le retrait à l'atelier est aussi possible. Les conditions et délais vous sont confirmés sur WhatsApp.",
    },
    {
      q: "En combien de temps ma tenue est-elle prête ?",
      a: "Nous travaillons en délais courts. Le délai exact dépend du modèle et de la période ; il vous est confirmé sur WhatsApp au moment de la commande.",
    },
  ];
}

const address = { "@type": "PostalAddress", addressLocality: "Parakou", addressRegion: "Borgou", addressCountry: "BJ" };

/** Fiche entreprise : nom, ateliers, contact, réseaux, domaines de compétence. */
export function businessJsonLd(s: Settings) {
  const sameAs = [s.tiktok.url, s.facebook, s.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ClothingStore", "LocalBusiness"],
        "@id": absUrl("/#business"),
        name: s.name,
        description: site.description,
        slogan: s.tagline,
        url: absUrl("/"),
        logo: absUrl("/images/logo-m2-dressing.png"),
        image: absUrl("/opengraph-image.jpg"),
        telephone: s.phoneDisplay.replace(/\s/g, ""),
        ...(s.email ? { email: s.email } : {}),
        address,
        geo: { "@type": "GeoCoordinates", latitude: 9.3372, longitude: 2.6303 },
        areaServed: [
          { "@type": "City", name: "Parakou" },
          { "@type": "AdministrativeArea", name: "Borgou" },
          { "@type": "Country", name: "Bénin" },
        ],
        currenciesAccepted: "XOF",
        knowsAbout: keywords.slice(9),
        sameAs,
        department: s.workshops.map((w) => ({
          "@type": "LocalBusiness",
          name: `${s.name} — ${w.name}`,
          address: { ...address, streetAddress: [w.area, w.address].filter(Boolean).join(", ") },
          hasMap: w.mapUrl,
          telephone: s.phoneDisplay.replace(/\s/g, ""),
          ...(w.hours ? { description: `Horaires : ${w.hours}` } : {}),
        })),
        makesOffer: [
          "Couture sur mesure pour homme",
          "Couture sur mesure pour femme",
          "Couture sur mesure pour enfant",
          "Tenues de mariage et de cérémonie, couples et familles",
          "Vente de pagnes Good Luck, wax, bazin et dentelle",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: "Parakou, Bénin" } })),
      },
      {
        "@type": "WebSite",
        "@id": absUrl("/#website"),
        url: absUrl("/"),
        name: s.name,
        inLanguage: "fr-BJ",
        publisher: { "@id": absUrl("/#business") },
      },
    ],
  };
}

export function faqJsonLd(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq(s).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

const offer = (price: number, name?: string) => ({
  "@type": "Offer",
  ...(name ? { name } : {}),
  price,
  priceCurrency: "XOF",
  availability: "https://schema.org/InStock",
  seller: { "@id": absUrl("/#business") },
});

export function modelsJsonLd(models: Model[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Créations M2 Dressing — tenues sur mesure",
    itemListElement: models.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: m.name,
        category: `Tenue ${m.category.toLowerCase()} sur mesure`,
        description: m.description || `${m.name}, cousu sur mesure à Parakou par M2 Dressing.`,
        ...(m.image ? { image: absUrl(m.image) } : {}),
        brand: { "@type": "Brand", name: site.name },
        url: absUrl(`/creations#${m.id}`),
        offers: [offer(m.price, "Tout fourni (tissu + couture)"), offer(m.priceOwnFabric, "Mon tissu (couture seule)")],
      },
    })),
  };
}

export function fabricsJsonLd(fabrics: Fabric[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pagnes et tissus M2 Dressing",
    itemListElement: fabrics.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: f.name,
        category: `Tissu ${f.type}`,
        description: `${f.name} (${f.type}), vendu par ${f.unit}, disponible à Parakou.`,
        ...(f.image ? { image: absUrl(f.image) } : {}),
        url: absUrl(`/pagnes#${f.id}`),
        offers: offer(f.price),
      },
    })),
  };
}

/** Balise <script type="application/ld+json">, protégée contre l'injection de HTML. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
