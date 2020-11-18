import React, { useState, useEffect } from 'react'
import * as FP from '@fingerprintjs/fingerprintjs-pro'
import { graphql } from 'gatsby'

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
import { isBrowser } from '../utils/browser'

export const IndexPageTemplate = ({
  apiToken,
  endpoint,
  visitorId,
  errorMessage,
  onSubmit,
  formState,
}: IndexPageTemplateProps) => (
  <div>
    <LiveDemoSection
      endpoint={endpoint}
      visitorId={visitorId}
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

const IndexPage = () => {
  const dashboardEndpoint = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
  const clientToken = process.env.GATSBY_FPJS_TOKEN
  const apiToken = process.env.GATSBY_FPJS_API_TOKEN
  const endpoint = process.env.GATSBY_FPJS_ENDPOINT
  const region = process.env.GATSBY_FPJS_REGION as FP.Region
  const config: FP.GetOptions<true, 'full'> = {
    ipResolution: 'full',
    extendedResult: true,
    timeout: 30_000,
  }

  const [visitorId, setVisitorId] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [formState, setFormState] = useState<FormState>(FormState.default)

  useEffect(() => {
    async function getVisitorId() {
      if (isBrowser()) {
        const fp = await FP.load({ token: clientToken!, endpoint, region })
        const result = await fp.get(config)

        setVisitorId(result.visitorId)
      }
    }

    getVisitorId()
  }, [clientToken, endpoint, region, config])

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
        endpoint={endpoint!}
        visitorId={visitorId!}
        apiToken={apiToken!}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        formState={formState}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            text
          }
          heading
          description
        }
      }
    }
  }
`
