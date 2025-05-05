import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '@/components/layout/Navbar';

export default function Layout({ children }) {
  const router = useRouter();
  const HOME_PAGE = router.pathname === '/';

  return (
    <div>
      {!HOME_PAGE && <NavBar />}
      <main>{children}</main>
    </div>
  );
}
