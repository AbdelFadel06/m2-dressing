import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/components/SettingsProvider";
import { getSettings } from "@/lib/catalog";
import { businessJsonLd, JsonLd, keywords } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Styliste & tailleur à Parakou (Bénin) · Couture sur mesure`,
    template: `%s | ${site.name}, Parakou`,
  },
  description: site.description,
  keywords,
  applicationName: site.name,
  category: "Mode et couture",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    title: `${site.name} — Styliste & tailleur à Parakou`,
    description: site.description,
    siteName: site.name,
    locale: "fr_BJ",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "geo.region": "BJ-BO",
    "geo.placename": "Parakou",
    "geo.position": "9.3372;2.6303",
    ICBM: "9.3372, 2.6303",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <JsonLd data={businessJsonLd(settings)} />
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
