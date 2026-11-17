import type { Metadata } from "next";
import { Suspense } from "react";
import { FabricsShop, FabricsShopStatic } from "@/components/Catalog";
import { getFabrics } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Boutique de pagnes & tissus",
  description: "Good Luck, wax, bazin et dentelle de qualité, disponibles dans les ateliers M2 Dressing à Parakou.",
};

export default async function PagnesPage() {
  const fabrics = await getFabrics();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
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
