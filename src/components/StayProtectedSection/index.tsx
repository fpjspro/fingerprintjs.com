import React from 'react'
import GetStartedForm from '../GetStartedForm.tsx'

export default function StayProtectedSection() {
  return (
    <section className="section section--stay-protected">
      <div className="container">
          <header className="section-header">
              <h2 className="h1 section__title">
                  Stay <strong>protected</strong> and
                  <strong>one step ahead</strong> of malicious users with
                  FingerprintJS Pro
              </h2>
              <p className="section__subtitle">
                  Starting today is better than starting tomorrow
              </p>
              <GetStartedForm onSubmit={(email) => console.log(email)}/>
          </header>
      </div>
  </section>
  )
}
