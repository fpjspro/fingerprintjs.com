import { PaymentType } from './../types/PaymentType'

export const minimumIdentifications = 100000
export const freeApiCalls = 20000

export const pricingTable = [
  { label: '100K', value: 100000 },
  { label: '250K', value: 250000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
  { label: '10M+', value: Infinity },
]

export function handlePriceChange(currentValue: number, type: PaymentType): string {
  const value = Number(currentValue)
  const newPrice = calculatePrice(value, type)

  return newPrice
}

export function calculatePrice(identifications: number, type: PaymentType): string {
  const currencyFormatOptions = {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  }

  if (type === PaymentType.Monthly) {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format(identifications / 1000)
  }
  if (type === PaymentType.Annually) {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format((identifications / 1000) * 0.8)
  } else {
    throw new Error('Payment type is required')
  }
}
