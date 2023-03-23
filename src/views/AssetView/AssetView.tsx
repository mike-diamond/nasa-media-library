import React from 'react'
import { useRouter } from 'next/router'
import { useAssetData } from 'api'

import Logo from 'components/Logo/Logo'

import BackButton from './BackButton/BackButton'
import { usePrevPath } from './util'
import useDataError from './util/useDataError'
import AssetInfo from 'views/AssetView/AssetInfo/AssetInfo'


const AssetView: React.FC = () => {
  const router = useRouter()
  const { query } = router

  const prevPath = usePrevPath()

  const { data, error, isFetching } = useAssetData(query.id as string)

  useDataError({ error, prevPath })

  const {
    date = '', title = '', description = '', location = '', photographer = '',
    keywords = [], images = [],
  } = data

  return (
    <>
      <Logo className="mt-96" />
      <div className="mt-56">
        <BackButton href={prevPath} />
        <AssetInfo
          className="mt-32"
          date={date}
          title={title}
          images={images}
          keywords={keywords}
          location={location}
          description={description}
          photographer={photographer}
          isFetching={isFetching}
        />
      </div>
    </>
  )
}


export default AssetView
