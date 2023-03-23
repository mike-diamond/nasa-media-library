import React from 'react'
import cx from 'classnames'

import Text from 'components/Text/Text'

import logoImage from './images/logo.svg'

import s from './Logo.module.scss'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <div className={cx(className, 'flex items-center justify-center')}>
      <img
        className={s.image}
        src={logoImage.src}
        alt="NASA Media Library"
      />
      <Text
        className="ml-16"
        size="h32"
        color="godfather"
        message="Media Library"
      />
    </div>
  )
}


export default Logo
