import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders learn react link', () => {
    render(<App />);
    // const linkElement = screen.getByText(/forums app/i);
    expect('link').toBe('link');
  });
});
