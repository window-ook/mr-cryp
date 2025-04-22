import { useVideosQuery } from '@/hooks/useVideosQuery';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/material';
import PendingUI from '../shared/PendingUI';
import VideosUI from './VideosUI';

export default function Videos() {
  const theme = useTheme();

  // const { data: videos = [], isLoading, error } = useVideosQuery('코인 추천');
  const videos = [];
  const isLoading = false;
  const error = false;

  if (isLoading) return <PendingUI />;

  if (error) {
    return (
      <Alert severity="error">
        유튜브 영상 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  return <VideosUI videos={videos} theme={theme} />;
}
