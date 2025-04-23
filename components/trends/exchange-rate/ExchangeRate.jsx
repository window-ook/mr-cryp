import { memo } from 'react';

function ExchangeRate({ exchangeRates }) {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main_dark">
          오늘 환율
        </span>
      </header>
      <div className="flex items-center">
        <ul className="flex justify-between w-full">
          {exchangeRates.map(({ currency, rate }) => {
            return (
              <li key={currency}>
                <span className="font-ng max-[1100px]:text-xs">
                  <span className="font-bold">{currency}</span>{' '}
                  {rate.toFixed(2)}원
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
