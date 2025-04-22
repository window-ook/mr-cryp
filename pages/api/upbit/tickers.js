import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  if (!req.query.markets)
    return res.status(400).json({ error: '마켓 코드가 필요합니다' });

  try {
    const upbit = new Upbit();

    const response = await upbit.currentPrice(req.query.markets);
    const data = await response.data;

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: '현재가 정보를 가져오는 데에 실패했습니다.' });
  }
}
