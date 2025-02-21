'use server'

import { cookies } from 'next/headers';
import { getIronSession, unsealData } from 'iron-session';
import { SessionDataJwt, sessionOptionsGoogle } from './lib';
import { NextRequest } from 'next/server';
import { IUserGoogle } from '@/types/global.type';

export const getCookiesIronSession = async () => {
  const cookieStore = await cookies()
  const decodedToken = cookieStore.get('auth-iron')

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

export async function getSessionGoogle(request: NextRequest) {
  const cookieStore = await cookies();
  const decodedToken = cookieStore.get('auth-iron-google')
  
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