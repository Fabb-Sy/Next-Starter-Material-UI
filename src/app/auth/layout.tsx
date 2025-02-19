'use client';
import React, { ReactNode } from 'react';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      {children}
    </ReCaptchaProvider>
  );
};

export default AuthLayout;
