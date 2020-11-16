import React from 'react'
import { Link } from 'gatsby'
import nav from './Navbar.module.scss'
import Container from '../base/Container'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <Link className={nav.link} to='/demo'>
            Technical Demo
          </Link>
          <a className={nav.link} href='https://github.com/fingerprintjs/fingerprintjs' target='_blank'>
            Open Source
          </a>
          <Link className={nav.link} to='/pricing'>
            Pricing
          </Link>
          <a className={nav.link} href='https://dev.fingerprintjs.com'>
            Documentation
          </a>
          <a className={nav.link} href='mailto:support@fingerprintjs.com'>
            Support
          </a>
          <a className={nav.link} href='https://dashboard.fingerprintjs.com/login' target='_blank'>
            Log In
          </a>
          <a className={nav.link} href='https://dashboard.fingerprintjs.com/signup'>
            Sign Up
          </a>
        </nav>
      </Container>
    </div>
  )
}
