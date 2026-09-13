import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

/**
 * De juridische pagina's (privacy, voorwaarden, cookies, disclaimer) in de
 * huisstijl van de homepage: dezelfde kop, met het logo naar de homepage en
 * de hoofd-CTA, en dezelfde footer met hetzelfde btw-nummer. Vóór september
 * 2026 hadden ze de oude footer met een ander btw-nummer en een plaatsnaam.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="legal" />
      {children}
      <SiteFooter />
    </div>
  );
}
