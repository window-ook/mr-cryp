import { memo, useMemo, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import axios from 'axios';

function WeeklyRised({ marketCodes }) {
  const [tickers, setTickers] = useState([]);
  const [weeklyCandles, setWeeklyCandles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  useEffect(() => {
    if (!marketCodes || marketCodes.length === 0) return;

    const fetchTickers = async () => {
      try {
        const codes = marketCodes
          .filter(code => code.market.includes('KRW'))
          .map(code => code.market)
          .slice(0, 30);

        const response = await axios.get(`/api/tickers`, {
          params: { codes: codes.join(',') },
        });
        setTickers(response.data);
      } catch (error) {
        console.error('🚨 현재가 데이터 가져오기 실패:', error);
      }
    };

    fetchTickers();
  }, [marketCodes]);

  useEffect(() => {
    if (!marketCodes || marketCodes.length === 0) return;

    const batchRequest = async (codes, batchSize = 3) => {
      const results = [];
      for (let i = 0; i < codes.length; i += batchSize) {
        const batch = codes.slice(i, i + batchSize);
        const responses = await Promise.all(
          batch.map(code =>
            axios
              .get(`/api/candles`, {
                params: { type: 'weeks', ticker: code, count: 1 },
              })
              .then(res => ({ market: code, data: res.data[0] }))
              .catch(() => null),
          ),
        );
        results.push(...responses.filter(Boolean));
        await new Promise(res => setTimeout(res, 500)); // 요청 간격 조정
      }
      return results;
    };

    const fetchWeeklyCandles = async () => {
      setIsLoading(true);
      try {
        const codes = marketCodes
          .filter(code => code.market.includes('KRW'))
          .map(code => code.market)
          .slice(0, 30);

        const validCandles = await batchRequest(codes, 5);
        setWeeklyCandles(validCandles);
      } catch (error) {
        console.error('🚨 주봉 데이터 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyCandles();
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

export default memo(WeeklyRised);
