import { useEffect, useState } from 'react';
import Head from 'next/head';
import AccountMarketFlow from '@/components/mypage/AccountCoinsFlow';
import AccountBalanceFlow from '@/components/mypage/AccountBalanceFlow';
import AccountDetailTable from '@/components/mypage/AccountDetailTable';
import AccountDetailPie from '@/components/mypage/AccountDetailPie';

export default function Home() {
  const [balance, setBalance] = useState([]);
  const [flowSize, setFlowSize] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch(`/data/mock/balance.json`);
        const fetched = await response.json();
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
      <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 sm:py-14 flex flex-col md:flex-row gap-8 justify-center items-start">
        <section className="w-full">
          <div className="h-[4rem]">
            <span className="font-pretendard text-3xl font-bold text-main">
              내 보유 자산
            </span>
          </div>
          <div className="w-full flex flex-col items-center shadow-lg text-[0.6rem] md:text-base"></div>
        </section>
        <section className="w-full">
          <div className="h-[4rem]" />
          <article className="flex flex-col xl:gap-[3rem]"></article>
        </section>
      </div>
    </>
  );
}
