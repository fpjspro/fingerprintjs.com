import React, { useEffect, useState } from 'react'
import Select from '../common/Select'
import classNames from 'classnames'
import { minimumIdentifications, pricingTable, calculatePrice } from '../../utils/pricing'
import { PaymentType } from '../../types/PaymentType'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import ContactSalesForm from '../../components/ContactSalesForm'
import styles from './PriceCalculator.module.scss'

const labelFormat = new Intl.NumberFormat('en-US')

export default function PriceCalculator() {
  const selectOptions = pricingTable.map((entry) => ({
    label: labelFormat.format(entry.value),
    value: entry.value,
  }))

  const [selectedPreset, setSelectedPreset] = useState(selectOptions[0])
  const [customCount, setCustomCount] = useState<number | undefined>(undefined)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isContactSalesModalOpen ? 'hidden' : 'unset'
  }, [isContactSalesModalOpen])

  function onPresetSelected(newPreset: ValuePreset): void {
    setSelectedPreset(newPreset)

    // A preset was selected, clear the custom count.
    setCustomCount(undefined)
  }

  function onCustomCountChanged(newCustomCount: string): void {
    if (newCustomCount !== '') {
      setCustomCount(parseInt(newCustomCount, 10))
    } else {
      setCustomCount(undefined)
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Column title='How many identifications per month do you need?'>
          <div className={styles.presetSelector}>
            <div className={styles.description}>
              <strong>Select from preset</strong>
            </div>
            <Select
              value={customCount === undefined ? selectedPreset : null}
              options={selectOptions}
              onChange={onPresetSelected}
            />
          </div>
          <div className={styles.customInput}>
            <div className={styles.description}>Or type a specific number</div>
            <input
              value={customCount || ''}
              onChange={(e) => onCustomCountChanged(e.target.value)}
              type='number'
              name='identification-user-input'
              placeholder='ex. 630,000'
            />
          </div>
        </Column>
        <Column title={'On-Demand'}>
          <Price
            value={
              customCount === undefined
                ? calculatePrice(selectedPreset.value, PaymentType.monthly)
                : calculatePrice(
                    customCount >= minimumIdentifications ? customCount : minimumIdentifications,
                    PaymentType.monthly
                  )
            }
            description='Pay as you go, cancel any time'
          />
        </Column>
        <Column title='Reserved'>
          <Price
            value={
              customCount === undefined
                ? calculatePrice(selectedPreset.value, PaymentType.annually)
                : calculatePrice(
                    customCount >= minimumIdentifications ? customCount : minimumIdentifications,
                    PaymentType.annually
                  )
            }
            description='Requires a 12 month prepay'
          />
        </Column>
        <Column title='Enterprise License'>
          <div className={styles.description}>Enterprise support license with SLA</div>

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
