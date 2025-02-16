import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { setKeyword } from '@/utils/redux/chartSlice';
import { LinearProgress } from '@mui/material';
import { useWeeklyTopQuery } from '@/hooks/useWeeklyTopQuery';
import { VisionSubTitle } from '@/defaultTheme';

function WeeklyRised({ marketCodes }) {
  const { tickers, weeklyCandles, isLoading } = useWeeklyTopQuery(marketCodes);

  const dispatch = useDispatch();

  const router = useRouter();

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  const risingCoins = useMemo(() => {
    if (!tickers.length || !weeklyCandles.length) return [];

    return weeklyCandles
      .map(({ market, data }) => {
        const ticker = tickers.find(t => t.market === market);
        if (!ticker) return null; // 현재가 데이터가 없으면 스킵

        return {
          market,
          name: codeMap[market],
          tradePrice: ticker.trade_price, // ✅ 현재가
          openingPrice: data.opening_price, // ✅ 주봉 시가
          changeRate:
            ((ticker.trade_price - data.opening_price) / data.opening_price) *
            100,
        };
      })
      .filter(Boolean) // null 값 제거
      .sort((a, b) => b.changeRate - a.changeRate) // 정렬
      .slice(0, 10); // Top 10 선정
  }, [tickers, weeklyCandles, codeMap]);

  const handleKeywordSearch = coinName => {
    dispatch(setKeyword(coinName));
    router.push('/trade/chart');
  };

  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <>
      <VisionSubTitle>이번주 급등 코인</VisionSubTitle>
      <div className="flex flex-col space-y-4">
        {risingCoins.length > 0 ? (
          risingCoins.map((coin, i) => (
            <div
              key={coin.market}
              className="w-full flex justify-between items-center"
            >
              <div className="w-full flex items-center">
                <span className="w-8 text-left font-ng">{i + 1}</span>
                <span
                  className="flex-1 font-ng font-bold text-left truncate cursor-pointer"
                  onClick={() => handleKeywordSearch(coin.name)}
                >
                  {coin.name}
                </span>
              </div>
              <span className="w-24 font-ng font-bold text-right text-red-500">
                +{coin.changeRate.toFixed(2)}%
              </span>
            </div>
          ))
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
    </>
  );
}

export default memo(WeeklyRised);
