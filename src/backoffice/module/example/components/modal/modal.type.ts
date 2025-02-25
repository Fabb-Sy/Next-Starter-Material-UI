export interface FormField {
  name: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  defaultValue?: string | number | boolean | null | undefined;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formFields: FormField[];
}