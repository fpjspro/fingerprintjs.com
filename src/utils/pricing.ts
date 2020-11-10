import { PaymentType } from './../types/PaymentType';
const pricingTable = [
  { label: '100K', value: 100000 },
  { label: '250K', value: 250000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
  { label: '10M', value: 10000000 },
  { label: '20M', value: 20000000 },
];

export function handlePriceChange(min: number, max: number, current: number, type: PaymentType): {
  valueLabel: string,
  newPrice: string,
  leftOffsetCss: string
} {
  const minValue = Number(min);
  const maxValue = Number(max);
  const value = Number(current);
  const magicNumber = ((value - minValue) * 100) / (maxValue - minValue);
  const valueLabel = pricingTable[value].label;
  const newPrice = calculatePrice(pricingTable[value].value, type);
  const leftOffsetCss = `calc(${magicNumber}% + (${15 - magicNumber * 0.3}px))`;

  return {valueLabel, newPrice, leftOffsetCss};
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

// function switchToType(e) {
//   paymentSwitcher[0].dataset.type = e.target.dataset.type;

//   paymentSwitcherAnnually.removeClass('payment-switcher__button--active');
//   paymentSwitcherMonthly.removeClass('payment-switcher__button--active');

//   rangeSliderInput.trigger('change');
//   e.target.classList.add('payment-switcher__button--active');

//   if (e.target.dataset.type === 'annually') {
//     document.getElementById('billed_annual_text').textContent = 'billed yearly';
//   } else {
//     document.getElementById('billed_annual_text').textContent = 'billed monthly';
//   }
// }
