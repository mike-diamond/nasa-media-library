import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import cx from 'classnames'

import Text from 'components/Text/Text'
import InfoItem from 'components/InfoItem/InfoItem'
import { IconProps } from 'components/Icon/Icon'

import s from './CollectionItem.module.scss'


export type CollectionItemProps = {
  className?: string
  title?: string
  location?: string
  thumbnail?: string
  photographer?: string
}

const CollectionItem: React.FC<CollectionItemProps> = (props) => {
  const { className, title, location, thumbnail, photographer } = props

  const [ isVisible, setVisible ] = useState(false)

  const infoItems = useMemo(() => {
    return [
      {
        icon: 'geopoint',
        title: location,
      },
      {
        icon: 'photo',
        title: photographer,
      },
    ]
      .filter(({ title }) => title)
  }, [ location, photographer ])

  return (
    <div className={cx(s.container, className, 'relative bone shadow-titanic-hover radius-8')}>
      {
        thumbnail ? (
          <Image
            className={cx(s.image, 'w-full fit-cover radius-4 radius-top basic-transition', {
              'opacity-0': !isVisible,
            })}
            src={thumbnail}
            alt={title || ''}
            width={320}
            height={320}
            loading="lazy"
            onLoad={() => setVisible(true)}
          />
        ) : (
          <div className={cx(s.fill, 'w-full')} />
        )
      }
      <div className={cx(s.description, 'p-16 absolute bottom-0 left-0 w-full z-1 flex flex-col justify-end')}>
        <Text
          className="overflow-ellipsis"
          message={title || ''}
          size="h16"
          color="white"
        />
        {
          infoItems.map(({ icon, title }, index) => (
            <InfoItem
              key={index}
              className="mt-12"
              icon={icon as IconProps['name']}
              title={title}
            />
          ))
        }
      </div>
    </div>
  )
}


export default React.memo(CollectionItem)
