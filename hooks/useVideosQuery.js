import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchVideos = async newKeyword => {
  // const response = await axios.get('/api/videos', {
  //   params: { keyword: newKeyword },
  // });
  const response = await axios.get('/data/videos.json', {
    params: { keyword: newKeyword },
  });
  return response.data.items;
};

export function useVideosQuery(keyword) {
  return useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      const data = await fetchVideos(keyword);
      data.sort((a, b) => {
        const dateA = new Date(a.snippet.publishTime);
        const dateB = new Date(b.snippet.publishTime);
        return dateB - dateA;
      });
      return data.slice(0, 8);
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !!keyword,
    refetchOnWindowFocus: false,
  });
}
