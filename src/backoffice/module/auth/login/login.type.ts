export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  tooglePassword: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isLoading?: boolean;
}
