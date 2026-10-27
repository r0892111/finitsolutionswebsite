import type { Metadata } from 'next';

import { LezingHandout } from '@/components/lezing/handout';

export const metadata: Metadata = {
  title: 'Alle prompts van de lezing',
  description: 'De prompts en trucs van de lezing voor Open Boek, klaar om te kopiëren.',
};

export default function LezingPagina() {
  return <LezingHandout />;
}
