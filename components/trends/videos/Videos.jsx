import { memo } from 'react';
import { useVideosQuery } from '@/hooks/useVideosQuery';
import PendingUI from '../shared/PendingUI';
import VideosUI from './VideosUI';

function Videos() {
  // const { data: videos, isPending, error } = useVideosQuery('코인 추천');

  // if (isPending) return <PendingUI />;

  // if (error) throw new Error('유튜브 영상 다운로드 중 에러가 발생했습니다.');
  const videos = [];

  return <VideosUI videos={videos} />;
}

export default memo(Videos);
