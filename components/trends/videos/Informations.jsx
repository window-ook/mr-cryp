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
      title: '업비트 사용법',
      linkUrl: `https://youtube.com/watch?v=V7moeujHDGY`,
    },
    {
      id: 3,
      src: 'https://i.ytimg.com/vi/KSsA92e0GK8/hqdefault.jpg',
      title: '코인 차트 보는법',
      linkUrl: `https://youtube.com/watch?v=KSsA92e0GK8`,
    },
    {
      id: 4,
      src: 'https://i.ytimg.com/vi/E6Hn-WGAe44/hqdefault.jpg',
      title: '뭘까요',
      linkUrl: `https://youtu.be/E6Hn-WGAe44?si=-nhE8nYfGyCu0ZtJ`,
    },
  ];

  return (
    <article className="relative max-[900px]:pb-5">
      <span className="font-pretendard text-[1.5rem] font-bold text-main">
        코인 거래 도움 자료
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
      <span className="absolute right-0 py-2 text-xl font-bold font-ng">
        © Mr.cryp
      </span>
    </article>
  );
}

export default memo(Informations);
