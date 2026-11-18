import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight">Cette page n&apos;existe pas</h1>
      <p className="mt-4 text-ink/70">
        Le lien est peut-être ancien, ou la création a été retirée. Découvrez nos autres tenues.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/creations" className="btn btn-dark">Nos créations</Link>
        <Link href="/" className="btn btn-outline">Accueil</Link>
      </div>
    </section>
  );
}
