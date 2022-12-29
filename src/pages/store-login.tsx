import { HomeModernIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { v1StorefrontsApi } from '@/apis/coreBackend/defHttp';
import { useAuth } from '@/services/auth';
import classes from '@/views/store-create/styles/index.module.scss';
import StoreCard from '@/views/store-login/components/StoreCard';
import UserButton from '@/views/store-login/containers/UserButton';

export default function StoreLogin() {
  const router = useRouter();
  const { authenticated, authenticatedCoreBackendApi } = useAuth();

  const { data, isLoading: isLoadingGetStorefronts } = useQuery(
    ['v1StorefrontsApi.getStorefronts'],
    async () => {
      return v1StorefrontsApi.getStorefronts();
    },
    { enabled: authenticatedCoreBackendApi, refetchInterval: 10000 }
  );

  const isEmpty = data?.data.items.length === 0;

  useEffect(() => {
    if (router.isReady && !authenticated) {
      router.replace('/auth/sign-in');
    }
  }, [authenticated, router]);

  const isLoading = isLoadingGetStorefronts || !authenticatedCoreBackendApi;

  return (
    <div
      className=" flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4)',
      }}
    >
      <div
        className={classNames(
          'w-[500px] block rounded-lg border border-gray-200 bg-white px-12 pt-16 pb-20 shadow-2xl',
          classes.fadeIn
        )}
      >
        <div className="flex items-center justify-between text-slate-700">
          <div className="flex h-12 w-44 items-center justify-center bg-slate-600">
            <h1 className="leading-8 text-white">TokenBricks Logo</h1>
          </div>
          <UserButton arrow />
        </div>

        <div className="mt-12 flex items-center justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Stores
          </h5>
          {!isEmpty && (
            <Link href="/store-create">
              <button
                type="button"
                className="inline-flex h-fit items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create another store
              </button>
            </Link>
          )}
        </div>
        {isLoading && (
          <div className="mt-10 flex items-center justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {isEmpty && !isLoading && (
          <Link href="/store-create">
            <button
              type="button"
              className="relative mt-2 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <HomeModernIcon className="mx-auto h-12 w-12 fill-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Create a new store
              </span>
            </button>
          </Link>
        )}
        {!isEmpty && !isLoading && (
          <div className="mt-4 flex flex-col gap-4">
            {data?.data.items.map((item) => (
              <StoreCard
                key={item.id}
                name={item.name}
                domain={item.dashboardExternalDomain ?? ''}
                status={item.status.replaceAll('_', ' ').toLocaleLowerCase()}
                href={
                  item.dashboardExternalDomain &&
                  `https://${item.dashboardExternalDomain}`
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// export default function At() {
//   return (
//     <div
//       className=" flex min-h-screen items-center justify-center"
//       style={{
//         backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4)',
//       }}
//     >
//       <div>124</div>
//     </div>
//   );
// }
