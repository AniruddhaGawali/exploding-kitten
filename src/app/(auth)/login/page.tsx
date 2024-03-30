'use client';
import React, { use } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  loginFromCredentials,
  loginFromGithub,
  loginFromGoogle,
} from '@/actions/auth-action';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingScreen from '@/components/loading';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

type Props = {};

function Page({}: Props) {
  const { status } = useSession();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await loginFromCredentials(values);
  }

  if (status === 'loading') {
    return <LoadingScreen />;
  }
  if (status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center w-full justify-center  min-h-screen">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold mb-0">Login</h1>
        <p className="text-base m-0">Please enter your details to login</p>
      </div>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-10 min-w-[80%] sm:min-w-[25%] p-8 rounded-lg border bg-secondary">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" {...field} type="email" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" {...field} type="password" />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Login</Button>

          <div className="w-full">
            <div className="flex items-center w-full justify-between">
              <div className="w-1/3 border border-secondary-foreground " />
              <span>OR</span>
              <div className="w-1/3 border border-secondary-foreground" />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => loginFromGithub()}
            className="space-x-4">
            <FaGithub size={20} />
            <span>Login with Github</span>
          </Button>

          <Button
            type="button"
            onClick={() => loginFromGoogle()}
            className="space-x-4">
            <FaGoogle size={20} />
            <span>Login with Google</span>
          </Button>

          <p className=" text-center">
            Don&apos;t have an account?
            <Link href="/register">
              <Button variant={'link'}>Register</Button>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Page;
