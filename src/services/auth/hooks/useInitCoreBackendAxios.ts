import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { coreBackendDefHttp } from '@/apis/coreBackend/defHttp';

import { useAuthStore } from '../store/useAuthStore';

/**
 * After the user logs in, add the token to the api header and remove it after logging out
 */
export const useInitCoreBackendAxios = () => {
  const session = useSession();
  console.log('session', session);
  const accessToken = session?.data?.user.access_token;
  // const accessToken = session?.data?.user.id_token;
  const { setAuthenticatedCoreBackendApi } = useAuthStore();
  useEffect(() => {
    if (accessToken) {
      coreBackendDefHttp.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setAuthenticatedCoreBackendApi(true);
    } else {
      delete coreBackendDefHttp.defaults.headers.common.Authorization;
      setAuthenticatedCoreBackendApi(false);
    }
  }, [accessToken]);
};
