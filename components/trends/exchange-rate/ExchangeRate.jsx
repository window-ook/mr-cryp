import { memo } from 'react';

function ExchangeRate({ exchangeRates }) {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main-dark">
          오늘 환율
        </span>
      </header>
      <div className="flex items-center">
        <ul className="flex justify-between w-full">
          {exchangeRates.map(({ currency, rate }) => {
            return (
              <li key={currency}>
                <span className="flex flex-col sm:flex-row gap-2 font-ng [1100px]:text-lg">
                  <span className="text-xs sm:text-lg font-bold text-blue-500">
                    {currency}
                  </span>
                  <span className="text-xs sm:text-lg">
                    {rate.toFixed(2)}원
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default memo(ExchangeRate);
