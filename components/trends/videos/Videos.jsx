import { memo } from 'react';
import { useVideosQuery } from '@/hooks/useVideosQuery';
import Skeleton from '../shared/Skeleton';
import Video from './Video';

function Videos() {
  const { data: videos, isPending, error } = useVideosQuery('코인 추천');

  if (isPending) return <Skeleton />;

  if (error) throw new Error('유튜브 영상 다운로드 중 에러가 발생했습니다.');

  return (
    <article className="w-full flex flex-col gap-4">
      <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main-dark">
        트렌드 영상
      </span>
      <div className="grid grid-cols-12 gap-4">
        {videos?.map(video => (
          <div key={video?.id?.videoId} className="col-span-12 sm:col-span-3">
            <div>
              <div>
                <Video
                  width={200}
                  height={150}
                  src={video?.snippet?.thumbnails?.medium?.url}
                  title={video?.snippet?.title}
                  linkUrl={`https://youtube.com/watch?v=${video?.id}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-ng">
                  {video?.snippet?.title
                    ?.replace(/&quot;/g, '')
                    ?.replace(/&#39;/g, '')
                    ?.replace(/"/g, '')
                    ?.replace(/'/g, '')
                    ?.slice(0, 25) + '...'}
                </span>

                <span className="font-ng text-main-dark text-sm">
                  {video?.snippet?.channelTitle}
                </span>
                <span className="font-ng text-gray-500 text-sm">
                  {video?.snippet?.publishTime.slice(0, 10)}{' '}
                  {video?.snippet?.publishTime.slice(11, 16)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default memo(Videos);
