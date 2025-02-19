import { IsessionData } from '@/types/global.type';
import * as jwt from "jsonwebtoken";

// Generate token JWT
export const generateToken = (payload: IsessionData): string => {
  return jwt.sign(
    { ...payload },
    process.env.NEXT_PUBLIC_JWT_SECRET!,
    {
      algorithm: 'HS256',
      expiresIn: '24h'
    }
  );
};

// verify token
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!, {
    algorithms: ['HS256']
  });
};

// Store token in cookies
export const setToken = async (token: string): Promise<void> => {
  await fetch('/api/store-session', {
    method: 'POST',
    body: JSON.stringify({ json: token }),
  });
};

// Get token from cookies
export const getToken = async (): Promise<string | undefined> => {
  const fetchJwt = await fetch('/api/store-session');
  const storedJwt = await fetchJwt.json();
  return storedJwt.jwt;
};

// Remove token from cookies
export const removeToken = async (): Promise<void> => {
  await fetch('/api/store-session', {
    method: 'DELETE',
  });
};