import { PaymentType } from './../types/PaymentType';

export function handlePriceChange(currentValue: number, type: PaymentType): string {
  const value = Number(currentValue);
  const newPrice = calculatePrice(value, type);

  return newPrice;
}

function calculatePrice(price: number, type: PaymentType): string {
  const currencyFormatOptions = {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  };

  if (type === 'monthly') {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format(price / 1000);
  }
  if (type === 'annually') {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format((price / 1000) * 0.8);
  } else {
    throw new Error('Payment type is required');
  }
}
