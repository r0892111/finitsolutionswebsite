import type { Metadata } from 'next';

import { BronnenPagina } from '@/components/bronnen/bronnen-pagina';
import { BRONNEN } from '@/components/bronnen/copy';

export const metadata: Metadata = {
  title: BRONNEN.metaTitel,
  description: BRONNEN.metaBeschrijving,
};

export default function Bronnen() {
  return <BronnenPagina />;
}
