import { useState } from 'react';
import { useArticlesQuery } from '@/hooks/useArticlesQuery';
import { Alert } from '@mui/material';
import Articles from './Articles';
import PendingSkeleton from '../shared/PendingSkeleton';

export default function ArticlesProvider() {
  const [open, setOpen] = useState(false);
  const {
    data: articles = [],
    error,
    isPending,
  } = useArticlesQuery('코인', 12);

  if (isPending) return <PendingSkeleton />;

  if (error) {
    return (
      <Alert severity="error">
        네이버 기사 다운로드 중 에러가 발생했습니다.
      </Alert>
    );
  }

  const handleCopyLink = async link => {
    try {
      await navigator.clipboard.writeText(link);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Articles
      articles={articles}
      open={open}
      handleCopyLink={handleCopyLink}
      handleClose={handleClose}
    />
  );
}
