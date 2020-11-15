import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import Prism from "prismjs";
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import GithubButton from '../GithubButton';
import {ReactComponent as BurgerSvg} from './burger.svg';
// import MobileNavbar from '../MobileNavbar';
import Button from '../common/Button';
import Container from '../common/Container';
// important to import after other styles to override
import styles from './Header.module.scss';

export default function Header() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <header>
      <Navbar />
      <div className={styles.nav}>
        <Container size='large'>
          <nav className={styles.navMain}>
            <div className={styles.navLeft}>
              <Link to="/" className={`${styles.link} ${styles.linkLogo}`} title="Logo">
                <img src="/img/company-logos/fpjs.svg" alt="FingerprintJS" className={styles.logo} />
              </Link>
            </div>
            <div className={styles.navRight}>
              <GithubButton className={styles.desktopOnly} />
              <Button 
                href="mailto:sales@fingerprintjs.com" 
                variant='outline'
                className={styles.desktopOnly}>
                Contact Sales
              </Button>
              <Button href="https://dashboard.fingerprintjs.com/signup">
                Free Trial
              </Button>
              <Button 
                className={styles.mobileToggler} 
                variant='clear'>
                <BurgerSvg className={styles.buttonIcon}/>
              </Button>
            </div>
          </nav>
        </Container>
      </div>
      {/* <MobileNavbar/> */}
    </header>
  )
}
