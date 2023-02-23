import type {
  ForgotPasswordDto,
  SendForgotPasswordDto,
  VerifyEmailBodyDto,
} from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from 'react-query';

import { v1AuthApi, v1EmailsApi } from '@/apis/coreBackend/defHttp';

import { toastError } from '../../../utils/toast';
import type {
  CredentialsSignInData,
  CredentialsSignUpData,
} from '../model/credentials';
import type { SignUpFormData } from '../model/form';
import { useAuthStore } from '../store/useAuthStore';
import { authMethod } from '../utils/authMethod';
import { printApiErrorMessage } from '../utils/printApiErrorMessage';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();

  const { authenticatedCoreBackendApi } = useAuthStore();

  const signUpWithCredentialsMutation = useMutation(
    (data: CredentialsSignUpData) => {
      return authMethod.credentials.signUp(data);
    },
    {
      onSuccess: async (data, variables) => {
        // await authMethod.logout();
        await authMethod.credentials.signIn({
          email: variables.email,
          password: variables.password,
        });
        router.push({
          pathname: '/auth/sign-up/check-email',
          query: {
            link: JSON.stringify(data.data.sniperLinks),
          },
        });
      },
      onError: printApiErrorMessage,
    }
  );

  const signUpWithCredentials = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toastError('invalid confirm password');
      return;
    }
    signUpWithCredentialsMutation.mutate({ ...data });
  };

  const signUpVerificationMutation = useMutation(
    (data: VerifyEmailBodyDto) => {
      return v1AuthApi.verifyEmail(data);
    },
    {
      onSuccess: () => {
        router.push('/auth/sign-up/verification/success');
      },
      onError: () => {
        router.push('/auth/sign-up/verification/fail');
      },
    }
  );

  const sendForgotPasswordEmailMutation = useMutation(
    (data: SendForgotPasswordDto) => {
      return v1EmailsApi.sendForgotPasswordEmail(data);
    },
    {
      onSuccess: (data, args) => {
        router.push({
          pathname: '/auth/forget-password/check-email',
          query: {
            link: JSON.stringify(data.data),
            email: args.email,
          },
        });
      },
      onError: printApiErrorMessage,
    }
  );

  const sendForgetPasswordEmail = async (email: string) => {
    sendForgotPasswordEmailMutation.mutate({
      email,
      callbackPath: '/auth/reset-password',
    });
  };

  const forgotPasswordMutation = useMutation(
    (data: ForgotPasswordDto) => {
      return v1AuthApi.forgotPassword(data);
    },
    {
      onSuccess: () => {
        router.replace('/auth/sign-in');
      },
      onError: printApiErrorMessage,
    }
  );

  /** User authorization status */
  const authenticated = status === 'authenticated';

  /** Session loading state */
  const isLoading = status === 'loading';

  /** accessToken */
  const accessToken = session?.user.accessToken;

  /**
   * normal login mode
   * @param  {CredentialsSignInData} data
   * @param  {string} data.email - User email
   * @param  {string} data.password - User password
   */
  const signInWithCredentials = async (data: CredentialsSignInData) => {
    const res = await authMethod.credentials.signIn(data);
    if (res?.ok) {
      if (router.query.token) {
        router.replace({
          pathname: '/auth/sign-up/verification',
          query: router.query,
        });
      } else {
        router.replace({
          pathname: '/store-login',
        });
      }
    } else {
      console.log(res?.error);
      toastError('The email address or password is incorrect!');
    }
  };

  const signInWithKeycloak = async () => {
    const res = await authMethod.keycloak.signIn();
    console.log(res);
  };

  const signUpVerification = async (token: string | string[] | undefined) => {
    console.log('signUpVerification');
    if (typeof token === 'string') {
      signUpVerificationMutation.mutate({
        token,
      });
    } else {
      toastError('invalid token');
    }
  };

  /**
   * Wait for the backend
   */
  const logout = async () => {
    await authMethod.logout();
    queryClient.removeQueries(['v1StorefrontsApi.getStorefronts']);
  };

  const resetPassword = async (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      toastError('invalid confirm password');
    }
    const { token } = router.query;

    if (typeof token === 'string') {
      forgotPasswordMutation.mutate({
        token,
        newPassword: password,
        newPasswordConfirmation: confirmPassword,
      });
    } else {
      toastError('invalid token');
    }
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
    signInWithCredentials,
    signUpWithCredentials,
    signInWithKeycloak,
    logout,
    resetPassword,
    sendForgetPasswordEmail,
    signUpVerification,
  };
};
