import { Alert } from '@mui/material';
import PendingSkeleton from '../shared/PendingSkeleton';
import useSituationsQuery from '@/hooks/useSituationsQuery';

export default function MarketSituation() {
  const { data: situations, error, isPending } = useSituationsQuery();

  if (isPending) return <PendingSkeleton />;

  if (error)
    return (
      <Alert severity="error">시황 데이터를 받아오는데 실패했습니다.</Alert>
    );

  return (
    <div>
      {situations.slice(0, 1).map(situation => {
        const title = situation.title
          .replace(/<b>|<\/b>/g, '')
          .replace(/&quot;/g, '')
          .slice(0, 20);
        const description = situation.description
          .replace(/<b>|<\/b>/g, '')
          .replace(/&quot;/g, '')
          .slice(0, 35);

        return (
          <div key={situation.link}>
            <span>{title}</span>
            <span>{description}...</span>
          </div>
        );
      })}
    </div>
  );
}
