import React from 'react'
import { screen, render } from '@testing-library/react'

import Text, { sizes } from './Text'


describe('Text', () => {

  test('renders the Text component', () => {
    render(<Text size="t14" color="titanic" message="Hello world!" />)
  })

  it.each(sizes)('should render %s size', (size) => {
    render(<Text message={size} size={size} color="inherit" />)
    const text = screen.getByText(size)
    expect(text.classList.contains(`text-${size}`)).toBeTruthy()
  })

  it('should render with custom class name', () => {
    render(<Text message="custom class" className="custom" color="inherit" size="t14" />)
    const text = screen.getByText('custom class')
    expect(text.classList.contains('custom')).toBeTruthy()
  });

  it('should render with color', () => {
    render(<Text message="with color" color="godfather" size="t14" />)
    const text = screen.getByText('with color')
    expect(text.classList.contains('color-godfather')).toBeTruthy()
  })
})
