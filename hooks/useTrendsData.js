import { useQuery } from '@tanstack/react-query';

const fetchTrendsData = async () => {
  try {
    const BASE_DOMAIN =
      process.env.NEXT_PUBLIC_BASE_DOMAIN || 'http://localhost:3000';
    const endpoint =
      BASE_DOMAIN === 'http://localhost:3000'
        ? '/api/data/trends-data'
        : '/api/data/trends-data/in-production';

    const url = new URL(endpoint, BASE_DOMAIN).toString();
    console.log('Fetching from URL:', url); // URL 확인용 로그

    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        data: errorData,
      });
      throw new Error('트렌드 페이지 통합 데이터 조회 중 에러가 발생했습니다.');
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export function useTrendsDataQuery() {
  return useQuery({
    queryKey: ['trends-data'],
    queryFn: fetchTrendsData,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
}
