import { SessionOptions } from "iron-session";

export const sessionOptionsAuth: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PASSWORD!,
  cookieName: 'auth-iron',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  }
}

export interface SessionDataJwt {
  jwt?: string;
}
