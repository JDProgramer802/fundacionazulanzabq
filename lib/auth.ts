import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only-that-is-long-enough-32-chars';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function createToken(user: AuthUser) {
  return jwt.sign({ ...user }, JWT_SECRET, { expiresIn: '1d' });
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthUser;
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const token = cookies().get('admin_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
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
