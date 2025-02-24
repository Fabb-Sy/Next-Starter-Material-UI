export interface ILoginProps {
  username: string,
  password: string,
  tokenRecaptcha: string,
  fcmToken: string | null,
}

export interface IUserData {
  userId: string,
  username: string,
  email: string,
  password: string,
  role: number,
}

export interface IsessionData extends Omit<IUserData, 'password'> {
  isLoggedIn: boolean,
  token: string,
}

export interface SessionDataGoogle {
  googleUser?: {
    email: string;
    name: string;
    image: string;
  };
}