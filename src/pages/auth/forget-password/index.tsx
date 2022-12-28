import { useForm } from 'react-hook-form';

import { useAuth } from '@/services/auth';
import { ValidEmailReg } from '@/views/auth/constants/regs';

const ForgetPassword = () => {
  const { sendForgetPasswordEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const onSubmit = async (data: { email: string }) => {
    sendForgetPasswordEmail(data.email);
  };
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mt-[-8rem] sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/assets/images/common/logo.svg"
          alt="logo"
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
            Forget password
          </h2>
          <p className="mt-2 mb-8 text-sm text-gray-600">
            Forget you password? No problem. Just let us know your email address
            and we will email you a password reset link that will allow you to
            choose a new one.
          </p>
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                Send an email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

ForgetPassword.auth = {
  authorized: '/',
};
