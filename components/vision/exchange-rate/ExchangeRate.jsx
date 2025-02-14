import { LinearProgress } from '@mui/material';

import useExchangeRate from '@/hooks/useExchangeRateQuery';

export default function ExchangeRate() {
  const { data: exchangeRateData, isLoading, error } = useExchangeRate();

  if (isLoading) return <LinearProgress color="primary" />;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul className="flex gap-4">
        {Array.isArray(exchangeRateData) &&
          exchangeRateData.map(item => (
            <li key={item.currency}>
              <span>{item.currency}</span>
              <span>{item.rate}</span>
              {!!item.changeRate && (
                <span>
                  ({item.changeRate > 0 ? '▲' : '▼'}{' '}
                  {item.changeRate.toFixed(2)}%)
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
