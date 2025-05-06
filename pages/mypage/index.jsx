import { useEffect, useState } from 'react';
import Head from 'next/head';
import AccountMarketFlow from '@/components/mypage/AccountCoinsFlow';
import AccountBalanceFlow from '@/components/mypage/AccountBalanceFlow';
import AccountDetailTable from '@/components/mypage/AccountDetailTable';
import AccountDetailPie from '@/components/mypage/AccountDetailPie';

export default function MyPage() {
  const [balance, setBalance] = useState([]);

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

    getBalance();
  }, []);

  return (
    <>
      <Head>
        <title>마이페이지 - 미스터 크립</title>
      </Head>
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-8">
        <section className="w-full">
          <div className="w-full flex flex-col items-center shadow-lg"></div>
        </section>
        <section className="w-full">
          <article className="flex flex-col"></article>
        </section>
      </div>
    </>
  );
}
