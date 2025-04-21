import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TradeHistoryUI from '@/components/exchange/chart/trade-history/TradeHistoryUI';

function TradeHistory() {
  const [tradeData, setTradeData] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);

  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  useEffect(() => {
    if (code) {
      if (code !== currentCode) setCurrentCode(code);
      const fetchTradeData = async () => {
        try {
          const response = await axios.get(`/api/trade-history/${code}`);
          const data = response.data;
          setTradeData(prevTradeData => {
            const newData = data.filter(
              item =>
                !prevTradeData.some(
                  prevItem => prevItem.sequential_id === item.sequential_id,
                ),
            );
            const combinedData = [...newData, ...prevTradeData]
              .sort((a, b) => b.sequential_id - a.sequential_id)
              .slice(0, 30);
            return combinedData;
          });
        } catch (error) {
          console.error('실시간 거래 내역 데이터 다운로드 에러: ', error);
        }
      };
      setTradeData([0]);
      fetchTradeData();
      const interval = setInterval(fetchTradeData, intervalTime);
      return () => clearInterval(interval);
    }
  }, [code, currentCode, intervalTime]);

  return <TradeHistoryUI tradeData={tradeData} />;
}

export default memo(TradeHistory);
