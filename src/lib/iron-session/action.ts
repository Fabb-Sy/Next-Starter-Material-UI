import { getIronSession } from 'iron-session';
import { SessionDataJwt, sessionOptions } from './lib';
import { cookies } from 'next/headers';

export const storeJWT = async (jwt: string) => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptions);
  session.jwt = jwt;
  await session.save();
};

export const getJWT = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptions);
  if (session.jwt) {
    return session;
  }
};

export const deleteJWT = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataJwt>(cookieStore, sessionOptions);
  if (session.jwt) {
    session.destroy();
  } else {
    throw new Error('Cookie not found');
  }
};
