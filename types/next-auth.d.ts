import type { MeAo } from '@tokenbricks/sfas-backend-typescript-axios-client';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      access_token: string;
      preferred_username: string;
      email_verified: boolean;
      accessToken: string;
      accessTokenExpires?: number;
      refreshToken: string;
      me: MeAo;
      error?: string;
    } & DefaultSession['user'];
  }
  interface User {
    access_token: string;
    preferred_username: string;
    email_verified: boolean;
    accessToken: string;
    accessTokenExpires?: number;
    refreshToken: string;
    me: MeAo;
    error?: string;
  }
}
