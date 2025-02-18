import { VisionSubTitle } from '@/defaultTheme';

export default function ExchangeRate({ exchangeRates }) {
  return (
    <>
      <header>
        <VisionSubTitle>오늘 환율</VisionSubTitle>
      </header>
      <ul className="flex justify-stretch">
        {exchangeRates.map(({ currency, rate }) => {
          return (
            <li key={currency}>
              <span className="font-ng max-[1100px]:text-xs">
                <span className="font-bold">{currency}</span> {rate.toFixed(2)}
                원
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
