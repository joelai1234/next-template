import type { ReactNode } from 'react';

import useSwitchingPages from '@/hooks/useSwitchingPages';
import { useInitCoreBackendAxios } from '@/services/auth';

interface Props {
  children: ReactNode;
}

const Initialize = ({ children }: Props) => {
  useInitCoreBackendAxios();
  useSwitchingPages();
  return <>{children}</>;
};

export default Initialize;
