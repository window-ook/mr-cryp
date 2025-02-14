import axios from 'axios';

export default async function handler(req, res) {
  try {
    const CURRENCIES = ['미국 달러', '일본 옌', '위안화', '유로'];
    const AUTH_KEY = process.env.NEXT_KOREA_EXIM_AUTH_KEY;

    if (!AUTH_KEY) {
      console.error('🚨 API 키 없음');
      return res.status(500).json({ error: 'API 키가 누락되었습니다' });
    }

    const formatDate = date => {
      return date.toISOString().split('T')[0].replace(/-/g, '');
    };

    const [TODAY, YESTERDAY] = [
      formatDate(new Date()),
      formatDate(new Date(Date.now() - 86400000)),
    ];

    const urls = [
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${AUTH_KEY}&searchdate=${TODAY}&data=AP01`,
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${AUTH_KEY}&searchdate=${YESTERDAY}&data=AP01`,
    ];

    const [todayRatesResponse, yesterdayRatesResponse] = await Promise.all(
      urls.map(url => axios.get(url)),
    );

    let todayRates = todayRatesResponse.data;
    let yesterdayRates = yesterdayRatesResponse.data;

    if (!Array.isArray(todayRates) || !Array.isArray(yesterdayRates))
      throw new Error('🚨 API 응답 데이터가 배열이 아닙니다');

    const comparison = todayRates
      .filter(rate => CURRENCIES.includes(rate.cur_nm))
      .map(today => {
        const prev = yesterdayRates.find(
          yesterday => yesterday.cur_unit === today.cur_unit,
        );
        const changeRate = prev
          ? ((today.deal_bas_r - prev.deal_bas_r) / prev.deal_bas_r) * 100
          : null;
        return {
          unit: today.cur_unit,
          currency: today.cur_nm,
          rate: today.deal_bas_r,
          changeRate,
        };
      });

    return res.status(200).json(comparison);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '환율 데이터 에러' });
  }
}
