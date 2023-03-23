import React from 'react'

import Icon, { IconProps } from 'components/Icon/Icon'
import Text from 'components/Text/Text'

import cx from 'classnames'


type InfoItemProps = {
  className?: string
  title?: string
  icon: IconProps['name']
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  const { className, title, icon } = props

  if (!title) {
    return (
      <div />
    )
  }

  return (
    <div className={cx('flex opacity-72', className)}>
      <Icon
        className="flex-none"
        name={icon}
        color="white"
      />
      <Text
        className="ml-8 overflow-ellipsis"
        message={title}
        size="c16"
        color="white"
      />
    </div>
  )
}


export default InfoItem
