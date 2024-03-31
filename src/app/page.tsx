'use client';

import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import { loginFromGoogle, logOut } from '@/actions/auth-action';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <ModeToggle />
      <Button
        onClick={() => {
          loginFromGoogle();
        }}>
        Sign in with Google
      </Button>
      <Button
        onClick={() => {
          logOut();
        }}>
        Sign out
      </Button>
    </main>
  );
}
