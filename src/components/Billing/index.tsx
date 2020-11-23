import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { PaymentType } from '../../types/PaymentType'
import { handlePriceChange, pricingTable } from '../../utils/pricing'
import Container from '../common/Container'
import Section from '../common/Section'
import RangeSlider, { SliderValue } from '../common/RangeSlider'
import Button from '../common/Button'
import styles from './Billing.module.scss'

const sliderConfig = {
  min: 0,
  max: 6,
  def: 0,
}

export default function Billing() {
  const sliderTable = pricingTable.map(({ label, value }) => {
    return { label, value } as SliderValue
  })
  const defaultValue = 0
  const [sliderValue, setSliderValue] = useState(defaultValue)
  const [monthlyPayment, setMonthlyPayment] = useState(pricingTable[sliderValue].label)
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.Monthly)

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue)
    recalculatePricing(sliderTable[newValue].value, paymentType)
  }

  const handlePaymentTypeChange = (type: PaymentType) => () => {
    setPaymentType(type)
    recalculatePricing(sliderTable[sliderValue].value, type)
  }

  const recalculatePricing = (value: number, paymentType: PaymentType) => {
    const newPrice = handlePriceChange(value, paymentType)
    setMonthlyPayment(newPrice)
  }

  useEffect(() => {
    recalculatePricing(sliderTable[sliderValue].value, paymentType)
  }, [paymentType, sliderTable, sliderValue])

  return (
    <Section className={styles.section}>
      <Container size='large'>
        <header className={styles.header}>
          <h2 className={styles.title}>Predictable &amp; Transparent Billing</h2>
          <Link to='/pricing'>
            <Button variant='outline'>Detailed Pricing</Button>
          </Link>
        </header>
        <div className={styles.content}>
          <div className={styles.idsPerMonth}>
            <h3 className={styles.title}>How many identification API calls per month do you need?</h3>
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
              <a href='mailto:sales@fingerprintjs.com' style={{ textDecoration: 'underline' }}>
                Contact sales
              </a>{' '}
              for an enterprise license, 99.9% SLA and 24/7 dedicated support.
            </p>
          </div>
          <div className={styles.payment}>
            <div>
              <span className={styles.price}>{monthlyPayment} </span>
              per month
            </div>
            <div className={styles.billed}>billed yearly</div>
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
              With annual pricing you lock in an annual price with a discount by prepaying. This plan is recommended for
              users with predictable or high traffic volumes.
            </p>
          </div>
        </div>
        <div className={styles.link}>
          <Link to='/pricing'>
            <Button variant='outline'>Detailed Pricing</Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
