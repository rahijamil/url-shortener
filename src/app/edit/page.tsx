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
import { redirectToLong } from "@/services/url.service";
import useURLs from "@/hooks/useURLs";

export default function ListPage() {
  const { urls, loading } = useURLs();

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Edit or Delete Shortened URLs</Typography>
        <Box mt={4} maxWidth={640} mx="auto">
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              {urls.length > 0 ? (
                <URLList
                  urls={urls}
                  onItemClick={redirectToLong}
                  showIconsBox
                />
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
