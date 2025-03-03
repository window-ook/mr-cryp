import { useEffect, useState } from 'react';
import { DescriptionTypo } from '@/defaultTheme';
import axios from 'axios';
import dynamic from 'next/dynamic';

const LineChart = dynamic(
  () => import('@mui/x-charts/LineChart').then(mod => mod.LineChart),
  { ssr: false },
);

export default function AccountMarketFlow({ flowSize }) {
  const [ripple, setRipple] = useState([]);
  const [etherium, setEtherium] = useState([]);

  const xLabels = ['10월', '11월', '12월', '1월', '2월', '3월'];

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const tickers = ['KRW-ETH', 'KRW-XRP'];

        const responses = await Promise.all(
          tickers.map(ticker =>
            axios.get('/api/candles', {
              params: {
                type: 'months',
                ticker,
                count: 6,
              },
            }),
          ),
        );

        const [ethData, xrpData] = responses.map(response =>
          response.data.map(candle => candle.trade_price / 1000),
        );

        setEtherium(ethData), setRipple(xrpData);
      } catch (error) {
        console.error('월봉 데이터 다운로드 중 에러 발생:', error);
      }
    };

    fetchMonthlyData();
  }, []);

  return (
    <div>
      <DescriptionTypo>보유 코인 시세 변동 (단위: 1000 KRW)</DescriptionTypo>
      <LineChart
        width={flowSize.width}
        height={flowSize.height}
        series={[
          { data: etherium, label: '이더리움' },
          { data: ripple, label: '리플' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}
