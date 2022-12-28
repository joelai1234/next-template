import { signOut } from 'next-auth/react';

import { credentials } from './providers/credentials';

export const authMethod = {
  credentials,
  logout: async () => {
    await signOut({ redirect: false });
  },
};
