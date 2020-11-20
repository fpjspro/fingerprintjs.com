import React from 'react'
import Layout from '../../components/Layout'

import DemoSection from '../../components/demo/DemoSection'
import InfoSection from '../../components/demo/InfoSection'
import SignupSection from '../../components/demo/SignupSection'

export default function DemoPage() {
  return (
    <Layout>
      <DemoSection />
      <InfoSection />
      <SignupSection />
    </Layout>
  )
}
