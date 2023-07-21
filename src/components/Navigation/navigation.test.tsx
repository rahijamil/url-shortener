import { render, fireEvent, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navigation from ".";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Navigation component", () => {
  let useRouterMock;

  beforeEach(() => {
    useRouterMock = {
      pathname: "/",
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
  });

  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Navigation />
      </ThemeProvider>
    );
  });

  it("should render AppBar with 'URL Shortener' title", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Navigation />
      </ThemeProvider>
    );

    const title = screen.getByText(/URL Shortener/i);
    expect(title).toBeInTheDocument();
  });

  it("should handle click events", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Navigation />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/home/i));

    expect(useRouterMock.push).toHaveBeenCalledTimes(1);
  });
});
