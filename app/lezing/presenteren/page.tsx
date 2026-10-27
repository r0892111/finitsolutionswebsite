import type { Metadata } from 'next';

import { LezingDeck } from '@/components/lezing/deck';

export const metadata: Metadata = { title: 'Presentatie' };

export default function PresenterenPagina() {
  return <LezingDeck />;
}
