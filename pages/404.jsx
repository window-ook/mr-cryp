import React from 'react';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>에러 페이지 - 미스터 크립</title>
      </Head>
      <main className="flex flex-col justify-center items-center">
        <div className="opacity-0">block</div>
        <span className="font-pretendard text-xl">잘못된 경로입니다.</span>
      </main>
    </>
  );
}
