import { useSession } from 'next-auth/react';
import { useQueryClient } from 'react-query';

import { useAuthStore } from '../store/useAuthStore';
import { authMethod } from '../utils/authMethod';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const { authenticatedCoreBackendApi } = useAuthStore();

  /** User authorization status */
  const authenticated = status === 'authenticated';

  /** Session loading state */
  const isLoading = status === 'loading';

  /** accessToken */
  const accessToken = session?.user.access_token;

  const signInWithKeycloak = async () => {
    const res = await authMethod.keycloak.signIn();
    console.log(res);
  };

  /**
   * Wait for the backend
   */
  const logout = async () => {
    await authMethod.logout();
    queryClient.removeQueries(['v1StorefrontsApi.getStorefronts']);
  };

  return {
    /** User authorization status */
    authenticated,
    /** Session loading state */
    isLoading,
    /** accessToken */
    accessToken,
    /** The header of the api has an authorization token */
    authenticatedCoreBackendApi,
    signInWithKeycloak,
    logout,
  };
};
