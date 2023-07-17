import { render, screen, fireEvent } from "@testing-library/react";
import URLList from "./";
import { URL_TYPE } from "@/types/url.types";
import "@testing-library/jest-dom/extend-expect";

const mockUrls: URL_TYPE[] = [
  {
    id: "abc",
    shortURL: "https://shrt.co/abc",
    longURL: "https://example.com",
  },
  { id: "def", shortURL: "https://shrt.co/def", longURL: "https://google.com" },
];

test("renders a list of shortened URLs", () => {
  const handleClick = jest.fn();

  render(<URLList urls={mockUrls} onItemClick={handleClick} />);

  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(mockUrls.length);

  mockUrls.forEach((url, index) => {
    const listItem = listItems[index];
    expect(listItem).toHaveTextContent(url.shortURL);
    expect(listItem).toHaveTextContent(url.longURL);

    fireEvent.click(listItem);
    expect(handleClick).toHaveBeenCalledWith(url.longURL);
  });
});
