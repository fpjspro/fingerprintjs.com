import React from 'react'
import Section from '../base/Section';
import Container from '../base/Container';
import styles from './ClientsSection.module.scss';

export default function ClientsSection() {
  const trustedLogos = [
    "ebay",
    "target",
    "us-bank",
    "booking",
    "ameritrade",
    "dell",
    "agoda"
  ];

  return (
    <Section className={styles.clients}>
      <Container>
        <header className={styles.header}>
        <h2 className={styles.title}>
          <strong>
          FingerprintJS
          </strong>
          is trusted by public companies and innovative startups.
        </h2>
        </header>
        <div className={`${styles.content} swiper-container`}>
          <div className="swiper-wrapper">
            <div className='swiper-slide'>
              {trustedLogos.map(logo => {
                return <img
                  className={styles.logo}
                  key={`logo_${logo}`}
                  src={`/img/company-logos/${logo}.svg`}
                />
              })}
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Container>
    </Section>
  )
}
