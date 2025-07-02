import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);
  const heading = screen.getByText(/Ristorante con Fusion/i);
  expect(heading).toBeInTheDocument();
});
