/* eslint-disable @next/next/no-img-element */

'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getUser, updateProfile } from '@/actions/profile-action';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';

type Props = {};

function Page({}: Props) {
  const param = useParams();
  const [user, setUser] = useState<UserData>();
  const { data: session } = useSession();

  async function getUserData() {
    const user: UserData | null = await getUser(param.user.toString());
    if (user) {
      setUser(user);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (!user) return null;

  return (
    <div className="h-[90vh] flex flex-col items-start justify-start mt-20">
      <section className="flex items-center justify-start space-y-4 w-full bg-secondary gap-5 p-10">
        <div className="flex items-center justify-center  flex-col gap-5">
          <img
            src={
              user?.image
                ? Number.isNaN(parseInt(user.image))
                  ? user.image
                  : `/cat/cats-avater/${user.image}.png`
                : ''
            }
            className="w-56 h-56 rounded-full"
            alt={user?.name + ' profile picture'}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Change</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Array.from({ length: 5 }).map((_, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={async () => {
                    session
                      ? await updateProfile(session.user.id, (i + 1).toString())
                      : null;

                    await getUserData();
                  }}>
                  <DropdownMenuLabel className="flex items-center justify-center gap-5">
                    <Image
                      src={`/cat/cats-avater/${i + 1}.png`}
                      width={40}
                      height={40}
                      alt={`Avatar ${i + 1}`}
                    />
                    <span>Cat {i + 1}</span>
                  </DropdownMenuLabel>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h1 className="text-6xl font-bold">{user?.name}</h1>
      </section>
      <section className="flex flex-col items-start justify-start space-y-4 w-full p-10">
        <p className="text-3xl">Score: {user?.score}</p>
        <p className="text-3xl">Total Games: {user?.totalGames}</p>
      </section>
    </div>
  );
}

export default Page;
