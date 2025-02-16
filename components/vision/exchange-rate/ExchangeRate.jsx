import { VisionSubTitle } from '@/defaultTheme';

export default function ExchangeRate({ exchangeRates }) {
  return (
    <>
      <VisionSubTitle>오늘 환율</VisionSubTitle>
      <ul className="flex justify-stretch">
        {exchangeRates.map(({ currency, rate }) => {
          return (
            <li key={currency}>
              <span className="font-ng">
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
