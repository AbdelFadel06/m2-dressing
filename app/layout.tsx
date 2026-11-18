import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/components/SettingsProvider";
import { getSettings } from "@/lib/catalog";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Styliste à Parakou, Bénin`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Styliste à Parakou`,
    description: site.description,
    locale: "fr_BJ",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SettingsProvider value={settings}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <WhatsAppFloat number={settings.whatsapp} />
        </SettingsProvider>
      </body>
    </html>
  );
}
