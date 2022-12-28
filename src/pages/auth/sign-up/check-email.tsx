import type { SniperLinksAo } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { v1EmailsApi } from '@/apis/coreBackend/defHttp';
import CheckYourInbox from '@/views/auth/containers/CheckYourInbox';

export default function SignUpCheckEmail() {
  const { data: token } = useSession();
  const router = useRouter();
  const { link } = router.query;
  const sniperLinks = useMemo<SniperLinksAo | undefined>(() => {
    if (typeof link === 'string') {
      return JSON.parse(link);
    }
    return undefined;
  }, [link]);

  const handleResendEmail = async () => {
    const res = await v1EmailsApi.sendVerificationEmail({
      callbackPath: '/auth/sign-up/verification',
    });
    router.push({
      pathname: '/auth/sign-up/check-email',
      query: {
        link: JSON.stringify(res.data),
      },
    });
  };

  return (
    <div className="h-1 min-h-screen">
      <CheckYourInbox
        email={token?.user.me.email}
        sniperLinks={sniperLinks}
        onResendEmail={handleResendEmail}
      />
    </div>
  );
}
