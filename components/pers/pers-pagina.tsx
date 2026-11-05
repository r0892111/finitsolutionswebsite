"use client";

/**
 * /pers: de persartikels over Finit, nieuwste eerst. Zelfde kop en footer als
 * /vacatures. Per artikel: medium, datum, titel, één citaat en de link naar het
 * origineel. Tekst in ./copy.ts, de artikels in lib/pers.ts.
 */

import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { CONTAINER, H2, LEAD, Onder } from "@/components/home/ui";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/finit-links";
import { PERS, datumNL } from "@/lib/pers";
import { PERS_PAGINA } from "./copy";

export function PersPagina() {
  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location="pers" />

      <main>
        <section className={`${CONTAINER} pb-10 pt-10 sm:pb-14 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{PERS_PAGINA.kruimel}</span>
          </nav>
          <h1 className={`mt-7 ${H2} sm:text-[2.6rem] lg:text-[3rem]`}>
            {PERS_PAGINA.h1[0]} <Onder>{PERS_PAGINA.h1[1]}</Onder>
          </h1>
          <p className={`mt-5 max-w-[42rem] ${LEAD}`}>{PERS_PAGINA.intro}</p>
        </section>

        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} py-12 sm:py-14`}>
            <ul className="grid gap-5">
              {PERS.map((a) => (
                <li key={a.url}>
                  <article className="hp-card grid overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    {a.foto && (
                      <figure className="flex flex-col bg-white">
                        <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[16rem] md:flex-1">
                          <Image src={a.foto.src} alt={a.foto.alt} fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover" />
                        </div>
                        <figcaption className="px-5 pt-2 text-[0.75rem] text-[#6C7590] md:pb-3">{a.foto.credit}</figcaption>
                      </figure>
                    )}
                    <div className="flex flex-col p-6 sm:p-8">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-[#6C7590]">
                        <span className="rounded-[4px] bg-[#1A2D63] px-2 py-0.5 text-[0.8125rem] font-bold text-white">{a.medium}</span>
                        <time dateTime={a.datum}>{datumNL(a.datum)}</time>
                        {a.auteur && <span>{PERS_PAGINA.door} {a.auteur}</span>}
                      </p>
                      <h2 className="hp-display hp-display-sm mt-4 text-balance text-[1.4rem] font-semibold leading-[1.25] text-[#1A2D63] sm:text-[1.6rem]">{a.titel}</h2>
                      <blockquote className="mt-4 border-l-2 border-[#E9A13B] pl-4 text-[1.0625rem] leading-[1.6] text-[#3D4766]">
                        <p>&ldquo;{a.citaat}&rdquo;</p>
                        <footer className="mt-2 text-[0.875rem] text-[#6C7590]">{a.citaatVan}</footer>
                      </blockquote>
                      <div className="mt-6">
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => pushEvent("pers_klik", { medium: a.medium, location: "pers" })}
                          className="hp-btn hp-btn--primary hp-btn--md w-full sm:w-auto"
                        >
                          {PERS_PAGINA.lees} ({a.medium})
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[0.9375rem] text-[#3D4766]">
              {PERS_PAGINA.journalist}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hp-link font-medium">{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
