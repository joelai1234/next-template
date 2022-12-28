import { StorefrontAoStatusEnum } from '@tokenbricks/sfas-backend-typescript-axios-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { v1StorefrontsApi } from '@/apis/coreBackend/defHttp';

import { useStoreFormStore } from '../../store/storeForm';
import CreateStoreCard from '../CreateStoreCard';

export default function BuildingStoreStep() {
  const { id } = useStoreFormStore();

  const [loadingDots, setLoadingDots] = useState('.');

  useQuery(
    ['v1StorefrontsApi.getStorefront', id],
    () => {
      return v1StorefrontsApi.getStorefront(id);
    },
    {
      onSuccess: (data) => {
        if (
          data.data.status === StorefrontAoStatusEnum.DEPLOY_SUCCESS &&
          data.data.dashboardExternalDomain
        ) {
          window.location.replace(
            `https://${data.data.dashboardExternalDomain}`
          );
        }
      },
      refetchInterval: 10000,
    }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingDots.length === 3) {
        setLoadingDots('');
      } else {
        setLoadingDots((preState) => `${preState}.`);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [loadingDots]);

  return (
    <CreateStoreCard
      className="w-[35rem]"
      title={`Building your store${loadingDots}`}
      description="This will only take a moment."
    >
      <div className="mt-4 flex items-center justify-center">
        <Link href="/store-login">
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-12 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to stores
          </button>
        </Link>
      </div>
    </CreateStoreCard>
  );
}
