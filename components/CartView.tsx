"use client";

import Link from "next/link";
import { useState } from "react";
import { cartActions, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/site";
import { useSettings, useWhatsApp } from "./SettingsProvider";
import { Visual } from "./Visual";
import { WhatsAppIcon } from "./WhatsAppButton";

const deliveryOptions = [
  "Retrait à l'atelier 1 (Parakou)",
  "Retrait à l'atelier 2 (Parakou)",
  "Livraison à Parakou",
  "Expédition vers une autre ville",
];

export function CartView() {
  const settings = useSettings();
  const wa = useWhatsApp();
  const { lines, count, total } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState(deliveryOptions[0]);
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="rounded border border-dashed border-line bg-white px-6 py-16 text-center">
        <p className="text-xl font-bold uppercase tracking-wider">Votre panier est vide</p>
        <p className="mt-2 text-ink/60">Choisissez une création ou un tissu pour commencer.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/creations" className="btn btn-dark">
            Voir nos créations
          </Link>
          <Link href="/pagnes" className="btn btn-outline">
            Voir les pagnes
          </Link>
        </div>
      </div>
    );
  }

  const valid = name.trim().length > 1 && phone.trim().length >= 8;

  const buildMessage = () => {
    const items = lines
      .map(
        (l, i) =>
          `${i + 1}. ${l.name}${l.option ? ` — ${l.option}` : ""} × ${l.qty} = ${formatPrice(l.qty * l.unitPrice)}`,
      )
      .join("\n");
    return [
      `Bonjour ${settings.name} 👋`,
      "Je souhaite passer la commande suivante :",
      "",
      items,
      "",
      `Total estimé : ${formatPrice(total)}`,
      "",
      `Nom : ${name.trim()}`,
      `Téléphone : ${phone.trim()}`,
      `Réception : ${delivery}`,
      notes.trim() ? `Remarques : ${notes.trim()}` : "",
      "",
      "Merci de me confirmer le prix final et les délais.",
    ]
      .filter((x, i, arr) => !(x === "" && arr[i - 1] === ""))
      .join("\n");
  };

  const send = () => {
    setTouched(true);
    if (!valid) return;
    window.open(wa(buildMessage()), "_blank", "noopener,noreferrer");
  };

  const input = "mt-1 w-full rounded border border-line bg-white px-3 py-2.5 text-sm";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <ul className="space-y-4">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-4 rounded border border-line bg-white p-3">
            <div className="w-24 shrink-0 overflow-hidden rounded">
              <Visual id={`cart-${l.key}`} name={l.name} pattern={l.pattern} colors={l.colors} image={l.image} className="aspect-square" sizes="96px" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{l.name}</p>
                  <p className="text-xs text-ink/50">
                    {l.kind === "model" ? `Formule : ${l.option}` : l.option}
                  </p>
                </div>
                <button onClick={() => cartActions.remove(l.key)} className="text-xs text-ink/50 underline hover:text-ink">
                  Retirer
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center border border-line">
                  <button onClick={() => cartActions.setQty(l.key, l.qty - 1)} className="h-8 w-8" aria-label="Diminuer">−</button>
                  <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                  <button onClick={() => cartActions.setQty(l.key, l.qty + 1)} className="h-8 w-8" aria-label="Augmenter">+</button>
                </div>
                <p className="text-sm font-bold">{formatPrice(l.qty * l.unitPrice)}</p>
              </div>
            </div>
          </li>
        ))}
        <li>
          <button onClick={() => cartActions.clear()} className="text-sm text-ink/50 underline hover:text-ink">
            Vider le panier
          </button>
        </li>
      </ul>

      <aside className="h-fit rounded border border-line bg-white p-5 lg:sticky lg:top-24">
        <h2 className="text-base font-bold uppercase tracking-wider">Finaliser ma commande</h2>
        <p className="mt-1 text-sm text-ink/60">
          {count} article{count > 1 ? "s" : ""} · Total estimé{" "}
          <strong className="text-ink">{formatPrice(total)}</strong>
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-ink/60" htmlFor="c-name">Votre nom *</label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className={input} autoComplete="name" />
            {touched && name.trim().length < 2 && <p className="mt-1 text-xs font-medium text-red-700">Indiquez votre nom.</p>}
          </div>
          <div>
            <label className="text-xs font-medium text-ink/60" htmlFor="c-phone">Téléphone *</label>
            <input id="c-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} inputMode="tel" autoComplete="tel" placeholder="+229 …" />
            {touched && phone.trim().length < 8 && <p className="mt-1 text-xs font-medium text-red-700">Indiquez un numéro valide.</p>}
          </div>
          <div>
            <label className="text-xs font-medium text-ink/60" htmlFor="c-delivery">Réception</label>
            <select id="c-delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)} className={input}>
              {deliveryOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-ink/60" htmlFor="c-notes">Remarques (mesures, couleur, date souhaitée…)</label>
            <textarea id="c-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={input} />
          </div>
        </div>

        <button
          onClick={send}
          className="btn btn-dark mt-5 w-full"
        >
          <WhatsAppIcon /> Envoyer ma commande sur WhatsApp
        </button>
        <p className="mt-3 text-xs leading-relaxed text-ink/50">
          Aucun paiement en ligne : votre commande est envoyée par WhatsApp, puis M2 Dressing confirme le prix final, les mesures et les délais avec vous.
        </p>
      </aside>
    </div>
  );
}
