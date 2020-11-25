import React, { useState } from 'react'
import styles from './RangeSlider.module.scss'

export interface SliderValue {
  label: string
  value: number
}

interface RangeSliderProps {
  currentValue: number // index for range slider
  values: SliderValue[]
  config: {
    min: number
    max: number
  }
  handleValueChange: (arg0: number) => void
}

export default function RangeSlider({
  currentValue,
  values,
  config: { min, max },
  handleValueChange,
}: RangeSliderProps) {
  const handleSliderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    handleValueChange(newValue)
    setSliderOffsetCss(calculateSliderOffset(min, max, newValue))
  }

  const calculateSliderOffset = (min: number, max: number, value: number) => {
    const magicNumber = ((value - min) * 100) / (max - min)
    const leftOffsetCss = `calc(${magicNumber}% + (${15 - magicNumber * 0.3}px))`

    return leftOffsetCss
  }

  const [sliderOffsetCss, setSliderOffsetCss] = useState(calculateSliderOffset(min, max, currentValue))

  return (
    <div className={styles.slider} style={{ '--left': sliderOffsetCss } as React.CSSProperties}>
      <span className={styles.output}>{values[currentValue].label}</span>
      <label htmlFor='billingSlider' className={styles.label}>
        {values.map(({ label }) => {
          return (
            <span key={`slider_label_${label}`} className={styles.text}>
              {label}
            </span>
          )
        })}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type='range'
          min={min}
          max={max}
          value={currentValue}
          name='billing-slider'
          aria-label='Price slider'
          onChange={handleSliderValueChange}
        />
      </div>
    </div>
  )
}
