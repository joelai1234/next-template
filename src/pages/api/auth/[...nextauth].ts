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
import CredentialsProvider from 'next-auth/providers/credentials';

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
  let maxAge = 30 * 60;

  const rememberMe = Boolean(req.cookies.rememberMe);

  if (rememberMe) {
    maxAge = 7 * 24 * 60 * 60;
  }

  const authOptions: NextAuthOptions = {
    secret: NEXT_PUBLIC_SESSION_SECRET,
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: 'password', type: 'password' },
        },
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

          return null;
        },
      }),
    ],
    pages: {
      signIn: '/auth/sign-in',
    },
    callbacks: {
      async jwt({ token, user }: any) {
        // console.log('callbacks jwt');

        if (user) {
          token.user = user;
        }

        // const tokenUser = token.user as User;

        // if (
        //   tokenUser?.accessTokenExpires &&
        //   tokenUser?.accessTokenExpires < Date.now()
        // ) {
        //   token.user = await refreshAccessToken(tokenUser);
        // }

        return token;
      },
      async session({ session, token }) {
        session.user = token.user as any;

        return session;
      },
    },
    session: {
      maxAge,
    },
    jwt: {
      maxAge,
    },
  };

  // Do whatever you want here, before the request is passed down to `NextAuth`
  const nextAuth = await NextAuth(req, res, authOptions);
  return nextAuth;
}
