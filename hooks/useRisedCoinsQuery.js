import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRisedCoins = async () => {
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
  const endpoint =
    BASE_DOMAIN === 'http://localhost:3000'
      ? '/api/data/rised-coins'
      : '/api/data/rised-coins/product';

  const response = await axios.get(endpoint);
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
