import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
import { LazyMotion } from 'motion/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Layout from '@/layouts/Layout';

const loadFeatures = () => import('@/utils/motion').then(res => res.default);

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const ProtectedRoute = dynamic(
  () => import('@/components/layout/ProtectedRoute'),
  {
    ssr: false,
  },
);

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const ROOT_URL = router.pathname === '/';
  const AUTH_URL = router.pathname === '/auth';
  const OAUTH_URL = router.pathname === '/oauth';

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>미스터 크립 Mr.cryp</title>
          </Head>

          <main className={`${pretendard.variable} font-sans`}>
            <LazyMotion features={loadFeatures}>
              {AUTH_URL || OAUTH_URL ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  {ROOT_URL ? (
                    <Component {...pageProps} />
                  ) : (
                    <ProtectedRoute>
                      <Component {...pageProps} />
                    </ProtectedRoute>
                  )}
                </Layout>
              )}
            </LazyMotion>
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
