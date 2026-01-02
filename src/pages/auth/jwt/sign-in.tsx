import { CONFIG } from '@/global-config';
import { JwtSignInView } from '@minimal/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <JwtSignInView />
    </>
  );
}
