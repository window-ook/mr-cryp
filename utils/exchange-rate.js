import axios from 'axios';

export async function getExchangeRates() {
  try {
    const CURRENCIES = ['USD', 'JPY', 'CNY', 'EUR'];
    const API_KEY = process.env.NEXT_EXCHANGE_RATE_API_KEY;

    if (!API_KEY) {
      console.error('🚨 API 키 없음');
      return null;
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const todayResponse = await axios.get(url);
    const todayRates = todayResponse.data.conversion_rates;

    if (!todayRates || !todayRates['KRW']) {
      throw new Error('🚨 환율 데이터 없음');
    }

    const KRW = todayRates['KRW'];
    const KRW_TO_CURRENCIES = CURRENCIES.map(currency => ({
      currency,
      rate: KRW * (1 / todayRates[currency]),
    }));

    return KRW_TO_CURRENCIES; // ✅ 필요한 데이터만 반환
  } catch (error) {
    console.error('🚨 환율 데이터 요청 실패:', error);
    return null;
  }
}
