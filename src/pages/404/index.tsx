import React from 'react'
import { Layout } from '../../components/Layout'
import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import styles from './404.module.scss'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <Section className={styles.section}>
      <Container>
        <h1 className={styles.header}>Not found</h1>
        <p>
          The page you&#39;ve tried to load doesn&#39;t seem to exist. Perhaps there is a typo.
          <br />
          Go to the{' '}
          <Link to='/' className={styles.link}>
            homepage
          </Link>
          .
        </p>
      </Container>
    </Section>
  </Layout>
)

export default NotFoundPage
