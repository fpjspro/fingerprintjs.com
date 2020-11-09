import React from 'react'
import FpjsWidget from './FpjsWidget'

export default function LiveDemoSection() {
  return (
    <section className="section section--live-demo">
      <div className='container container--large'>
        <header className='section-header'>
          <h1 className='section__title'>
            Browser Fingerprinting API
          </h1>
          <p className='section__description'>
            Stop fraud, spam, and account takeovers with
            <em>
              99.5% accurate
            </em>
            browser fingerprinting as a service.
          </p>
        </header>
        <div className='section-content' style={{"position": "relative"}}>
          <FpjsWidget/>
        </div>
      </div>
    </section>
  )
}
