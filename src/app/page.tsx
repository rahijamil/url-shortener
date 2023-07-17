"use client";

import { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ShortURLDisplay, URLInput } from "@/components";
import { URL_TYPE } from "@/types/url.types";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const handleURLSubmit = (value: string) => {
    try {
      setLoading(true);

      if (!validURL(value)) {
        throw new Error("Invalid URL");
      }

      const storageURLs = localStorage.getItem("urls");
      const urls: URL_TYPE[] = storageURLs ? JSON.parse(storageURLs) : [];

      const urlExists = urls.some((url) => url.longURL === value);

      if (urlExists) {
        throw new Error("URL already exists");
      }

      const randomString = Math.random().toString(36).substring(7);
      const shortUrl = `http://localhost:3000/s/${randomString}`;
      setShortUrl(shortUrl);

      urls.push({ longURL: value, shortURL: shortUrl, id: randomString });
      localStorage.setItem("urls", JSON.stringify(urls));
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box my={4} px={2} py={3} pt={4} component={Paper} elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          URL Shortener
        </Typography>
        <Box
          my={12}
          maxWidth={640}
          mx="auto"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <URLInput onSubmit={handleURLSubmit} />
          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {shortUrl && <ShortURLDisplay shortUrl={shortUrl} />}
        </Box>
      </Box>

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
