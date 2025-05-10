import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '@/utils/redux/store';
import { LazyMotion } from 'motion/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import localFont from 'next/font/local';
import Layout from '@/layouts/Layout';

const loadFeatures = () => import('@/utils/motion').then(res => res.default);

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const HOME_PAGE = router.pathname === '/';
  const KAKAO_OAUTH_PAGE = router.pathname === '/auth';
  const GOOGLE_OAUTH_PAGE = router.pathname === '/oauth';

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>미스터 크립 Mr.cryp</title>
        </Head>
        <main className={`${pretendard.variable} font-sans`}>
          <LazyMotion features={loadFeatures}>
            {KAKAO_OAUTH_PAGE || GOOGLE_OAUTH_PAGE ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                {HOME_PAGE ? (
                  <Component {...pageProps} />
                ) : (
                  <SessionProvider session={session}>
                    <Component {...pageProps} />
                  </SessionProvider>
                )}
              </Layout>
            )}
          </LazyMotion>
        </main>
      </QueryClientProvider>
    </Provider>
  );
}
