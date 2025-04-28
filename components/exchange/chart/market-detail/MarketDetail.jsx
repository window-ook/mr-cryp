import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MarketDetailUI from './MarketDetailUI';
import LinearProgress from '@/components/shared/LinearProgress';

export default function MarketDetail({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticker, setTicker] = useState([]);
  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  useEffect(() => {
    if (!code) return;

    const fetchTicker = async () => {
      try {
        const response = await axios.get(`/api/upbit/tickers?markets=${code}`);
        setTicker(...response.data);
      } catch (error) {
        console.error('마켓 디테일 다운로드 오류: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, intervalTime);
    return () => clearInterval(interval);
  }, [code, intervalTime]);

  const numColor =
    ticker && ticker.signed_change_rate === 0
      ? 'text-black'
      : ticker && ticker.signed_change_rate > 0
        ? 'text-pos'
        : 'text-neg';

  if (isLoading) return <LinearProgress />;

  const props = {
    codeMap,
    ticker,
    numColor,
  };

  return <MarketDetailUI {...props} />;
}
