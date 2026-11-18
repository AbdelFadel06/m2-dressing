import type { Metadata } from "next";
import { Suspense } from "react";
import { FabricsShop, FabricsShopStatic } from "@/components/Catalog";
import { getFabrics } from "@/lib/catalog";
import { fabricsJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pagnes Good Luck, wax hollandais, bazin riche et dentelle",
  description:
    "Boutique de pagnes à Parakou : Good Luck, wax hollandais, bazin riche et dentelle de qualité. Achetez le tissu seul ou faites-le coudre sur mesure par M2 Dressing.",
  alternates: { canonical: "/pagnes" },
};

export default async function PagnesPage() {
  const fabrics = await getFabrics();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
      <JsonLd data={fabricsJsonLd(fabrics)} />
      <h1 className="section-title">Pagnes & tissus</h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Des tissus de qualité pour toutes vos occasions. Achetez le pagne seul ou demandez-nous de le coudre.
        Disponibilité confirmée sur WhatsApp.
      </p>
      <div className="mt-8">
        <Suspense fallback={<FabricsShopStatic fabrics={fabrics} />}>
          <FabricsShop fabrics={fabrics} />
        </Suspense>
      </div>
    </div>
  );
}
