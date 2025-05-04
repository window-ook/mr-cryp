import { fetchExchangeRates } from '@/utils/fetchExchangeRates';
import Head from 'next/head';
import ExchangeRate from '@/components/trends/exchange-rate/ExchangeRate';
import TopRisedCoins from '@/components/trends/rised-coin/TopRisedCoins';
import MarketSituation from '@/components/trends/market-situation/MarketSituation';
import Articles from '@/components/trends/articles/Articles';
import Videos from '@/components/trends/videos/Videos';
import Informations from '@/components/trends/videos/Informations';
import { useTrendsDataQuery } from '@/hooks/useTrendsData';

export async function getStaticProps() {
  let exchangeRates = [];

  try {
    exchangeRates = (await fetchExchangeRates()) || [];
  } catch (error) {
    console.error('🚨 데이터 요청 실패:', error);
  }

  return {
    props: {
      exchangeRates,
    },

    revalidate: 3600,
  };
}

export default function Trends({ exchangeRates }) {
  const { data, isPending } = useTrendsDataQuery();

  return (
    <>
      <Head>
        <title>오늘 트렌드 - 미스터 크립</title>
      </Head>
      <main className="py-6 flex flex-col items-center w-full h-full">
        <div className="w-4/5 grid grid-cols-[3fr_2fr] max-[900px]:grid-cols-1 gap-6 h-full">
          <section className="col-start-1 p-4 rounded-lg bg-gray-100 shadow-sm h-full">
            <ExchangeRate exchangeRates={exchangeRates} />
          </section>

          <section className="col-start-2 max-[900px]:col-start-1 row-span-2 h-full gap-4 ">
            <article className="p-4 bg-gray-100 rounded-lg shadow-sm h-full">
              <TopRisedCoins risedCoins={data?.coins} isPending={isPending} />
            </article>
          </section>

          <section className="col-start-1 grid grid-rows-[auto, 1fr] gap-4 h-full">
            <article className="p-4 bg-emerald-200 rounded-lg shadow-sm">
              <MarketSituation
                situations={data?.marketSituation}
                isPending={isPending}
              />
            </article>
            <article className="p-4 bg-gray-100 rounded-lg shadow-sm h-full">
              <Articles articles={data?.articles} isPending={isPending} />
            </article>
          </section>

          <section className="col-start-1 p-4 bg-gray-100 rounded-lg shadow-sm h-full">
            <Videos />
          </section>

          <section className="col-start-2 max-[900px]:col-start-1 p-4 bg-gray-100 rounded-lg shadow-sm h-full">
            <Informations />
          </section>
        </div>
      </main>
    </>
  );
}
