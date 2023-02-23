import { signIn } from 'next-auth/react';

export const keycloak = {
  signIn: async () => {
    return signIn('keycloak');
  },
};
