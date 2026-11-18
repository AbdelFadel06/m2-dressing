import Image from "next/image";
import Link from "next/link";
import { whatsappLink, type Settings } from "@/lib/settings";

const heading = "mb-3 text-[0.8rem] font-semibold uppercase tracking-wider text-white";
const link = "text-white/65 transition-colors hover:text-white";

export function Footer({ settings: s }: { settings: Settings }) {
  return (
    <footer className="bg-ink pb-6 pt-12 text-white/65">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/images/logo-m2-dressing.png" alt={s.name} width={340} height={278} className="h-28 w-auto" />
            <p className="mt-4 max-w-xs text-sm">{s.tagline}</p>
          </div>

          <div className="md:col-span-3">
            <p className={heading}>Navigation</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/creations" className={link}>Nos créations</Link></li>
              <li><Link href="/pagnes" className={link}>Pagnes & tissus</Link></li>
              <li><Link href="/panier" className={link}>Mon panier</Link></li>
              <li><Link href="/contact" className={link}>Nos ateliers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className={heading}>Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={whatsappLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp {s.phoneDisplay}
                </a>
              </li>
              {s.email && (
                <li>
                  <a href={`mailto:${s.email}`} className={link}>{s.email}</a>
                </li>
              )}
              <li>
                <a href={s.tiktok.url} target="_blank" rel="noopener noreferrer" className={link}>
                  TikTok {s.tiktok.handle}
                </a>
              </li>
              {s.facebook && (
                <li>
                  <a href={s.facebook} target="_blank" rel="noopener noreferrer" className={link}>Facebook</a>
                </li>
              )}
              {s.instagram && (
                <li>
                  <a href={s.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a>
                </li>
              )}
              <li>Parakou, Bénin</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#222] pt-4 text-center text-xs tracking-wide text-white/40">
          © {new Date().getFullYear()} {s.name}, Parakou
        </div>
      </div>
    </footer>
  );
}
