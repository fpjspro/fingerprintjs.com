import React from 'react';
import FpjsWidget from '../FpjsWidget';
import GetStartedForm from '../GetStartedForm';

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
          <GetStartedForm onSubmit={(email) => console.log(email)}/>
        </header>
        <div className='section-content' style={{"position": "relative"}}>
          <FpjsWidget/>
        </div>
      </div>
    </section>
  )
}
