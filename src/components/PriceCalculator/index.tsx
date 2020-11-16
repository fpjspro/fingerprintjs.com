import React, { useState } from 'react'
import Select from '../../components/base/Select'
import classNames from 'classnames'
import { minimumIdentifications, pricingTable, calculatePrice } from '../../utils/pricing'
import styles from './PriceCalculator.module.scss'
import { PaymentType } from '../../types/PaymentType'

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

export default function PriceCalculator() {
  const labelFormat = new Intl.NumberFormat('en-US')
  const selectOptions = pricingTable.map((entry) => ({
    label: labelFormat.format(entry.value),
    value: entry.value,
  }))

  /** The currently selected price preset. */
  const [selectedPreset, setSelectedPreset] = useState(selectOptions[0])

  /**
   * The number of identifications for doing custom price calculations.
   * undefined when using a preset.
   */
  const [customCount, setCustomCount] = useState<number | undefined>(undefined)

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

  const reactSelectStyle = {
    control: (provided, state) => ({
      ...provided,
      height: 48,
      minHeight: 48,
      borderRadius: 8,
      borderColor: state.isFocused ? 'rgba(13, 16, 43, 1)' : 'rgba(13, 16, 43, 0.3)',
      boxShadow: null,
      '&:hover': {
        borderColor: 'rgba(13, 16, 43, 1)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected ? 'rgb(242, 242, 247)' : 'transparent',
      fontWeight: state.isSelected ? 'bold' : provided.fontWeight,
      borderRadius: 8,
      '&:active': {
        backgroundColor: 'rgb(242, 242, 247)',
        fontWeight: 'bold',
      },
      '&:hover': {
        backgroundColor: 'rgb(242, 242, 247)',
        borderRadius: 8,
        fontWeight: 'bold',
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  }

  return (
    <div className={styles.wrapper}>
      <Column title={'How many identifications per month do you need?'}>
        <div className={styles.presetSelector}>
          <div className={styles.description}>
            <strong>Select from preset</strong>
          </div>
          <Select
            styles={reactSelectStyle}
            value={customCount === undefined ? selectedPreset : null}
            options={selectOptions}
            onChange={onPresetSelected}
            menuPortalTarget={document.body}
          />
        </div>
        <div className={styles.customInput}>
          <div className={styles.description}>Or type a specific number</div>
          <input
            value={customCount || ''}
            onChange={(e) => onCustomCountChanged(e.target.value)}
            type='number'
            name='identification-user-input'
            className={'input user-input__input preset__specific-number'}
            placeholder={'ex. 630,000'}
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
          description={'Pay as you go, cancel any time'}
        />
      </Column>
      <Column title={'Reserved'}>
        <Price
          value={
            customCount === undefined
              ? calculatePrice(selectedPreset.value, PaymentType.annually)
              : calculatePrice(
                  customCount >= minimumIdentifications ? customCount : minimumIdentifications,
                  PaymentType.annually
                )
          }
          description={'Requires a 12 month prepay'}
        />
      </Column>
      <Column title={'Enterprise License'}>
        <div className={styles.description}>Enterprise support license with SLA</div>
        <a href='mailto:sales@fingerprintjs.com' className='btn btn--outlined btn--small'>
          Contact Sales
        </a>
      </Column>
    </div>
  )
}
