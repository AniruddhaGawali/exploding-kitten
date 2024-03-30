'use client';

import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import { loginFromGoogle, logOut } from '@/actions/auth-action';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
