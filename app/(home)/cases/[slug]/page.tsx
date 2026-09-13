import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_LIJST } from "@/components/home/cases";
import { CasePagina } from "@/components/home/case-pagina";

/**
 * /cases/<slug>: één pagina per case uit components/home/cases.ts. Statisch
 * gebouwd (output: export). Voorbeeldcases worden niet geïndexeerd.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_LIJST.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = CASE_LIJST.find((x) => x.slug === params.slug);
  if (!c) return {};
  const url = `/cases/${c.slug}`;
  return {
    title: c.titel,
    description: c.samenvatting,
    alternates: { canonical: url },
    openGraph: { title: `${c.titel} | Finit Solutions`, description: c.samenvatting, url, type: "article" },
    twitter: { title: `${c.titel} | Finit Solutions`, description: c.samenvatting },
    ...(c.voorbeeld ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = CASE_LIJST.find((x) => x.slug === params.slug);
  if (!c) notFound();
  return <CasePagina c={c} />;
}
