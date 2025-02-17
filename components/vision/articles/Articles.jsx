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
      <div>
        <VisionSubTitle>TODAY NEWS</VisionSubTitle>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {formattedArticles.slice(0, 6).map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');

          return (
            <div key={article.link} className="flex pb-2">
              <span
                className="whitespace-nowrap overflow-hidden text-ellipsis font-ng max-[1100px]:text-xs cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                onClick={() => window.open(article.originallink, '_blank')}
              >
                {title}
              </span>
            </div>
          );
        })}
        {formattedArticles.slice(6).map(article => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');

          return (
            <div key={article.link} className="flex pb-2">
              <span
                className="whitespace-nowrap overflow-hidden text-ellipsis font-ng max-[1100px]:text-xs cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                onClick={() => window.open(article.originallink, '_blank')}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          링크가 클립보드에 복사되었습니다
        </Alert>
      </Snackbar>
    </>
  );
}
