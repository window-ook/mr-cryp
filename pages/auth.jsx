import { FaUserLock } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/image';
import SigninButton from '@/components/auth/SigninButton';
import LoginForm from '@/components/auth/LoginForm';

export default function Signin() {
  return (
    <>
      <Head>
        <title>로그인 - 미스터 크립</title>
      </Head>
      <main>
        <div className="flex flex-col sm:flex-row h-screen">
          {/* Left */}
          <div className="w-full h-full sm:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <FaUserLock className="text-main text-6xl" />
                <span className="font-pretendard font-bold text-3xl">
                  로그인
                </span>
              </div>
              <LoginForm />
              <SigninButton isTest={true} />
              <SigninButton
                platform={'google'}
                bgColor={'bg-blue-600'}
                fontColor={'text-white'}
              />
              <SigninButton
                platform={'kakao'}
                bgColor={'bg-yellow-300'}
                fontColor={'text-black'}
              />
              <span className="mt-4 flex items-center text-slate-500">
                Copyrights All reserved © Mr.Cryp 2024
              </span>
            </div>
          </div>
          {/* Right */}
          <div className="hidden w-1/2 sm:flex justify-center items-center bg-slate-200">
            <div className="h-full flex items-center justify-center gap-2">
              <Image
                alt="로고 이미지"
                src="/images/mustache.avif"
                width={100}
                height={30}
                priority={true}
                className="hidden md:block w-auto h-auto"
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
