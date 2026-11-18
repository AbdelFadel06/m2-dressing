import type { Metadata } from "next";
import { Suspense } from "react";
import { ModelsCatalog, ModelsCatalogStatic } from "@/components/Catalog";
import { getModels } from "@/lib/catalog";
import { JsonLd, modelsJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tenues traditionnelles sur mesure homme, femme, enfant",
  description:
    "Agbada, grand boubou brodé, aso-oke, tenues de mariage, couples et familles : les créations M2 Dressing, cousues sur mesure à Parakou (Bénin). Tissu fourni ou apportez le vôtre.",
  alternates: { canonical: "/creations" },
};

export default async function CreationsPage() {
  const models = await getModels();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
      <JsonLd data={modelsJsonLd(models)} />
      <h1 className="section-title">Nos créations</h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Choisissez une création et sa formule, ajoutez-la au panier puis envoyez votre commande sur WhatsApp.
        « Tout fourni » : nous fournissons le tissu et la couture. « Mon tissu » : vous apportez votre tissu
        et ne payez que la couture. Vos mesures sont prises à l&apos;atelier ou à distance.
      </p>
      <div className="mt-8">
        <Suspense fallback={<ModelsCatalogStatic models={models} />}>
          <ModelsCatalog models={models} />
        </Suspense>
      </div>
    </div>
  );
}
