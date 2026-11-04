import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PromptPagina } from '@/components/prompts/prompt-pagina';
import { PROMPT_PAGINAS, vindPromptPagina } from '@/lib/prompts';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMPT_PAGINAS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pagina = vindPromptPagina(params.slug);
  if (!pagina) return {};
  return { title: pagina.titel, description: pagina.intro };
}

export default function Prompts({ params }: { params: { slug: string } }) {
  const pagina = vindPromptPagina(params.slug);
  if (!pagina) notFound();
  return <PromptPagina pagina={pagina} />;
}
