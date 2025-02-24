'use server'

import { cookies } from 'next/headers';
import { unsealData } from 'iron-session';

export type CookieType = 'auth-iron' | 'auth-iron-google' | string;

export async function getCookiesIronSession<T>(cookieName: CookieType): Promise<T | null> {
  const cookieStore = await cookies()
  const decodedToken = cookieStore.get(cookieName)

  try {
    const unsealed = await unsealData<T>(decodedToken?.value || '', {
      password: process.env.NEXT_PUBLIC_SESSION_PASSWORD!
    })
    
    return unsealed;
  } catch (error) {
    return null
  }
}
