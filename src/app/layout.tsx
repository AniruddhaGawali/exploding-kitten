import type { Metadata } from 'next';
import { Inter, Jost } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/provider/theme-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import NextAuthProvider from '@/provider/nextAuthProvider';
import ReduxProvider from '@/provider/reduxProvider';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exploding Kittens',
  description: 'A simple game of Exploding Kittens',
  icons: {
    icon: [{ url: './favicon.ico' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={jost.className}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
