import { memo } from 'react';
import Skeleton from '../shared/Skeleton';
import ArticlesUI from './ArticlesUI';

function Articles({ articles, isPending }) {
  if (isPending) return <Skeleton />;
  return (
    <>
      {articles ? (
        <ArticlesUI articles={articles} />
      ) : (
        <div className="font-pretendard font-bold text-lg">
          글로벌 토픽 다운로드 중 에러가 발생했습니다.
        </div>
      )}
    </>
  );
}

export default memo(Articles);
