import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Mon panier",
  robots: { index: false },
};

export default function PanierPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
      <h1 className="section-title">Mon panier</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
