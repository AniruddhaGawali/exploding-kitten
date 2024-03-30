import Navbar from '@/components/navbar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
    </>
  );
}

export default Layout;
