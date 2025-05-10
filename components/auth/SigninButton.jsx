import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import clsx from 'clsx';

export default function SigninButton({
  platform,
  bgColor = 'bg-main',
  fontColor = 'text-white',
  isTest = false,
}) {
  const router = useRouter();

  const BASE_STYLES =
    'w-[12rem] mt-[1rem] px-[1rem] py-[0.4rem] rounded-md shadow-md hover:bg-white flex gap-[1rem] items-center cursor-pointer transition duration-200 ease-in';

  const BUTTON_TEXT = isTest
    ? '체험하기'
    : `${platform === 'kakao' ? '카카오' : '구글'} 로그인`;

  const LOGO_PATH = isTest
    ? '/images/mustachetrans.webp'
    : `/images/user-logos/logo_${platform}.webp`;

  const handleLogin = async () => {
    if (platform === 'kakao') {
      await signIn('kakao', {
        redirect: true,
        callbackUrl: '/trends',
      });
    }

    if (platform === 'google') {
      await signIn('google', {
        redirect: true,
        callbackUrl: '/trends',
      });
    }

    // Mongo Atlas에 테스트 계정 생성하면 그 계정으로 로그인하게 만들고 로직 수정하기
    if (isTest) {
      localStorage.setItem('userId', 'test-user');
      router.replace('/trends');
      return;
    }
  };

  return (
    <button
      type="button"
      aria-label="로그인 버튼"
      onClick={handleLogin}
      className={clsx(
        BASE_STYLES,
        isTest ? 'bg-main text-white' : bgColor,
        !isTest && fontColor,
        'group',
      )}
    >
      <Image
        src={LOGO_PATH}
        alt={isTest ? '테스트 로그인 버튼 이미지' : platform}
        width="20"
        height="20"
        className="w-auto h-auto"
      />
      <span
        className={clsx(
          'pl-[1rem] font-ng group-hover:text-black',
          isTest && 'text-white transition duration-200 ease-in',
        )}
      >
        {BUTTON_TEXT}
      </span>
    </button>
  );
}
