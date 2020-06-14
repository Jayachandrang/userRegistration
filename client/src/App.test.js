import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders dashboard', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
