import React from 'react'
import cx from 'classnames'

import Text from 'components/Text/Text'

import ButtonBase, { ButtonBaseProps } from '../ButtonBase/ButtonBase'

import s from './Button.module.scss'


export type ButtonProps = ButtonBaseProps & {
  className?: string
  title: string
  style: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, title, type, style, disabled, dataTestId, onClick } = props

  return (
    <ButtonBase
      className={cx(s.button, className, s[style], 'text-center radius-8 px-8')}
      disabled={disabled}
      type={type}
      dataTestId={dataTestId}
      onClick={onClick}
    >
      <Text
        className={cx('overflow-ellipsis', {
          'opacity-72': style === 'secondary',
        })}
        message={title}
        size="t14"
        color={style === 'primary' ? 'white' : 'titanic'}
      />
    </ButtonBase>
  )
}


export default Button
