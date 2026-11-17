/**
 * Importe les contenus actuels du code (créations, tissus, carrousel + photos) dans Sanity.
 * À lancer une seule fois, après `npx sanity login` :
 *
 *   npx sanity exec scripts/import-sanity.ts --with-user-token
 *
 * Relancer le script met à jour les mêmes fiches (pas de doublons).
 */
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";
import { fabrics, models } from "../lib/products";
import { site } from "../lib/site";

const client = getCliClient({ apiVersion: "2025-01-01" });
const uploaded = new Map<string, string>();

/** "center 20%" → point important { x: 0.5, y: 0.2 } */
function hotspot(position?: string) {
  if (!position) return undefined;
  const [x, y] = position.split(" ").map((v) => (v === "center" ? 0.5 : parseFloat(v) / 100));
  return { _type: "sanity.imageHotspot", x, y, width: 0.4, height: 0.4 };
}

async function image(path?: string, position?: string) {
  if (!path) return undefined;
  const file = join(process.cwd(), "public", path);
  if (!existsSync(file)) return undefined;
  if (!uploaded.has(path)) {
    const asset = await client.assets.upload("image", createReadStream(file), { filename: basename(file) });
    uploaded.set(path, asset._id);
    console.log("  photo envoyée :", path);
  }
  return {
    _type: "image",
    asset: { _type: "reference", _ref: uploaded.get(path)! },
    ...(position ? { hotspot: hotspot(position) } : {}),
  };
}

async function run() {
  console.log("Créations…");
  for (const m of models) {
    await client.createOrReplace({
      _id: `creation-${m.id}`,
      _type: "creation",
      nom: m.name,
      slug: { _type: "slug", current: m.id },
      categorie: m.category,
      prix: m.price,
      description: m.description,
      photo: await image(m.image),
      etiquette: m.tag,
    });
  }

  console.log("Tissus…");
  for (const f of fabrics) {
    await client.createOrReplace({
      _id: `tissu-${f.id}`,
      _type: "tissu",
      nom: f.name,
      slug: { _type: "slug", current: f.id },
      type: f.type,
      prix: f.price,
      unite: f.unit,
      photo: await image(f.image),
      etiquette: f.tag,
    });
  }

  console.log("Carrousel…");
  const carrousel = [];
  for (const [i, s] of site.heroSlides.entries()) {
    const img = await image(s.image, s.position);
    if (img) carrousel.push({ ...img, _key: `slide${i}`, alt: s.alt });
  }
  await client.createOrReplace({ _id: "accueil", _type: "accueil", carrousel });

  console.log(`Terminé : ${models.length} créations, ${fabrics.length} tissus, ${carrousel.length} images de carrousel.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
