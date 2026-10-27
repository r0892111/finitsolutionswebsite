import type { Metadata } from 'next';

import { LezingSpreker } from '@/components/lezing/spreker';

export const metadata: Metadata = { title: 'Sprekersscherm' };

export default function SprekerPagina() {
  return <LezingSpreker />;
}
