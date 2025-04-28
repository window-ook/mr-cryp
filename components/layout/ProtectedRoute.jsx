import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      window.alert('로그인이 필요합니다.');
      router.push('/auth');
    }
  }, [router]);

  return <>{children}</>;
}
