import React, { useCallback } from 'react'


export type FormProps = React.AllHTMLAttributes<HTMLFormElement> & {
  loading?: boolean
  disabled?: boolean
}

const Form: React.FC<FormProps> = (props) => {
  const { children, loading, disabled, onSubmit, ...rest } = props

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()

    if (loading || disabled) {
      return
    }

    if (typeof onSubmit === 'function') {
      onSubmit(event)
    }
  }, [ loading, disabled, onSubmit ])

  return (
    <form
      {...rest}
      noValidate
      aria-busy={loading}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}


export default Form
