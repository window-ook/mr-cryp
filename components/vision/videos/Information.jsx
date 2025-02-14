import { memo } from 'react';
import { DescriptionTypo, SubTitle } from '@/defaultTheme';
import Grid from '@mui/material/Grid';
import VideoCard from './VideoCard';

const Information = () => {
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
      src: 'https://i.ytimg.com/vi/KSsA92e0GK8/hqdefault.jpg',
      title: '뭘까요',
      linkUrl: `https://youtube.com/watch?v=KSsA92e0GK8`,
    },
  ];

  return (
    <div>
      <SubTitle className="text-xl font-bold">코인 거래 도움 자료</SubTitle>
      <DescriptionTypo className="text-gray-600">
        코인에 대한 정보와 거래 서비스 이용 방법을 확인하세요 😊
      </DescriptionTypo>
      <Grid container spacing={2}>
        {information.map(item => (
          <Grid key={item.id} item xs={12} sm={6}>
            <VideoCard
              width={480}
              height={300}
              src={item.src}
              title={item.title}
              linkUrl={item.linkUrl}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default memo(Information);
