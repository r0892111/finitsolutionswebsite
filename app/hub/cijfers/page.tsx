import type { Metadata } from 'next';

import { CijfersPagina } from '@/components/hub/cijfers-pagina';

// Interne pagina: de kijkcijfers van de VSL. Niet in de sitemap, niet indexeren,
// de gegevens komen pas met de geheime sleutel (?sleutel=…). ?demo=1 toont voorbeelddata.
export const metadata: Metadata = {
  title: 'Kijkcijfers VSL | Finit Solutions',
  robots: { index: false, follow: false, nocache: true },
};

export default function Cijfers() {
  return <CijfersPagina />;
}
