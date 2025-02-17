import { useVideosQuery } from '@/hooks/useVideosQuery';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/material';
import PendingSkeleton from '../shared/PendingSkeleton';
import Videos from './Videos';

export default function VideosProvider() {
  const theme = useTheme();
  const { data: videos = [], isLoading, error } = useVideosQuery('코인 추천');

  if (isLoading) return <PendingSkeleton />;

  if (error) {
    return (
      <Alert severity="error">
        유튜브 영상 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  return <Videos videos={videos} theme={theme} />;
}
