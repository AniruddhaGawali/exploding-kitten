'use client';

import Navbar from '@/components/navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLeaderboard } from '@/actions/profile-action';
import Footer from '@/components/footer';
import Image from 'next/image';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<
    | {
        id: string;
        name: string | null;
        score: number;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshLeaderboard() {
    setLoading(true);
    const data = await getLeaderboard();
    setLeaderboard(data);
    setLoading(false);
  }

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-start py-24 px-12 sm:p-24 container mt-10">
        <h1 className="text-5xl md:text-7xl font-semibold text-left w-full">
          Welcome to
          <br />
          Exploding Kitten 😸
        </h1>

        <div className="w-full flex-wrap flex items-start justify-start sm:space-x-5 mt-10">
          <Button asChild className="w-1/3 min-w-fit mt-5" size={'lg'}>
            <Link href="/play" className="text-xl">
              Start Game
            </Link>
          </Button>

          <Button asChild className="mt-5" size={'lg'} variant={'outline'}>
            <Link href="#leaderboard" className="text-xl">
              Leaderboard
            </Link>
          </Button>
          {session && (
            <Button asChild className="mt-5" size={'lg'} variant={'outline'}>
              <Link href={'/profile/' + session.user.id} className="text-xl">
                View Profile
              </Link>
            </Button>
          )}
        </div>

        <section>
          <h3 className="text-2xl sm:text-3xl font-semibold text-left w-full mb-5 mt-20">
            Rules of the game:
          </h3>
          <ul className="text-base sm:text-lg font-normal text-left w-full leading-loose list-disc sm:ml-10 space-y-2">
            <li>
              4 different types of cards - Cat card 😼 - Defuse card 🙅‍♂️ -
              Shuffle card 🔀 - Exploding kitten card 💣
            </li>
            <li>
              Click the button to start, reveal and remove cards from the
              shuffled deck by clicking, win by drawing all 5 cards without any
              remaining.
            </li>
            <li>
              If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </li>
            <li>
              If the card is exploding kitten (bomb) then the player loses the
              game.
            </li>
            <li>
              If the card is a defusing card, then the card is removed from the
              deck. This card can be used to defuse one bomb that may come in
              subsequent cards drawn from the deck.
            </li>
            <li>
              If the card is a shuffle card, then the game is restarted and the
              deck is filled with 5 cards again.
            </li>
          </ul>
        </section>

        {leaderboard && (
          <section className="w-full mt-20" id="leaderboard">
            <div className="flex items-center justify-center container mb-5 mt-20">
              <h4 className="text-5xl font-semibold text-left w-full">
                Leaderboard
                <span className="text-primary"> #Top10</span>
              </h4>
              <Button onClick={refreshLeaderboard}>
                <RefreshCcw className={loading ? 'animate-spin' : ''} />
              </Button>
            </div>

            <div className="w-full sm:w-[90%] lg:w-2/3 rounded-lg mt-10 border min-h-[50vh]">
              <table className="table-auto w-full rounded-lg p-5 text-left">
                <thead className=" bg-primary">
                  <tr>
                    <th className="px-4 py-2 rounded-tl-lg">Rank</th>
                    <th className="px-4 py-2 ">Player Name</th>
                    <th className="px-4 py-2 rounded-tr-lg">Score</th>
                  </tr>
                </thead>

                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={index}
                      className={index % 2 == 0 ? 'bg-secondary' : ''}>
                      <td className="px-4 py-2 space-x-2 flex items-center">
                        {index < 5 && (
                          <Image
                            src={'/cat/cats-avater/' + (index + 1) + '.png'}
                            alt={'cat-' + (index + 1)}
                            width={20}
                            height={20}
                            className="inline-block"
                          />
                        )}
                        <span>{index + 1}</span>
                      </td>
                      <td className=" px-4 py-2 ">
                        <Button
                          asChild
                          variant={'link'}
                          className="text-foreground">
                          <Link href={'/profile/' + user.id}>{user.name}</Link>
                        </Button>
                      </td>
                      <td className=" px-4 py-2 ">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
