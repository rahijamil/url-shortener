"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { URL_TYPE } from "@/types/url.types";

export default function EditPage({
  params: { url_id },
}: {
  params: { url_id: string };
}) {
  const [urls, setUrls] = useState<URL_TYPE[]>([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const isStorageURLs = localStorage.getItem("urls");

    if (isStorageURLs) {
      const storedUrls = JSON.parse(isStorageURLs) || [];
      setUrls(storedUrls);
    }
  }, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(urls[index].longURL);
  };

  const handleSave = () => {
    let newUrls = [...urls];
    newUrls[editIndex].longURL = editValue;
    localStorage.setItem("urls", JSON.stringify(newUrls));
    setUrls(newUrls);
    setEditIndex(-1);
  };

  const handleDelete = (index: number) => {
    let newUrls = [...urls];
    newUrls.splice(index, 1);
    localStorage.setItem("urls", JSON.stringify(newUrls));
    setUrls(newUrls);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Edit URLs</Typography>
        <Box my={2} maxWidth={640} mx="auto">
          {urls.map((url, index) => (
            <Box key={index} display={"flex"} gap={4} mb={2}>
              {editIndex === index ? (
                <TextField
                  label="Long URL"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  fullWidth
                />
              ) : (
                <Typography variant="body1">{url.longURL}</Typography>
              )}
              <Button onClick={() => handleEdit(index)}>Edit</Button>
              <Button onClick={() => handleSave()}>Save</Button>
              <Button onClick={() => handleDelete(index)}>Delete</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
