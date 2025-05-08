import { useDispatch } from 'react-redux';
import { setOpen } from '@/utils/redux/chartSlice';
import Head from 'next/head';
import Upbit from '@/lib/upbit';
import dynamic from 'next/dynamic';
import MarketList from '@/components/shared/market-list/MarketList';
import MarketDetail from '@/components/exchange/chart/market-detail/MarketDetail';
import TradeHistory from '@/components/exchange/chart/trade-history/TradeHistory';
import Orderbook from '@/components/exchange/chart/orderbook/Orderbook';

const Modal = dynamic(() => import('@/components/exchange/chart/order/Modal'), {
  ssr: false,
});

const CandleChart = dynamic(
  () => import('@/components/exchange/chart/candle-chart/CandleChart'),
  {
    ssr: false,
  },
);

const Chart = () => {
  return <CandleChart />;
};

export async function getStaticProps() {
  const upbit = new Upbit();
  let marketCodes = [];

  try {
    marketCodes = (await upbit.marketCodes()) || [];
  } catch (error) {
    console.error('🚨 마켓 코드 요청 실패:', error.message);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 3600,
  };
}

export default function Exchange({ marketCodes }) {
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  return (
    <>
      <Head>
        <title>거래소 - 미스터 크립</title>
      </Head>
      <main className="mt-12 mb-12">
        <div className="container mx-auto max-w-[80rem] h-[58rem] border border-gray-300">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 1열 */}
            <section className="w-full md:w-3/12">
              <MarketList marketCodes={marketCodes} />
            </section>

            {/* 2열 */}
            <section className="w-full md:w-9/12 flex flex-col gap-4">
              <article>
                <MarketDetail marketCodes={marketCodes} />
              </article>

              <article className="relative rounded-lg s">
                <Chart />
                <button
                  type="button"
                  className="absolute right-2 top-2 bg-main shadow-md p-2 rounded-lg hover:opacity-60 transition duration-200 ease-in"
                  onClick={handleOpen}
                >
                  <span className="font-onetitle text-xl text-white">
                    주문하기
                  </span>
                </button>
              </article>

              <div className="flex flex-col sm:flex-row rounded-lg gap-4">
                <article className="w-full md:w-7/12">
                  <TradeHistory />
                </article>
                <article className="w-full md:w-5/12">
                  <Orderbook />
                </article>
              </div>
            </section>
          </div>
        </div>
        <Modal handleClose={handleClose} />
      </main>
    </>
  );
}
