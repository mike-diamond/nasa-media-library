import React, { useCallback } from 'react'
import { Field, useFieldState } from 'formular'

import InputView, { InputViewProps } from './InputView/InputView'
import masks from './util/masks'


export type InputProps = Omit<InputViewProps, 'error' | 'value'> & {
  field: Field<string>
  mask?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className, field, label, icon, mask, disabled, dataTestId, isRequired,
  } = props

  const { value, error } = useFieldState(field)

  const handleChange = useCallback((value: string) => {
    const applyMask = masks[mask as keyof typeof masks]

    if (typeof applyMask === 'function') {
      value = applyMask(value)
    }

    field.set(value)
  }, [ mask, field ])

  const handleCrossClick = useCallback(() => field.set(''), [ field ])

  return (
    <InputView
      className={className}
      value={value}
      error={error}
      label={label}
      icon={icon}
      disabled={disabled}
      dataTestId={dataTestId}
      isRequired={isRequired}
      onChange={handleChange}
      onCrossClick={handleCrossClick}
    />
  )
}


export default Input
