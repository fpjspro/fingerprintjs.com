import React, {useEffect} from 'react'
import Navbar from './Navbar'
import { Link } from 'gatsby'
import '../css/index.scss'

import Prism from "prismjs";
import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import logo from '../img/company-logos/fpjs.svg'

export default function Header() {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="main-nav">
                <div className="container container--large">
                    <nav className="nav nav--main">
                        <div className="nav-left">
                        <Link to="/" className="nav__link nav__link--logo" title="Logo">
                            <img src="/img/company-logos/fpjs.svg" alt="FingerprintJS" className='nav__logo' />
                        </Link>
                        </div>
                        <div className="nav-right">
                        <a className="btn btn--github" href="https://github.com/fingerprintjs/fingerprintjs">
                            <div className="btn__label">
                            <svg className="icon">
                                {/* <use xlink:href="#github"></use> */}
                            </svg>
                            <span>
                                Star
                            </span>
                            </div>
                            <div className="github-counter">12,001</div>
                        </a>          
                        <a href="mailto:sales@fingerprintjs.com" className="btn btn--outlined">
                            Contact Sales
                        </a>
                        <a href="https://dashboard.fingerprintjs.com/signup" className="btn">
                            Free Trial
                        </a>
                        <button className="btn btn--clear btn--icon-only mobile-toggler">
                            <svg className="btn__icon">
                            {/* <use xlink:href="#burger"></use> */}
                            </svg>
                        </button>
                        </div>
                    </nav>
                </div>       
            </div>
        </>
    )
}
