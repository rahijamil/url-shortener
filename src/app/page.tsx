"use client";

// Importing necessary packages and components
import { useState, useCallback, memo } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Snackbar,
  Grid,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ShortURLDisplay, URLInput } from "@/components";
import { URL_TYPE } from "@/types/url.types";
import _ from "lodash";

// Creating alert dialog with the props that it receives
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Memoizing ShortURLDisplay and URLInput components to prevent unnecessary re-rendering
const MemoShortURLDisplay = memo(ShortURLDisplay);
const MemoURLInput = memo(URLInput);

// Main component function
export default function Home() {
  // Initializing necessary state variables
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to validate if input string is a valid URL
  const validURL = (str: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  // Debouncing the handleURLSubmit function to limit the number of requests made
  const debouncedHandleURLSubmit = _.debounce((value: string) => {
    try {
      setLoading(true); // Setting loading state to true while the function runs

      // Throw error if the URL is invalid
      if (!validURL(value)) {
        throw new Error("Invalid URL");
      }

      // Get URLs from local storage or initialize to an empty array if none are stored
      const storageURLs = localStorage.getItem("urls");
      const urls: URL_TYPE[] = storageURLs ? JSON.parse(storageURLs) : [];

      // Check if the URL already exists in the stored URLs
      const urlExists = urls.some((url) => url.longURL === value);

      // Throw error if the URL already exists
      if (urlExists) {
        throw new Error("URL already exists");
      }

      // Create short URL and set state with the new short URL
      const randomString = Math.random().toString(36).substring(7);
      const shortUrl = `http://localhost:3000/s/${randomString}`;
      setShortUrl(shortUrl);

      // Add the new URL to the stored URLs and update local storage
      urls.push({ longURL: value, shortURL: shortUrl, id: randomString });
      localStorage.setItem("urls", JSON.stringify(urls));
    } catch (error: any) {
      // If an error occurs, log it and show an error message
      console.error(error);
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    } finally {
      // When the function finishes running, set the loading state back to false
      setLoading(false);
    }
  }, 250);

  // Call the debounced function when URL is submitted
  const handleURLSubmit = (value: string) => {
    debouncedHandleURLSubmit(value);
  };

  // Function to close the snackbar, unless it's a clickaway event
  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setOpenSnackbar(false); // Close the snackbar
    },
    []
  );

  // Component rendering
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ my: 4, p: 4 }}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              URL Shortener
            </Typography>
          </Grid>
          <Grid item>
            <MemoURLInput onSubmit={handleURLSubmit} />
          </Grid>
          {loading && (
            <Grid item>
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            </Grid>
          )}
          {shortUrl && (
            <Grid item>
              <MemoShortURLDisplay shortUrl={shortUrl} />
            </Grid>
          )}
        </Grid>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <div>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </div>
      </Snackbar>
    </Container>
  );
}
