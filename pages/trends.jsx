import { fetchExchangeRates } from '@/utils/fetchExchangeRates';
import Head from 'next/head';
import Upbit from '@/lib/upbit';
import ExchangeRate from '@/components/trends/exchange-rate/ExchangeRate';
import TopRisedCoins from '@/components/trends/rised-coin/TopRisedCoins';
import MarketSituation from '@/components/trends/market-situation/MarketSituation';
import Articles from '@/components/trends/articles/Articles';
import Videos from '@/components/trends/videos/Videos';
import Informations from '@/components/trends/videos/Informations';

export async function getStaticProps() {
  const upbit = new Upbit();

  let marketCodes = [];
  let exchangeRates = [];

  try {
    marketCodes = (await upbit.marketCodes()) || [];
    exchangeRates = (await fetchExchangeRates()) || [];
  } catch (error) {
    console.error('🚨 데이터 요청 실패:', error);
  }

  return {
    props: {
      marketCodes,
      exchangeRates,
    },

    revalidate: 3600,
  };
}

export default function Trends({ exchangeRates }) {
  return (
    <>
      <Head>
        <title>코인 트렌드 - 미스터 크립</title>
      </Head>
      <main className="py-6 flex flex-col items-center w-full h-full">
        <div className="w-4/5 grid grid-cols-[3fr,2fr] max-[900px]:grid-cols-1 gap-6 h-full">
          {/* 실시간 환율 */}
          <section className="col-start-1 p-4 rounded-lg bg-gray-100 shadow h-full">
            <ExchangeRate exchangeRates={exchangeRates} />
          </section>

          <section className="col-start-2 max-[900px]:col-start-1 row-span-2 h-full gap-4 ">
            {/* 기간별 상승률 */}
            <article className="p-4 bg-gray-100 rounded-lg shadow h-full">
              <TopRisedCoins />
            </article>
          </section>

          {/* 나머지 섹션들은 그대로 유지 */}
          <section className="col-start-1 grid grid-rows-[auto, 1fr] gap-4 h-full">
            <article className="p-4 bg-sky-200 rounded-lg shadow">
              <MarketSituation />
            </article>
            <article className="p-4 bg-gray-100 rounded-lg shadow h-full">
              <Articles />
            </article>
          </section>

          <section className="col-start-1 p-4 bg-gray-100 rounded-lg shadow h-full">
            <Videos />
          </section>

          <section className="col-start-2 max-[900px]:col-start-1 p-4 bg-gray-100 rounded-lg shadow h-full">
            <Informations />
          </section>
        </div>
      </main>
    </>
  );
}
