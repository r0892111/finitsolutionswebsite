import type { Metadata } from 'next';

import { StartpakketPagina } from '@/components/startpakket/startpakket-pagina';

export const metadata: Metadata = {
  title: 'Startpakket: haal meer uit je AI | Finit Solutions',
  description:
    'Eén bestand dat je in Claude of ChatGPT sleept. De AI interviewt je en zet alles voor je op: je profiel, een eerlijke assistent, je ochtendmail en alle prompts van de workshop.',
};

export default function Startpakket() {
  return <StartpakketPagina />;
}
