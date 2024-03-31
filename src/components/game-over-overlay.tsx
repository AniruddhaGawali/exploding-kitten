'use client';

import React from 'react';
import { Button } from './ui/button';
import useGame from '@/redux/dispatch/useGame';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Props = {
  restart: () => void;
  home: () => void;
};

function GameOverOverlay({ restart, home }: Props) {
  const {
    gameState: { isWin },
  } = useGame();

  const { status } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-full bg-background/50 backdrop-blur-sm">
      <section className="container mt-32 flex flex-col items-center justify-between h-1/2">
        <div>
          <h1
            className={`text-8xl ${
              isWin ? 'text-green-600' : 'text-red-600'
            } font-bold text-center`}>
            Game Over
          </h1>
          <h3 className="text-4xl font-medium text-center mt-5">
            {isWin ? 'You Won' : `You Loss`}
          </h3>
        </div>

        <div className="grid grid-cols-2 items-center justify-between gap-10 w-1/3 bg-secondary-foreground/20 p-10 rounded-lg ">
          <Button
            className="w-full text-xl"
            size={'lg'}
            onClick={() => {
              restart();
            }}>
            Restart
          </Button>
          <Button
            variant={'secondary'}
            size={'lg'}
            asChild
            className="w-full text-xl">
            <Link href={'/'}>Home</Link>
          </Button>
          {status == 'unauthenticated' && (
            <Button className="col-span-2 text-xl" asChild size={'lg'}>
              <Link href={'/register'}>Signup to get in Leaderboard</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default GameOverOverlay;
