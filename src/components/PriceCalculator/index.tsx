import React, { useState } from 'react'
import Select from '../common/Select'
import classNames from 'classnames'
import { minimumIdentifications, freeUniqueVisitors, pricingTable, calculatePrice } from '../../helpers/pricing'
import { PaymentType } from '../../types/PaymentType'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import ContactSalesForm from '../../components/ContactSalesForm'
import { numberFormatter } from '../../helpers/format'
import styles from './PriceCalculator.module.scss'

export default function PriceCalculator() {
  const selectOptions = pricingTable.map((entry) => ({
    label: numberFormatter.format(entry.value),
    value: entry.value,
  }))
  selectOptions.push({ label: `${numberFormatter.format(500000)}+`, value: Infinity })

  const [selectedPreset, setSelectedPreset] = useState(selectOptions[0])
  const [customCount, setCustomCount] = useState<number | undefined>(undefined)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  const isCustomPricing = (!customCount && selectedPreset.value === Infinity) || (customCount && customCount >= 500000)
  const isFree =
    (!customCount && selectedPreset.value === freeUniqueVisitors) || (customCount && customCount <= freeUniqueVisitors)

  function onPresetSelected(newPreset: ValuePreset): void {
    setSelectedPreset(newPreset)

    // A preset was selected, clear the custom count.
    setCustomCount(undefined)
  }

  function onCustomCountChanged(newCustomCount: string): void {
    if (newCustomCount !== '') {
      const strippedValue = newCustomCount.replace(/\.|,/, '')

      setCustomCount(parseInt(strippedValue, 10))
    } else {
      setCustomCount(undefined)
    }
  }

  function getPrice(paymentType: PaymentType) {
    return customCount === undefined
      ? calculatePrice(selectedPreset.value, paymentType)
      : calculatePrice(customCount >= minimumIdentifications ? customCount : minimumIdentifications, paymentType)
  }

  function getPriceValue(paymentType: PaymentType) {
    if (isFree) {
      return '$0'
    } else if (isCustomPricing) {
      return 'Custom'
    } else {
      return getPrice(paymentType)
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Column title='How many unique visitors per month do you have?'>
          <div className={styles.presetSelector}>
            <div className={styles.description}>
              <strong>Select from preset</strong>
            </div>
            <Select<ValuePreset>
              value={customCount === undefined ? selectedPreset : null}
              options={selectOptions}
              onChange={onPresetSelected}
            />
          </div>
          <div className={styles.customInput}>
            <div className={styles.description}>Or type a specific number</div>
            <input
              value={customCount ?? ''}
              onChange={(e) => onCustomCountChanged(e.target.value)}
              type='number'
              name='identification-user-input'
              placeholder='ex. 8000'
            />
          </div>
        </Column>
        <Column title={'On-Demand'}>
          <Price
            value={getPriceValue(PaymentType.Monthly)}
            description={isFree ? 'Free up to 1,000 monthly unique visitors' : 'Pay as you go, cancel any time'}
          />
        </Column>
        <Column title='Annual'>
          <Price
            value={getPriceValue(PaymentType.Annually)}
            description={isFree ? 'Free up to 1,000 monthly unique visitors' : 'Requires a 12 month prepay'}
          />
        </Column>
        <Column title='Enterprise License'>
          {isCustomPricing ? (
            <div className={styles.description}>Custom pricing for high traffic websites</div>
          ) : (
            <div className={styles.description}>Enterprise support license with SLA</div>
          )}
          <Button variant='outline' small onClick={() => setIsContactSalesModalOpen(true)}>
            Contact Sales
          </Button>
        </Column>
      </div>

      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}

interface ColumnProps {
  title: string
  children: React.ReactNode
}

function Column({ title, children }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={classNames(styles.row, styles.header)}>{title}</div>
      <div className={styles.row}>{children}</div>
    </div>
  )
}

interface PriceProps {
  value: string
  description: string
}

function Price({ value, description }: PriceProps) {
  return (
    <>
      <div className={styles.price}>
        <div className={styles.value}>{value}</div>
        <div className={styles.subtitle}>per month</div>
      </div>
      <div className={styles.description}>{description}</div>
    </>
  )
}

interface ValuePreset {
  label: string
  value: number
}
