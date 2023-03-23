import React from 'react'
import cx from 'classnames'
import { Form as FormularForm } from 'formular'

import Text from 'components/Text/Text'
import Form from 'components/Form/Form'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import Observer from './Observer/Observer'
import { formatNumber } from './util'

import s from './SearchInput.module.scss'


type SearchInputProps = {
  className?: string
  form: FormularForm<{
    search: string
    yearEnd: string
    yearStart: string
  }>
  totalHits?: number
  isFetching: boolean
  onSearchClick: () => void
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { className, form, totalHits, isFetching, onSearchClick } = props

  return (
    <>
      <Observer className={className}>
        <Form className="py-16" loading={isFetching} onSubmit={onSearchClick}>
          <div className={cx(s.container, 'grid')}>
            <Input
              label="Search request"
              icon={isFetching ? 'spinner' : 'search'}
              field={form.fields.search}
              dataTestId="search"
              isRequired
            />
            <Input
              label="Year start"
              mask="year"
              dataTestId="yearStart"
              field={form.fields.yearStart}
            />
            <Input
              label="Year end"
              mask="year"
              dataTestId="yearEnd"
              field={form.fields.yearEnd}
            />
            <Button
              type="submit"
              title="Search"
              style="primary"
              dataTestId="searchButton"
              disabled={isFetching}
            />
          </div>
        </Form>
      </Observer>
      {
        typeof totalHits === 'number' ? (
          <div className="mb-16 text-right" data-testid="totalHits">
            <Text
              message={totalHits ? `Images found: ${formatNumber(totalHits)}` : 'No images found'}
              size="c12"
              color="titanic"
            />
          </div>
        ) : (
          <div className="mt-32" />
        )
      }
    </>
  )
}


export default SearchInput
