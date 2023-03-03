/* eslint-disable no-param-reassign */

import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

const {
  publicRuntimeConfig: { NEXT_PUBLIC_SESSION_SECRET },
} = getConfig();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions: NextAuthOptions = {
    secret: NEXT_PUBLIC_SESSION_SECRET,
    providers: [
      KeycloakProvider({
        clientId: process.env.KEYCLOAK_ID,
        clientSecret: process.env.KEYCLOAK_SECRET,
        issuer: process.env.KEYCLOAK_ISSUER,
        profile: (profile) => ({
          ...profile,
          id: profile.sub,
        }),
      }),
    ],
    callbacks: {
      async jwt({ token, account, user }) {
        if (account) {
          token.id_token = account.id_token;
          token.access_token = account.access_token;
          token.refresh_token = account.refresh_token;
          token.refresh_expires_in = account.refresh_expires_in;
          token.provider = account.provider;
          token.preferred_username = user?.preferred_username;
          token.email = user?.email;
          token.email_verified = user?.email_verified;
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
    events: {
      async signOut({ token }: { token: JWT }) {
        if (token.provider === 'keycloak') {
          const logOutUrl = new URL(
            `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
          );
          // @ts-ignore
          logOutUrl.searchParams.set('id_token_hint', token.id_token!);
          await fetch(logOutUrl);
        }
      },
    },
  };

  // Do whatever you want here, before the request is passed down to `NextAuth`
  const nextAuth = await NextAuth(req, res, authOptions);
  return nextAuth;
}
