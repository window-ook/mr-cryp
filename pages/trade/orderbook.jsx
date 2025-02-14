import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Upbit from '@/lib/upbit';
import OrderbookTable from '@/components/trade/orderbook/OrderbookTable';

export async function getStaticProps() {
  const upbit = new Upbit();
  let marketCodes = [];

  try {
    const rawMarketCodes = await upbit.marketCodes();
    marketCodes = Array.isArray(rawMarketCodes)
      ? rawMarketCodes.slice(0, 200)
      : [];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 3600,
  };
}

function Orderbook({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [orderbookData, setOrderbookData] = useState([]);
  const [currentCode, setCurrentCode] = useState(
    marketCodes?.length ? marketCodes[0]?.market : 'KRW-BTC',
  );

  useEffect(() => {
    if (currentCode) {
      setIsLoading(true);
      const fetchOrderbookData = async () => {
        try {
          const response = await axios.get(`/api/orderbook/${currentCode}`);
          const data = response.data;
          setOrderbookData(...data);
        } catch (error) {
          console.error('실시간 오더북 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
          setIsConnected(true);
        }
      };

      fetchOrderbookData();
      const interval = setInterval(fetchOrderbookData, 3000);
      return () => clearInterval(interval);
    }
  }, [currentCode]);

  return (
    <OrderbookTable
      orderbookData={orderbookData}
      isConnected={isConnected}
      currentCode={currentCode}
      setCurrentCode={setCurrentCode}
      isLoading={isLoading}
      marketCodes={marketCodes}
    />
  );
}
export default memo(Orderbook);
