import { signOut } from 'next-auth/react';

import { credentials } from './providers/credentials';
import { keycloak } from './providers/keycloak';

export const authMethod = {
  credentials,
  keycloak,
  logout: async () => {
    await signOut({ redirect: false });
  },
};
