import { useEffect, useState } from 'react';
import { VisionSubTitle } from '@/defaultTheme';
import { Alert, LinearProgress } from '@mui/material';
import useSituationsQuery from '@/hooks/useSituationsQuery';

export default function MarketSituation() {
  const [index, setIndex] = useState(0);

  const { data: situations, error, isPending } = useSituationsQuery();

  const formatDate = pubDate => {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  const today = formatDate(new Date());

  useEffect(() => {
    if (!situations || situations.length === 0) return;

    const timeout = setTimeout(() => {
      setIndex(prevIndex => (prevIndex + 1) % situations.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [index, situations]);

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
      <div className="flex items-end gap-3">
        <VisionSubTitle>시황</VisionSubTitle>
        <span className="pb-1 text-gray-500 font-ng">{today}</span>
      </div>
      <div className="relative h-10 p-2 rounded-lg flex items-center">
        <div
          className="absolute overflow-hidden flex-nowrap text-ellipsis inset-0 flex items-center animate-fade-in-out cursor-pointer"
          onClick={() => window.open(link, '_blank')}
        >
          <span className="text-main font-semibold">{title}</span>
          <span className="text-gray-700 pl-2 ">{description}...</span>
        </div>
      </div>
    </>
  );
}
