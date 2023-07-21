"use client";

// Import necessary dependencies
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState, useMemo } from "react";
import useURLs from "@/hooks/useURLs";
import { URL_TYPE } from "@/types/url.types";

export default function EditPage({
  params: { url_id },
}: {
  params: { url_id: string };
}) {
  // Invoke custom hooks and set initial state values
  const { urls, setUrls } = useURLs();
  const router = useRouter();
  const [url, setUrl] = useState<URL_TYPE | null>(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // On initial render, find the URL from the list of URLs based on the ID
  useEffect(() => {
    const findURL = urls.find((url) => url.id == url_id);

    if (findURL) {
      setUrl(findURL);
      setEditValue(findURL.longURL);
      setLoading(false);
    } else {
      // Uncomment this line if you want to redirect to 404 page when URL not found
      // router.replace("/404");
    }
  }, [url_id, urls, router]);

  // Handle the save function
  const handleSave = useMemo(
    () =>
      (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (url) {
          const newUrls: URL_TYPE[] = urls.map((updateURL) =>
            updateURL.id == url_id
              ? { ...updateURL, longURL: editValue }
              : updateURL
          );

          localStorage.setItem("urls", JSON.stringify(newUrls));
          setUrls(newUrls);

          setOpenSnackbar(true);
          setSuccessMessage("Saved!");
        }
      },
    [url, url_id, editValue, urls, setUrls]
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Edit URLs</Typography>
        <Box my={2} maxWidth={640} mx="auto">
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <form onSubmit={handleSave}>
              <Box display={"flex"} gap={2}>
                <TextField
                  label="Long URL"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  fullWidth
                  autoFocus
                />

                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert onClose={handleClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
