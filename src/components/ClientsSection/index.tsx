import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import Section from '../common/Section'
import Container from '../common/Container'
import styles from './ClientsSection.module.scss'

SwiperCore.use([Pagination])

export default function ClientsSection() {
  const clients = [
    'ebay',
    'target',
    'us-bank',
    'booking',
    'ameritrade',
    'dell',
    'agoda',
    'b_and_h',
    'coinbase',
    'neiman-marcus',
    'perimeterx',
    'sift',
    'ticket-master',
    'yahoo',
  ]

  return (
    <Section className={styles.clients}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <strong>FingerprintJS</strong> is trusted by public companies and innovative startups.
          </h2>
        </header>
        <div className={styles.content}>
          {clients.map((client) => {
            return (
              <span key={`slide_${client}`} className={styles.slide}>
                <img alt={`${client} logo`} className={styles.logo} src={`/img/company-logos/${client}.svg`} />
              </span>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
