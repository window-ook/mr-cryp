import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  try {
    const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
    const endpoint =
      BASE_DOMAIN === 'http://localhost:3000'
        ? '/api/data/articles'
        : `/api/data/articles/product`;

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
