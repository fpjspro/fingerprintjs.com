import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { PaymentType } from '../../types/PaymentType'
import { freeUniqueVisitors, handlePriceChange, pricingTable } from '../../helpers/pricing'
import Container from '../common/Container'
import Section from '../common/Section'
import RangeSlider, { SliderValue } from '../common/RangeSlider'
import Button from '../common/Button'
import Modal from '../common/Modal'
import ContactSalesForm from '../ContactSalesForm'
import styles from './Billing.module.scss'
import { PATH } from '../../constants/content'

const sliderConfig = {
  min: 0,
  max: 5,
  def: 0,
}

export default function Billing() {
  const sliderTable = pricingTable.map(({ label, value }) => {
    return { label, value } as SliderValue
  })
  sliderTable.push({ label: '500K+', value: Infinity })

  const defaultValue = 0
  const [sliderValue, setSliderValue] = useState(defaultValue)
  const [monthlyPaymentLabel, setMonthlyPaymentLabel] = useState(pricingTable[defaultValue].label)
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.Monthly)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue)
    recalculatePricing(sliderTable[newValue].value, paymentType)
  }

  const handlePaymentTypeChange = (type: PaymentType) => () => {
    setPaymentType(type)
    recalculatePricing(sliderTable[sliderValue].value, type)
  }

  const recalculatePricing = (value: number, paymentType: PaymentType) => {
    switch (value) {
      case Infinity: {
        setMonthlyPaymentLabel('Custom pricing')
        break
      }
      case freeUniqueVisitors: {
        setMonthlyPaymentLabel('0$')
        break
      }
      default: {
        const newPrice = handlePriceChange(value, paymentType)
        setMonthlyPaymentLabel(newPrice)
        break
      }
    }
  }

  useEffect(() => {
    recalculatePricing(sliderTable[sliderValue].value, paymentType)
  }, [paymentType, sliderTable, sliderValue])

  return (
    <>
      <Section className={styles.section}>
        <Container size='large'>
          <header className={styles.header}>
            <h2 className={styles.title}>Predictable &amp; Transparent Billing</h2>
            <Link to={PATH.pricingUrl}>
              <Button variant='outline'>Detailed Pricing</Button>
            </Link>
          </header>
          <div className={styles.content}>
            <div className={styles.idsPerMonth}>
              <h3 className={styles.title}>How many unique visitors per month does your site have?</h3>
              <RangeSlider
                values={sliderTable}
                currentValue={sliderValue}
                config={sliderConfig}
                handleValueChange={handleSliderChange}
              />
              <p className={styles.footnote}>
                Our standard plan comes with 1 year visit history and email support.
                <br />
                <br />
                <a
                  onClick={() => setIsContactSalesModalOpen(true)}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Contact sales
                </a>{' '}
                for an enterprise license, 99.9% SLA and 24/7 dedicated support.
              </p>
            </div>
            <div className={styles.payment}>
              <div>
                <span className={styles.price}>{monthlyPaymentLabel} </span>
                {sliderValue !== sliderConfig.max && 'per month'}
              </div>
              {sliderValue !== sliderConfig.max ? (
                <>
                  <div className={styles.billed}>
                    billed {paymentType === PaymentType.Annually ? 'yearly' : 'monthly'}
                  </div>
                  <div className={styles.switcher} data-type='annually'>
                    <button
                      className={classNames(styles.button, { [styles.active]: paymentType === PaymentType.Annually })}
                      onClick={handlePaymentTypeChange(PaymentType.Annually)}
                      data-type='annually'
                    >
                      Pay Annually
                    </button>
                    <button
                      className={classNames(styles.button, { [styles.active]: paymentType === PaymentType.Monthly })}
                      onClick={handlePaymentTypeChange(PaymentType.Monthly)}
                      data-type='monthly'
                    >
                      Pay Monthly
                    </button>
                  </div>
                  <p className={styles.description}>
                    With annual pricing you lock in an annual price with a discount by prepaying. This plan is
                    recommended for users with predictable or high traffic volumes.
                  </p>
                </>
              ) : (
                <>
                  <div className={styles.billed}>talk to our sales team</div>
                  <div className={styles.switcher}>
                    <Button
                      onClick={() => setIsContactSalesModalOpen(true)}
                      variant='outline'
                      className={styles.contactSales}
                    >
                      Contact Sales
                    </Button>
                  </div>

                  <p className={styles.description}>
                    For high traffic websites requiring more than 10M API calls per month, contact our sales team for
                    custom pricing.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className={styles.link}>
            <Link to={PATH.pricingUrl}>
              <Button variant='outline'>Detailed Pricing</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}
