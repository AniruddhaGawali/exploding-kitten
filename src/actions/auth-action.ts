'use client';

import { signIn, signOut } from 'next-auth/react';

export async function loginFromGoogle() {
  const res = await signIn('google', {
    redirect: false,
    callbackUrl: '/',
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function loginFromGithub() {
  const res = await signIn('github', {
    redirect: false,
    callbackUrl: '/',
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function loginFromCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return {
      error: 'Missing email or password',
    };
  }

  if (!email.includes('@')) {
    return {
      error: 'Invalid email',
    };
  }

  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,
    callbackUrl: '/',
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function signUp({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (password !== confirmPassword) {
    return {
      message: 'Password and confirm password do not match',
    };
  }

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      message: error.message,
    };
  }

  signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: '/',
  });

  return {
    message: 'User created',
  };
}

export async function logOut() {
  await signOut({ redirect: true, callbackUrl: '/' });
}
