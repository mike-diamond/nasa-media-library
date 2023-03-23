import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import cx from 'classnames'

import s from './Gallery.module.scss'
import ButtonBase from 'components/ButtonBase/ButtonBase'
import Icon from 'components/Icon/Icon'


export type GalleryProps = {
  className?: string
  images: {
    thumb?: string
    small?: string
    medium?: string
    large?: string
    orig?: string
  }[]
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { className, images } = props

  const [ { isVisible, visibleIndex }, setState ] = useState({
    isVisible: false,
    visibleIndex: 0,
  })

  const imagesList = useMemo(() => (
    images
      .map((image) => image.large || Object.values(image)[0])
      .filter(Boolean)
  ), [ images ])

  return (
    <div className={className}>
      {
        Boolean(imagesList.length > 1) && (
          <>
            <ButtonBase
              className={cx(s.arrowLeft, 'absolute p-8 radius-100 bg-rush z-1 left-0 ml-8')}
              disabled={visibleIndex === 0}
              onClick={() => setState({
                visibleIndex: visibleIndex - 1,
                isVisible: true
              })}
            >
              <Icon name="arrow" color="rocky" />
            </ButtonBase>
            <ButtonBase
              className={cx(s.arrowRight, 'absolute p-8 radius-100 bg-rush z-1 right-0 mr-8')}
              disabled={imagesList.length === visibleIndex + 1}
              onClick={() => setState({
                visibleIndex: visibleIndex + 1,
                isVisible: true,
              })}
            >
              <Icon name="arrow" color="rocky" />
            </ButtonBase>
          </>
        )
      }
      {
        Boolean(imagesList[visibleIndex]) && (
          <Image
            className={cx('absolute w-full h-full basic-transition fit-cover', {
              'opacity-0': !isVisible,
            })}
            src={imagesList[0]}
            width={450}
            height={300}
            alt=""
            loading="lazy"
            onLoad={() => setState((state) => ({ ...state, isVisible: true }))}
          />
        )
      }
      <div className={s.aspectContainer} />
    </div>
  )
}


export default Gallery
