'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import ThemeRegistry from './themeRegistry';

const queryClient = new QueryClient();
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
