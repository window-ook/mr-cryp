import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import TradeHistory from '@/components/trade/chart/tradeHistory/TradeHistory';

function TradeHistoryContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);

  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  useEffect(() => {
    if (code) {
      if (code !== currentCode) setCurrentCode(code);
      let firstLoad = true;
      const fetchTradeData = async () => {
        if (firstLoad)
          try {
            const response = await axios.get(`/api/trade/${code}`);
            const data = response.data;
            setTradeData(prevTradeData => {
              const newData = data.filter(
                item =>
                  !prevTradeData.some(
                    prevItem => prevItem.sequential_id === item.sequential_id,
                  ),
              );
              const combinedData = [...newData, ...prevTradeData]
                .sort((a, b) => b.sequential_id - a.sequential_id) // 최신순 정렬
                .slice(0, 30);
              return combinedData;
            });
          } catch (error) {
            console.error('실시간 거래 내역 데이터 다운로드 에러: ', error);
          } finally {
            if (firstLoad) {
              setIsLoading(false);
              firstLoad = false;
            }
          }
      };
      setTradeData([0]);
      fetchTradeData();
      const interval = setInterval(fetchTradeData, intervalTime);
      return () => clearInterval(interval);
    }
  }, [code, currentCode, intervalTime]);

  if (isLoading) <LinearProgress color="primary" />;

  return <TradeHistory tradeData={tradeData} />;
}

export default memo(TradeHistoryContainer);
