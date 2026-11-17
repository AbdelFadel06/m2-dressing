"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  fabricTypes,
  modelCategories,
  type Fabric,
  type FabricType,
  type Model,
  type ModelCategory,
} from "@/lib/products";
import { slugify } from "@/lib/slug";
import { FabricCard, ModelCard } from "./Cards";


function fromSlug<T extends string>(options: readonly T[], slug: string | null): T | "Tout" {
  return options.find((o) => slugify(o) === slug) ?? "Tout";
}

function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T | "Tout";
  onChange?: (v: T | "Tout") => void;
}) {
  const all: (T | "Tout")[] = ["Tout", ...options];
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filtres">
      {all.map((o) => (
        <button
          key={o}
          onClick={() => onChange?.(o)}
          aria-pressed={value === o}
          className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
            value === o
              ? "border-ink bg-ink text-white"
              : "border-line bg-white hover:border-ink hover:bg-ink hover:text-white"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Garde le filtre dans l'adresse (?categorie=homme) : partageable, et le bouton retour fonctionne. */
function useUrlFilter<T extends string>(param: string, options: readonly T[]) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = fromSlug(options, params.get(param));
  const setValue = (v: T | "Tout") => {
    const next = new URLSearchParams(params);
    if (v === "Tout") next.delete(param);
    else next.set(param, slugify(v));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  return [value, setValue] as const;
}

const grid = "mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4";

function ModelsView({ models, cat, onChange }: { models: Model[]; cat: ModelCategory | "Tout"; onChange?: (v: ModelCategory | "Tout") => void }) {
  const list = cat === "Tout" ? models : models.filter((m) => m.category === cat);
  return (
    <div>
      <Chips options={modelCategories} value={cat} onChange={onChange} />
      <p className="mt-4 text-sm text-ink/50" aria-live="polite">{list.length} création{list.length > 1 ? "s" : ""}</p>
      {list.length > 0 ? (
        <div className={grid}>
          {list.map((m) => <ModelCard key={m.id} model={m} />)}
        </div>
      ) : (
        <p className="mt-6 border border-dashed border-line px-6 py-12 text-center text-ink/60">
          Pas encore de photo dans cette catégorie. Décrivez-nous la tenue souhaitée sur WhatsApp, nous la cousons sur mesure.
        </p>
      )}
    </div>
  );
}

function FabricsView({ fabrics, type, onChange }: { fabrics: Fabric[]; type: FabricType | "Tout"; onChange?: (v: FabricType | "Tout") => void }) {
  const list = type === "Tout" ? fabrics : fabrics.filter((f) => f.type === type);
  return (
    <div>
      <Chips options={fabricTypes} value={type} onChange={onChange} />
      <p className="mt-4 text-sm text-ink/50" aria-live="polite">{list.length} tissu{list.length > 1 ? "s" : ""}</p>
      <div className={grid}>
        {list.map((f) => <FabricCard key={f.id} fabric={f} />)}
      </div>
    </div>
  );
}

export function ModelsCatalog({ models }: { models: Model[] }) {
  const [cat, setCat] = useUrlFilter("categorie", modelCategories);
  return <ModelsView models={models} cat={cat} onChange={setCat} />;
}

export function FabricsShop({ fabrics }: { fabrics: Fabric[] }) {
  const [type, setType] = useUrlFilter("type", fabricTypes);
  return <FabricsView fabrics={fabrics} type={type} onChange={setType} />;
}

/** Versions sans filtre, rendues dans le HTML initial avant lecture de l'adresse. */
export const ModelsCatalogStatic = ({ models }: { models: Model[] }) => <ModelsView models={models} cat="Tout" />;
export const FabricsShopStatic = ({ fabrics }: { fabrics: Fabric[] }) => <FabricsView fabrics={fabrics} type="Tout" />;
