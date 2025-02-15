import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTickers = async marketCodes => {
  if (!marketCodes || marketCodes.length === 0) return [];

  const codes = marketCodes
    .filter(code => code.market.includes('KRW'))
    .map(code => code.market)
    .slice(0, 30);

  const response = await axios.get(`/api/tickers`, {
    params: { codes: codes.join(',') },
  });

  return response.data;
};

const fetchWeeklyCandles = async marketCodes => {
  if (!marketCodes || marketCodes.length === 0) return [];

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
      await new Promise(res => setTimeout(res, 500));
    }
    return results;
  };

  const codes = marketCodes
    .filter(code => code.market.includes('KRW'))
    .map(code => code.market)
    .slice(0, 30);

  return await batchRequest(codes, 5);
};

export function useWeeklyTopQuery(marketCodes) {
  // 현재가 데이터
  const { data: tickers = [], isLoading: isLoadingTickers } = useQuery({
    queryKey: ['weekly-tickers', marketCodes],
    queryFn: () => fetchTickers(marketCodes),
    staleTime: 1000 * 60 * 60,
    enabled: !!marketCodes && marketCodes.length > 0,
  });

  // 주봉 캔들 데이터
  const { data: weeklyCandles = [], isLoading: isLoadingCandles } = useQuery({
    queryKey: ['weekly-candles', marketCodes],
    queryFn: () => fetchWeeklyCandles(marketCodes),
    staleTime: 1000 * 60 * 60,
    enabled: !!marketCodes && marketCodes.length > 0,
  });

  return {
    tickers,
    weeklyCandles,
    isLoading: isLoadingTickers || isLoadingCandles,
  };
}
