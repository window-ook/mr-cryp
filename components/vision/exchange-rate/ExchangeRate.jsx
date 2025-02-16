import { LinearProgress } from '@mui/material';
import { VisionSubTitle } from '@/defaultTheme';
import useExchangeRate from '@/hooks/useExchangeRateQuery';

export default function ExchangeRate() {
  const { data: exchangeRateData, isLoading, error } = useExchangeRate();

  if (isLoading)
    return (
      <>
        <VisionSubTitle>실시간 환율</VisionSubTitle>
        <LinearProgress color="primary" />
      </>
    );

  if (error)
    return (
      <>
        <VisionSubTitle>실시간 환율</VisionSubTitle>
        <p>{error.message}</p>
      </>
    );

  return (
    <>
      <VisionSubTitle>오늘 환율</VisionSubTitle>
      <ul className="flex justify-stretch">
        {exchangeRateData?.rates?.map(item => {
          const currency = Object.keys(item)[0];
          const value = item[currency];

          return (
            <li key={currency}>
              <span className="font-ng">
                <span className="font-bold">{currency}</span> {value.toFixed(2)}
                원
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
