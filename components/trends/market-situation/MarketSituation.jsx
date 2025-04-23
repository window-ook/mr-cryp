import { memo, useEffect, useRef, useState } from 'react';
import { useMarketSituationQuery } from '@/hooks/useMarketSituationQuery';
import { LinearProgress } from '@mui/material';

function MarketSituation() {
  const [index, setIndex] = useState(0);

  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const formatDate = pubDate => {
    const date = new Date(pubDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  const today = formatDate(new Date());

  const { data: situations, isPending } = useMarketSituationQuery();

  useEffect(() => {
    if (!situations || situations.length === 0) return;

    const startTimer = () => {
      timeoutRef.current = setTimeout(() => {
        setIndex(prevIndex => (prevIndex + 1) % situations.length);
      }, 5000);
    };

    const handleAnimationEnd = () => {
      clearTimeout(timeoutRef.current);
      startTimer();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('animationend', handleAnimationEnd);
    }

    startTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      if (container) {
        container.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [situations, index]);

  if (isPending) return <LinearProgress />;

  const currentNews = situations?.[index];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-end gap-2">
        <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main_dark">
          시황
        </span>
        <span className="text-gray-500 font-ng text-xs">{today}</span>
      </header>
      <article className="relative h-10 p-2 rounded-lg flex items-center">
        <button
          aria-label="기사 링크로 이동하기"
          type="button"
          ref={containerRef}
          className="absolute overflow-hidden whitespace-nowrap text-ellipsis inset-0 flex items-center animate-marqueeY cursor-pointer"
          onClick={() => window.open(currentNews?.url, '_blank')}
        >
          <span className="font-semibold max-[1100px]:text-xs">
            {currentNews?.title}
          </span>
        </button>
      </article>
    </div>
  );
}

export default memo(MarketSituation);
