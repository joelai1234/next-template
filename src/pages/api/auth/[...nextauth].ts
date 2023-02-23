/* eslint-disable no-param-reassign */
import {
  Configuration,
  V1AuthApi,
} from '@tokenbricks/sfas-backend-typescript-axios-client';
import type { JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import type { NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import KeycloakProvider from 'next-auth/providers/keycloak';

import { v1AuthApi } from '@/apis/coreBackend/defHttp';
import { createAxios } from '@/utils/http/createAxios';

const {
  publicRuntimeConfig: { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_SESSION_SECRET },
} = getConfig();

async function refreshAccessToken(tokenUser: User) {
  try {
    const defHttp = createAxios();
    defHttp.defaults.headers.common.Authorization = `Bearer ${tokenUser.refreshToken}`;
    const authApi = new V1AuthApi(
      new Configuration(),
      NEXT_PUBLIC_BASE_API_URL,
      defHttp
    );
    // @ts-ignore
    const res = await authApi.refreshToken();
    const accessTokenExpires = jwt_decode<JwtPayload>(res.data.accessToken).exp;
    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      accessTokenExpires: accessTokenExpires && accessTokenExpires * 1000,
      me: res.data.me,
    };
  } catch (error) {
    console.log('refreshAccessToken error', error);
    return {
      ...tokenUser,
      error: 'RefreshAccessTokenError',
    };
  }
}
console.log(refreshAccessToken);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions: NextAuthOptions = {
    secret: NEXT_PUBLIC_SESSION_SECRET,
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: 'password', type: 'password' },
        },
        // @ts-ignore
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const signRes = await v1AuthApi.localSignin({
            email: credentials.email,
            password: credentials.password,
          });
          const accessTokenExpires = jwt_decode<JwtPayload>(
            signRes.data.accessToken
          ).exp;

          const user = {
            id: String(signRes.data.me.id),
            accessToken: signRes.data.accessToken,
            refreshToken: signRes.data.refreshToken,
            accessTokenExpires: accessTokenExpires && accessTokenExpires * 1000,
            me: signRes.data.me,
          };

          if (user) {
            return user;
          }

          return undefined;
        },
      }),
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
    // pages: {
    //   signIn: '/auth/sign-in',
    // },
    callbacks: {
      async jwt({ token, account, user, profile }) {
        console.log('callbacks token', token);
        console.log('callbacks account', account);
        console.log('callbacks user', user);
        console.log('callbacks profile', profile);
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
