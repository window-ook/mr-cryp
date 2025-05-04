import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUserLock } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/image';
import SocialLoginButton from '@/components/auth/SocialLoginButton';

export async function getServerSideProps() {
  const KAKAO_CLIENT_ID = process.env.NEXT_KAKAO_CLIENT_ID;

  return {
    props: {
      KAKAO_CLIENT_ID,
    },
  };
}

const Copyright = () => {
  return (
    <span className="mt-4 flex items-center text-slate-500">
      Copyrights All reserved © Mr.Cryp 2024
    </span>
  );
};

export default function Signin({ KAKAO_CLIENT_ID }) {
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        alert('이미 로그인 되어있습니다.');
        router.push('/trends');
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>로그인 - 미스터 크립</title>
      </Head>
      <main>
        <div className="flex flex-col sm:flex-row h-screen">
          {/* 왼쪽 */}
          <div className="w-full h-full sm:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <FaUserLock className="text-main text-6xl" />
                <span className="font-pretendard font-bold text-3xl">
                  로그인
                </span>
              </div>
              <SocialLoginButton
                platform={'google'}
                bgColor={'bg-blue-600'}
                fontColor={'text-white'}
              />
              <SocialLoginButton
                CLIENT_ID={KAKAO_CLIENT_ID}
                REDIRECT_URI={KAKAO_REDIRECT_URI}
                platform={'kakao'}
                bgColor={'bg-yellow-300'}
                fontColor={'text-black'}
              />
              <SocialLoginButton isTest={true} />
              <Copyright sx={{ mt: 5 }} />
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="hidden w-1/2 sm:flex justify-center items-center bg-slate-200">
            <div className="h-full flex items-center justify-center gap-2">
              <Image
                alt="로고 이미지"
                src="/images/mustache.avif"
                width={100}
                height={30}
                priority={true}
                className="hover:hidden"
              />
              <span className="font-aggro font-bold italic text-main text-5xl text-shadow-black">
                Mr.Cryp
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
