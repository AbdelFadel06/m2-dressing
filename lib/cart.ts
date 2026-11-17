"use client";

import { useSyncExternalStore } from "react";
import type { Colors, PatternKey } from "./products";

/**
 * Panier 100 % côté navigateur (localStorage), sans backend.
 * Petit "store" externe branché avec useSyncExternalStore :
 * pas de décalage d'hydratation, et synchronisé entre les onglets.
 */

export type CartLine = {
  key: string; // id + option → une ligne par variante
  kind: "model" | "fabric";
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  option?: string; // taille, unité de vente...
  pattern: PatternKey;
  colors: Colors;
  image?: string;
};

const STORAGE_KEY = "m2-dressing-cart-v1";
const EMPTY: CartLine[] = [];

let cache: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: CartLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible (navigation privée...) : le panier reste en mémoire */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export const cartActions = {
  add(line: Omit<CartLine, "key" | "qty">, qty = 1) {
    const key = `${line.kind}:${line.id}:${line.option ?? ""}`;
    const current = read();
    const existing = current.find((l) => l.key === key);
    if (existing) {
      write(current.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)));
    } else {
      write([...current, { ...line, key, qty }]);
    }
  },
  setQty(key: string, qty: number) {
    if (qty <= 0) return cartActions.remove(key);
    write(read().map((l) => (l.key === key ? { ...l, qty } : l)));
  },
  remove(key: string) {
    write(read().filter((l) => l.key !== key));
  },
  clear() {
    write(EMPTY);
  },
};

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
  return { lines, count, total };
}
