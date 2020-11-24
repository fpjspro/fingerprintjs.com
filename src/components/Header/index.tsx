import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import GithubButton from '../GithubButton'
import { ReactComponent as BurgerSvg } from './burger.svg'
import MobileNavbar from '../MobileNavbar'
import Button from '../common/Button'
import Container from '../common/Container'

import styles from './Header.module.scss'
import { isBrowser } from '../../helpers/detector'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const clazz = 'isMobileMenuOpen'
    isBrowser && isMobileMenuOpen ? document.body.classList.add(clazz) : document.body.classList.remove(clazz)
  }, [isMobileMenuOpen])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header>
      <Navbar />
      <div className={styles.nav}>
        <Container size='large'>
          <nav className={styles.navMain}>
            <div className={styles.navLeft}>
              <Link to='/' className={`${styles.link} ${styles.linkLogo}`} title='Logo'>
                <img src='/img/company-logos/fpjs.svg' alt='FingerprintJS' className={styles.logo} />
              </Link>
            </div>
            <div className={styles.navRight}>
              <GithubButton className={styles.desktopOnly} />
              <Button href='mailto:sales@fingerprintjs.com' variant='outline' className={styles.desktopOnly}>
                Contact Sales
              </Button>
              <Button href='https://dashboard.fingerprintjs.com/signup'>Free Trial</Button>
              <Button className={styles.mobileToggler} variant='clear' onClick={handleToggleMobileMenu}>
                <BurgerSvg className={styles.buttonIcon} />
              </Button>
            </div>
          </nav>
        </Container>
      </div>
      {isMobileMenuOpen && <MobileNavbar />}
    </header>
  )
}
