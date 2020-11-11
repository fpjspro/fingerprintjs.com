import React from 'react';
import {ReactComponent as AccountFraudSvg} from './account_fraud.svg';
import Container from '../base/Container';

export default function UseCasesSection({blurbs}) {
  return (
    <section className='section section--use-cases'>
      <Container>
        <header className='section-header'>
          <h2 className='section__title'>
            FingerprintJS
            <br />
            <strong>
              Use Cases
            </strong>
          </h2>
        </header>
        <div className='section-content'>
          <div className='use-cases'>
            {blurbs.map((blurb, i) => {
              return (
                <div key={`use-case_${i}_${blurb.title}`} className='use-case use-case--large'>
                  <div className='use-case__icon-container'>
                    <AccountFraudSvg className="use-case__icon"/>
                  </div>
                  <div className='use-case-info'>
                    <h3 className='use-case__title'>
                      {blurb.title}
                    </h3>
                    <p className='use-case__description'>
                      {blurb.text}
                    </p>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </Container>
    </section>
  )
}
