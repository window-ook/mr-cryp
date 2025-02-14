import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSituations = async () => {
  const response = await axios.get('/api/articles', {
    params: { keyword: '코스피', count: 8 },
  });
  return response.data;
};

export default function useSituationsQuery() {
  return useQuery({
    queryKey: ['situation'],
    queryFn: fetchSituations,
    staleTime: 1000 * 60 * 10, // 1시간
    cacheTime: 1000 * 60 * 10, // 1시간
    refetchOnWindowFocus: false,
  });
}
