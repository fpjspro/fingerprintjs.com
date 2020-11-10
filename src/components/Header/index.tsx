import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import '../../css/index.scss'

import Prism from "prismjs";
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import GithubButton from '../GithubButton';
import {ReactComponent as BurgerSvg} from './burger.svg';
import MobileNavbar from '../MobileNavbar';

export default function Header() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-nav">
        <div className="container container--large">
          <nav className="nav nav--main">
            <div className="nav-left">
              <Link to="/" className="nav__link nav__link--logo" title="Logo">
                <img src="/img/company-logos/fpjs.svg" alt="FingerprintJS" className='nav__logo' />
              </Link>
            </div>
            <div className="nav-right">
              <GithubButton/>
              <a href="mailto:sales@fingerprintjs.com" className="btn btn--outlined">
                Contact Sales
              </a>
              <a href="https://dashboard.fingerprintjs.com/signup" className="btn">
                Free Trial
              </a>
              <button className="btn btn--clear btn--icon-only mobile-toggler">
                <BurgerSvg className="btn__icon"/>
              </button>
            </div>
          </nav>
        </div>
      </div>
      {/* <MobileNavbar/> */}
    </>
  )
}
