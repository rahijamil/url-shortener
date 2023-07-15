import { render, fireEvent, screen } from "@testing-library/react";
import URLInput from ".";

test("calls onSubmit prop when form is submitted", () => {
  const handleSubmit = jest.fn();
  render(<URLInput onSubmit={handleSubmit} />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/long url/i), {
    target: { value: "https://example.com" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /shorten url/i }));

  // Check if our mock function got called with the right value
  expect(handleSubmit).toHaveBeenCalledWith("https://example.com");
});
