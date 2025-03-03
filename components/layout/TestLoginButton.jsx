import { useRouter } from 'next/router';
import Image from 'next/image';

export default function TestLoginButton() {
  const router = useRouter();
  const handleTest = () => {
    localStorage.setItem('userId', 'test-user');
    router.push('/home');
  };

  return (
    <button
      aria-label="테스트 로그인"
      className="mt-[1rem] px-[1rem] py-[0.4rem] rounded-md bg-main shadow-md flex gap-[1rem] items-center hover:bg-white transition duration-200 ease-in"
      onClick={handleTest}
    >
      <Image
        src="/images/logo_mustachetrans.webp"
        alt="test login button logo image"
        width="20"
        height="20"
      />
      <span className="px-[1rem] font-ng text-white hover:text-black transition duration-200 ease-in">
        체험하기
      </span>
    </button>
  );
}
