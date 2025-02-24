'use client'

import { login } from '@/lib/action';
import { LoginView } from './Login.view';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useEffect, useState } from 'react';
import { getNotificationToken } from '@/lib/firebase/requestNotification';
import { signIn } from "next-auth/react";
import { getCookiesIronSession } from '@/lib/decodeIronSession';
import { SessionDataGoogle } from '@/types/global.type';
import { getSessionGoogle } from '@/lib/next-auth/action';

export const Login = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeFcmToken = async () => {
      if (Notification.permission === 'granted' || 'default') {
        const token = await getNotificationToken();
        setFcmToken(token);
      }
    };

    initializeFcmToken();
  }, []);

  useEffect(() => {
    async () => {
      console.log('Checking session...')
      const googleSession = await getCookiesIronSession<SessionDataGoogle>('auth-iron-google')
      console.log('Google: ', googleSession)    
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      executeRecaptcha('form_submit_login')
        .then(async (tokenCaptcha) => {
          const data = {
            username,
            password,
            tokenRecaptcha: tokenCaptcha,
            fcmToken,
          };
          const result = await login(data);
          // console.log('Data: ', data)
          if (result?.redirectTo) {
            window.location.href = (result.redirectTo);
          }
        })
        .catch((err) => {
          console.error(err);
        });

    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/api/auth/save-google-data',
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return <LoginView
    handleSubmit={handleSubmit}
    handleGoogleLogin={handleGoogleLogin}
    togglePassword={handleTogglePassword}
    showPassword={showPassword}
  />;
};
