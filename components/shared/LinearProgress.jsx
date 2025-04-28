import { useState, useEffect } from 'react';

export default function LinearProgress({
  color = 'bg-main',
  height = 'h-1',
  className = '',
  determinate = false,
  value = 0,
}) {
  const [width, setWidth] = useState(determinate ? value : 0);

  useEffect(() => {
    if (determinate) {
      setWidth(value);
    }
  }, [determinate, value]);

  return (
    <div
      className={`w-full ${height} bg-gray-200 overflow-hidden ${className}`}
    >
      {determinate ? (
        // 정해진 진행률을 보여주는 determinate 모드
        <div
          className={`${color} h-full transition-all duration-300 ease-in-out`}
          style={{ width: `${width}%` }}
        />
      ) : (
        // 무한 로딩 애니메이션을 보여주는 indeterminate 모드
        <div className="relative w-full h-full">
          <div
            className={`absolute top-0 left-0 ${color} h-full animate-linearProgress1 w-[30%]`}
          />
          <div
            className={`absolute top-0 left-0 ${color} h-full animate-linearProgress2 w-[50%]`}
          />
        </div>
      )}
    </div>
  );
}
