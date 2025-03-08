import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '@/utils/redux/store';
import { theme } from '@/defaultTheme';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Index from './index';

const Layout = dynamic(() => import('@/layouts/Layout'), { ssr: false });

const ProtectedRoute = dynamic(
  () => import('@/components/auth/ProtectedRoute'),
  {
    ssr: false,
  },
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const isRoot = router.pathname === '/';
  const isSignIn = router.pathname === '/signin';
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

          {isSignIn || isKakaoRedirecting || isNaverRedirecting ? (
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
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
