export interface ILoginProps {
  email: string,
  password: string,
  tokenCaptcha: string,
  fcmToken: string | null,
}

export interface IUserData {
  userId: string,
  email: string,
  password: string,
  role: number,
}

export interface IsessionData extends Omit<IUserData, 'password'> {
  isLoggedIn: boolean,
  token: string,
}