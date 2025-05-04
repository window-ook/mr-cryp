import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSituations = async () => {
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
  const endpoint =
    BASE_DOMAIN === 'http://localhost:3000'
      ? '/api/data/market-situation'
      : `/api/data/market-situation/product`;

  const response = await axios.get(endpoint);
  return response.data.data;
};

export function useMarketSituationQuery() {
  return useQuery({
    queryKey: ['situations'],
    queryFn: fetchSituations,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
