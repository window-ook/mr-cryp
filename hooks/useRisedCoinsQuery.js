import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRisedCoins = async () => {
  const response = await axios.get('/api/upbit/rised-coins');
  const data = response.data.data;
  return data;
};

export function useRisedCoinsQuery() {
  return useQuery({
    queryKey: ['rised-coins'],
    queryFn: fetchRisedCoins,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
