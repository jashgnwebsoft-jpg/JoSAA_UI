import { CONFIG } from '@/global-config';
import { JwtSignUpView } from '@minimal/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <JwtSignUpView />
    </>
  );
}
