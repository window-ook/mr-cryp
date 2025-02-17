import React from 'react';
import NavBarProvider from '@/components/layout/NavbarProvider';

export default function Layout({ children }) {
  return (
    <div>
      <NavBarProvider />
      <main>{children}</main>
    </div>
  );
}
