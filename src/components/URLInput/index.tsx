"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const URLInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" whiteSpace="nowrap" gap={2}>
        <TextField
          label="Long URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          <Typography variant="button" px={2}>Shorten URL</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default URLInput;
