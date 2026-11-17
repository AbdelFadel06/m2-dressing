import type { Metadata } from "next";
import { TikTokSection } from "@/components/TikTokSection";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ateliers & Contact",
  description: "Les deux ateliers M2 Dressing à Parakou : adresses, horaires, WhatsApp et TikTok.",
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
        <h1 className="section-title">Ateliers & Contact</h1>
        <p className="mt-4 max-w-2xl text-ink/60">
          Passez nous voir à Parakou pour une prise de mesures, ou écrivez-nous directement sur WhatsApp.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {site.workshops.map((w) => (
            <div key={w.name} className="rounded border border-line bg-white p-6">
              <p className="text-lg font-bold uppercase tracking-wider">{w.name}</p>
              <p className="mt-2 text-ink/70">{w.area}</p>
              <p className="text-sm text-ink/50">{w.hours}</p>
              <a href={w.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-4 inline-block">
                Itinéraire
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink("Bonjour M2 Dressing, j'aimerais prendre rendez-vous.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            <WhatsAppIcon /> Écrire sur WhatsApp · {site.phoneDisplay}
          </a>
          <a href={site.tiktok.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            TikTok {site.tiktok.handle}
          </a>
        </div>
      </div>
      <TikTokSection />
    </>
  );
}
