import { memo } from 'react';
import Skeleton from '../shared/Skeleton';
import Image from 'next/image';

function GlobalTopic({ articles, isError, isPending }) {
  if (isPending) return <Skeleton />;

  if (isError) {
    return (
      <div className="font-pretendard font-bold text-lg">
        글로벌 토픽 다운로드 중 에러가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      {articles && articles.length > 0 ? (
        <div className="flex flex-col gap-4">
          <header>
            <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main-dark">
              글로벌 토픽
            </span>
          </header>
          <article className="grid grid-cols-2 gap-8">
            {articles.slice(0, 6).map(article => {
              const title = article.title
                .replace(/<b>|<\/b>/g, '')
                .replace(/&quot;/g, '');

              return (
                <div key={article.url} className="flex pb-2">
                  <button
                    aria-label="기사 원본으로 이동하기"
                    type="button"
                    className="w-full flex gap-2 cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <Image
                      src={article.imageUrl}
                      alt={title}
                      width={80}
                      height={0}
                      className="w-[5rem] h-full object-cover rounded-lg shrink-0"
                      priority
                    />
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="font-ng max-[1100px]:text-xs text-left line-clamp-2">
                        {article.title}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}

            {articles.slice(6).map(article => {
              const title = article.title
                .replace(/<b>|<\/b>/g, '')
                .replace(/&quot;/g, '');

              return (
                <div key={article.url} className="flex pb-2">
                  <button
                    type="button"
                    className="w-full flex gap-2 cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <Image
                      src={article.imageUrl}
                      alt={title}
                      width={80}
                      height={0}
                      className="w-[5rem] h-auto object-cover rounded-sm shrink-0"
                      priority
                    />
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="font-ng max-[1100px]:text-xs text-left line-clamp-2">
                        {article.title}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </article>
        </div>
      ) : (
        <div className="font-pretendard font-bold text-lg">
          글로벌 토픽 다운로드 중 에러가 발생했습니다.
        </div>
      )}
    </>
  );
}

export default memo(GlobalTopic);
