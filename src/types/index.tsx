type UserData = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  score: number;
  totalGames: number;
  createdAt: Date;
  updatedAt: Date;
};
