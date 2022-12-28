import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/services/auth';
import type { SignUpFormData } from '@/services/auth/model/form';
import {
  ValidEmailReg,
  ValidPasswordReg,
  ValidUsernameReg,
} from '@/views/auth/constants/regs';
import CreateStoreCard from '@/views/store-create/containers/CreateStoreCard';

const SignUp = () => {
  const { signUpWithCredentials } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    signUpWithCredentials(data);
  };
  return (
    <div
      className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4)',
      }}
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CreateStoreCard title="Sign up" description="">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  autoComplete="name"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('name', {
                    required: {
                      message: 'Username is required.',
                      value: true,
                    },
                    minLength: {
                      message: 'At least 2 characters.',
                      value: 2,
                    },
                    maxLength: {
                      message: 'No more than 60 characters.',
                      value: 60,
                    },
                    pattern: {
                      message: 'Username only accept numeric and alphabet.',
                      value: ValidUsernameReg,
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

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
                      message: 'At least 10 characters.',
                      value: 10,
                    },
                    maxLength: {
                      message: 'No more than 40 characters.',
                      value: 40,
                    },
                    pattern: {
                      message:
                        'At least 1 lowercase alphabetical character,uppercase alphabetical character and numeric character.',
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

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('confirmPassword', {
                    required: {
                      message: 'Confirm password is required.',
                      value: true,
                    },
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match.';
                      }
                      return undefined;
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  aria-describedby="comments-description"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register('confirmTerms', {
                    required: {
                      message: 'This is required.',
                      value: true,
                    },
                  })}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Please confirm that you agree to{' '}
                  <a
                    className=" text-blue-500"
                    href="/terms-and-conditions"
                    target="_blank"
                  >
                    <u>our terms and conditions.</u>
                  </a>
                </label>
                {errors.confirmTerms && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmTerms.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                Sign up
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
            <span>Already a user? </span>
            <Link href="/auth/sign-in">
              <span className=" text-indigo-500 underline">SIGN IN</span>
            </Link>
          </div>
        </CreateStoreCard>
      </div>
    </div>
  );
};

export default SignUp;
