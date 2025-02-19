import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PASSWORD!,
  cookieName: 'auth-iron',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }
}

export interface SessionDataJwt {
  jwt?: string;
}
