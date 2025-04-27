import Image from 'next/image';

export default function ArticlesUI({ articles }) {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <span className="font-pretendard text-2xl max-[475px]:text-xl font-bold text-main-dark">
          글로벌 토픽
        </span>
      </header>
      <article className="grid grid-cols-2 gap-2">
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
                  <span className="font-ng text-xs text-left text-gray-500">
                    {article.timestamp}
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
                  className="w-[5rem] h-auto object-cover rounded-lg shrink-0"
                  priority
                />
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-ng max-[1100px]:text-xs text-left line-clamp-2">
                    {article.title}
                  </span>
                  <span className="font-ng text-xs text-left text-gray-500">
                    {article.timestamp}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </article>
    </div>
  );
}
