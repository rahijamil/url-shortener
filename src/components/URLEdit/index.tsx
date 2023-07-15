"use client";

import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export type URLEditProps = {
  originalUrl: string;
  onSave: (url: string) => void;
  onDelete: () => void;
};

const URLEdit: React.FC<URLEditProps> = ({ originalUrl, onSave, onDelete }) => {
  const [editedUrl, setEditedUrl] = useState(originalUrl);

  const handleSave = () => {
    onSave(editedUrl);
  };

  return (
    <>
      <TextField
        label="Long URL"
        value={editedUrl}
        onChange={(e) => setEditedUrl(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={onDelete}>Delete</Button>
    </>
  );
};

export default URLEdit;
