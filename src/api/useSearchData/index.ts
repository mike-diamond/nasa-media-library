import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'modules'

import { ApiData, State, Input, Output } from './types'


const pageSize = 100

const useSearchData = (props: Input): Output => {
  const { search, yearEnd, yearStart } = props
  const [ state, setState ] = useState<State>({
    page: 1,
    pageData: {},
  })

  const stateRef = useRef<State>(state)
  stateRef.current = state

  useEffect(() => {
    if (stateRef.current.pageData[1]) {
      setState({
        page: 1,
        pageData: {},
      })
    }
  }, [ search ])

  const { page, pageData } = state

  const url = useMemo(() => {
    if (search) {
      let result = `/search?q=${search}&media_type=image&page=${page}&page_size=${pageSize}`

      if (yearEnd) {
        result += `&year_end=${yearEnd}`
      }

      if (yearStart) {
        result += `&year_start=${yearStart}`
      }

      return result
    }

    return ''
  }, [ page, search, yearEnd, yearStart ])

  const { data, error, isFetching } = useQuery<ApiData>(url)

  useEffect(() => {
    if (page && data?.collection?.items) {
      setState((state) => ({
        ...state,
        pageData: {
          ...state.pageData,
          [page]: data.collection.items,
        },
      }))
    }
  }, [ page, data ])

  const searchItems = useMemo(() => {
    const result: Output['searchItems'] = []

    Object.keys(pageData).forEach((page) => {
      const pageItems = pageData[page] as ApiData['collection']['items']

      pageItems.forEach(({ data, links }) => {
        data.forEach((mediaFile) => {
          const { nasa_id, title, location = '', photographer = '' } = mediaFile

          const thumbnail = links.find(({ rel, render }) => rel === 'preview' && render === 'image')?.href || ''

          result.push({
            id: nasa_id,
            title,
            location,
            thumbnail,
            photographer,
          })
        })
      })
    })

    return result
  }, [ pageData ])

  const loadMore = useCallback(() => {
    setState((state) => ({
      ...state,
      page: state.page + 1,
    }))
  }, [])

  const totalHits = data?.collection?.metadata?.total_hits
  const totalHitsRef = useRef(totalHits)
  totalHitsRef.current = page === 1 ? totalHits : totalHitsRef.current

  const nextPageSize = useMemo(() => {
    if (typeof totalHitsRef.current === 'number') {
      const count = page * pageSize
      const restCount = totalHitsRef.current - count

      if (restCount > 0) {
        return Math.min(pageSize, restCount)
      }

      return 0
    }

    return pageSize
  }, [ page, totalHits ])

  return {
    error,
    totalHits: totalHitsRef.current,
    searchItems,
    nextPageSize,
    isFetching,
    loadMore,
  }
}


export default useSearchData
