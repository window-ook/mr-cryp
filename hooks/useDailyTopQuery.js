import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDailyTickers = async marketCodes => {
  if (!marketCodes || marketCodes.length === 0) return [];

  const codesString = marketCodes
    .filter(code => code.market.includes('KRW'))
    .map(code => code.market)
    .join(',');

  const response = await axios.get(`/api/tickers`, {
    params: { codes: codesString },
  });

  return response.data;
};

export function useDailyTopQuery(marketCodes) {
  const { data: tickers = [], isLoading } = useQuery({
    queryKey: ['daily-tickers', marketCodes],
    queryFn: () => fetchDailyTickers(marketCodes),
    staleTime: 1000 * 60 * 60,
    enabled: !!marketCodes && marketCodes.length > 0,
  });

  return { tickers, isLoading };
}
