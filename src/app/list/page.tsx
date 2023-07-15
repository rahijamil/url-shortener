"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { URLList } from "@/components";
import { URL_TYPE } from "@/types/url.types";
import { redirectToLong } from "@/services/url.service";

export default function ListPage() {
  const [urls, setUrls] = useState<URL_TYPE[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isStorageURLs = localStorage.getItem("urls");

    if (isStorageURLs) {
      const storedUrls = JSON.parse(isStorageURLs) || [];
      setUrls(storedUrls);
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">List of Shortened URLs</Typography>
        <Box mt={4} maxWidth={640} mx="auto">
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              {urls.length > 0 ? (
                <Paper elevation={3}>
                  <URLList urls={urls} onItemClick={redirectToLong} />
                </Paper>
              ) : (
                <Box textAlign="center">
                  <Typography>No shortend URL found</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
