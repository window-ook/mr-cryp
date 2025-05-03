import { useState, useEffect } from 'react';

export default function LinearProgress({ maxValue = 100, height = 'h-2' }) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      setIsLoading(true);
      setValue(0);

      // 가짜 진행률 증가
      interval = setInterval(() => {
        setValue(prev => (prev < maxValue - 10 ? prev + 5 : prev));
      }, 100);

      try {
        // 2초 정도 후 100%
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        clearInterval(interval);
        setValue(maxValue);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => clearInterval(interval);
  }, [maxValue]);

  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="w-full">
      <div className="mt-2 text-right text-sm">
        {isLoading ? (
          <div
            className={`${height} w-full overflow-hidden rounded-full bg-gray-200`}
          >
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${percentage}%` }}
            />
          </div>
        ) : (
          <div
            className={`${height} w-full overflow-hidden rounded-full bg-gray-200`}
          >
            <div className="h-full bg-blue-500" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
}
