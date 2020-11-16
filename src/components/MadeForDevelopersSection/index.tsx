import React from 'react'
import GetTokenCode from '../GetTokenCode'
import Container from '../base/Container'

export default function MadeForDevelopersSection() {
  return (
    <section className='section section--developer-friendly'>
      <Container size='large'>
        <header className='section-header'>
          <h2 className='section__title'>Made for developers</h2>
          <div className='tools-integrations'>
            <div className='tools-integrations-item'>
              <h3 className='tools-integrations-item__title'>&gt; Built on proven open-source library</h3>
              <p className='tools-integrations-item__description'>
                Since 2012, FingerprintJS has been used to identify billions of users. Our Pro solution was developed
                based on feedback to provide unparalleled accuracy, ease of use, and security.
              </p>
            </div>
            <div className='tools-integrations-item'>
              <h3 className='tools-integrations-item__title'>&gt; Use our Pro agent for serious accuracy</h3>
              <p className='tools-integrations-item__description'>
                Get to 99.5% identification accuracy with custom domains, CNAME integration, bot detection and
                additional identification methods beyond fingerprinting.
              </p>
            </div>
          </div>
        </header>
        <div className='section-content'>
          <div className='window'>
            <div className='window-header'>
              <div className='window-header__btn window-header__btn--close'></div>
              <div className='window-header__btn window-header__btn--minimize'></div>
              <div className='window-header__btn window-header__btn--expand'></div>
            </div>
            <div className='window-content'>
              <GetTokenCode />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
