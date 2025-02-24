import { getIronSession } from 'iron-session';
import { SessionDataJwt, sessionOptionsAuth } from './lib';
import { cookies } from 'next/headers';

export const storeJWT = async (jwt: string) => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptionsAuth);
  session.jwt = jwt;
  await session.save();
};

export const getJWT = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptionsAuth);
  if (session.jwt) {
    return session;
  }
};

export const deleteJWT = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptionsAuth);
  if (session.jwt) {
    session.destroy();
  } else {
    throw new Error('Cookie not found');
  }
};
