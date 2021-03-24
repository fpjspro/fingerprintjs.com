import { PaymentType } from './../types/PaymentType'

export const minimumIdentifications = 5000
export const freeUniqueVisitors = 1000

export const pricingTable = [
  { label: '1K', value: 1000 },
  { label: '5K', value: 5000 },
  { label: '10K', value: 10000 },
  { label: '50K', value: 50000 },
  { label: '100K', value: 100000 },
]

export function handlePriceChange(currentValue: number, type: PaymentType): string {
  const value = Number(currentValue)
  const newPrice = calculatePrice(value, type)

  return newPrice
}

export function calculatePrice(price: number, type: PaymentType): string {
  const currencyFormatOptions = {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  }

  if (type === PaymentType.Monthly) {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format(price / 50)
  }
  if (type === PaymentType.Annually) {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format((price / 50) * 0.8)
  } else {
    throw new Error('Payment type is required')
  }
}
