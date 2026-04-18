import { cookies } from 'next/headers';
import * as auth from './auth-core';

export * from './auth-core';

export async function getAuthUser(): Promise<auth.AuthUser | null> {
  const token = cookies().get('admin_token')?.value;
  if (!token) return null;
  return await auth.verifyToken(token);
}

export function setAuthCookie(token: string) {
  cookies().set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

export function removeAuthCookie() {
  cookies().delete('admin_token');
}
