'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
});

import {
  signUp,
  loginFromGithub,
  loginFromGoogle,
} from '@/actions/auth-action';
import { useSession } from 'next-auth/react';
import LoadingScreen from '@/components/loading';

type Props = {};

function Page({}: Props) {
  const { status } = useSession();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await signUp(values);
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
        <h1 className="text-4xl font-bold mb-0">Register</h1>
        <p className="text-base m-0">Please enter your details to register</p>
      </div>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-10 min-w-[80%] sm:min-w-[25%] p-8 rounded-lg border bg-secondary">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={loginForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input id="confirmPassword" {...field} type="password" />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Register</Button>

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
            Already have an account?
            <Link href="/login">
              <Button variant={'link'}>Login</Button>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Page;
