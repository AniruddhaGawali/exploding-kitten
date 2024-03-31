'use server';
import db from '@/db';

export async function incrementScore(userId: string) {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        score: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function incrementGame(userId: string) {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        totalGames: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
