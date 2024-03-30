'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {};

function Navbar({}: Props) {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-16 shadow-sm backdrop-blur-sm z-50 flex items-center justify-between px-8">
      <div className="font-bold text-xl flex items-center justify-center space-x-4">
        <h1 className="text-4xl">😸</h1>
        <h1>Exploding Kitten</h1>
      </div>
      <div className="space-x-4 flex">
        {session ? (
          <>
            {!(path == '/play') && (
              <Link href="/play">
                <Button>Play Now</Button>
              </Link>
            )}

            <Avatar>
              <AvatarImage src={session.user.image ?? ''} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            {!(path == '/play') && (
              <Link href="/play">
                <Button variant={'outline'}>Play Now</Button>
              </Link>
            )}
            <Link href="/login">
              <Button variant={'secondary'}>Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
