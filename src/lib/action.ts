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
        userId: userDataSession.id,
        email: userDataSession.user_email,
        username: userDataSession.username,
        role: userDataSession.user_role,
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
export const logout = async () => {
  // handle logout action
  // clear cookies & session auth
  await removeToken();
  console.log('Logout');
}