import React from 'react'
import Container from '../base/Container';

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
    <section className='section section--trusted-by'>
      <Container>
        <header className='section-header'>
        <h2 className='section__title'>
          <strong>
          FingerprintJS
          </strong>
          is trusted by public companies and innovative startups.
        </h2>
        </header>
        <div className='section-content swiper-container'>
        <div className="swiper-wrapper">
          <div className='swiper-slide'>
            {trustedLogos.map(logo => {
              return <img
                className='logo-bar__logo'
                key={`logo_${logo}`}
                src={`/img/company-logos/${logo}.svg`}
              />
            })}
          </div>
        </div>
        <div className="swiper-pagination"></div>
        </div>
      </Container>
    </section>
  )
}
