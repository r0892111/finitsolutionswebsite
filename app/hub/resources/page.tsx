import { HubPagina } from '@/components/hub/hub-pagina';

import { HUB_META } from '../metadata';

// Eigen URL voor de gratis prompts en gidsen: dezelfde hub, die meteen naar onder springt.
export const metadata = HUB_META.resources;

export default function HubResources() {
  return <HubPagina start="resources" />;
}
