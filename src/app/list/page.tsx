"use client";

// Importing necessary packages and components
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
import { useMemo } from "react";

// Component function for ListPage
export default function ListPage() {
  // Using custom hook to fetch the list of URLs and loading state
  const { urls, loading } = useURLs();

  // Use useMemo to optimize performance by avoiding re-renders of URLList
  const memoizedURLList = useMemo(
    () => <URLList onItemClick={redirectToLong} />,
    []
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">List of Shortened URLs</Typography>
        <Box mt={4} maxWidth={640} mx="auto">
          {loading ? (
            // If data is loading, display a CircularProgress
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              {urls.length > 0 ? (
                // If URLs are available, display them in the Paper component
                <Paper elevation={3}>{memoizedURLList}</Paper>
              ) : (
                // If no URLs are available, display a message
                <Box textAlign="center">
                  <Typography>No shortened URL found</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
