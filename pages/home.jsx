import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system';
import { SubTitle } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import axios from 'axios';
import AccountMarketFlow from '@/components/home/AccountMarketFlow';
import AccountBalanceFlow from '@/components/home/AccountBalanceFlow';
import AccountDetailTable from '@/components/home/AccountDetailTable';
import AccountDetailPie from '@/components/home/AccountDetailPie';

const HomeBox = styled(Box)(() => ({
  width: '80%',
  height: '100%',
  margin: '1rem auto',
  padding: '1rem',
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width:1000px)': {
    flexDirection: 'column',
  },
}));

const PieBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alginItems: 'center',
  boxShadow: globalColors.shadow_box,
  width: '100%',
  '@media (max-width:820px)': {
    '& *': { fontSize: '0.6rem' },
  },
  '@media (max-width:700px)': {
    width: '100%',
    font: '1rem',
  },
}));

export default function Home() {
  const [balance, setBalance] = useState([]);
  const [flowSize, setFlowSize] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/data/balance.json`,
        );
        let fetched = response.data;
        setBalance(fetched);
      } catch (error) {
        console.error('계좌 현황 다운로드 에러: ', error);
      }
    };

    const updateChartSize = () => {
      const width = window.innerWidth;
      if (width > 1400) {
        setFlowSize({ width: 600, height: 300 });
      } else if (width > 450) {
        setFlowSize({ width: 450, height: 225 });
      } else {
        setFlowSize({ width: 250, height: 150 });
      }
    };

    getBalance();
    updateChartSize();
    window.addEventListener('resize', updateChartSize);

    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <HomeBox>
      <section>
        <div className="h-[4rem]">
          <SubTitle>내 보유 자산</SubTitle>
        </div>
        <PieBox>
          <AccountDetailPie balance={balance} />
          <AccountDetailTable balance={balance} />
        </PieBox>
      </section>
      <section className="h-[100%]">
        <div className="h-[4rem]" />
        <article className="flex flex-col max-[1400px]:gap-[3rem]">
          <AccountBalanceFlow totalBalance={totalBalance} flowSize={flowSize} />
          <AccountMarketFlow flowSize={flowSize} />
        </article>
      </section>
    </HomeBox>
  );
}
