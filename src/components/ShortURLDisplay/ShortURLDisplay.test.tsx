import { render, screen } from '@testing-library/react';
import ShortURLDisplay from '.';

test('renders the short URL', () => {
  const shortUrl = 'http://sho.rt/abcdefg';
  render(<ShortURLDisplay shortUrl={shortUrl} />);

  expect(screen.getByText(/your short url is:/i)).toBeInTheDocument();
  expect(screen.getByText(shortUrl)).toBeInTheDocument();
});
