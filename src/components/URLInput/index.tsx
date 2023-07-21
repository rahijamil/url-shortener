"use client";

import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FormEvent, useState } from "react";

const URLInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" whiteSpace="nowrap" gap={2} flexWrap={isMobile ? "wrap" : "nowrap"}>
        <TextField
          label="Long URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" fullWidth={isMobile ? true : false}>
          <Typography variant="button" px={2}>
            Shorten URL
          </Typography>
        </Button>
      </Box>
    </form>
  );
};

export default URLInput;
