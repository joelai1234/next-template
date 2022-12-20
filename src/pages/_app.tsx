import '../styles/main.scss';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useDarkTheme } from '@/hooks/useDarkTheme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  useDarkTheme();

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
};

export default MyApp;
