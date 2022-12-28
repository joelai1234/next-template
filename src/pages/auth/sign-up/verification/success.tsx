import Link from 'next/link';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export default function Success() {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(['v1MembersApi.getMe']);
    queryClient.invalidateQueries(['v1MembersApi.getMyHints']);
  }, []);
  return (
    <div className="h-1 min-h-screen">
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-4 lg:justify-start  lg:pt-[10%]">
        <img
          className="h-20 w-20"
          src="/assets/images/common/success.png"
          alt="inbox"
        />
        <h1 className=" mt-4 text-4xl font-bold">Success!</h1>
        <p className="mt-4 max-w-xl text-center text-xl text-slate-500">
          You have successfully verified account.
        </p>
        <Link href="/store-login" legacyBehavior>
          <a
            type="button"
            className="mt-16 inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-20 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Come back
          </a>
        </Link>
      </div>
    </div>
  );
}
