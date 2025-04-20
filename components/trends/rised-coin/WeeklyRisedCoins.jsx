import { memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useWeeklyTopQuery } from '@/hooks/useWeeklyTopQuery';
import { setCode } from '@/utils/redux/chartSlice';
import { VisionSubTitle } from '@/defaultTheme';

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6 pt-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-full flex items-center">
        <div className="w-8 h-4 bg-gray-200 rounded" />
        <div className="flex-1 h-4 bg-gray-200 rounded mx-2" />
        <div className="w-[5.5rem] h-4 bg-gray-200 rounded shrink-0" />
      </div>
    ))}
  </div>
);

const CoinItem = memo(({ coin, index, onClickCoin }) => (
  <div className="w-full flex items-center group hover:bg-gray-50 p-2 rounded-lg transition-colors">
    <span className="w-8 text-left font-ng text-base text-gray-600 group-hover:text-gray-900 transition-colors shrink-0">
      {index + 1}
    </span>
    <button
      aria-label={`${coin.name} 차트로 이동`}
      type="button"
      className="flex-1 min-w-0 font-ng font-bold text-left text-gray-900 hover:text-blue-600 transition-colors mx-2"
      onClick={() => onClickCoin(coin.name)}
    >
      <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
        {coin.name}
      </span>
    </button>
    <span className="w-[5.5rem] font-ng font-bold text-right text-red-500 tabular-nums shrink-0">
      +{coin.changeRate.toFixed(2)}%
    </span>
  </div>
));

CoinItem.displayName = 'CoinItem';

function WeeklyRisedCoins({ marketCodes }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const krwMarketCodes = useMemo(
    () => marketCodes.filter(code => code.market.includes('KRW')).slice(0, 30),
    [marketCodes],
  );

  const { tickers, weeklyCandles, isLoading } =
    useWeeklyTopQuery(krwMarketCodes);

  const codeMap = useMemo(() => {
    const map = {};
    krwMarketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [krwMarketCodes]);

  const risingCoins = useMemo(() => {
    if (!tickers.length || !weeklyCandles.length) return [];

    const tickerMap = new Map(tickers.map(ticker => [ticker.market, ticker]));

    return weeklyCandles
      .map(({ market, data }) => {
        const ticker = tickerMap.get(market);
        if (!ticker) return null;

        const changeRate =
          ((ticker.trade_price - data.opening_price) / data.opening_price) *
          100;

        if (changeRate <= 0) return null;

        return {
          market,
          name: codeMap[market],
          changeRate,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.changeRate - a.changeRate)
      .slice(0, 5);
  }, [tickers, weeklyCandles, codeMap]);

  const handleClickCoin = coinName => {
    const marketCode = Object.entries(codeMap).find(
      ([, name]) => name === coinName,
    )?.[0];

    if (marketCode) {
      dispatch(setCode(marketCode));
      router.push('/trade/chart');
    }
  };

  return (
    <div>
      <header className="mb-4">
        <VisionSubTitle>이번주 급등 코인</VisionSubTitle>
      </header>
      <article className="min-h-[280px]">
        {isLoading ? (
          <SkeletonLoader />
        ) : risingCoins.length > 0 ? (
          <div className="space-y-2">
            {risingCoins.map((coin, i) => (
              <CoinItem
                key={coin.market}
                coin={coin}
                index={i}
                onClickCoin={handleClickCoin}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[280px] text-gray-500">
            데이터가 없습니다
          </div>
        )}
      </article>
    </div>
  );
}

export default memo(WeeklyRisedCoins);
