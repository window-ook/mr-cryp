import axios from 'axios';

export default async function handler(req, res) {
  try {
    const CURRENCIES = ['USD', 'JPY', 'CNY', 'EUR'];
    const API_KEY = process.env.NEXT_EXCHANGE_RATE_API_KEY;

    if (!API_KEY) {
      console.error('🚨 API 키 없음');
      return res.status(500).json({ error: 'API 키가 누락되었습니다' });
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    const todayResponse = await axios.get(url);

    const todayRates = todayResponse.data.conversion_rates;
    const KRW = todayRates['KRW'];
    const KRW_TO_CURRENCIES = CURRENCIES.map(currency => ({
      [currency]: KRW * (1 / todayRates[currency]),
    }));

    console.log(KRW_TO_CURRENCIES);
    return res.status(200).json({ rates: KRW_TO_CURRENCIES });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '환율 데이터 에러' });
  }
}
