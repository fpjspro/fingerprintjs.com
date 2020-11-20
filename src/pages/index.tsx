import React, { useState, useEffect } from 'react'
import { Region, GetOptions } from '@fingerprintjs/fingerprintjs-pro'

import Layout from '../components/Layout'
import ClientsSection from '../components/ClientsSection'
import LiveDemoSection from '../components/LiveDemoSection'
import MadeForDevelopersSection from '../components/MadeForDevelopersSection'
import ServerApiSection from '../components/ServerApiSection'
import UseCasesSection from '../components/UseCasesSection'
import Billing from '../components/Billing'
import ProToolsSection from '../components/ProToolsSection'
import StayProtectedSection from '../components/StayProtectedSection'
import { FormState } from '../types/FormState'
import { sendEvent } from '../utils/gtm'
import { FormProps } from '../components/GetStartedForm'
import { FpjsWidgetProps } from '../components/FpjsWidget/widgetProps'

export const IndexPageTemplate = ({
  apiToken,
  endpoint,
  errorMessage,
  onSubmit,
  formState,
}: IndexPageTemplateProps) => (
  <div>
    <LiveDemoSection
      endpoint={endpoint}
      apiToken={apiToken}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      formState={formState}
    />
    <ClientsSection />
    <MadeForDevelopersSection />
    <ServerApiSection />
    <UseCasesSection />
    <Billing />
    <ProToolsSection />
    <StayProtectedSection errorMessage={errorMessage} onSubmit={onSubmit} formState={formState} />
  </div>
)

type IndexPageTemplateProps = FormProps & FpjsWidgetProps

const config: GetOptions<true, 'full'> = {
  ipResolution: 'full',
  extendedResult: true,
  timeout: 30_000,
}

export default function IndexPage() {
  const dashboardEndpoint = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
  const clientToken = process.env.GATSBY_FPJS_TOKEN ?? 'test_client_token'
  const apiToken = process.env.GATSBY_FPJS_API_TOKEN ?? 'test_fpjs_api_token'
  const endpoint = process.env.GATSBY_FPJS_ENDPOINT ?? ''
  const region = process.env.GATSBY_FPJS_REGION as Region

  const [visitorId, setVisitorId] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [formState, setFormState] = useState<FormState>(FormState.default)

  useEffect(() => {
    async function getVisitorId() {
      const FP = await import('@fingerprintjs/fingerprintjs-pro')
      const fp = await FP.load({ token: clientToken, endpoint, region })
      const result = await fp.get(config)

      setVisitorId(result.visitorId)
    }

    getVisitorId()
  }, [clientToken, endpoint, region])

  const onSubmit = async (email: string) => {
    setFormState(FormState.loading)

    const { ok, error } = await fetch(`${dashboardEndpoint}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fpjsVisitorId: visitorId }),
    }).then((response) => response.json())

    if (!ok) {
      setErrorMessage(error.message || 'Something gone wrong. Please try again later.')
      setFormState(FormState.failed)
      setTimeout(() => {
        setFormState(FormState.default)
      }, 2500)
    } else {
      setFormState(FormState.success)
      sendEvent({ event: 'signupintent.success' })
    }
  }

  return (
    <Layout>
      <IndexPageTemplate
        endpoint={endpoint}
        apiToken={apiToken}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        formState={formState}
      />
    </Layout>
  )
}
