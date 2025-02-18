import { memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useWeeklyTopQuery } from '@/hooks/useWeeklyTopQuery';
import { setCode } from '@/utils/redux/chartSlice';
import { LinearProgress } from '@mui/material';
import { VisionSubTitle } from '@/defaultTheme';

function WeeklyRisedCoins({ marketCodes }) {
  const { tickers, weeklyCandles, isLoading } = useWeeklyTopQuery(marketCodes);

  const dispatch = useDispatch();

  const router = useRouter();

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes
      .filter(code => code.market.includes('KRW'))
      .forEach(item => {
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
      .sort((a, b) => b.changeRate - a.changeRate)
      .slice(0, 10); // Top 10 선정
  }, [tickers, weeklyCandles, codeMap]);

  const handleClickCoin = coinName => {
    const marketCode = Object.entries(codeMap).find(
      ([code, name]) => name === coinName,
    )?.[0];
    if (marketCode) {
      dispatch(setCode(marketCode));
      setTimeout(() => {
        router.push('/trade/chart');
      }, 100);
    }
  };

  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <>
      <header>
        <VisionSubTitle>이번주 급등 코인</VisionSubTitle>
      </header>
      <article className="flex flex-col space-y-6 pt-2 overflow-hidden">
        {risingCoins.length > 0 ? (
          risingCoins.map((coin, i) => (
            <div
              key={coin.market}
              className="w-full flex justify-between items-center "
            >
              <div className="w-full flex items-center">
                <span className="w-8 text-left font-ng max-[1580px]:text-sm max-[1525px]:text-xs">
                  {i + 1}
                </span>
                <button
                  aria-label="차트로 이동해서 가격 정보 확인"
                  type="button"
                  className="flex-1 font-ng font-bold text-left truncate cursor-pointer max-[1580px]:text-sm max-[1525px]:text-xs"
                  onClick={() => handleClickCoin(coin.name)}
                >
                  {coin.name}
                </button>
              </div>
              <span className="w-24 font-ng font-bold text-right text-red-500 max-[1580px]:text-sm max-[1525px]:text-xs">
                +{coin.changeRate.toFixed(2)}%
              </span>
            </div>
          ))
        ) : (
          <p>데이터 없음</p>
        )}
      </article>
    </>
  );
}

export default memo(WeeklyRisedCoins);
