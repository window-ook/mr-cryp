import axios from 'axios';

export default async function handler(req, res) {
  const { keyword, count } = req.query;

  if (!keyword || !count)
    return res.status(400).json({ error: '키워드, 기사 개수가 필요합니다' });

  try {
    const textEncoder = new TextEncoder();
    const encoded = textEncoder.encode(keyword);
    const response = await axios.get(
      'https://openapi.naver.com/v1/search/news.json?',
      {
        params: {
          query: encoded,
          display: count,
          start: 1,
          sort: 'sim',
        },
        headers: {
          'X-Naver-Client-Id': process.env.NEXT_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NEXT_NAVER_CLIENT_SECRET,
          Accept: '*/*',
        },
      },
    );
    res.status(200).json(response.data.items);
  } catch (error) {
    console.error('API 호출 실패:', error);
    res.status(500).json({ error: '네이버 API 호출 실패' });
  }
}
