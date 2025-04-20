import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
import Layout from '@/layouts/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Index from './index';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const ProtectedRoute = dynamic(
  () => import('@/components/auth/ProtectedRoute'),
  {
    ssr: false,
  },
);

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const isRoot = router.pathname === '/';
  const isAuth = router.pathname === '/auth';
  const isKakaoRedirecting = router.pathname === '/auth';
  const isNaverRedirecting = router.pathname === '/oauth';

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>미스터 크립 Mr.cryp</title>
          </Head>

          <main className={`${pretendard.variable} font-sans`}>
            {isAuth || isKakaoRedirecting || isNaverRedirecting ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                {isRoot ? (
                  <Index />
                ) : (
                  <ProtectedRoute>
                    <Component {...pageProps} />
                  </ProtectedRoute>
                )}
              </Layout>
            )}
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
