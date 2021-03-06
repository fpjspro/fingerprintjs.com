import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as accuracySvg } from './arrow_on_target.svg'
import { ReactComponent as identifierSvg } from './id.svg'
import { ReactComponent as secureSvg } from './padlock.svg'
import { ReactComponent as futureProofedSvg } from './time_travel.svg'

import styles from './WhyGoProSection.module.scss'

export default function WhyGoProSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <header className={styles.sectionHeader}>
          <h1 className={styles.title}>Why Go Pro?</h1>
        </header>
        <div className={styles.benefitsSection}>
          <ProBenefit icon={accuracySvg} title='99.5% accuracy'>
            Highest identification accuracy using fingerprinting, fuzzy matching and server-side techniques.
          </ProBenefit>
          <ProBenefit icon={secureSvg} title='Secure data processing'>
            Pro processes all information server-side and transmits it securely to your servers using our API.
          </ProBenefit>
          <ProBenefit icon={identifierSvg} title='Highly stable identifier'>
            Pro&apos;s VisitorID remains the same permanently, even as browsers are upgraded.
          </ProBenefit>
          <ProBenefit icon={futureProofedSvg} title='Future-proofed'>
            Hosted and maintained by our team - ensure identification accuracy without in-house expertise.
          </ProBenefit>
        </div>
      </Container>
    </Section>
  )
}

interface ProBenefitProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  children: string
}

function ProBenefit({ title, children, icon: Icon }: ProBenefitProps) {
  return (
    <div className={styles.benefit}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{children}</p>
      </div>
    </div>
  )
}
