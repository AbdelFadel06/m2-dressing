import type { Metadata } from "next";
import { Suspense } from "react";
import { ModelsCatalog, ModelsCatalogStatic } from "@/components/Catalog";
import { getModels } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Nos créations",
  description: "Robes, boubous, ensembles, tenues couple et famille : toutes les créations M2 Dressing, cousues sur mesure à Parakou.",
};

export default async function CreationsPage() {
  const models = await getModels();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
      <h1 className="section-title">Nos créations</h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Choisissez une création et sa taille, ajoutez-la au panier puis envoyez votre commande sur WhatsApp.
        Les prix sont « à partir de » (façon) et le prix final est confirmé selon le tissu et vos mesures.
      </p>
      <div className="mt-8">
        <Suspense fallback={<ModelsCatalogStatic models={models} />}>
          <ModelsCatalog models={models} />
        </Suspense>
      </div>
    </div>
  );
}
