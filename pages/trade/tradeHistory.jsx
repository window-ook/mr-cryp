import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import TradeHistoryTable from '@/components/trade/tradeHistory/TradeHistoryTable';

export async function getStaticProps() {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  let marketCodes = [];

  try {
    const response = await axios.get(`${domain}/api/marketCodes`);
    marketCodes = response.data.marketCodes.slice(0, 200);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 60,
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
          const response = await axios.get(`/api/trade/${currentCode}`);
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
    <TradeHistoryTable
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
