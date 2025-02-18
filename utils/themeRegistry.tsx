'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'light',
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
