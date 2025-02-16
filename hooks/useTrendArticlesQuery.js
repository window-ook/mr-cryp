import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTrendArticles = async (newKeyword, newCount) => {
  const response = await axios.get('/api/articles', {
    params: { keyword: newKeyword, count: newCount },
  });
  console.log(response.data);

  return response.data;
};

export function useTrendArticlesQuery(keyword, count) {
  return useQuery({
    queryKey: ['articles', keyword, count],
    queryFn: () => fetchTrendArticles(keyword, count),
    staleTime: 1000 * 60 * 10,
    enabled: !!keyword && !!count,
  });
}
