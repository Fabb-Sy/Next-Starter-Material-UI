'use client'

import { RegisterView } from './Register.view';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useState } from 'react';
import { register } from './api/registerApi';
import { useRouter } from 'next/navigation';

export const Register = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const password_confirmation = formData.get('password_confirmation') as string;

      executeRecaptcha('form_submit_register')
        .then(async (tokenCaptcha) => {
          const data = {
            username,
            email,
            password,
            password_confirmation,
            tokenRecaptcha: tokenCaptcha,
          };
          const result = await register(data);
          if (result?.redirectTo) {
            router.push(result.redirectTo);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return <RegisterView
    handleSubmit={handleSubmit}
    togglePassword={handleTogglePassword}
    showPassword={showPassword}
    isLoading={isLoading}
  />;
};
