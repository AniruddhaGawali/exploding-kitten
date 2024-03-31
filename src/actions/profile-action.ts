'use server';
import db from '@/db';

export async function getUser(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateProfile(id: string, img: string) {
  try {
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        image: img,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}