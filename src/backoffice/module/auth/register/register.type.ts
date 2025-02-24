export interface IRegisterProps {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  tokenRecaptcha: string,
}

export interface RegisterViewProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  togglePassword: () => void;
  showPassword: boolean;
  isLoading: boolean;
}

