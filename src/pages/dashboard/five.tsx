import { CONFIG } from '@/global-config';
import { BlankView } from '@minimal/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page five | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <BlankView title='Page five' />
    </>
  );
}
