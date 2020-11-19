import React, { useState, useEffect } from 'react'
import Section from '../../components/common/Section'
import FpjsWidget from '../../components/FpjsWidget'
import * as FP from '@fingerprintjs/fingerprintjs-pro'
import styles from './Card.module.scss'

export default function DemoCard() {
  // TODO This should be changed to get the visitor ID through a provider when it's available.
  const clientToken = process.env.GATSBY_FPJS_TOKEN
  const apiToken = process.env.GATSBY_FPJS_API_TOKEN
  const endpoint = process.env.GATSBY_FPJS_ENDPOINT
  const region = process.env.GATSBY_FPJS_REGION as FP.Region
  const config: FP.GetOptions<true, 'full'> = {
    ipResolution: 'full',
    extendedResult: true,
    timeout: 30_000,
  }

  const [visitorId, setVisitorId] = useState('')

  useEffect(() => {
    async function getVisitorId() {
      const fp = await FP.load({ token: clientToken!, endpoint, region })
      const result = await fp.get(config)

      setVisitorId(result.visitorId)
    }

    getVisitorId()
  })
  //

  return (
    <Section className={styles.card}>
      <CardHeader title='Technical demo'>
        Browser fingerprinting API demo
        <br />
        <strong className={styles.strong}>99.5%</strong> identification accuracy
      </CardHeader>
      <FpjsWidget endpoint={endpoint} visitorId={visitorId} apiToken={apiToken} />
    </Section>
  )
}

interface CardHeaderProps {
  title: string
  children?: React.ReactNode
}

function CardHeader({ title, children }: CardHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{children}</span>
    </header>
  )
}
