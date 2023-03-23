import React from 'react'

import Input, { InputProps } from '../Input/Input'


type SearchProps = {
  className?: string
  field: InputProps['field']
}

const Search: React.FC<SearchProps> = (props) => {
  const { className, field } = props

  return (
    <div className={className}>
    </div>
  )
}


export default Search
