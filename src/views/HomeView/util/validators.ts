import { RefObject } from 'react'
import { Field } from 'formular'


// Regular expressions
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

// Helpers
const isEmpty = (value: any): boolean => (
  typeof value === 'undefined'
  || value === null
  || value === ''
  || /^\s+$/.test(value)
)

// Validators
const required = (value: string) => {
  if (isEmpty(value)) {
    return 'The field is required'
  }
}

const year = (value: string) => {
  if (value && value.length !== 4) {
    return 'Must be a valid year'
  }
}

const yearEnd = (value: string, values: Record<string, Field<string>>) => {
  const yearStartValue = values.yearStart?.state?.value

  if (value && yearStartValue?.length === 4) {
    const yearEnd = Number(value)
    const yearStart = Number(yearStartValue)

    if (yearEnd < yearStart) {
      return `Must be between ${yearStart} - ${new Date().getFullYear()}`
    }
  }
}

const yearStart = (value: string, values: Record<string, Field<string>>) => {
  const yearEndValue = values.yearEnd?.state?.value

  if (value && yearEndValue?.length === 4) {
    const yearEnd = Number(yearEndValue)
    const yearStart = Number(value)

    if (yearStart > yearEnd) {
      return `Must be between 1920 - ${yearEnd}`
    }
  }
}


export {
  required,
  year,
  yearEnd,
  yearStart
}
