import { FormState } from '../types/FormState';

export interface FormProps {
  formState: FormState
  onSubmit: (email: string) => void
  errorMessage?: string
}