'use client'

import { login } from '@/lib/action';
import { LoginView } from './Login.view';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useEffect, useRef, useState } from 'react';
import { getNotificationToken } from '@/lib/firebase/requestNotification';

export const Login = () => {
  const { executeRecaptcha } = useReCaptcha();
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      executeRecaptcha('form_submit_login')
        .then(async (tokenCaptcha) => {
          const data = {
            email,
            password,
            tokenCaptcha,
            fcmToken,
          };
          const result = await login(data);
          console.log('Data: ', data)
          if (result?.redirectTo) {
            // window.location.href = (result.redirectTo);
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

  const handleTooglePassword = () => {
    if (inputRef.current) {
      inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    }
  }

  return <LoginView
    handleSubmit={handleSubmit}
    tooglePassword={handleTooglePassword}
    inputRef={inputRef}
  />;
};
