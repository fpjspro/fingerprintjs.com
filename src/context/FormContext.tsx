import React, { createContext, useState } from 'react'
import { FormState } from '../types/FormState'

interface GetStartedFormData {
  formState: FormState
  errorMessage?: string
  updateFormState: (newState: FormState) => void
  updateErrorMessage: (message: string) => void
}

const noop = () => {
  // noop
}

const FormContext = createContext<GetStartedFormData>({
  formState: FormState.Default,
  updateFormState: noop,
  updateErrorMessage: noop,
})

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState(FormState.Default)
  const [errorMessage, setErrorMessage] = useState<string>()

  const updateFormState = (newState: FormState) => {
    setFormState(newState)
  }

  const updateErrorMessage = (message: string) => {
    setErrorMessage(message)
  }

  const contextValue = {
    formState,
    errorMessage,
    updateFormState,
    updateErrorMessage,
  }

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
}

export default FormContext
