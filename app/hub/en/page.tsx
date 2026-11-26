import { HubPagina } from '@/components/hub/hub-pagina';

import { HUB_META } from '../metadata';

// De Engelse hub (Alex 25/11): dezelfde pagina als /hub/, teksten uit components/hub/copy.en.ts.
export const metadata = HUB_META.hubEn;

export default function HubEngels() {
  return <HubPagina taal="en" />;
}
