import { signOut } from 'next-auth/react';

import { keycloak } from './providers/keycloak';

export const authMethod = {
  keycloak,
  logout: async () => {
    await signOut({ redirect: false });
  },
};
