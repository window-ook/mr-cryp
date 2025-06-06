import Upbit from '@/lib/upbit';

export default async function handler(req, res) {
  const { type, ticker, count, unit, to } = req.query;

  if (!type || !ticker || !count)
    return res.status(400).json({ error: 'type, ticker, count는 필수입니다' });

  try {
    const upbit = new Upbit();

    let data;
    switch (type) {
      case '1min':
      case '5min':
        if (!unit) {
          return res.status(400).json({ error: 'unit(몇 분)을 입력하세요.' });
        }
        data = await upbit.candleMinutes(unit, ticker, count, to);
        break;
      case 'days':
        data = await upbit.candleDays(ticker, count);
        break;
      case 'day':
        data = await upbit.candleSpeicificDay(ticker, count, to);
        break;
      case 'weeks':
        data = await upbit.candleWeeks(ticker, count);
        break;
      case 'months':
        data = await upbit.candleMonths(ticker, count);
        break;
      default:
        return res.status(400).json({ error: '유효하지 않은 타입입니다.' });
    }

    if (!data) {
      return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('캔들 데이터 요청 실패:', error);
    return res.status(500).json({
      error: '캔들 데이터 요청 실패',
      message: error.message,
      details: error.response?.data || error.toString(),
    });
  }
}
