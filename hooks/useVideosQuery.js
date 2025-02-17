import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchVideos = async newKeyword => {
  const response = await axios.get('/api/videos', {
    params: { keyword: newKeyword },
  });
  return response.data;
};

export function useVideosQuery(keyword) {
  return useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => fetchVideos(keyword),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !!keyword,
  });
}
