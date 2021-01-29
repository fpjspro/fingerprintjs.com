import React from 'react'
import ContactSalesForm from '../../components/ContactSalesForm'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { LayoutTemplate } from '../../components/Layout'
import { GeneratedPageContext } from '../../helpers/types'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import Container from '../../components/common/Container'
import Section from '../../components/common/Section'

import styles from './contact-sales.module.scss'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ContactSalesPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Sales - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section className={styles.root}>
        <Container size='small'>
          <h1 className={styles.header}>Contact Sales</h1>

          <ContactSalesForm />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}
