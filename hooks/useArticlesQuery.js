import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchArticles = async (newKeyword, newCount) => {
  const response = await axios.get('/api/articles', {
    params: { keyword: newKeyword, count: newCount },
  });

  return response.data;
};

export function useArticlesQuery(keyword, count) {
  return useQuery({
    queryKey: ['articles', keyword, count],
    queryFn: () => fetchArticles(keyword, count),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !!keyword && !!count,
  });
}
