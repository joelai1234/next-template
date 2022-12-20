import { StorefrontAoStatusEnum } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { v1StorefrontsApi } from '@/apis/coreBackend/defHttp';

import { useStoreFormStore } from '../../store/storeForm';
import CreateStoreCard from '../CreateStoreCard';

export default function BuildingStoreStep() {
  const router = useRouter();
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
          router.replace(data.data.dashboardExternalDomain);
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
      <div className="mt-4"></div>
    </CreateStoreCard>
  );
}
