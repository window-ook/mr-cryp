import { useEffect, useRef, useState } from 'react';
import { VisionSubTitle } from '@/defaultTheme';
import { Alert, LinearProgress } from '@mui/material';
import useMarketSituationsQuery from '@/hooks/useMarketSituationsQuery';

export default function MarketSituation() {
  const [index, setIndex] = useState(0);
  const { data: situations, error, isPending } = useMarketSituationsQuery();
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const formatDate = pubDate => {
    const date = new Date(pubDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  const today = formatDate(new Date());

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

  if (!situations || situations.length === 0) return <LinearProgress />;

  const currentNews = situations[index];
  const title = currentNews.title
    .replace(/<b>|<\/b>/g, '')
    .replace(/&quot;/g, '')
    .slice(0, 25);
  const description = currentNews.description
    .replace(/<b>|<\/b>/g, '')
    .replace(/&quot;/g, '')
    .slice(0, 30);
  const link = currentNews.link;

  if (isPending) return <LinearProgress />;
  if (error)
    return <Alert severity="error">데이터를 불러오는 중 오류 발생</Alert>;

  return (
    <>
      <header className="flex items-end gap-3">
        <VisionSubTitle>시황</VisionSubTitle>
        <span className="pb-1 text-gray-500 font-ng max-[1525px]:text-xs">
          {today}
        </span>
      </header>
      <article className="relative h-10 p-2 rounded-lg flex items-center">
        <button
          aria-label="기사 링크로 이동하기"
          type="button"
          ref={containerRef}
          className="absolute overflow-hidden whitespace-nowrap text-ellipsis inset-0 flex items-center animate-marqueeY cursor-pointer"
          onClick={() => window.open(link, '_blank')}
        >
          <span className="text-main font-semibold max-[1100px]:text-xs">
            {title}
          </span>
          <span className="text-gray-700 pl-2 max-[1100px]:text-xs">
            {description}...
          </span>
        </button>
      </article>
    </>
  );
}
