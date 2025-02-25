'use client'

import { login } from '@/lib/action';
import { LoginView } from './Login.view';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useEffect, useState } from 'react';
import { getNotificationToken } from '@/lib/firebase/requestNotification';
import { signIn } from "next-auth/react";
import { IsessionData } from '@/types/global.type';
import { generateToken, setToken } from '@/lib/lib';
import { deleteSessionGoogle } from '@/lib/next-auth/action';

export const Login = ({ dataGoogle }: { dataGoogle: any }) => {
  const { executeRecaptcha } = useReCaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeFcmToken = async () => {
      if (Notification.permission === 'granted' || Notification.permission === 'default') {
        const token = await getNotificationToken();
        setFcmToken(token);
      }
    };

    initializeFcmToken();
  }, []);

  useEffect(() => {
    const handleGoogleData = async () => {
      if (dataGoogle?.data) {
        const userDataSession = dataGoogle.data;

        const sessionData: IsessionData = {
          userId: userDataSession.id,
          email: userDataSession.user_email,
          username: userDataSession.username,
          role: userDataSession.user_role,
          token: userDataSession.token,
          isLoggedIn: true,
        };

        const token = generateToken(sessionData);
        console.log('sessionData: ', sessionData);
        console.log('token: ', token);
        await setToken(token);
        const deleteSession = async () => {
          await deleteSessionGoogle();
        };
        deleteSession();

        window.location.href = '/backoffice/dashboard';
      }
    };

    handleGoogleData();
  }, [dataGoogle]);


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
