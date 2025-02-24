import { Login } from "@/backoffice/module/auth/login";
import { getSessionGoogle } from "@/lib/next-auth/action";
import axios from "axios";
import { NextRequest } from "next/server";

const handleGoogleLogin = async () => {
  const ironSessionGoogle = await getSessionGoogle();

  if (!ironSessionGoogle?.googleUser?.email) {
    console.log('No Google user email found');
    return null;
  }

  try {
    const res = await axios.post(`${process.env.API_SERVER_URL}/v1/auth/login-google`, {
      email: ironSessionGoogle.googleUser.email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });


    console.log('Login response:', res.data);
    return {
      success: res.data.success,
      data: res.data.data
    };

  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

const LoginPage = async (request: NextRequest) => {
  const resApi = await handleGoogleLogin();
  return <Login dataGoogle={resApi} />;
}

export default LoginPage;
