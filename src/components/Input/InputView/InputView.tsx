import React, { useState, useCallback, useRef, useId, useEffect, ChangeEventHandler } from 'react'
import cx from 'classnames'

import { useMedia } from 'modules'

import Text from '../../Text/Text'
import Icon from '../../Icon/Icon'
import ButtonBase from '../../ButtonBase/ButtonBase'

import s from './InputView.module.scss'


export type InputViewProps = {
  className?: string
  icon?: IconName
  value: string
  label: string
  error?: string | null | boolean
  disabled?: boolean
  dataTestId?: string
  isRequired?: boolean
  onCrossClick?: () => void
  onChange?: (value: string) => void
}

const InputView: React.FC<InputViewProps> = (props) => {
  const {
    className, value, error, label, icon, disabled, isRequired, dataTestId,
    onCrossClick, onChange
  } = props

  const { isMobile } = useMedia()

  const ref = useRef<HTMLInputElement>(null)
  const [ isFocused, setFocused ] = useState(false)

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((event) => {
    let value = event.target.value

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [ onChange ])

  useEffect(() => {
    if (isFocused && !disabled && ref.current) {
      ref.current.focus()
    }
  }, [ isFocused, disabled ])

  const controlId = useId()
  const testId = dataTestId || `input-${controlId}`

  const isFilled = value !== ''
  const isError = Boolean(error)

  const containerClassName = cx(s.container, 'w-full flex items-center radius-8 px-16', {
    [s.focused]: isFocused && !disabled,
    [s.filled]: isFilled,
    [s.error]: isError && !isFocused,
    [s.disabled]: disabled,
    'opacity-50 cursor-default': disabled,
  })

  const inputClassName = cx(
    s.field,
    'w-full mt-16 text-t16 overflow-ellipsis whitespace-nowrap color-moon',
    {
      'cursor-default': disabled,
    }
  )

  const inputProps = {
    ref,
    value,
    disabled,
    id: controlId,
    'data-testid': testId,
    'aria-invalid': isError,
    'aria-required': isRequired,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
    className: inputClassName,
  }

  return (
    <div
      className={cx(className, 'relative')}
      data-focus={isFocused}
    >
      <div
        className={containerClassName}
        onClick={disabled ? undefined : handleFocus}
      >
        {
          Boolean(icon) && (
            <Icon
              className="mr-16"
              name={icon as IconName}
              color="titanic"
              size={16}
            />
          )
        }
        <div className="w-full h-full inline-flex flex-col justify-center relative">
          <Text
            className={cx(s.label, 'absolute left-0 w-full overflow-ellipsis whitespace-nowrap opacity-60')}
            message={isMobile && error ? error as string : label}
            tag="label"
            size={(value || isFocused && !disabled) ? 'n12' : 't14'}
            color="titanic"
            htmlFor={controlId}
          />
          <div className="flex items-center">
            <input {...inputProps} />
            {
              typeof onCrossClick === 'function' && isFilled && (
                <ButtonBase
                  className={s.crossButton}
                  dataTestId={`${testId}-crossButton`}
                  onClick={onCrossClick}
                >
                  <Icon
                    name="close"
                    size={16}
                    color="titanic"
                  />
                </ButtonBase>
              )
            }
          </div>
        </div>
      </div>
      {
        Boolean(error && !isMobile) && (
          <div
            className="py-8 px-16 radius-8 absolute left-0 top-100 mt-4"
          >
            <Text
              size="n12"
              color="fargo"
              message={error as string}
            />
          </div>
        )
      }
    </div>
  )
}


export default React.memo(InputView)
