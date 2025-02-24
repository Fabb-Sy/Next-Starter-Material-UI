import { Login } from "@/backoffice/module/auth/login";
import { getSessionGoogle } from "@/lib/next-auth/action";

const handleGoogleLogin = async () => {
  const ironSessionGoogle = await getSessionGoogle();
}

const LoginPage = async () => {
  const ironSessionGoogle = await getSessionGoogle();
  console.log('Iron: ', ironSessionGoogle)

  return <Login />
};

export default LoginPage;
