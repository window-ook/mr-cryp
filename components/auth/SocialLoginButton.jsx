import { useRouter } from 'next/router';
import { loginGoogle } from '@/utils/firebase';
import Image from 'next/image';
import clsx from 'clsx';

export default function SocialLoginButton({
  CLIENT_ID,
  REDIRECT_URI,
  platform,
  bgColor = 'bg-main',
  fontColor = 'text-white',
  isTest = false,
}) {
  const router = useRouter();

  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const BASE_STYLES =
    'w-[12rem] mt-[1rem] px-[1rem] py-[0.4rem] rounded-md shadow-md hover:bg-white flex gap-[1rem] items-center cursor-pointer transition duration-200 ease-in';

  const BUTTON_TEXT = isTest
    ? '체험하기'
    : `${platform === 'kakao' ? '카카오' : '구글'} 로그인`;

  const LOGO_PATH = isTest
    ? '/images/mustachetrans.webp'
    : `/images/user-logos/logo_${platform}.webp`;

  const handleLogin = async () => {
    if (platform === 'google')
      await loginGoogle().then(() => router.push('/mypage'));
    else if (platform === 'kakao') window.location.href = KAKAO_URL;
    else {
      localStorage.setItem('userId', 'test-user');
      router.push('/mypage');
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
      )}
    >
      <Image
        src={LOGO_PATH}
        alt={isTest ? '테스트 로그인 버튼 이미지' : platform}
        width="20"
        height="20"
      />
      <span
        className={clsx(
          'pl-[1rem] font-ng',
          isTest &&
            'text-white hover:text-black transition duration-200 ease-in',
        )}
      >
        {BUTTON_TEXT}
      </span>
    </button>
  );
}
