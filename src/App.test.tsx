import React from 'react';
import { render, screen } from '@testing-library/react';
import Topnav from './topnav';

test('renders learn react link', () => {
  render(<Topnav />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
