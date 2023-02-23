import '../styles/main.scss';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Initialize from '@/containers/Layout/Initialize';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  // useDarkTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Initialize>{getLayout(<Component {...pageProps} />)}</Initialize>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
