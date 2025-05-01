import Video from './Video';

export default function VideosUI({ videos }) {
  return (
    <article className="w-full flex flex-col gap-4">
      <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main-dark">
        트렌드 영상
      </span>
      <div className="grid grid-cols-12 gap-4">
        {videos?.map(video => (
          <div className="col-span-12 sm:col-span-3" key={video?.id}>
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
              <div sx={{ pr: 2, pt: 2 }}>
                <span className="font-ng font-bold">
                  {video?.snippet?.title
                    ?.replace(/&quot;/g, '')
                    ?.replace(/&#39;/g, '')
                    ?.replace(/"/g, '')
                    ?.replace(/'/g, '')
                    ?.slice(0, 25) + '...'}
                </span>
                <span className="font-ng font-bold text-main">
                  {video?.snippet?.channelTitle}
                </span>
                <span className="font-ng font-bold text-main">
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
