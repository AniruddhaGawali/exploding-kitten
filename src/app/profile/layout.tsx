import Navbar from '@/components/navbar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
