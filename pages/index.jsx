import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  const handleRoute = () => router.push('/signin');

  return <></>;
}
