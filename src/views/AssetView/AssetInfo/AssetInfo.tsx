import React from 'react'
import cx from 'classnames'
import NextLink from 'next/link'

import Text from 'components/Text/Text'
import Bone from 'components/Bone/Bone'
import Button from 'components/Button/Button'
import InfoItem from 'components/InfoItem/InfoItem'

import Gallery, { GalleryProps } from './Gallery/Gallery'

import s from './AssetInfo.module.scss'


type AssetInfoProps = {
  className?: string
  date: string
  title: string
  location: string
  description: string
  photographer: string
  keywords: string[]
  images: GalleryProps['images']
  isFetching: boolean
}

const AssetInfo: React.FC<AssetInfoProps> = (props) => {
  const { className, date, title, location, description, photographer, keywords, images, isFetching } = props

  return (
    <div className={cx(s.container, className, 'grid')}>
      <div className="relative radius-12 overflow-hidden bone">
        <Gallery
          images={images}
        />
        <div
          className={cx(s.info, 'absolute left-0 bottom-0 px-16 py-12 w-full flex items-center justify-between')}
        >
          <InfoItem
            icon="geopoint"
            title={location}
          />
          <InfoItem
            icon="photo"
            title={photographer}
          />
        </div>
      </div>
      {
        isFetching ? (
          <div className={s.text}>
            <Bone w={150} h={24} />
            <Bone className="mt-8" w={75} h={20} />
            <Bone className="mt-20 w-full" h={16} />
            <Bone className="mt-4" w={150} h={16} />
            <Bone className="mt-12 w-full" h={28} />
          </div>
        ) : (
          <div className={s.text}>
            <Text
              className="overflow-ellipsis-3"
              message={title}
              size="h20"
              color="titanic"
            />
            <Text
              className="mt-8 opacity-48"
              message={date}
              size="t16"
              color="titanic"
            />
            <Text
              className="mt-16 opacity-72"
              message={description}
              size="t16"
              color="titanic"
              html
            />
            <div className="flex items-center flex-wrap mt-12">
              <Text
                className="opacity-72 mr-8"
                message="Tags:"
                size="c16"
                color="titanic"
              />
              {
                keywords.map((keyword, index) => (
                  <NextLink
                    key={index}
                    href={`/?search=${keyword}`}
                    prefetch
                  >
                    <Button
                      className="my-4 mr-8"
                      style="secondary"
                      title={keyword}
                    />
                  </NextLink>
                ))
              }
            </div>
          </div>
        )
      }

    </div>
  )
}


export default AssetInfo
