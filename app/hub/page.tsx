import type { Metadata } from 'next';

import { HubPagina } from '@/components/hub/hub-pagina';
import { HUB } from '@/components/hub/copy';

export const metadata: Metadata = {
  title: HUB.metaTitel,
  description: HUB.metaBeschrijving,
};

export default function Hub() {
  return <HubPagina />;
}
