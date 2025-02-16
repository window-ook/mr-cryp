import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useDailyTopQuery } from '@/hooks/useDailyTopQuery';
import { memo, useMemo } from 'react';
import { setCode } from '@/utils/redux/chartSlice';
import { LinearProgress } from '@mui/material';
import { VisionSubTitle } from '@/defaultTheme';

function DailyRised({ marketCodes }) {
  const { data: tickers, isLoading } = useDailyTopQuery(marketCodes);

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
    if (!tickers) return [];

    return tickers
      .map(ticker => ({
        market: ticker.market,
        name: codeMap[ticker.market],
        tradePrice: ticker.trade_price,
        openingPrice: ticker.opening_price,
        changeRate:
          ((ticker.trade_price - ticker.opening_price) / ticker.opening_price) *
          100,
      }))
      .sort((a, b) => b.changeRate - a.changeRate)
      .slice(0, 10);
  }, [tickers, codeMap]);

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
      <VisionSubTitle>오늘 급등 코인</VisionSubTitle>
      <div className="flex flex-col space-y-6 pt-2">
        {risingCoins.length > 0 ? (
          risingCoins.map((coin, i) => (
            <div
              key={coin.market}
              className="w-full flex justify-between items-center"
            >
              <div className="w-full flex">
                <span className="w-8 text-left font-ng">{i + 1}</span>
                <span
                  className="flex-1 font-ng font-bold text-left truncate cursor-pointer"
                  onClick={() => handleClickCoin(coin.name)}
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

export default memo(DailyRised);
