import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Orderbook from '@/components/trade/chart/orderbook/Orderbook';

function OrderbookProvider() {
  const [orderbookData, setOrderbookData] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);

  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  useEffect(() => {
    if (code) {
      if (code !== currentCode) setCurrentCode(code);
      const fetchOrderbookData = async () => {
        try {
          const response = await axios.get(`/api/orderbook/${code}`);
          const data = response.data;
          setOrderbookData(...data);
        } catch (error) {
          console.error('실시간 오더북 데이터 다운로드 에러: ', error);
        }
      };
      setOrderbookData([0]);
      fetchOrderbookData();
      const interval = setInterval(fetchOrderbookData, intervalTime);
      return () => clearInterval(interval);
    }
  }, [code, currentCode, intervalTime]);

  return <Orderbook orderbookData={orderbookData} />;
}

export default memo(OrderbookProvider);
