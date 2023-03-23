import React from 'react'
import cx from 'classnames'


const sizesMap = {
  text: [ 't20', 't16', 't14' ],
  notes: [ 'n12' ],
  headers: [ 'h72', 'h56', 'h40', 'h32', 'h28', 'h24', 'h20', 'h16' ],
  controls: [ 'c20', 'c16', 'c14', 'c12' ],
} as const

export const sizes = [
  ...sizesMap.headers,
  ...sizesMap.controls,
  ...sizesMap.text,
  ...sizesMap.notes,
] as const

export type TextProps = {
  className?: string
  tag?: string
  size: typeof sizes[number]
  color: Color | 'inherit'
  message: string
  htmlFor?: string
  html?: boolean
}

const Text: React.FC<TextProps> = (props) => {
  const { className, tag = 'div', size, color, message, htmlFor, html } = props

  const componentProps = {
    className: cx(className, {
      [`text-${size}`]: size,
      [`color-${color}`]: color !== 'inherit',
    }),
    htmlFor,
  }

  if (html) {
    return React.createElement(tag, {
      ...componentProps,
      dangerouslySetInnerHTML: { __html: message },
    })
  }

  return React.createElement(tag, componentProps, message)
}


export default Text
