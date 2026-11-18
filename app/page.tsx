import Image from "next/image";
import Link from "next/link";
import { FabricCard, ModelCard } from "@/components/Cards";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { TikTokSection } from "@/components/TikTokSection";
import { VideoBand } from "@/components/VideoBand";
import { Pattern } from "@/components/Visual";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { getFabrics, getHeroSlides, getModels, getReviews, type Review } from "@/lib/catalog";
import { modelCategories, type PatternKey } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { slugify } from "@/lib/slug";

/*
 * Page d'accueil — parcours du visiteur :
 *   découvrir (carrousel, promesses, la maison) → choisir (catégories, créations, formules, tissus)
 *   → être rassuré (comment commander, avis, vidéo) → nous contacter.
 */

const mono = ["#0d0d0d", "#5a5a5a", "#d9d9d9"] as [string, string, string];

const categoryTiles: { label: string; href: string; pattern: PatternKey; image?: string; position?: string }[] = [
  { label: modelCategories[1], href: `/creations?categorie=${slugify(modelCategories[1])}`, pattern: "stripes", image: "/images/stock/agbada-bordeaux.jpg" },
  { label: modelCategories[3], href: `/creations?categorie=${slugify(modelCategories[3])}`, pattern: "diamonds", image: "/images/couple-ceremonie-or.jpg" },
  { label: modelCategories[0], href: `/creations?categorie=${slugify(modelCategories[0])}`, pattern: "circles", image: "/images/stock/categories/femme.jpg", position: "center 15%" },
  { label: modelCategories[2], href: `/creations?categorie=${slugify(modelCategories[2])}`, pattern: "leaves", image: "/images/stock/categories/enfant.jpg", position: "center 40%" },
  { label: "Good Luck & Wax", href: `/pagnes?type=${slugify("Good Luck")}`, pattern: "waves", image: "/images/stock/categories/good-luck-wax.jpg", position: "center 15%" },
  { label: "Bazin & Dentelle", href: `/pagnes?type=${slugify("Bazin")}`, pattern: "squares", image: "/images/stock/categories/bazin-dentelle.jpg", position: "center 45%" },
];

const perks: { title: string; text: string; icon: React.ReactNode }[] = [
  { title: "Sur mesure", text: "Coupé à vos mesures, à l'atelier ou à distance.", icon: <path d="M3 17 17 3l4 4L7 21H3v-4ZM14 6l4 4M11 9l2 2M8 12l2 2" /> },
  { title: "Tissus de qualité", text: "Bazin, wax, Good Luck, dentelle, aso-oke.", icon: <path d="M4 5h16v14H4zM4 10h16M4 15h16M9 5v14M15 5v14" /> },
  { title: "Délais courts", text: "Votre tenue prête en un temps record.", icon: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></> },
  { title: "Commande WhatsApp", text: "Sans compte à créer, réponse rapide.", icon: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Z" /> },
];

/** Blocs « la maison » : photo d'un côté, texte de l'autre, en alternance. */
const story = [
  {
    eyebrow: "Notre savoir-faire",
    title: "Des coupes soignées, pensées pour vous",
    text: "Chaque tenue est coupée et cousue à vos mesures dans nos ateliers de Parakou. Broderies, finitions, tombé du tissu : rien n'est laissé au hasard pour que vous soyez élégant le jour J.",
    image: "/images/stock/aso-oke-indigo.jpg",
    alt: "Agbada en aso-oke indigo",
  },
  {
    eyebrow: "Nos tissus",
    title: "Des tissus choisis avec vous",
    text: "Bazin riche, wax hollandais, Good Luck, dentelle : choisissez votre tissu dans notre boutique, ou apportez le vôtre. Nous vous conseillons la matière et la couleur qui vous mettront en valeur.",
    image: "/images/stock/categories/bazin-dentelle.jpg",
    alt: "Rouleau de dentelle rouge",
  },
];

const formulas = [
  {
    name: "Tout compris",
    pitch: "Vous choisissez, on s'occupe de tout.",
    points: ["Le tissu, choisi dans notre boutique", "La couture sur mesure", "Les conseils du styliste"],
    cta: "Choisir une création",
    href: "/creations",
  },
  {
    name: "J'apporte mon tissu",
    pitch: "Vous avez déjà votre pagne ? Ne payez que la couture.",
    points: ["Vous déposez ou envoyez votre tissu", "On vous indique la quantité nécessaire", "La couture sur mesure"],
    cta: "Demander un devis",
    href: whatsappLink("Bonjour M2 Dressing, j'ai mon tissu et j'aimerais faire coudre une tenue."),
  },
];

const steps = [
  ["Choisissez", "Une création, et un tissu de la boutique ou le vôtre."],
  ["Envoyez", "Votre panier part sur WhatsApp en un clic."],
  ["Mesures", "Prise de mesures à l'atelier ou à distance."],
  ["Recevez", "Retrait à l'atelier ou livraison."],
];

function SectionHead({ eyebrow, title, link }: { eyebrow?: string; title: string; link?: { href: string; label: string } }) {
  return (
    <Reveal className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {link && <Link href={link.href} className="text-link shrink-0">{link.label}</Link>}
    </Reveal>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <p className="text-gold" aria-label={`${n} sur 5`}>
      {"★★★★★".slice(0, n)}
      <span className="text-line">{"★★★★★".slice(n)}</span>
    </p>
  );
}

function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="bg-gold-soft py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Ils nous font confiance" title="Avis clients" />
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 100} className="w-[82%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col rounded bg-white p-6 shadow-sm">
                <Stars n={r.rating} />
                <blockquote className="mt-3 flex-1 leading-relaxed text-ink/80">« {r.text} »</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {r.image && (
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Image src={r.image} alt="" fill sizes="44px" className="object-cover" style={{ objectPosition: r.position }} />
                    </span>
                  )}
                  <span>
                    <span className="block font-bold">{r.name}</span>
                    <span className="text-sm text-ink/55">{[r.outfit, r.city].filter(Boolean).join(" · ")}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function Home() {
  const [models, fabrics, slides, reviews] = await Promise.all([getModels(), getFabrics(), getHeroSlides(), getReviews()]);
  const featuredModels = models.filter((m) => m.tag).slice(0, 4);
  const featuredFabrics = fabrics.filter((f) => f.tag).slice(0, 4);

  return (
    <>
      <HeroCarousel slides={slides} />
      <VideoBand />

      {/* 1. PROMESSES */}
      <section className="border-b border-line">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {p.icon}
              </svg>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider">{p.title}</p>
                <p className="mt-0.5 text-sm text-ink/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 2. LA MAISON : photo / texte en alternance */}
      <section className="mx-auto max-w-6xl space-y-16 px-4 pt-16 md:space-y-24 md:pt-24">
        {story.map((b, i) => (
          <div key={b.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <Reveal className={`relative aspect-[4/5] overflow-hidden rounded md:aspect-[5/6] ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={b.image} alt={b.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[center_25%]" />
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">{b.eyebrow}</p>
              <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight">{b.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{b.text}</p>
              {i === 0 ? (
                <Link href="/contact" className="text-link mt-7 inline-block">Nos ateliers</Link>
              ) : (
                <Link href="/pagnes" className="text-link mt-7 inline-block">Voir les tissus</Link>
              )}
            </Reveal>
          </div>
        ))}
      </section>

      {/* 3. CATÉGORIES */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHead eyebrow="Pour chaque occasion" title="Catégories phares" />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {categoryTiles.map((c, i) => (
            <Reveal key={c.label} delay={(i % 3) * 90}>
              <Link href={c.href} className="group relative block aspect-[4/3] overflow-hidden rounded">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  {c.image ? (
                    <Image src={c.image} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" style={{ objectPosition: c.position ?? "center 20%" }} className="object-cover" />
                  ) : (
                    <Pattern pattern={c.pattern} colors={mono} uid={`cat-${c.pattern}`} />
                  )}
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-ink-deep/80 via-ink-deep/20 to-transparent p-4 text-white">
                  <span className="text-base font-bold uppercase tracking-wider md:text-lg">{c.label}</span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80 group-hover:text-white">Découvrir</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. CRÉATIONS */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHead eyebrow="Fait main à Parakou" title="Nos créations" link={{ href: "/creations", label: "Tout voir" }} />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredModels.map((m, i) => (
            <Reveal key={m.id} delay={i * 90} className="h-full">
              <ModelCard model={m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. DEUX FORMULES */}
      <section className="mt-16 bg-ink py-16 text-white md:mt-24 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="eyebrow">Deux façons de commander</p>
            <h2 className="section-title mt-2 [&::after]:mx-auto">Nos formules</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {formulas.map((f, i) => (
              <Reveal key={f.name} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded border border-white/15 p-7 md:p-9">
                  <p className="text-xl font-bold uppercase tracking-wider">{f.name}</p>
                  <p className="mt-2 text-white/70">{f.pitch}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    {f.href.startsWith("/") ? (
                      <Link href={f.href} className="btn btn-light">{f.cta}</Link>
                    ) : (
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                        <WhatsAppIcon className="h-4 w-4" /> {f.cta}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PAGNES */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHead eyebrow="La boutique" title="Pagnes & tissus" link={{ href: "/pagnes", label: "Toute la boutique" }} />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredFabrics.map((f, i) => (
            <Reveal key={f.id} delay={i * 90} className="h-full">
              <FabricCard fabric={f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. COMMENT COMMANDER */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHead eyebrow="Simple et rapide" title="Comment commander" />
        <ol className="mt-8 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 120} className="bg-white p-6">
              <span className="text-3xl font-extrabold text-gold">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-bold uppercase tracking-wider">{t}</p>
              <p className="mt-1 text-sm text-ink/60">{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 8. AVIS CLIENTS : affichés seulement quand de vrais avis sont saisis dans Sanity */}
      {reviews.length > 0 && <Reviews reviews={reviews} />}

      {/* 9. VIDÉO */}
      <TikTokSection />

      {/* 10. CONTACT */}
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_1fr] md:py-20">
          <Reveal>
            <p className="eyebrow">Parlons de votre tenue</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold leading-tight">
              Une question, une idée de tenue ? <span className="text-gold-metal">Écrivez-nous.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Réponse rapide sur WhatsApp. Envoyez une photo du modèle qui vous plaît, nous vous disons tout : tissu, prix et délai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Bonjour M2 Dressing, j'aimerais des informations.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-[#25D366] bg-[#25D366] text-white hover:bg-transparent"
              >
                <WhatsAppIcon className="h-4 w-4" /> {site.phoneDisplay}
              </a>
              <Link href="/contact" className="btn btn-ghost-light">Nos ateliers</Link>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {site.workshops.map((w, i) => (
              <Reveal as="li" key={w.name} delay={i * 120} className="rounded border border-white/15 p-6">
                <p className="font-bold uppercase tracking-wider">{w.name}</p>
                <p className="mt-1 text-white/70">{w.area}</p>
                <p className="mt-1 text-sm text-white/50">{w.hours}</p>
                <a href={w.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-4 inline-block text-white">
                  Itinéraire
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
