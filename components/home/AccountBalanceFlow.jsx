import { theme, DescriptionTypo } from '@/defaultTheme';
import dynamic from 'next/dynamic';

const LineChart = dynamic(
  () => import('@mui/x-charts/LineChart').then(mod => mod.LineChart),
  { ssr: false },
);

export default function AccountBalanceFlow({ totalBalance, flowSize }) {
  const history = [4500, 5681, 5998, 7100, 8502];
  const xLabels = ['8월', '9월', '10월', '11월', '12월', '1월'];

  return (
    <div className="flex flex-col w-full">
      <DescriptionTypo>보유 자산 변동 (단위: 1000 KRW)</DescriptionTypo>
      <LineChart
        width={flowSize.width}
        height={flowSize.height}
        series={[{ data: [...history, totalBalance / 1000] }]}
        colors={[theme.palette.primary.light]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}
