import { VisionSubTitle } from '@/defaultTheme';
import { Snackbar, Alert } from '@mui/material';

export default function Articles({ articles, open, handleClose }) {
  const formatDate = pubDate => {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  const formattedArticles = articles.map(article => ({
    ...article,
    pubDate: formatDate(article.pubDate),
  }));

  return (
    <>
      <header>
        <VisionSubTitle>트렌드 뉴스</VisionSubTitle>
      </header>
      <article className="grid grid-cols-2 gap-2">
        {formattedArticles.slice(0, 6).map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');

          return (
            <div key={article.link} className="flex pb-2">
              <button
                aria-label="기사 원본으로 이동하기"
                type="button"
                className="whitespace-nowrap overflow-hidden text-ellipsis font-ng max-[1100px]:text-xs cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                onClick={() => window.open(article.originallink, '_blank')}
              >
                {title}
              </button>
            </div>
          );
        })}
        {formattedArticles.slice(6).map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');

          return (
            <div key={article.link} className="flex pb-2">
              <button
                type="button"
                className="whitespace-nowrap overflow-hidden text-ellipsis font-ng max-[1100px]:text-xs cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                onClick={() => window.open(article.originallink, '_blank')}
              >
                {title}
              </button>
            </div>
          );
        })}
      </article>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          링크가 클립보드에 복사되었습니다
        </Alert>
      </Snackbar>
    </>
  );
}
