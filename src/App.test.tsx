import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Sensors list element', () => {
  render(<App />)
  const linkElement = screen.getByText(/Sensors list/i)
  expect(linkElement).toBeInTheDocument()
})
