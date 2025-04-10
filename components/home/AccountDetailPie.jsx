import { useEffect, useState } from 'react';
import { theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { Box, styled } from '@mui/system';
import dynamic from 'next/dynamic';

const PieChart = dynamic(
  () => import('@mui/x-charts/PieChart').then(mod => mod.PieChart),
  { ssr: false },
);

const AccountPieBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: globalColors.white,
  borderTopLeftRadius: '0.25rem',
  borderTopRightRadius: '0.25rem',
  padding: '2rem',
  border: '0.25rem solid',
  borderColor: theme.palette.primary.main,

  '@media (max-width:1075px)': {
    width: '100%',
    padding: '0.25rem 2rem 0.25rem 2rem',
  },

  '@media (max-width:700px)': {
    width: '100%',
  },

  '@media (max-width:500px)': {
    width: '100%',
  },
}));

export default function AccountDetailPie({ balance }) {
  const [pieParams, setPieParams] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const updateChartSize = () => {
      const width = window.innerWidth;

      if (width > 1400) {
        setPieParams({ width: 600, height: 300 });
      } else if (width > 1350) {
        setPieParams({ width: 500, height: 200 });
      } else if (width > 1075) {
        setPieParams({ width: 400, height: 200 });
      } else if (width > 500) {
        setPieParams({ width: 200, height: 100 });
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const palette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    globalColors.jade['400'],
  ];

  return (
    <AccountPieBox sx={{ boxShadow: 3 }}>
      <PieChart
        colors={palette}
        series={[
          {
            data:
              balance &&
              balance.map((item, index) => {
                if (index === 0) {
                  return {
                    id: item.currency,
                    value: item.balance,
                    label: '현금(원화)',
                  };
                } else {
                  return {
                    id: item.unit_currency + '-' + item.currency,
                    value: item.balance * item.avg_buy_price,
                    label: item.unit_currency + '-' + item.currency,
                  };
                }
              }),

            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        {...pieParams}
      />
    </AccountPieBox>
  );
}
