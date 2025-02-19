import { ILoginProps, IsessionData, IUserData } from "@/types/global.type"
import { generateToken, removeToken, setToken } from "./lib";


const staticUsers: IUserData[] = [
  {
    userId: 'mmf3ga2z7zda2qmd',
    email: 'admin@example.com',
    password: '@admin12345',
    role: 1,
  }
]

// Login
export const login = async (data: ILoginProps) => {
  try {
    // const resApi = await loginApi(data);
    // if (resApi.success && resApi) {
    //   const userDataSession = resApi.data;
    //   // Set data to session storage / Cookies
    //   console.log(userDataSession);
    //   return;
    // }

    const staticUser = staticUsers.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (staticUser) {
      const userDataSession: IsessionData = {
        userId: staticUser.userId,
        email: staticUser.email,
        role: staticUser.role,
        isLoggedIn: true,
        token: 'token',
      };
      // Set data to session storage / Cookies
      const token = generateToken(userDataSession);
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