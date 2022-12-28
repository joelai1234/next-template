import type { SniperLinksAo } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useAuth } from '@/services/auth';
import CheckYourInbox from '@/views/auth/containers/CheckYourInbox';

export default function ForgetPasswordCheckEmail() {
  const router = useRouter();
  const { link, email } = router.query;
  const sniperLinks = useMemo<SniperLinksAo | undefined>(() => {
    if (typeof link === 'string') {
      return JSON.parse(link);
    }
    return undefined;
  }, [link]);
  const { sendForgetPasswordEmail } = useAuth();
  return (
    <div className="h-1 min-h-screen">
      <CheckYourInbox
        email={String(email)}
        sniperLinks={sniperLinks}
        onResendEmail={sendForgetPasswordEmail.bind(null, String(email))}
      />
    </div>
  );
}
