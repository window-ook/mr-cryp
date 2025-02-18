import { useRouter } from 'next/router';

export default function TestLoginButton() {
  const router = useRouter();
  const handleTest = async () => {
    localStorage.setItem('userId', 'test-user');
    router.push('/home');
    console.log('테스트 시작');
  };

  return (
    <button
      aria-label="테스트 로그인"
      className="mt-[1rem] px-[1rem] py-[0.4rem] rounded-md bg-main shadow-md flex gap-[1rem] items-center hover:bg-white transition duration-200 ease-in"
      onClick={handleTest}
    >
      <span className="px-[1rem] font-ng text-white hover:text-black transition duration-200 ease-in">
        테스트 로그인
      </span>
    </button>
  );
}
