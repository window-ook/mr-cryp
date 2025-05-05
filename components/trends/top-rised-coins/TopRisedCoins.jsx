import { memo, useEffect, useState } from 'react';
import Skeleton from '../shared/Skeleton';

function TopRisedCoins({ risedCoins, isError, isPending }) {
  const [selectedPeriod, setSelectedPeriod] = useState('oneWeek');

  const PERIODS = [
    { label: '1주일', value: 'oneWeek' },
    { label: '1개월', value: 'oneMonth' },
    { label: '3개월', value: 'threeMonths' },
    { label: '6개월', value: 'sixMonths' },
    { label: '1년', value: 'oneYear' },
  ];

  const getSortedCoins = () => {
    if (!risedCoins) return;

    return [...risedCoins]
      .sort((a, b) => {
        const aValue =
          parseFloat(a.periods[selectedPeriod]?.replace('%', '')) || -Infinity;
        const bValue =
          parseFloat(b.periods[selectedPeriod]?.replace('%', '')) || -Infinity;
        return bValue - aValue;
      })
      .slice(0, 15);
  };

  if (isPending) return <Skeleton />;

  if (isError) {
    return (
      <div className="font-pretendard font-bold text-lg">
        기간별 상승률 다운로드 중 에러가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      {risedCoins && risedCoins.length > 0 ? (
        <div className="w-full flex flex-col gap-4">
          <p className="mb-2 text-2xl max-[475px]:text-xl font-pretendard font-bold text-main-dark">
            기간별 상승률 TOP
          </p>

          <div className="w-full flex flex-col gap-4 mb-4">
            {/* 기간 선택 셀렉터(476px 이상) */}
            <div className="flex gap-2 bg-gray-100 rounded-lg max-[475px]:hidden">
              {PERIODS?.map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-md max-[530px]:text-xs transition-all duration-200 ${
                    selectedPeriod === period.value
                      ? 'bg-main text-white font-medium shadow-xs'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* 기간 선택 셀렉터(475px 이하) */}
            <div className="hidden max-[475px]:block w-full">
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 rounded-md text-sm bg-white border border-gray-200"
              >
                {PERIODS.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex flex-col gap-6">
              <div className="grid grid-cols-12 gap-4 px-2 border-dashed border-2 border-main-light bg-white text-gray-500 text-sm text-center">
                <div className="col-span-4">자산</div>
                <div className="col-span-4">마켓</div>
                <div className="col-span-4">상승률</div>
              </div>

              {getSortedCoins().map(coin => (
                <div
                  key={coin.name}
                  className="grid grid-cols-12 gap-4 px-2 items-center"
                >
                  <span className="col-span-4 font-ng">{coin.name}</span>
                  <span className="col-span-4 font-ng text-xs lg:text-base text-gray-400">
                    {coin.marketCode}
                  </span>
                  <span className="col-span-4 text-red-500 text-right">
                    {coin.periods[selectedPeriod]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="font-pretendard font-bold text-lg">
          기간별 상승률 다운로드 중 에러가 발생했습니다.
        </div>
      )}
    </>
  );
}

export default memo(TopRisedCoins);
