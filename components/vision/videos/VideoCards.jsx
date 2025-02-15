import { VisionSubTitle, NGTypo } from '@/defaultTheme';
import { Grid, Box } from '@mui/material';
import VideoCard from './VideoCard';

export default function VideoCards({ videos, theme }) {
  return (
    <div className="w-full">
      <VisionSubTitle>TREND NOW</VisionSubTitle>
      <Grid container spacing={2}>
        {videos.map(video => (
          <Grid item xs={12} sm={3} key={video?.id}>
            <Box>
              <Box>
                <VideoCard
                  width={200}
                  height={150}
                  src={video?.snippet.thumbnails.medium.url}
                  title={video?.snippet.title}
                  linkUrl={`https://youtube.com/watch?v=${video?.id}`}
                />
              </Box>
              <Box sx={{ pr: 2, pt: 2 }}>
                <NGTypo gutterBottom variant="body2" fontWeight={'bold'}>
                  {video?.snippet.title
                    .replace(/&quot;/g, '')
                    .replace(/&#39;/g, '')
                    .replace(/"/g, '')
                    .replace(/'/g, '')
                    .slice(0, 25) + '...'}
                </NGTypo>
                <NGTypo
                  display="block"
                  variant="caption"
                  fontWeight={'bold'}
                  color={theme.palette.primary.main}
                >
                  {video?.snippet.channelTitle}
                </NGTypo>
                <NGTypo variant="caption" fontWeight={'bold'}>
                  {video?.snippet.publishTime.slice(0, 10)}{' '}
                  {video?.snippet.publishTime.slice(11, 16)}
                </NGTypo>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
