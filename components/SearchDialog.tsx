"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { fabrics, models } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import { Visual } from "./Visual";

type Item = {
  id: string;
  name: string;
  group: string;
  price: number;
  href: string;
  image?: string;
  pattern: (typeof models)[number]["pattern"];
  colors: (typeof models)[number]["colors"];
  haystack: string;
};

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const items: Item[] = [
  ...models.map((m) => ({
    id: m.id,
    name: m.name,
    group: m.category,
    price: m.price,
    href: `/creations#${m.id}`,
    image: m.image,
    pattern: m.pattern,
    colors: m.colors,
    haystack: normalize(`${m.name} ${m.category} ${m.description}`),
  })),
  ...fabrics.map((f) => ({
    id: f.id,
    name: f.name,
    group: f.type,
    price: f.price,
    href: `/pagnes#${f.id}`,
    image: f.image,
    pattern: f.pattern,
    colors: f.colors,
    haystack: normalize(`${f.name} ${f.type} tissu pagne`),
  })),
];

const suggestions = ["Agbada", "Boubou", "Couple", "Good Luck", "Bazin", "Dentelle"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const words = normalize(q).split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return items.filter((it) => words.every((w) => it.haystack.includes(w))).slice(0, 8);
  }, [q]);

  if (!open) return null;

  const close = () => {
    setQ("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Recherche">
      <button className="absolute inset-0 bg-black/45" onClick={close} aria-label="Fermer la recherche" tabIndex={-1} />
      <div className="relative mx-3 mt-3 max-h-[calc(100svh-24px)] overflow-y-auto bg-white shadow-xl md:mx-auto md:mt-16 md:max-w-3xl">
        <div className="flex items-center gap-3 border-b border-ink/15 px-5">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une création, un tissu…"
            className="h-16 w-full bg-transparent text-xl outline-none placeholder:text-ink/35"
            aria-label="Rechercher"
          />
          <button onClick={close} className="text-sm font-medium text-ink/60 hover:text-ink">
            Fermer
          </button>
        </div>

        <div className="p-5">
          {q.trim() === "" ? (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="border border-ink/15 px-3 py-1.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="text-ink/60">
              Aucun résultat pour « {q} ». Essayez un autre mot, ou demandez-nous sur WhatsApp : nous cousons aussi sur demande.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {results.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} onClick={close} className="group block">
                    <div className="overflow-hidden">
                      <Visual
                        id={`search-${it.id}`}
                        name={it.name}
                        pattern={it.pattern}
                        colors={it.colors}
                        image={it.image}
                        className="aspect-[3/4] transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="200px"
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-ink/50">{it.group}</p>
                    <p className="text-sm leading-snug">{it.name}</p>
                    <p className="text-sm font-bold">{formatPrice(it.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
