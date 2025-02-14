import axios from 'axios';

export default async function handler(req, res) {
  const { authCode } = req.body;

  if (!authCode)
    return res.status(400).json({ error: '인증 코드가 필요합니다' });

  try {
    const state = crypto.randomUUID();
    const response = await axios.post(
      'https://nid.naver.com/oauth2.0/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_NAVER_CLIENT_ID,
        client_secret: process.env.NEXT_NAVER_CLIENT_SECRET,
        code: authCode,
        state: encodeURIComponent(state),
      }),
    );

    const data = response.data;
    const accessToken = data.access_token;

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: '액세스 토큰 에러' });
  }
}
