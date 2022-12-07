import '../styles/main.scss';

import type { AppProps } from 'next/app';

import Layout from '@/containers/Layout';
import { useDarkTheme } from '@/hooks/useDarkTheme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useDarkTheme();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
