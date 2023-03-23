import React, { CSSProperties, useMemo } from 'react'
import cx from 'classnames'

import images from './util/images'

import s from './Icon.module.scss'


export const sizes = [ 16, 24, 32 ] as const

export type IconProps = {
  className?: string
  name: IconName
  size?: typeof sizes[number]
  color?: Color | 'inherit'
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, name, size = 16, color = 'rocky' } = props

  const image = name !== 'spinner' ? images[name] : null

  const dimensions = useMemo<CSSProperties>(() => {
    const remSize = `${size}rem`

    return {
      width: remSize,
      height: remSize,
    }
  }, [ size ])

  const style = useMemo(() => {
    if (image?.src) {
      const url = `url(${image.src})`

      if (color) {
        return {
          ...dimensions,
          maskImage: url,
          WebkitMaskImage: url,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center center',
          WebkitMaskSize: 'contain',
        }
      }

      return {
        ...dimensions,
        backgroundImage: url,
      }
    }

    return {}
  }, [ image, color, dimensions ])

  if (name === 'spinner') {
    return (
      <svg
        className={cx(s.spinner, className, {
          [`color-${color}`]: Boolean(color),
        })}
        viewBox="0 0 50 50"
        width={dimensions.width}
        height={dimensions.height}
      >
        <circle
          className={s.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
      </svg>
    )
  }

  return (
    <div
      className={cx(className, 'inline-block', {
        [`bg-${color}`]: Boolean(color),
      })}
      style={style}
    />
  )
}


export default Icon
