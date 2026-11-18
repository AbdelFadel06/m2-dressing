/**
 * /llms.txt : résumé du site en texte simple pour les assistants IA (ChatGPT, Perplexity, Claude, Gemini…).
 * Généré à chaque construction du site à partir des contenus Sanity.
 */
import { getFabrics, getModels, getSettings } from "@/lib/catalog";
import { faq } from "@/lib/seo";
import { formatPrice, site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const [s, models, fabrics] = await Promise.all([getSettings(), getModels(), getFabrics()]);
  const lines = [
    `# ${s.name} — styliste et tailleur à Parakou (Bénin)`,
    "",
    `> ${site.description}`,
    "",
    "## Contact",
    `- WhatsApp : ${s.phoneDisplay} (https://wa.me/${s.whatsapp})`,
    ...(s.email ? [`- E-mail : ${s.email}`] : []),
    `- TikTok : ${s.tiktok.url}`,
    ...(s.facebook ? [`- Facebook : ${s.facebook}`] : []),
    ...(s.instagram ? [`- Instagram : ${s.instagram}`] : []),
    ...s.workshops.map((w) => `- ${w.name} : ${w.area}${w.address ? `, ${w.address}` : ""}${w.hours ? ` — ${w.hours}` : ""} (${w.mapUrl})`),
    "",
    "## Services",
    "- Couture sur mesure pour homme, femme et enfant : tenues traditionnelles et modernes.",
    "- Tenues de mariage et de cérémonie, tenues assorties pour couples et familles.",
    "- Deux formules : « Tout fourni » (tissu + couture) ou « Mon tissu » (le client apporte son tissu, couture seule).",
    "- Vente de pagnes et tissus : Good Luck, wax hollandais, bazin riche, dentelle.",
    "- Commande sur WhatsApp, mesures à l'atelier ou à distance, retrait à l'atelier, livraison à Parakou ou expédition.",
    "",
    "## Pages",
    `- [Nos créations](${site.url}/creations) : tenues sur mesure avec leurs prix`,
    `- [Pagnes & tissus](${site.url}/pagnes) : boutique de tissus`,
    `- [Ateliers & contact](${site.url}/contact)`,
    "",
    "## Créations (prix en FCFA : tout fourni / mon tissu)",
    ...models.map((m) => `- ${m.name} (${m.category}) : ${formatPrice(m.price)} / ${formatPrice(m.priceOwnFabric)}`),
    "",
    "## Pagnes et tissus",
    ...fabrics.map((f) => `- ${f.name} (${f.type}) : ${formatPrice(f.price)} par ${f.unit}`),
    "",
    "## Questions fréquentes",
    ...faq(s).flatMap(({ q, a }) => [`### ${q}`, a, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
