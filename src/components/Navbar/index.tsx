import React from 'react';
import { Link } from 'gatsby';
import '../../css/index.scss';

export default function Navbar() {
  return (
    <div className="top-nav">
      <div className="container container--large">
        <nav className="nav nav--secondary">
          <Link className="nav__link" to='/demo'>
            Technical Demo
          </Link>
          <a className="nav__link" href="https://github.com/fingerprintjs/fingerprintjs" target="_blank">
            Open Source
          </a>
          <Link className="nav__link" to='/pricing'>
            Pricing
          </Link>
          <a className="nav__link" href='https://dev.fingerprintjs.com'>
            Documentation
          </a>
          <a className="nav__link" href='mailto:support@fingerprintjs.com'>
            Support
          </a>
          <a className='nav__link' href='https://dashboard.fingerprintjs.com/login' target="_blank">
            Log In
          </a>
          <a className='nav__link' href='https://dashboard.fingerprintjs.com/signup'>
            Sign Up
          </a>
        </nav>
      </div>
    </div>
  )
}