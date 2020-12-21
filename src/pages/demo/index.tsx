import React from 'react'
import Layout from '../../components/Layout'
import { BreadcrumbsSEO } from '../../components/Breadcrumbs'
import { GeneratedPageContext } from '../../helpers/types'

import DemoSection from '../../components/demo/DemoSection'
import InfoSection from '../../components/demo/InfoSection'
import SignupSection from '../../components/demo/SignupSection'

export default function DemoPage({ pageContext }: { pageContext: GeneratedPageContext }) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <Layout>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <DemoSection />
      <InfoSection />
      <SignupSection />
    </Layout>
  )
}
