import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSituations = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint =
    baseUrl === 'http://localhost:3000'
      ? '/api/coin-situation'
      : `${baseUrl}/api/coin-situation/product`;

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
