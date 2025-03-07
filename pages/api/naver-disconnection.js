import axios from 'axios';

export default async function handler(req, res) {
  const { accessToken } = req.body;

  if (!accessToken)
    return res.status(400).json({ error: '액세스 토큰이 필요합니다' });

  try {
    const response = await axios.post(
      'https://nid.naver.com/oauth2.0/token',
      new URLSearchParams({
        grant_type: 'delete',
        client_id: process.env.NEXT_NAVER_CLIENT_ID,
        client_secret: process.env.NEXT_NAVER_CLIENT_SECRET,
        access_token: accessToken,
        service_provider: 'NAVER',
      }),
    );

    if (response.data.result === 'success')
      res.status(200).json({ message: '네이버 로그인 연동 해제 성공' });
  } catch (error) {
    res.status(500).json({ error: '네이버 로그인 연동 해제 에러' });
  }
}
