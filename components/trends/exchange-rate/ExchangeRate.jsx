export default function ExchangeRate({ exchangeRates }) {
  return (
    <>
      <header>
        <span className="font-pretendard text-[1.5rem] font-bold text-main">
          오늘 환율
        </span>
      </header>
      <ul className="flex justify-between">
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
