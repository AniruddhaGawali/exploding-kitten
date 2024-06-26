/* eslint-disable @next/next/no-img-element */
'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logOut } from '@/actions/auth-action';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './theme-toggle';

type Props = {};

function Navbar({}: Props) {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-16 shadow-sm backdrop-blur-sm z-50 flex items-center justify-between px-8">
      <Link href="/">
        <div className="font-bold text-xl flex items-center justify-center space-x-4">
          <h1>
            <img
              src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif"
              alt="nyancat"
              className=" w-20 inline-block"
            />
          </h1>
          <h1 className="hidden md:block">Exploding Kitten</h1>
        </div>
      </Link>
      <div className="space-x-4 flex">
        <ModeToggle />
        {session ? (
          <>
            {!(path == '/play') && (
              <Link href="/play">
                <Button>Play Now</Button>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      session.user.image
                        ? Number.isNaN(parseInt(session.user.image))
                          ? session.user.image
                          : `/cat/cats-avater/${session.user.image}.png`
                        : ''
                    }
                    className={
                      session.user.image
                        ? Number.isNaN(parseInt(session.user.image))
                          ? ''
                          : 'bg-secondary p-[4px] border  rounded-full'
                        : ''
                    }
                  />
                  <AvatarFallback>{session.user.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={'/profile/' + session.user.id}>View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-700"
                  onClick={() => {
                    logOut();
                  }}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {!(path == '/play') && (
              <Link href="/play" className="hidden sm:block">
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
