/**
 * Fiches de saisie de l'espace M2 Dressing (Sanity Studio).
 * Les libellés sont en français : c'est ce que voit le styliste.
 */
import { defineArrayMember, defineField, defineType } from "sanity";

const etiquette = defineField({
  name: "etiquette",
  title: "Étiquette",
  description: "Petit badge affiché sur la photo. Les articles étiquetés apparaissent sur la page d'accueil.",
  type: "string",
  options: { list: ["Nouveau", "Populaire"], layout: "radio", direction: "horizontal" },
});

const photo = defineField({
  name: "photo",
  title: "Photo",
  description:
    "Photo verticale de préférence. Après l'envoi, cliquez sur l'icône ✎ de la photo pour placer le point important (le visage) : il restera toujours visible.",
  type: "image",
  options: { hotspot: true },
  validation: (r) => r.required().error("Ajoutez une photo"),
});

export const creation = defineType({
  name: "creation",
  title: "Création",
  type: "document",
  fields: [
    defineField({ name: "nom", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      description: "Cliquez sur « Generate » : elle se crée à partir du nom.",
      type: "slug",
      options: { source: "nom", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: { list: ["Homme", "Femme", "Enfant", "Couple & Famille"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "prix",
      title: "Prix « Tout fourni » (FCFA)",
      description: "Tissu fourni par M2 Dressing + couture.",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "prixCouture",
      title: "Prix « Mon tissu » (FCFA)",
      description: "Le client apporte son tissu : couture seule.",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    photo,
    defineField({
      name: "video",
      title: "Vidéo (facultatif)",
      description: "Courte vidéo MP4 (moins de 8 Mo). Elle remplace la photo et tourne en boucle, sans son.",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    etiquette,
  ],
  orderings: [{ title: "Plus récentes", name: "recent", by: [{ field: "_createdAt", direction: "desc" }] }],
  preview: { select: { title: "nom", subtitle: "categorie", media: "photo" } },
});

export const tissu = defineType({
  name: "tissu",
  title: "Tissu",
  type: "document",
  fields: [
    defineField({ name: "nom", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Identifiant",
      description: "Cliquez sur « Generate ».",
      type: "slug",
      options: { source: "nom", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Good Luck", "Wax", "Bazin", "Dentelle"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "prix", title: "Prix (FCFA)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({
      name: "unite",
      title: "Vendu par",
      description: "Ex : pagne de 6 yards, 5 mètres, 5 yards…",
      type: "string",
      initialValue: "pagne de 6 yards",
      validation: (r) => r.required(),
    }),
    { ...photo, description: "Photo carrée de préférence, bien nette sur le motif." },
    etiquette,
  ],
  orderings: [{ title: "Plus récents", name: "recent", by: [{ field: "_createdAt", direction: "desc" }] }],
  preview: { select: { title: "nom", subtitle: "type", media: "photo" } },
});

export const accueil = defineType({
  name: "accueil",
  title: "Page d'accueil",
  type: "document",
  fields: [
    defineField({
      name: "carrousel",
      title: "Images du carrousel",
      description:
        "Grandes photos en haut de l'accueil (format paysage ou vertical en haute qualité). Glissez pour changer l'ordre.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Description courte",
              description: "Ex : « Agbada bleu nuit brodé ». Utile pour Google et les malvoyants.",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1).error("Ajoutez au moins une image"),
    }),
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
});

export const avis = defineType({
  name: "avis",
  title: "Avis client",
  type: "document",
  fields: [
    defineField({ name: "prenom", title: "Prénom du client", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ville", title: "Ville", type: "string", initialValue: "Parakou" }),
    defineField({ name: "tenue", title: "Tenue commandée", description: "Ex : Agbada pour un mariage", type: "string" }),
    defineField({
      name: "texte",
      title: "Avis",
      description: "Recopiez le message du client tel quel (avec son accord).",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({ name: "photo", title: "Photo du client habillé (facultatif)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "note",
      title: "Note sur 5",
      type: "number",
      initialValue: 5,
      options: { list: [5, 4, 3, 2, 1], layout: "radio", direction: "horizontal" },
    }),
  ],
  preview: { select: { title: "prenom", subtitle: "texte", media: "photo" } },
});

export const schemaTypes = [creation, tissu, avis, accueil];
