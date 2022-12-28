import { signIn } from 'next-auth/react';

import { v1AuthApi } from '@/apis/coreBackend/defHttp';

import type {
  CredentialsSignInData,
  CredentialsSignUpData,
} from '../../model/credentials';

export const credentials = {
  /**
   * @param {CredentialsSignInData} userData
   * @param {string} userData.email - user email
   * @param {string} userData.password - user password
   * @returns api response
   */
  signIn: async ({ email, password }: CredentialsSignInData) => {
    return signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  },
  signUp: async ({ name, email, password }: CredentialsSignUpData) => {
    return v1AuthApi.localSignup({
      name,
      email,
      password,
      callbackPath: '/auth/sign-up/verification',
    });
  },
};
