import { useMemo } from 'react'
import { useQuery } from 'modules'

import { Image, ModifiedAsset, AssetApiData, LocationApiData, MetadataApiData, Output } from './types'


const useAssetData = (id?: string): Output => {
  const {
    data: assetData,
    error: assetError,
    isFetching: isAssetFetching,
  } = useQuery<AssetApiData>(id ? `/asset/${id}` : '')

  const asset = useMemo(() => {
    const result: ModifiedAsset = {
      metadata: '',
      images: [],
    }

    if (assetData?.collection?.items) {
      const sizesByImage = assetData.collection.items.reduce((acc, { href}) => {
        const link = href.replace(/^http:/, 'https:')

        if (/metadata\.json$/.test(link)) {
          result.metadata = link
        }
        else {
          const image = link.replace(/~(thumb|small|medium|large|orig).+/, '')

          acc[image] = acc[image] || {}

          if (/~thumb\./.test(link)) {
            acc[image].thumb = link
          }
          else if (/~small\./.test(link)) {
            acc[image].small = link
          }
          else if (/~medium\./.test(link)) {
            acc[image].medium = link
          }
          else if (/~large\./.test(link)) {
            acc[image].large = link
          }
          else if (/~orig\./.test(link)) {
            acc[image].orig = link
          }
        }

        return acc
      }, {} as Record<string, Image>)

      result.images = Object.keys(sizesByImage).map((image) => (
        sizesByImage[image]
      ))
    }

    return result
  }, [ assetData ])

  // The link is not described in the api, but the most of the links have the same pattern,
  // so it is used to speed up request (on ~1.5 sec)
  // If the real link is different, the request will be canceled and fetched again with the correct link
  const expectedMetadataLink = `https://images-assets.nasa.gov/image/${id}/metadata.json`

  const {
    data: locationData,
    error: locationError,
    isFetching: isLocationFetching,
  } = useQuery<LocationApiData>(id && !asset.metadata ? `/metadata/${id}` : '')

  const {
    data: metadata,
    error: metadataError,
    isFetching: isMetadataFetching,
  } = useQuery<MetadataApiData>(asset.metadata || locationData?.location || expectedMetadataLink)

  const data = useMemo(() => {
    if (metadata) {
      return {
        title: metadata['AVAIL:Title'] || '',
        location: metadata['AVAIL:Location'] || '',
        photographer: metadata['AVAIL:Photographer'] || '',
        description: metadata['AVAIL:Description'] || '',
        keywords: metadata['AVAIL:Keywords'] || [],
        date: metadata['AVAIL:DateCreated'] || '',
        images: asset.images,
      }
    }

    return {
      images: asset.images,
    }
  }, [ asset, metadata ])

  const _assetError = !isAssetFetching && !isLocationFetching ? assetError : null
  const error = _assetError || locationError || metadataError
  const isFetching = isAssetFetching || isLocationFetching || isMetadataFetching

  return {
    data,
    error,
    isFetching,
  }
}


export default useAssetData
