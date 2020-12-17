import React from 'react'
import nav from './Navbar.module.scss'
import Container from '../common/Container'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <a className={nav.link} href='https://dev.fingerprintjs.com'>
            Docs
          </a>
          <a className={nav.link} href='mailto:support@fingerprintjs.com'>
            Support
          </a>
          <a className={nav.link} href='https://dashboard.fingerprintjs.com/login' target='_blank' rel='noreferrer'>
            Login
          </a>
        </nav>
      </Container>
    </div>
  )
}
