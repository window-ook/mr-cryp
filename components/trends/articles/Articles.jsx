import { memo } from 'react';
import { useArticlesQuery } from '@/hooks/useArticlesQuery';
import PendingUI from '../shared/PendingUI';
import ArticlesUI from './ArticlesUI';

function Articles() {
  const { data: articles, isPending, error } = useArticlesQuery();

  if (isPending) return <PendingUI />;

  if (error) throw new Error('기사 다운로드 중 에러가 발생했습니다.');

  return <ArticlesUI articles={articles} />;
}

export default memo(Articles);
