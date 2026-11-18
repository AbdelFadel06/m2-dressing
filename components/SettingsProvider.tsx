"use client";

import { createContext, useContext } from "react";
import { defaultSettings, whatsappLink, type Settings } from "@/lib/settings";

const SettingsContext = createContext<Settings>(defaultSettings);

/** Transmet les réglages (lus dans Sanity par la mise en page) aux composants interactifs. */
export function SettingsProvider({ value, children }: { value: Settings; children: React.ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

/** Lien WhatsApp vers le numéro réglé dans Sanity. */
export function useWhatsApp() {
  const { whatsapp } = useSettings();
  return (message?: string) => whatsappLink(whatsapp, message);
}
