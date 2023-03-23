import React from 'react'
import cx from 'classnames'
import NextLink from 'next/link'

import CollectionItem, { CollectionItemProps } from './CollectionItem/CollectionItem'

import s from './SearchResults.module.scss'


type SearchItem = Omit<CollectionItemProps, 'className'> & {
  id: string
}

type SearchResultsProps = {
  className?: string
  searchItems: SearchItem[]
  nextPageSize: number
  isFetching: boolean
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { className, searchItems, nextPageSize, isFetching } = props

  return (
    <div className={cx(className, s.grid, 'grid grid-gap-12')}>
      {
        searchItems.map((searchItem, index) => {
          const { id, title, location, thumbnail, photographer } = searchItem

          return (
            <NextLink
              key={index}
              href={`/${id}`}
              prefetch
            >
              <CollectionItem
                className="h-full"
                title={title}
                location={location}
                thumbnail={thumbnail}
                photographer={photographer}
              />
            </NextLink>
          )
        })
      }
      {
        Boolean(isFetching && nextPageSize) && (
          [ ...new Array(nextPageSize) ].map((_, index) => (
            <CollectionItem
              key={index}
              className="h-full"
            />
          ))
        )
      }
    </div>
  )
}


export default SearchResults
