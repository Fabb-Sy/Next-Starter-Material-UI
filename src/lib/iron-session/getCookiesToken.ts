'use server'

import { cookies } from 'next/headers';
import { unsealData } from 'iron-session';
import { SessionDataJwt } from './lib';

export const getCookiesIronSession = async () => {
  const cookieStore = await cookies()
  const decodedToken = cookieStore.get('talentnesia-iron')

  try {
    const unsealed = await unsealData<SessionDataJwt>(decodedToken?.value || '', {
      password: process.env.SESSION_PASSWORD!
    })

    // handle get session data

  } catch (error) {
    return null
  }

  return null
}