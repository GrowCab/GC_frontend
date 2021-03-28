import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sensor list element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sensor list/i);
  expect(linkElement).toBeInTheDocument();
});
