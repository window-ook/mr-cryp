import { memo, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import LinearProgress from '@/components/shared/LinearProgress';

function MarketSituation({ situations, isError, isPending }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatDate = pubDate => {
    const date = new Date(pubDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
  };

  const today = formatDate(new Date());

  useEffect(() => {
    if (!situations) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % situations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [situations, currentIndex]);

  const currentNews = situations?.[currentIndex];

  if (isPending) return <LinearProgress />;

  if (isError) {
    return (
      <div className="font-pretendard font-bold text-lg">
        시황 다운로드 중 에러가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      {situations ? (
        <div className="flex flex-col gap-4">
          <header className="flex items-end gap-2">
            <span className="font-pretendard text-main-dark text-xl sm:text-2xl font-bold">
              시황
            </span>
            <span className="text-gray-500 font-ng text-xs">{today}</span>
          </header>
          <article className="relative h-10 p-2 rounded-lg flex items-center">
            <AnimatePresence mode="popLayout">
              <m.button
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-label="기사 링크로 이동하기"
                type="button"
                className="absolute overflow-hidden whitespace-nowrap text-ellipsis inset-0 flex items-center cursor-pointer"
                onClick={() => window.open(currentNews?.url, '_blank')}
              >
                <span className="font-semibold text-sm sm:text-lg">
                  {currentNews?.title}
                </span>
              </m.button>
            </AnimatePresence>
          </article>
        </div>
      ) : (
        <div className="font-pretendard font-bold text-lg">
          시황 다운로드 중 에러가 발생했습니다.
        </div>
      )}
    </>
  );
}

export default memo(MarketSituation);
