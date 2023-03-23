import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'formular'
import { useRouter } from 'next/router'
import { localStorage } from 'modules'

import { required, year, yearEnd, yearStart } from './validators'
import masks from 'components/Input/util/masks'


type Form = {
  search: string
  yearEnd: string
  yearStart: string
}

const useSearch = () => {
  const router = useRouter()
  const { asPath } = router

  const [ searchValues, setSearchValues ] = useState<Form>({
    search: '',
    yearEnd: '',
    yearStart: '',
  })

  const form = useForm<Form>({
    fields: {
      search: [ required ],
      yearEnd: [ year, yearEnd ],
      yearStart: [ year, yearStart ]
    },
  })

  useEffect(() => {
    localStorage.setItem('searchPath', asPath)
  }, [ asPath ])

  useEffect(() => {
    const resetSearchError = () => form.fields.search.setError('')

    const resetYearError = () => {
      form.fields.yearEnd.setError('')
      form.fields.yearStart.setError('')
    }

    form.fields.search.on('change', resetSearchError)
    form.fields.yearEnd.on('change', resetYearError)
    form.fields.yearStart.on('change', resetYearError)

    return () => {
      form.fields.search.off('change', resetSearchError)
      form.fields.yearEnd.on('change', resetYearError)
      form.fields.yearStart.on('change', resetYearError)
    }
  }, [ form ])

  const getFieldsQuery = useCallback((values: Form) => {
    const query: Record<string, string> = {}

    Object.keys(values).forEach((field) => {
      const value = values[field as keyof typeof values]

      if (value) {
        query[field] = value
      }
    })

    if (Object.keys(query)) {
      return query
    }
  }, [])

  const handleSearch = useCallback(async () => {
    const { values, errors } = await form.submit()

    if (!errors) {
      setSearchValues(values)
      const query = getFieldsQuery(values)

      if (query) {
        router.push({ query })
      }
    }
  }, [ form ])

  useEffect(() => {
    if (router.isReady) {
      const queryValues: Record<string, string> = {}

      if (router.query.search) {
        queryValues.search = router.query.search as string
      }
      if (router.query.yearEnd) {
        queryValues.yearEnd = masks.year(router.query.yearEnd as string)
      }
      if (router.query.yearStart) {
        queryValues.yearStart = masks.year(router.query.yearStart as string)
      }

      const hasValues = Object.values(queryValues).some((value) => value)

      if (hasValues) {
        form.setValues(queryValues)
        handleSearch()
      }
    }
  }, [ router.isReady, form, handleSearch ])

  return {
    form,
    searchValues,
    handleSearch,
  }
}


export default useSearch
