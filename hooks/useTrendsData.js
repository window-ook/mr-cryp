import { useQuery } from '@tanstack/react-query';

const fetchTrendsData = async () => {
  try {
    const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;

    // Vercel
    if (BASE_DOMAIN !== 'http://localhost:3000') {
      const [marketSituationRes, topicRes, topRisedCoinsRes] =
        await Promise.all([
          fetch('/data/mock/market-situation.json'),
          fetch('/data/mock/topic.json'),
          fetch('/data/mock/top-rised-coins.json'),
        ]);

      const [marketSituation, topic, topRisedCoins] = await Promise.all([
        marketSituationRes.json(),
        topicRes.json(),
        topRisedCoinsRes.json(),
      ]);

      return {
        marketSituation,
        topic,
        topRisedCoins,
      };
    }

    // 로컬
    const END_POINT = '/api/data/trends-data';
    const url = new URL(END_POINT, BASE_DOMAIN).toString();
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
