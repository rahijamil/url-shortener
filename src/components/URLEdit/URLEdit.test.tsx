import { render, screen, fireEvent } from '@testing-library/react';
import URLEdit from './';

test('renders URLEdit component with original URL and calls the onSave and onDelete functions correctly', () => {
  const mockOriginalUrl = 'https://example.com';
  const mockOnSave = jest.fn();
  const mockOnDelete = jest.fn();

  render(
    <URLEdit
      originalUrl={mockOriginalUrl}
      onSave={mockOnSave}
      onDelete={mockOnDelete}
    />
  );

  const textField = screen.getByLabelText('Long URL');
  const saveButton = screen.getByRole('button', { name: 'Save' });
  const deleteButton = screen.getByRole('button', { name: 'Delete' });

  expect(textField).toHaveValue(mockOriginalUrl);

  const newUrl = 'https://newurl.com';
  fireEvent.change(textField, { target: { value: newUrl } });

  fireEvent.click(saveButton);
  expect(mockOnSave).toHaveBeenCalledWith(newUrl);

  fireEvent.click(deleteButton);
  expect(mockOnDelete).toHaveBeenCalledTimes(1);
});
