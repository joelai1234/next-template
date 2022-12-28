import { useForm } from 'react-hook-form';

import { useAuth } from '@/services/auth';
import { ValidPasswordReg } from '@/views/auth/constants/regs';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ password: string; confirmPassword: string }>();
  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    resetPassword(data.password, data.confirmPassword);
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/assets/images/common/logo.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Reset password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('password', {
                    required: {
                      message: 'password is required.',
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

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register('confirmPassword', {
                    required: {
                      message: 'confirm password is required.',
                      value: true,
                    },
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match';
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
