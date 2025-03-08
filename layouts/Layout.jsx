import { useRouter } from 'next/router';
import React from 'react';
import NavBarProvider from '@/components/layout/NavbarProvider';

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div>
      {!isHomePage && <NavBarProvider />}
      <main>{children}</main>
    </div>
  );
}
