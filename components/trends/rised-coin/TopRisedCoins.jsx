import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';

export default function TopRisedCoins() {
  const [selectedPeriod, setSelectedPeriod] = useState('1주일');
  const [risedCoins, setRisedCoins] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/api/upbit/rised-coins');
    const data = response.data.data;
    console.log(data);
    setRisedCoins(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const PERIODS = [
    { label: '1주일', value: 'oneWeek' },
    { label: '1개월', value: 'oneMonth' },
    { label: '3개월', value: 'threeMonths' },
    { label: '6개월', value: 'sixMonths' },
    { label: '1년', value: 'oneYear' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <p className="text-2xl font-pretendard font-bold text-main">
        기간별 상승률
      </p>

      <div className="w-full flex flex-col gap-4">
        {/* 기간 선택 셀렉터 */}
        <div className="flex gap-2 bg-gray-100 rounded-lg">
          {PERIODS?.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                selectedPeriod === period.value
                  ? 'bg-main text-white font-medium shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* 코인 리스트 - 더보기 확장가능 */}
        <div className="w-full flex flex-col gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            {risedCoins.map(coin => (
              <div key={coin.name} className="flex justify-between">
                <div>
                  <span>{coin.name}</span>
                  <span>({coin.market})</span>
                </div>
                <span>{coin.periods.oneWeek}</span>
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
