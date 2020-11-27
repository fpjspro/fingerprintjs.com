import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from './context/FpjsContext'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  return (
    <FpjsProvider>
      <FormProvider>
        <React.StrictMode>{children}</React.StrictMode>
      </FormProvider>
    </FpjsProvider>
  )
}
