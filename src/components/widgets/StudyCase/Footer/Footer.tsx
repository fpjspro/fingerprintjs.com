import React, { useState } from 'react'
import InlineCtaComponent from '../../../../components/widgets/InlineCta'
import Modal from '../../../../components/common/Modal'
import ContactSalesForm from '../../../../components/ContactSalesForm'
import { URL } from '../../../../constants/content'

export interface FooterProps {
  ctaTitle: string
  ctaSubtitle: string
}
export default function Footer({ ctaTitle, ctaSubtitle }: FooterProps) {
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  return (
    <>
      <section>
        <InlineCtaComponent
          title={ctaTitle}
          primaryAction={{
            label: 'Get Started Today',
            name: 'Start Free Trial',
            action: URL.signupUrl,
          }}
          secondaryAction={{
            label: 'Talk to us',
            name: 'Contact Sales',
            action: () => setIsContactSalesModalOpen(true),
          }}
          subtitle={ctaSubtitle}
          size='large'
        />
      </section>

      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}
