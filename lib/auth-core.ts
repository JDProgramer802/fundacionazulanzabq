import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET =
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only-that-is-long-enough-32-chars';
const key = new TextEncoder().encode(JWT_SECRET);

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function createToken(user: AuthUser) {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AuthUser;
  } catch (error) {
    return null;
  }
}
