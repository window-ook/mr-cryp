import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTickers = async codes => {
  if (!codes || codes.length === 0) return [];

  const response = await axios.get(`/api/tickers`, {
    params: { codes: codes.join(',') },
  });

  return response.data;
};

const fetchWeeklyCandles = async codes => {
  if (!codes || codes.length === 0) return [];

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

  return await batchRequest(codes, 5);
};

export function useWeeklyTopQuery(marketCodes) {
  const codes = marketCodes
    .filter(code => code.market.includes('KRW'))
    .map(code => code.market)
    .slice(0, 30);

  const { data: tickers = [], isLoading: isLoadingTickers } = useQuery({
    queryKey: ['weekly-tickers', codes],
    queryFn: () => fetchTickers(codes),
    staleTime: 1000 * 60 * 60,
    enabled: !!codes && codes.length > 0,
  });

  const { data: weeklyCandles = [], isLoading: isLoadingCandles } = useQuery({
    queryKey: ['weekly-candles', codes],
    queryFn: () => fetchWeeklyCandles(codes),
    staleTime: 1000 * 60 * 60,
    enabled: !!codes && codes.length > 0,
  });

  return {
    tickers,
    weeklyCandles,
    isLoading: isLoadingTickers || isLoadingCandles,
  };
}
