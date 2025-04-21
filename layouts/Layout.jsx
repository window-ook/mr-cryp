import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '@/components/layout/Navbar';

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div>
      {!isHomePage && <NavBar />}
      <main>{children}</main>
    </div>
  );
}
