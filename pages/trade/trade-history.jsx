import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Upbit from '@/lib/upbit';
import TradeHistoryUI from '@/components/trade/trade-history/TradeHistoryUI';

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

function TradeHistory({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [tradeData, setTradeData] = useState([]);
  const [currentCode, setCurrentCode] = useState(
    marketCodes?.length ? marketCodes[0]?.market : 'KRW-BTC',
  );

  useEffect(() => {
    if (currentCode) {
      setIsLoading(true);
      const fetchTradeData = async () => {
        try {
          const response = await axios.get(`/api/trade-history/${currentCode}`);
          const data = response.data;

          setTradeData(prevTradeData => {
            const newData = data.filter(
              item =>
                !prevTradeData.some(
                  prevItem => prevItem.sequential_id === item.sequential_id,
                ),
            );

            const updatedTradeData = [...newData.reverse(), ...prevTradeData]
              .sort((a, b) => b.sequential_id - a.sequential_id)
              .slice(0, 20);
            return updatedTradeData;
          });
        } catch (error) {
          console.error('실시간 거래 내역 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
          setIsConnected(true);
        }
      };
      setTradeData([0]);
      fetchTradeData();
      const interval = setInterval(fetchTradeData, 3000);
      return () => clearInterval(interval);
    }
  }, [currentCode]);

  return (
    <TradeHistoryUI
      tradeData={tradeData}
      isConnected={isConnected}
      currentCode={currentCode}
      setCurrentCode={setCurrentCode}
      isLoading={isLoading}
      marketCodes={marketCodes}
    />
  );
}
export default memo(TradeHistory);
