import { fetchExchangeRates } from '@/utils/fetch-exchange-rate';
import Upbit from '@/lib/upbit';
import InformationVideos from '@/components/vision/videos/InformationVideos';
import VideosProvider from '@/components/vision/videos/VideosProvider';
import ArticlesProvider from '@/components/vision/articles/ArticlesProvider';
import MarketSituation from '@/components/vision/market-situation/MarketSituation';
import ExchangeRate from '@/components/vision/exchange-rate/ExchangeRate';
import DailyRisedCoins from '@/components/vision/rised-coin/DailyRisedCoins';
import WeeklyRisedCoins from '@/components/vision/rised-coin/WeeklyRisedCoins';

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

export default function Vision({ marketCodes, exchangeRates }) {
  return (
    <div className="py-6 flex flex-col items-center w-full h-full">
      <div className="w-4/5 grid grid-cols-[3fr,2fr] max-[900px]:grid-cols-1 gap-6 h-full">
        {/* 1행 - 실시간 환율 */}
        <section className="col-start-1 p-4 rounded-lg bg-gray-100 shadow h-full">
          <ExchangeRate exchangeRates={exchangeRates} />
        </section>

        <section className="col-start-2 max-[900px]:col-start-1 row-span-2 grid grid-cols-2 max-[900px]:grid-cols-1 gap-4 h-full">
          {/* 오늘 급등 코인 */}
          <div className="p-4 bg-gray-100 rounded-lg shadow h-full">
            <DailyRisedCoins marketCodes={marketCodes} />
          </div>

          {/* 이번주 급등 코인 */}
          <div className="p-4 bg-gray-100 rounded-lg shadow h-full">
            <WeeklyRisedCoins marketCodes={marketCodes} />
          </div>
        </section>

        {/* 2행 - 시황 소식 & TODAY NEWS (1열) */}
        <section className="col-start-1 grid grid-rows-[auto, 1fr] gap-4 h-full">
          {/* 시황 소식 */}
          <section className="p-4 bg-sky-200 rounded-lg shadow">
            <MarketSituation />
          </section>

          {/* TODAY NEWS */}
          <section className="p-4 bg-gray-100 rounded-lg shadow h-full">
            <ArticlesProvider />
          </section>
        </section>

        {/* 3행 1열 */}
        <section className="col-start-1 p-4 bg-gray-100 rounded-lg shadow h-full">
          <VideosProvider />
        </section>

        {/* 3행 2열 */}
        <section className="col-start-2 max-[900px]:col-start-1 p-4 bg-gray-100 rounded-lg shadow h-full">
          <InformationVideos />
        </section>
      </div>
    </div>
  );
}
