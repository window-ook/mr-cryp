import { memo } from 'react';
import Video from './Video';

function Informations() {
  const information = [
    {
      id: 1,
      src: 'https://i.ytimg.com/vi/Ra5gugnCrW8/hqdefault.jpg',
      linkUrl: `https://youtu.be/Ra5gugnCrW8?si=Di0SIiqx2eK0qk8B`,
    },
    {
      id: 2,
      src: 'https://i.ytimg.com/vi/V7moeujHDGY/hqdefault.jpg',
      linkUrl: `https://youtube.com/watch?v=V7moeujHDGY`,
    },
    {
      id: 3,
      src: 'https://i.ytimg.com/vi/KSsA92e0GK8/hqdefault.jpg',
      linkUrl: `https://youtube.com/watch?v=KSsA92e0GK8`,
    },
    {
      id: 4,
      src: 'https://i.ytimg.com/vi/E6Hn-WGAe44/hqdefault.jpg',
      linkUrl: `https://youtu.be/E6Hn-WGAe44?si=-nhE8nYfGyCu0ZtJ`,
    },
  ];

  return (
    <article className="flex flex-col gap-4">
      <span className="font-pretendard font-bold text-xl sm:text-2xl text-main-dark">
        도움 자료
      </span>
      <div className="grid grid-cols-2 gap-6">
        {information.map(item => (
          <div key={item.id}>
            <Video
              width={480}
              height={300}
              src={item.src}
              title={item.title}
              linkUrl={item.linkUrl}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

export default memo(Informations);
