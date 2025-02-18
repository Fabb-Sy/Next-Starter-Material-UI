import axios from 'axios';

// get token
export const getAuthToken = async (): Promise<string> => {
  const tokenRes = await axios<{ isLoggedIn: boolean; token: string }>(
    '/api/auth/token',
  );
  return tokenRes.data.token;
};

// refresh token
export const refreshAuthToken = async (): Promise<string> => {
  const res = await axios<{ success: boolean; apiToken: string }>(
    '/api/auth/refreshToken',
  );
  if (!res.data.success) throw new Error('Token refresh failed');
  return res.data.apiToken;
};

// get Token
export const getToken = async () => {
  // function to get token from server
  return { token: 'token', role: 'admin' };
};
