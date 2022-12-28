import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader from '@/components/Loader';
import { useAuth } from '@/services/auth';

export default function Verification() {
  const {
    signUpVerification,
    authenticatedCoreBackendApi,
    authenticated,
    isLoading,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authenticated) {
      const { token } = router.query;
      router.push({
        pathname: '/auth/sign-in',
        query: { token },
      });
    }
    console.log('isLoading', isLoading);
    console.log('authenticated', authenticated);
  }, [isLoading, authenticated]);

  useEffect(() => {
    if (router.isReady && authenticatedCoreBackendApi) {
      const { token } = router.query;
      signUpVerification(token);
    }
    console.log(authenticatedCoreBackendApi);
  }, [router.isReady, authenticatedCoreBackendApi]);

  return (
    <div className="h-1 min-h-screen">
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-4 lg:justify-start  lg:pt-[10%]">
        <Loader />
      </div>
    </div>
  );
}
