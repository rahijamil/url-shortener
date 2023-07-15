import { render, screen, fireEvent } from '@testing-library/react';
import URLList from './';

const mockUrls = [
  { shortUrl: 'https://shrt.co/abc', originalUrl: 'https://example.com' },
  { shortUrl: 'https://shrt.co/def', originalUrl: 'https://google.com' },
];

test('renders a list of shortened URLs', () => {
  const handleClick = jest.fn();

  render(<URLList urls={mockUrls} onItemClick={handleClick} />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(mockUrls.length);

  mockUrls.forEach((url, index) => {
    const listItem = listItems[index];
    expect(listItem).toHaveTextContent(url.shortUrl);
    expect(listItem).toHaveTextContent(url.originalUrl);

    fireEvent.click(listItem);
    expect(handleClick).toHaveBeenCalledWith(url.originalUrl);
  });
});
