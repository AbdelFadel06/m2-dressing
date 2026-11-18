import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

/*
 * Page 404 « Fil perdu » : une aiguille dorée dont le fil s'échappe et dessine « 404 »
 * (le 0 est une boucle du fil), puis descend vers les boutons.
 * Le fil se « coud » de gauche à droite au chargement (classe .thread, voir globals.css).
 */
const THREAD = [
  "M 86 56",
  // petite boucle à la sortie de l'aiguille
  "C 118 34, 152 54, 146 80 C 141 100, 112 98, 116 78 C 121 52, 196 32, 240 62",
  // premier 4 : diagonale, barre aux angles adoucis, boucle en bas, jambage qui remonte
  "L 158 176 Q 150 186 164 186 L 286 186",
  "C 304 188, 290 238, 258 252 C 236 262, 222 244, 236 236 C 240 233, 240 228, 240 220 L 240 62",
  // arabesque vers le 0, puis une boucle complète du fil
  "C 268 30, 330 18, 372 38 C 392 48, 404 58, 410 66",
  "C 372 66, 350 110, 350 160 C 350 214, 376 254, 410 254 C 448 254, 470 214, 470 160 C 470 106, 450 70, 418 66",
  // petite boucle au-dessus, vers le second 4
  "C 452 50, 470 20, 500 28 C 524 34, 516 62, 498 56 C 486 52, 520 30, 604 62",
  "L 522 176 Q 514 186 528 186 L 650 186",
  "C 668 188, 654 238, 622 252 C 600 262, 586 244, 600 236 C 604 233, 604 228, 604 220 L 604 62",
  // le fil retombe en arabesque vers les boutons
  "C 652 22, 718 96, 702 170 C 692 216, 716 262, 748 258 C 772 254, 770 228, 752 232",
].join(" ");

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
      <svg
        viewBox="0 0 800 320"
        className="w-full max-w-2xl"
        role="img"
        aria-label="Une aiguille dorée dont le fil dessine le nombre 404"
      >
        {/* aiguille */}
        <g transform="rotate(-45 60 80)">
          <rect x="22" y="77.5" width="92" height="5" rx="2.5" className="fill-gold" />
          <path d="M 114 77.5 L 134 80 L 114 82.5 Z" className="fill-gold" />
          <rect x="28" y="79" width="12" height="2" rx="1" fill="#fff" />
        </g>
        {/* surpiqûre dorée qui apparaît une fois le fil cousu */}
        <path d={THREAD} fill="none" stroke="#c99a45" strokeWidth="1.2" strokeDasharray="2 6" strokeLinecap="round" transform="translate(0 6)" className="thread-stitch" />
        {/* le fil */}
        <path d={THREAD} fill="none" stroke="#6b3a26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="thread" pathLength={1} />
        {/* nœud au bout du fil */}
        <circle cx="752" cy="232" r="3.6" fill="#6b3a26" className="thread-knot" />
      </svg>

      <p className="eyebrow mt-6">Erreur 404</p>
      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight">Oups, nous avons perdu le fil</h1>
      <p className="mt-4 max-w-md text-ink/70">
        Cette page s&apos;est décousue : le lien est ancien ou la création a été retirée. Reprenons depuis le début.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-dark">Retour à l&apos;accueil</Link>
        <Link href="/creations" className="btn btn-outline">Voir nos créations</Link>
      </div>
    </section>
  );
}
