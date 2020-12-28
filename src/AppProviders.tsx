import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from './context/FpjsContext'
import { GithubProvider } from './context/GithubContext'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  return (
    <FpjsProvider>
      <FormProvider>
        <GithubProvider>
          <React.StrictMode>{children}</React.StrictMode>
        </GithubProvider>
      </FormProvider>
    </FpjsProvider>
  )
}
