import React from 'react'
import Select, { Props } from 'react-select'

export default function CustomSelect(props: Props) {
  const reactSelectStyle = {
    control: (provided, state) => ({
      ...provided,
      height: '6rem',
      minHeight: '6rem',
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
  }

  return <Select {...props} styles={reactSelectStyle} />
}
