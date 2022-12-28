import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/services/auth';
import { useRememberMe } from '@/services/auth/hooks/useRememberMe';
import type { CredentialsSignInData } from '@/services/auth/model/credentials';
import { ValidEmailReg, ValidPasswordReg } from '@/views/auth/constants/regs';
import CreateStoreCard from '@/views/store-create/containers/CreateStoreCard';

const SignIn = () => {
  const { authenticated } = useAuth();
  const router = useRouter();
  const { signInWithCredentials } = useAuth();
  const { rememberMe, setRememberMe } = useRememberMe();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsSignInData>();

  useEffect(() => {
    if (authenticated && router.isReady && !router.query.token)
      router.replace({
        pathname: '/store-login',
      });
  }, [authenticated, router]);

  const onSubmit = async (data: CredentialsSignInData) => {
    await signInWithCredentials(data);
  };
  return (
    <div
      className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4)',
      }}
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CreateStoreCard title="Sign in to your account" description="">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('email', {
                    required: {
                      message: 'Email is required.',
                      value: true,
                    },
                    pattern: { message: 'Invalid Email', value: ValidEmailReg },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('password', {
                    required: {
                      message: 'Password is required.',
                      value: true,
                    },
                    minLength: {
                      message: 'At least 10 characters',
                      value: 10,
                    },
                    maxLength: {
                      message: 'No more than 40 characters',
                      value: 40,
                    },
                    pattern: {
                      message:
                        'At least 1 lowercase alphabetical character,uppercase alphabetical character and numeric character',
                      value: ValidPasswordReg,
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forget-password" legacyBehavior>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">or</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 text-slate-400">
            <span>Need an account? </span>
            <Link href="/auth/sign-up">
              <span className=" text-indigo-500 underline">SIGN UP</span>
            </Link>
          </div>
        </CreateStoreCard>
      </div>
    </div>
  );
};

export default SignIn;
