import Upbit from '@/lib/upbit';
import Information from '@/components/vision/videos/Information';
import VideosContainer from '@/components/vision/videos/VideosContainer';
import ArticlesContainer from '@/components/vision/articles/ArticlesContainer';
import MarketSituation from '@/components/vision/situation/MarketSituation';
import ExchangeRate from '@/components/vision/exchange-rate/ExchangeRate';
import DailyRised from '@/components/vision/rised-coin/DailyRised';
import WeeklyRised from '@/components/vision/rised-coin/WeeklyRised';

export async function getStaticProps() {
  const upbit = new Upbit();

  let marketCodes = [];

  try {
    marketCodes = marketCodes = (await upbit.marketCodes()) || [];
  } catch (error) {
    console.error('🚨 데이터 요청 실패:', error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 3600,
  };
}

export default function Vision({ marketCodes }) {
  return (
    <div className="py-6 flex flex-col items-center w-full h-full">
      <div className="w-4/5 grid grid-cols-[3fr,2fr] gap-6 h-full">
        {/* 1행 - 실시간 환율 */}
        <section className="col-start-1 p-4 rounded-lg bg-gray-100 shadow h-full">
          <ExchangeRate />
        </section>

        <section className="col-start-2 row-span-2 grid grid-cols-2 gap-4 h-full">
          {/* 오늘 급등 코인 */}
          <div className="p-4 bg-gray-100 rounded-lg shadow h-full">
            <DailyRised marketCodes={marketCodes} />
          </div>

          {/* 이번주 급등 코인 */}
          <div className="p-4 bg-gray-100 rounded-lg shadow h-full">
            <WeeklyRised marketCodes={marketCodes} />
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
            <ArticlesContainer />
          </section>
        </section>

        {/* 3행 1열 */}
        <section className="col-start-1 p-4 bg-gray-100 rounded-lg shadow h-full">
          <VideosContainer />
        </section>

        {/* 3행 2열 */}
        <section className="col-start-2 p-4 bg-gray-100 rounded-lg shadow h-full">
          <Information />
        </section>
      </div>
    </div>
  );
}
