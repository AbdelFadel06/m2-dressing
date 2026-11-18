"use client";

import { useState } from "react";
import { cartActions } from "@/lib/cart";
import type { Fabric, Model } from "@/lib/products";
import { formatPrice, whatsappLink } from "@/lib/site";
import { Visual } from "./Visual";
import { WhatsAppIcon } from "./WhatsAppButton";

const sizes = ["Sur mesure", "S", "M", "L", "XL", "XXL"];

/*
 * Toutes les cartes partagent la même grille verticale, avec des hauteurs réservées,
 * pour que les éléments restent alignés d'une carte à l'autre quelle que soit
 * la longueur des textes :
 *   catégorie (1 ligne) · titre (2 lignes) · détail (2 lignes) · prix (1 ligne)
 *   puis, collés en bas : choix (40 px) et boutons (40 px).
 */
const ui = {
  body: "flex flex-1 flex-col p-3",
  eyebrow: "truncate text-[10px] font-semibold uppercase tracking-widest text-ink/50",
  title: "mt-1 line-clamp-2 min-h-[2.75em] text-sm leading-snug md:text-[0.95rem]",
  detail: "mt-1 line-clamp-2 min-h-[2.75em] text-xs leading-snug text-ink/55",
  price: "mt-2 truncate whitespace-nowrap text-sm",
  bottom: "mt-auto space-y-2 pt-3",
  control: "h-10 w-full rounded-none border border-line bg-white text-sm",
  actions: "flex h-10 gap-2",
  add: "h-full min-w-0 flex-1 truncate border-2 border-ink bg-ink px-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink",
  wa: "flex h-full w-10 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white",
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-2 top-2 z-10 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
      {children}
    </span>
  );
}

function useAddedFlash() {
  const [added, setAdded] = useState(false);
  const flash = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  return [added, flash] as const;
}

function Media({ children, tag }: { children: React.ReactNode; tag?: string }) {
  return (
    <div className="relative overflow-hidden">
      {tag && <Tag>{tag}</Tag>}
      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none">
        {children}
      </div>
    </div>
  );
}

function Actions({ onAdd, added, waHref, waLabel }: { onAdd: () => void; added: boolean; waHref: string; waLabel: string }) {
  return (
    <div className={ui.actions}>
      <button onClick={onAdd} className={ui.add} aria-live="polite">
        {added ? "Ajouté ✓" : "Ajouter"}
      </button>
      <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label={waLabel} className={ui.wa}>
        <WhatsAppIcon className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}

export function ModelCard({ model }: { model: Model }) {
  const [size, setSize] = useState(sizes[0]);
  const [added, flash] = useAddedFlash();

  const add = () => {
    cartActions.add({
      kind: "model",
      id: model.id,
      name: model.name,
      unitPrice: model.price,
      option: size,
      pattern: model.pattern,
      colors: model.colors,
      image: model.image,
    });
    flash();
  };

  return (
    <article id={model.id} className="product-card group flex h-full scroll-mt-24 flex-col">
      <Media tag={model.tag}>
        <Visual id={model.id} name={model.name} pattern={model.pattern} colors={model.colors} image={model.image} video={model.video} position={model.position} className="aspect-[3/4]" />
      </Media>

      <div className={ui.body}>
        <p className={ui.eyebrow}>{model.category}</p>
        <h3 className={ui.title} title={model.name}>{model.name}</h3>
        <p className={`${ui.detail} hidden md:block`}>{model.description}</p>
        <p className={ui.price}>
          <span className="text-ink/50"><span className="sm:hidden">Dès </span><span className="hidden sm:inline">À partir de </span></span>
          <span className="font-bold">{formatPrice(model.price)}</span>
        </p>

        <div className={ui.bottom}>
          <label className="sr-only" htmlFor={`size-${model.id}`}>Taille</label>
          <select id={`size-${model.id}`} value={size} onChange={(e) => setSize(e.target.value)} className={`${ui.control} px-2`}>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s === "Sur mesure" ? "Sur mesure" : `Taille ${s}`}
              </option>
            ))}
          </select>
          <Actions
            onAdd={add}
            added={added}
            waHref={whatsappLink(`Bonjour M2 Dressing, je suis intéressé(e) par la création « ${model.name} » (${model.category}). Pouvez-vous me donner plus d'infos ?`)}
            waLabel={`Demander « ${model.name} » sur WhatsApp`}
          />
        </div>
      </div>
    </article>
  );
}

export function FabricCard({ fabric }: { fabric: Fabric }) {
  const [qty, setQty] = useState(1);
  const [added, flash] = useAddedFlash();

  const add = () => {
    cartActions.add(
      {
        kind: "fabric",
        id: fabric.id,
        name: fabric.name,
        unitPrice: fabric.price,
        option: fabric.unit,
        pattern: fabric.pattern,
        colors: fabric.colors,
        image: fabric.image,
      },
      qty,
    );
    flash();
    setQty(1);
  };

  return (
    <article id={fabric.id} className="product-card group flex h-full scroll-mt-24 flex-col">
      <Media tag={fabric.tag}>
        <Visual id={fabric.id} name={fabric.name} pattern={fabric.pattern} colors={fabric.colors} image={fabric.image} video={fabric.video} position={fabric.position} className="aspect-square" />
      </Media>

      <div className={ui.body}>
        <p className={ui.eyebrow}>{fabric.type}</p>
        <h3 className={ui.title} title={fabric.name}>{fabric.name}</h3>
        <p className="mt-1 truncate text-xs leading-snug text-ink/55">Vendu par {fabric.unit}</p>
        <p className={`${ui.price} font-bold`}>{formatPrice(fabric.price)}</p>

        <div className={ui.bottom}>
          <div className={`${ui.control} flex items-center justify-between`} role="group" aria-label="Quantité">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-10 text-lg hover:bg-ink/5" aria-label="Diminuer la quantité">−</button>
            <span className="text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="h-full w-10 text-lg hover:bg-ink/5" aria-label="Augmenter la quantité">+</button>
          </div>
          <Actions
            onAdd={add}
            added={added}
            waHref={whatsappLink(`Bonjour M2 Dressing, le tissu « ${fabric.name} » (${fabric.type}) est-il disponible ?`)}
            waLabel={`Demander « ${fabric.name} » sur WhatsApp`}
          />
        </div>
      </div>
    </article>
  );
}
