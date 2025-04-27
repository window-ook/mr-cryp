import { memo } from 'react';
import Video from './Video';

function Informations() {
  const information = [
    {
      id: 1,
      src: 'https://i.ytimg.com/vi/5dkaMkcTgNA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCw1WcevgGL6lkZ4EKoPjauynWmmAhttps://www.youtube.com/embed/5dkaMkcTgNA',
      title: '초등학생도 이해하는 비트코인 원리',
      linkUrl: `https://youtube.com/watch?v=5dkaMkcTgNA`,
    },
    {
      id: 2,
      src: 'https://i.ytimg.com/vi/V7moeujHDGY/hqdefault.jpg',
      title: '업비트 신규가입 및 케이뱅크 입출금 계좌 등록 가이드',
      linkUrl: `https://youtube.com/watch?v=V7moeujHDGY`,
    },
    {
      id: 3,
      src: 'https://i.ytimg.com/vi/KSsA92e0GK8/hqdefault.jpg',
      title: "코인 차트 보는법 세가지만' 알면 됩니다",
      linkUrl: `https://youtube.com/watch?v=KSsA92e0GK8`,
    },
    {
      id: 4,
      src: 'https://i.ytimg.com/vi/E6Hn-WGAe44/hqdefault.jpg',
      title: '코인 공부 순서',
      linkUrl: `https://youtu.be/E6Hn-WGAe44?si=-nhE8nYfGyCu0ZtJ`,
    },
  ];

  return (
    <article className="flex flex-col gap-4">
      <span className="text-2xl max-[475px]:text-xl font-pretendard font-bold text-main-dark">
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
            <span className="font-ng text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default memo(Informations);
