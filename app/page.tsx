import Link from "next/link";
import { FabricCard, ModelCard } from "@/components/Cards";
import { HeroCarousel } from "@/components/HeroCarousel";
import { VideoBand } from "@/components/VideoBand";
import { TikTokSection } from "@/components/TikTokSection";
import { Pattern } from "@/components/Visual";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { slugify } from "@/lib/slug";
import Image from "next/image";
import { getFabrics, getHeroSlides, getModels } from "@/lib/catalog";
import { modelCategories, type PatternKey } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

const mono = ["#0d0d0d", "#5a5a5a", "#d9d9d9"] as [string, string, string];

const categoryTiles: { label: string; href: string; pattern: PatternKey; image?: string; position?: string }[] = [
  { label: modelCategories[1], href: `/creations?categorie=${slugify(modelCategories[1])}`, pattern: "stripes", image: "/images/stock/agbada-bordeaux.jpg" },
  { label: modelCategories[3], href: `/creations?categorie=${slugify(modelCategories[3])}`, pattern: "diamonds", image: "/images/couple-ceremonie-or.jpg" },
  { label: modelCategories[0], href: `/creations?categorie=${slugify(modelCategories[0])}`, pattern: "circles", image: "/images/stock/categories/femme.jpg", position: "center 15%" },
  { label: modelCategories[2], href: `/creations?categorie=${slugify(modelCategories[2])}`, pattern: "leaves", image: "/images/stock/categories/enfant.jpg", position: "center 40%" },
  { label: "Good Luck & Wax", href: `/pagnes?type=${slugify("Good Luck")}`, pattern: "waves", image: "/images/stock/categories/good-luck-wax.jpg", position: "center 15%" },
  { label: "Bazin & Dentelle", href: `/pagnes?type=${slugify("Bazin")}`, pattern: "squares", image: "/images/stock/categories/bazin-dentelle.jpg", position: "center 45%" },
];

/** Bandeau d'atouts sous le hero : prolonge la promesse « sur mesure, sans attendre ». */
const perks: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Sur mesure",
    text: "Coupé à vos mesures, à l'atelier ou à distance.",
    icon: <path d="M3 17 17 3l4 4L7 21H3v-4ZM14 6l4 4M11 9l2 2M8 12l2 2" />,
  },
  {
    title: "Tissus de qualité",
    text: "Bazin, wax, Good Luck, dentelle, aso-oke.",
    icon: <path d="M4 5h16v14H4zM4 10h16M4 15h16M9 5v14M15 5v14" />,
  },
  {
    title: "Délais courts",
    text: "Votre tenue prête en un temps record.",
    icon: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></>,
  },
  {
    title: "Commande WhatsApp",
    text: "Sans compte à créer, réponse rapide.",
    icon: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Z" />,
  },
];

const steps = [
  ["Choisissez", "Une de nos créations et/ou un tissu de la boutique."],
  ["Envoyez", "Votre panier part sur WhatsApp en un clic."],
  ["Mesures", "Prise de mesures à l'atelier ou à distance."],
  ["Recevez", "Retrait à l'atelier ou livraison."],
];

export default async function Home() {
  const [models, fabrics, slides] = await Promise.all([getModels(), getFabrics(), getHeroSlides()]);
  const featuredModels = models.filter((m) => m.tag).slice(0, 4);
  const featuredFabrics = fabrics.filter((f) => f.tag).slice(0, 4);

  return (
    <>
      <HeroCarousel slides={slides} />
      <VideoBand />

      {/* ATOUTS */}
      <section className="border-b border-line">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 lg:grid-cols-4">
          {perks.map((p) => (
            <li key={p.title} className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-[#b8913f]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {p.icon}
              </svg>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider">{p.title}</p>
                <p className="mt-0.5 text-sm text-ink/60">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CATÉGORIES */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="section-title">Catégories phares</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {categoryTiles.map((c) => (
            <Link key={c.label} href={c.href} className="group relative block aspect-[4/3] overflow-hidden rounded">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                {c.image ? (
                  <Image src={c.image} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" style={{ objectPosition: c.position ?? "center 20%" }} className="object-cover" />
                ) : (
                  <Pattern pattern={c.pattern} colors={mono} uid={`cat-${c.pattern}`} />
                )}
              </div>
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white">
                <span className="text-base font-bold uppercase tracking-wider md:text-lg">{c.label}</span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80 group-hover:text-white">
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CRÉATIONS */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">Nos créations</h2>
          <Link href="/creations" className="text-link shrink-0">Tout voir</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredModels.map((m) => <ModelCard key={m.id} model={m} />)}
        </div>
      </section>

      {/* VIDÉOS TIKTOK */}
      <TikTokSection />

      {/* PAGNES */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">Pagnes & tissus</h2>
          <Link href="/pagnes" className="text-link shrink-0">Toute la boutique</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredFabrics.map((f) => <FabricCard key={f.id} fabric={f} />)}
        </div>
      </section>

      {/* LA MARQUE */}
      <section className="mt-16 bg-ink text-white">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[480px]">
            <Image src="/images/stock/aso-oke-indigo.jpg" alt="Agbada en aso-oke indigo" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[center_20%]" />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 md:px-12">
            <h2 className="section-title">La maison</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
              {site.name} habille vos grands moments : mesures prises à l&apos;atelier, coupes soignées
              et tissus choisis avec vous, dans nos deux ateliers de Parakou.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ghost-light">Nos ateliers</Link>
              <a
                href={whatsappLink("Bonjour M2 Dressing, j'aimerais commander une tenue.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                <WhatsAppIcon className="h-4 w-4" /> Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT COMMANDER */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="section-title">Comment commander</h2>
        <ol className="mt-6 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-white p-6">
              <span className="text-sm font-bold text-ink/40">{i + 1}</span>
              <p className="mt-2 font-bold uppercase tracking-wider">{t}</p>
              <p className="mt-1 text-sm text-ink/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

    </>
  );
}
