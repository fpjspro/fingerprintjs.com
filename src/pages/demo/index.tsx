import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import DemoSection from '../../components/demo/DemoSection'
import InfoSection from '../../components/demo/InfoSection'
import SignupSection from '../../components/demo/SignupSection'

export default function DemoPage({ pageContext }: { pageContext: GeneratedPageContext }) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <Layout>
      <Helmet>
        <title>Technical Demo - FingerprintJS Pro</title>
      </Helmet>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <DemoSection />
      <InfoSection />
      <SignupSection />
    </Layout>
  )
}
