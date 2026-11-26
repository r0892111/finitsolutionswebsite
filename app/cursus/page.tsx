import { hubMetadata } from '@/app/hub/metadata';
import { CURSUS } from '@/components/cursus/copy';
import { CursusPagina } from '@/components/cursus/cursus-pagina';

export const metadata = hubMetadata(CURSUS.metaTitel, CURSUS.metaBeschrijving, '/cursus/');

export default function Cursus() {
  return <CursusPagina />;
}
