import React from 'react'

import { useSearchData } from 'api'

import Logo from 'components/Logo/Logo'
import Text from 'components/Text/Text'

import Observer from './Observer/Observer'
import SearchInput from './SearchInput/SearchInput'
import SearchResults from './SearchResults/SearchResults'

import { useSearchForm } from './util'


const HomeView: React.FC = () => {
  const { form, searchValues, handleSearch } = useSearchForm()
  const { error, totalHits, searchItems, isFetching, nextPageSize, loadMore } = useSearchData(searchValues)

  const canLoadMore = Boolean(nextPageSize && !isFetching && searchItems.length && !error)

  return (
    <>
      <Logo className="mt-96" />
      <SearchInput
        className="mt-36"
        form={form}
        totalHits={totalHits}
        isFetching={!searchItems.length &&  isFetching}
        onSearchClick={handleSearch}
      />
      <SearchResults
        searchItems={searchItems}
        nextPageSize={nextPageSize}
        isFetching={isFetching}
      />
      {
        canLoadMore && (
          <Observer
            onObserve={loadMore}
          />
        )
      }
      {
        Boolean(error) && (
          <Text
            className="text-center"
            message={error as string}
            size="t14"
            color="fargo"
          />
        )
      }
    </>
  )
}


export default HomeView
