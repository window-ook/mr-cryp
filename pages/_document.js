import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* SEO 메타데이터 */}
        <meta charSet="UTF-8" />
        <meta name="author" content="windowook" />
        <meta
          name="keywords"
          content="미스터 크립, 미스터크립, mr cryp, mr-cyrp"
        />
        <meta
          name="google-site-verification"
          content="3HPbFBzWiEOsYaEh2ZfL_U_vgYagKrqu09DJBOSXnBk"
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="미스터 크립 Mr cryp" />
        <meta property="og:url" content="https://mr-cryp.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
