import {
  Configuration,
  V1StorefrontsApi,
} from '@tokenbricks/sfas-backend-typescript-axios-client';
import getConfig from 'next/config';

import { createAxios } from '@/utils/http/createAxios';

const {
  publicRuntimeConfig: { NEXT_PUBLIC_BASE_API_URL },
} = getConfig();

export const coreBackendDefHttp = createAxios();

export const v1StorefrontsApi = new V1StorefrontsApi(
  new Configuration(),
  `${NEXT_PUBLIC_BASE_API_URL}/api`,
  coreBackendDefHttp
);
