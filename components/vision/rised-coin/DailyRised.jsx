import { memo, useMemo } from 'react';
import { LinearProgress } from '@mui/material';
import { useDailyTopQuery } from '@/hooks/useDailyTopQuery';
import { DescriptionTypo, VisionSubTitle } from '@/defaultTheme';

function DailyRised({ marketCodes }) {
  const { tickers, isLoading } = useDailyTopQuery(marketCodes);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  const risingCoins = useMemo(() => {
    if (!tickers.length) return [];

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

  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <>
      <VisionSubTitle>오늘 급등 코인</VisionSubTitle>
      <div className="flex flex-col space-y-4">
        {risingCoins.length > 0 ? (
          risingCoins.map((coin, i) => (
            <div
              key={coin.market}
              className="w-full flex justify-between items-center"
            >
              {/* 인덱스 & 코인명 */}
              <div className="w-full flex">
                <DescriptionTypo className="w-8 text-left">
                  {i + 1}
                </DescriptionTypo>
                <DescriptionTypo className="flex-1 text-left truncate">
                  {coin.name}
                </DescriptionTypo>
              </div>

              {/* 상승률 */}
              <DescriptionTypo className="w-24 text-right text-red-500">
                +{coin.changeRate.toFixed(2)}%
              </DescriptionTypo>
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
