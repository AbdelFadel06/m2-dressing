"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";
import { useSettings, useWhatsApp } from "./SettingsProvider";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/creations", label: "Nos créations" },
  { href: "/pagnes", label: "Pagnes & tissus" },
  { href: "/contact", label: "Ateliers & contact" },
];

const GOLD = "#e3cc85";
const iconBtn =
  "relative flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#e3cc85]";

export function Header() {
  const settings = useSettings();
  const wa = useWhatsApp();
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name}, accueil`}>
            <Image src="/images/logo-embleme-or.png" alt="" width={147} height={186} priority className="h-9 w-auto" />
            <span className="text-gold-metal text-[15px] font-extrabold uppercase tracking-[0.12em]">{site.name}</span>
          </Link>

          <div className="flex items-center gap-8">
          {/* Liens (ordinateur), alignés à droite */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[0.8rem] font-medium uppercase tracking-wider transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                    active
                      ? "text-[#e3cc85] after:scale-x-100 after:bg-[#e3cc85]"
                      : "text-white after:scale-x-0 after:bg-white hover:after:scale-x-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Panier + menu mobile */}
          <div className="flex items-center gap-1">
            <Link href="/panier" onClick={() => setOpen(false)} className={iconBtn} aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
              </svg>
              {count > 0 && (
                <span
                  className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-ink"
                  style={{ background: GOLD }}
                >
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative ml-1 h-10 w-10 lg:hidden"
            >
              <span className={`absolute left-2 h-px w-6 bg-white transition-all duration-300 ${open ? "top-[19px] rotate-45" : "top-[15px]"}`} />
              <span className={`absolute left-2 h-px w-6 bg-white transition-all duration-300 ${open ? "top-[19px] -rotate-45" : "top-[24px]"}`} />
            </button>
          </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          id="menu-mobile"
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden" inert={!open}>
            <nav aria-label="Menu mobile" className="border-t border-white/10 px-4 pb-5">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="block border-b border-white/10 py-4 text-xl"
                  >
                    <span
                      className={`underline-offset-[6px] decoration-1 ${
                        active ? "text-[#e3cc85] underline decoration-[#e3cc85]" : "text-white"
                      }`}
                    >
                      {l.label}
                    </span>
                  </Link>
                );
              })}
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm text-white/70 hover:text-white">
                WhatsApp {settings.phoneDisplay}
              </a>
            </nav>
          </div>
        </div>
      </header>

    </>
  );
}
