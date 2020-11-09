import React from 'react';
import { Link } from 'gatsby';
import '../css/index.scss';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  render() {
    return (
      <div className="top-nav">
        <div className="container container--large">
          <nav className="nav nav--secondary">
            <Link className="nav__link" to='/demo'>
              Technical Demo
            </Link>
            <Link className="nav__link" to="https://github.com/fingerprintjs/fingerprintjs" target="_blank">
              Open Source
            </Link>
            <Link className="nav__link" to='/pricing'>
              Pricing
            </Link>
            <Link className="nav__link" to='https://dev.fingerprintjs.com'>
              Documentation
            </Link>
            <Link className="nav__link" to='mailto:support@fingerprintjs.com'>
              Support
            </Link>
            <Link className='nav__link' to='https://dashboard.fingerprintjs.com/login' target="_blank">
              Log In
            </Link>
            <Link className='nav__link' to='https://dashboard.fingerprintjs.com/signup'>
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    )
  }
}

export default Navbar
