import { ILoginProps, IsessionData } from "@/types/global.type"
import { generateToken, removeToken, setToken } from "./lib";
import { loginApi } from "@/backoffice/module/auth/login/api/loginApi";


// Login
export const login = async (data: ILoginProps) => {
  try {
    const resApi = await loginApi(data);
    if (resApi.success && resApi) {
      const userDataSession = resApi.data;

      const sessionData: IsessionData = {
        userId: userDataSession.userId,
        email: userDataSession.email,
        username: userDataSession.username,
        role: userDataSession.role,
        token: userDataSession.token,
        isLoggedIn: true,
      };

      const token = generateToken(sessionData);
      console.log('sessionData: ', sessionData)
      console.log('token: ', token)
      await setToken(token);

      return { redirectTo: '/backoffice/dashboard' };
    }

  } catch (error) {
    console.error(error);
  }
}

// Logout 
export const Logout = async () => {
  // handle logout action
  // clear cookies & session auth
  removeToken();
  console.log('Logout');
}