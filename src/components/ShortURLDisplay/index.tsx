"use client";

import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import { FileCopyOutlined } from "@mui/icons-material";

const ShortURLDisplay = ({ shortUrl }: { shortUrl: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  };

  const handleClose = () => {
    setIsCopied(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Your short URL is:</Typography>
        <Typography variant="body1">{shortUrl}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={copyToClipboard}>
          <FileCopyOutlined />
        </IconButton>
      </CardActions>
      <Snackbar
        open={isCopied}
        autoHideDuration={3000}
        onClose={handleClose}
        message="URL Copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default ShortURLDisplay;
