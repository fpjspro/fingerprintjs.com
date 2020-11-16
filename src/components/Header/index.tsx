import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import GithubButton from '../GithubButton'
import { ReactComponent as BurgerSvg } from './burger.svg'
// import MobileNavbar from '../MobileNavbar';
import styles from './Header.module.scss'
import Container from '../base/Container'

export default function Header() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.mainNav}>
        <Container size='large'>
          <nav className={`${styles.nav} ${styles.navMain}`}>
            <div className={styles.navLeft}>
              <Link to='/' className={`${styles.link} ${styles.linkLogo}`} title='Logo'>
                <img src='/img/company-logos/fpjs.svg' alt='FingerprintJS' className={styles.logo} />
              </Link>
            </div>
            <div className={styles.navRight}>
              <GithubButton />
              <a href='mailto:sales@fingerprintjs.com' className='btn btn--outlined'>
                Contact Sales
              </a>
              <a href='https://dashboard.fingerprintjs.com/signup' className='btn'>
                Free Trial
              </a>
              <button className='btn btn--clear btn--icon-only mobile-toggler'>
                <BurgerSvg className='btn__icon' />
              </button>
            </div>
          </nav>
        </Container>
      </div>
      {/* <MobileNavbar/> */}
    </>
  )
}
