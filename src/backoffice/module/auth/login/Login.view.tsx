import Link from 'next/link';
import { LoginViewProps } from './login.type';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Google,
  GitHub
} from '@mui/icons-material';

export const LoginView = ({ handleSubmit, handleGoogleLogin, togglePassword, showPassword, isLoading }: LoginViewProps) => {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-items-end p-4">
      <Container maxWidth="sm">
        <Paper elevation={3} className="!p-8 !rounded-2xl">
          {/* Reload for layout page */}
          <button className='!m-0 !p-0' onClick={() => window.location.href = '/'}>
            <Typography variant="h4" className="!font-medium !mb-6 !text-gray-800 !font-poppins">
              Login
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
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="!text-gray-400" />
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
              className="!mb-6"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              className="!bg-blue-600 hover:!bg-blue-700 !py-3 !text-lg !normal-case"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Box className="!mt-6 !mb-4">
            <Divider>
              <Typography variant="body2" className="!text-gray-500">
                Or continue with
              </Typography>
            </Divider>
          </Box>

          <div className="grid grid-cols-2 gap-4">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              className="!normal-case"
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              className="!normal-case"
            >
              GitHub
            </Button>
          </div>

          <Typography className="!mt-6 !text-center !text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="!text-blue-600 hover:!text-blue-700">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
