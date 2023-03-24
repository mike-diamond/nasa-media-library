import { fireEvent, render } from '@testing-library/react'

import InputView from './InputView'


describe('InputView', () => {

  test('displays the correct label', () => {
    const label = 'Username'
    const { getByLabelText } = render(<InputView label={label} value="" onChange={() => {}} />)
    const labelElement = getByLabelText(label)

    expect(labelElement).toBeTruthy()
  })

  test('updates the value of the input', () => {
    const onChangeMock = jest.fn()
    const { getByLabelText } = render(<InputView label="Username" value="" onChange={onChangeMock} />)
    const inputElement = getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'john.doe' } })
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('john.doe')
  })

  test('displays the error message correctly', () => {
    const error = 'Error'
    const { getByText } = render(<InputView label="Username" value="" onChange={() => {}} error={error} />)
    const errorMessage = getByText(error)

    expect(errorMessage).toBeTruthy()
  })

  test('clears the input value when cross button is clicked', () => {
    const onChangeMock = jest.fn()
    const { getByTestId } = render(
      <InputView
        label="Username"
        value="john.doe"
        dataTestId="input"
        onChange={onChangeMock}
        onCrossClick={() => onChangeMock('')}
      />
    )

    const crossButton = getByTestId('input-crossButton')
    fireEvent.click(crossButton)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('')
  })
})
