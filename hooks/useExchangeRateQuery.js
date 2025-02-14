import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchExchangeRate = async () => {
  const { data } = await axios.get('/api/exchange-rate');
  return data;
};

export default function useExchangeRate() {
  return useQuery({
    queryKey: ['exchangeRate'],
    queryFn: fetchExchangeRate,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
