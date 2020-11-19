import React from 'react'
import { isBrowser } from '../../../utils/detector'
import Select, { Props } from 'react-select'

const borderColor = 'rgba(13, 16, 43, 1)'
const borderColorFaded = 'rgba(13, 16, 43, 0.3)'
const backgroundColor = 'rgb(242, 242, 247)'

export default function CustomSelect(props: Props) {
  const reactSelectStyle = {
    control: (provided, state) => ({
      ...provided,
      height: '6rem',
      minHeight: '6rem',
      borderRadius: 8,
      borderColor: state.isFocused ? borderColor : borderColorFaded,
      boxShadow: null,
      '&:hover': {
        borderColor: borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected ? backgroundColor : 'transparent',
      fontWeight: state.isSelected ? 'bold' : provided.fontWeight,
      borderRadius: 8,
      '&:active': {
        backgroundColor: backgroundColor,
        fontWeight: 'bold',
      },
      '&:hover': {
        backgroundColor: backgroundColor,
        borderRadius: 8,
        fontWeight: 'bold',
      },
    }),
  }

  return <Select {...props} styles={reactSelectStyle} menuPortalTarget={isBrowser() ? document.body : undefined} />
}
