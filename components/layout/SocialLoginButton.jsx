import { useRouter } from 'next/router';
import { loginGoogle } from '@/utils/firebase';
import Image from 'next/image';

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

  const getButtonText = () => {
    if (isTest) return '체험하기';
    return `${platform === 'kakao' ? '카카오' : '구글'} 로그인`;
  };

  const getLogoPath = () => {
    if (isTest) return '/images/logo_mustachetrans.webp';
    return `/images/logo_${platform}.webp`;
  };

  const getButtonClass = () => {
    const baseClasses =
      'w-[12rem] mt-[1rem] px-[1rem] py-[0.4rem] rounded-md shadow-md flex gap-[1rem] items-center hover:bg-white transition duration-200 ease-in';

    if (isTest) return `${baseClasses} bg-main text-white`;

    return `${baseClasses} ${bgColor} ${fontColor}`;
  };

  const handleLogin = async () => {
    if (isTest) {
      localStorage.setItem('userId', 'test-user');
      router.push('/mypage');
      return;
    }

    if (platform === 'google')
      await loginGoogle().then(() => router.push('/mypage'));
    if (platform === 'kakao') window.location.href = KAKAO_URL;
  };

  return (
    <button
      type="button"
      aria-label="로그인 버튼"
      onClick={handleLogin}
      className={getButtonClass()}
    >
      <Image
        src={getLogoPath()}
        alt={isTest ? '테스트 로그인 버튼 이미지' : platform}
        width="20"
        height="20"
      />
      <span
        className={`pl-[1rem] font-ng ${isTest && 'text-white hover:text-black transition duration-200 ease-in'}`}
      >
        {getButtonText()}
      </span>
    </button>
  );
}
