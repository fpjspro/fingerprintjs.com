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
import { Blurb } from '../interfaces/blurb'
import { FormProps } from '../interfaces/formProps'
import { FpjsWidgetProps } from '../interfaces/fpjsWidgetProps'

export const IndexPageTemplate = ({
  intro,
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
      formState={formState}/>
    <ClientsSection />
    <MadeForDevelopersSection />
    <ServerApiSection />
    <UseCasesSection blurbs={intro.blurbs} />
    <Billing />
    <ProToolsSection />
    <StayProtectedSection 
      errorMessage={errorMessage}
      onSubmit={onSubmit} 
      formState={formState}
    />
  </div>
)

interface IndexPageTemplateProps extends FormProps, FpjsWidgetProps {
  intro: {
    blurbs: Blurb[],
  }
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { frontmatter } = data.markdownRemark
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
      const fp = await FP.load({ token: clientToken!, endpoint, region })
      const result = await fp.get(config)

      setVisitorId(result.visitorId)
    }
    
    getVisitorId()
  })

  const onSubmit = async (email: string) => {
    setFormState(FormState.loading)

    const { ok, error } = await fetch(`${dashboardEndpoint}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fpjsVisitorId: visitorId }),
    }).then((response) => response.json());

    if (!ok) {
      setErrorMessage(error.message || 'Something gone wrong. Please try again later.')
      setFormState(FormState.failed)
      setTimeout(() => {
        setFormState(FormState.default)
      }, 2500);
    } else {
      setFormState(FormState.success)

      // dataLayer.push({ event: 'signupintent.success' });
    }
  }

  return (
    <Layout>
      <IndexPageTemplate
        intro={frontmatter.intro}
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

interface IndexPageProps {
  data: {
    markdownRemark: {
      frontmatter: Frontmatter
    }
  }
}

interface Frontmatter {
  title: string
  image: {
    childImageSharp: any
  }
  heading: string
  subheading: string
  mainpitch: {
    title: string
    description: string
  }
  description: string
  intro: {
    blurbs: Blurb[]
    heading: string
    description: string
  }
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
