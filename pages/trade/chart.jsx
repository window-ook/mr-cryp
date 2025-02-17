import { useDispatch } from 'react-redux';
import { setOpen } from '@/utils/redux/chartSlice';
import { HeadTypo } from '@/defaultTheme';
import Upbit from '@/lib/upbit';
import dynamic from 'next/dynamic';
import MarketListProvider from '@/components/trade/chart/market-list/MarketListProvider';
import MarketDetailProvider from '@/components/trade/chart/market-detail/MarketDetailProvider';
import TradeHistoryProvider from '@/components/trade/chart/trade-history/TradeHistoryProvider';
import OrderbookProvider from '@/components/trade/chart/orderbook/OrderbookProvider';

const HighStockChart = dynamic(
  () => import('@/components/trade/chart/high-charts/HighChartsProvider'),
  {
    ssr: false,
  },
);

const ModalProvider = dynamic(
  () => import('@/components/trade/chart/order-modal/ModalProvider'),
  {
    ssr: false,
  },
);

function HighChartProvider() {
  return <HighStockChart />;
}

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

export default function Chart({ marketCodes }) {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  return (
    <div className="mt-12 mb-12">
      <div className="container mx-auto max-w-[75rem] h-[58rem] border border-gray-300 shadow-mainShadow">
        <div className="flex flex-wrap">
          {/* 1열 */}
          <div className="w-full md:w-3/12">
            <MarketListProvider marketCodes={marketCodes} />
          </div>

          {/* 2열 */}
          <div className="w-full md:w-9/12">
            <MarketDetailProvider marketCodes={marketCodes} />

            <div className="relative">
              <HighChartProvider />
              <button
                className="absolute right-2 top-2 bg-main shadow-md p-2 rounded-lg hover:opacity-60 transition duration-200 ease-in"
                onClick={handleOpen}
              >
                <HeadTypo>주문하기</HeadTypo>
              </button>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-7/12">
                <TradeHistoryProvider />
              </div>
              <div className="w-full md:w-5/12">
                <OrderbookProvider />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalProvider handleClose={handleClose} />
    </div>
  );
}
