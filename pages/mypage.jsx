import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { SubTitle } from '@/defaultTheme';
import Head from 'next/head';
import axios from 'axios';
import AccountMarketFlow from '@/components/mypage/AccountMarketFlow';
import AccountBalanceFlow from '@/components/mypage/AccountBalanceFlow';
import AccountDetailTable from '@/components/mypage/AccountDetailTable';
import AccountDetailPie from '@/components/mypage/AccountDetailPie';

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
    <>
      <Head>
        <title>마이페이지 - 미스터 크립</title>
      </Head>
      <div className="w-4/5 h-full mx-auto my-4 p-4 flex gap-8 justify-center items-center max-[1000px]:flex-col">
        <section>
          <div className="h-[4rem]">
            <SubTitle>내 보유 자산</SubTitle>
          </div>
          <div className="flex flex-col items-center shadow-lg w-full max-[820px]:text-[0.6rem] max-[700px]:w-full max-[700px]:text-base">
            <AccountDetailPie balance={balance} />
            <AccountDetailTable balance={balance} />
          </div>
        </section>
        <section className="h-[100%]">
          <div className="h-[4rem]" />
          <article className="flex flex-col max-[1400px]:gap-[3rem]">
            <AccountBalanceFlow
              totalBalance={totalBalance}
              flowSize={flowSize}
            />
            <AccountMarketFlow flowSize={flowSize} />
          </article>
        </section>
      </div>
    </>
  );
}
