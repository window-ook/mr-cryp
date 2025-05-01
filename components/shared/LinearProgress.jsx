import { useState, useEffect } from 'react';

export default function LinearProgress({ maxValue = 100, height = 'h-8' }) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  useEffect(() => {
    // API 호출을 시뮬레이션 (실제로는 여기서 API 요청을 수행)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // API 호출 시뮬레이션 (0.5초 ~ 2초 사이 지연)
        await new Promise(resolve =>
          setTimeout(resolve, 500 + Math.random() * 1500),
        );

        // 랜덤 값으로 시뮬레이션 (실제로는 API 응답 데이터를 사용)
        const randomValue = Math.floor(Math.random() * 100);
        setValue(randomValue);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* 프로그레스바 컨테이너 */}
      <div
        className={`${height}w-full overflow-hidden rounded-full bg-gray-200`}
      >
        {!isLoading && <div className="h-full bg-blue-500" />}
      </div>

      {/* 로딩 및 값 표시 */}
      <div className="mt-2 text-right text-sm">
        {isLoading ? (
          <div className="animate-pulse text-gray-500">데이터 로딩 중...</div>
        ) : (
          <div className="font-medium text-blue-600">
            {value} / {maxValue} ({percentage.toFixed(1)}%)
          </div>
        )}
      </div>
    </div>
  );
}
