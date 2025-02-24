'use client'

import Link from 'next/link';
import { RegisterViewProps } from './register.type';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email
} from '@mui/icons-material';
import { useState } from 'react';

export const RegisterView = ({ handleSubmit, togglePassword, showPassword, isLoading }: RegisterViewProps) => {
  const [passwordError, setPasswordError] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Add this validation function
  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasMinLength) return 'Password must be at least 8 characters';
    if (!hasUpperCase || !hasLowerCase) return 'Password must contain both uppercase and lowercase letters';
    if (!hasNumbers) return 'Password must contain at least one number';
    if (!hasSymbols) return 'Password must contain at least one symbol';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== passwordValue) {
      return 'Passwords do not match';
    }
    return '';
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-items-end p-4">
      <Container maxWidth="sm">
        <Paper elevation={3} className="!p-8 !rounded-2xl">
          <button className='!m-0 !p-0' onClick={() => window.location.href = '/'}>
            <Typography variant="h4" className="!font-medium !mb-6 !text-gray-800 !font-poppins">
              Register
            </Typography>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              name="username"
              type="text"
              label="Username"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="!text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="!mb-4"
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="!text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="!mb-4"
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              required
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => {
                const value = e.target.value;
                setPasswordValue(value);
                setPasswordError(validatePassword(value));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className={`${passwordError ? '!text-red-400' : '!text-gray-400'}`} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="!mb-4"
            />

            <TextField
              fullWidth
              name="password_confirmation"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              onChange={(e) => setConfirmPasswordError(validateConfirmPassword(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className={`${confirmPasswordError ? '!text-red-400' : '!text-gray-400'}`} />
                  </InputAdornment>
                ),
              }}
              className="!mb-6"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              className="!bg-blue-600 hover:!bg-blue-700 !py-3 !text-lg !normal-case"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <Typography className="!mt-6 !text-center !text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="!text-blue-600 hover:!text-blue-700">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
