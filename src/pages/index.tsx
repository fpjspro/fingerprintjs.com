import React from 'react'
import Layout from '../components/Layout'
import ClientsSection from '../components/ClientsSection'
import LiveDemoSection from '../components/LiveDemoSection'
import MadeForDevelopersSection from '../components/MadeForDevelopersSection'
import ServerApiSection from '../components/ServerApiSection'
import UseCasesSection from '../components/UseCasesSection'
import Billing from '../components/Billing'
import ProToolsSection from '../components/ProToolsSection'
import StayProtectedSection from '../components/StayProtectedSection'

export const IndexPageTemplate = () => (
  <div>
    <LiveDemoSection />
    <ClientsSection />
    <MadeForDevelopersSection />
    <ServerApiSection />
    <UseCasesSection />
    <Billing />
    <ProToolsSection />
    <StayProtectedSection />
  </div>
)

export default function IndexPage() {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  )
}
