import React from 'react';
import NavBarContainer from '@/components/layout/NavbarContainer';

export default function Layout({ children }) {
  return (
    <div>
      <NavBarContainer />
      <main>{children}</main>
    </div>
  );
}
