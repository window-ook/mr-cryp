import { memo, useMemo, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import axios from 'axios';

function DailyRised({ marketCodes }) {
  const [tickers, setTickers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  const risingCoins = useMemo(() => {
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

  useEffect(() => {
    if (!marketCodes || marketCodes.length === 0) return;

    const fetchTickers = async () => {
      setIsLoading(true);
      try {
        const codesString = marketCodes
          .filter(code => code.market.includes('KRW'))
          .map(code => code.market)
          .join(',');

        const response = await axios.get(`/api/tickers`, {
          params: { codes: codesString },
        });
        setTickers(response.data);
      } catch (error) {
        console.error('마켓 리스트 다운로드 오류: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickers();
  }, [marketCodes]);

  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <>
      {risingCoins.length > 0 ? (
        risingCoins.map((coin, i) => (
          <div key={coin.market} className="flex gap-4">
            <span>{i + 1}</span>
            <span>{coin.name}</span>
            <span>{coin.changeRate.toFixed(2)}%</span>
          </div>
        ))
      ) : (
        <p>데이터 없음</p>
      )}
    </>
  );
}

export default memo(DailyRised);
