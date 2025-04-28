import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint =
      baseUrl === 'http://localhost:3000'
        ? '/api/coin-articles'
        : `/api/coin-articles/product`;

    const response = await axios.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export function useArticlesQuery() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}
