import React from 'react'
import { render } from '@testing-library/react'

import Logo from './Logo'


describe('Logo', () => {
  it('renders the logo image', () => {
    const { getByAltText } = render(<Logo />)
    expect(getByAltText('NASA Media Library')).toBeTruthy()
  })

  it('renders the "Media Library" text', () => {
    const { getByText } = render(<Logo />)
    expect(getByText('Media Library')).toBeTruthy()
  })

  it('applies the className prop to the root element', () => {
    const { container } = render(<Logo className="test-class" />)
    const firstChild = container.firstChild as HTMLDivElement
    expect(firstChild.classList.contains('test-class')).toBeTruthy()
  })

  it('applies the ml-16 class to the text element', () => {
    const { getByText } = render(<Logo />)
    const logo = getByText('Media Library')
    expect(logo.classList.contains('ml-16')).toBeTruthy()
  })
})