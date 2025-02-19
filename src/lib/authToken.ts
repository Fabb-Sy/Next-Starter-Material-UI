import axios from 'axios';

// get token
export const getAuthToken = async (): Promise<string> => {
  return 'authToken';
};

// refresh token
export const refreshAuthToken = async (): Promise<string> => {
  return 'tokenAuthRefresh';
};

// get spesific token
export const getToken = async () => {
  // function to get token from server
  return { token: 'token', role: 'admin' };
};
