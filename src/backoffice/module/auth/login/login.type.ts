export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleLogin: () => void;
  togglePassword: () => void;
  showPassword: boolean;
  isLoading?: boolean;
}
