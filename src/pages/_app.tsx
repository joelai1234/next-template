import '../styles/main.scss';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { getSession, SessionProvider } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
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

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      console.log('fetchSession', session);
      // if (session) {
      //   const { accessToken, refreshToken, idToken } = session;
      //   localStorage.setItem('accessToken', accessToken);
      //   localStorage.setItem('refreshToken', refreshToken);
      //   localStorage.setItem('idToken', idToken);
      // }
      // router.push('/');
    }

    fetchSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Initialize>{getLayout(<Component {...pageProps} />)}</Initialize>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
