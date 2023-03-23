import React from 'react'
import cx from 'classnames'
import NextLink from 'next/link'

import Icon from 'components/Icon/Icon'
import Text from 'components/Text/Text'

import s from './BackButton.module.scss'


type BackButtonProps = {
  className?: string
  href: string
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { className, href } = props

  return (
    <NextLink
      className={cx(s.button, className, 'flex items-center')}
      href={href}
      prefetch
      data-testid="backButton"
    >
      <Icon
        name="arrow"
        color="inherit"
      />
      <Text
        className="ml-4"
        message="Back to Search"
        size="c16"
        color="inherit"
      />
    </NextLink>
  )
}


export default BackButton
