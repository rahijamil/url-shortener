"use client";

import { URL_TYPE } from "@/types/url.types";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useUrls from "@/hooks/useURLs";

export type URLListProps = {
  urls: Array<URL_TYPE>;
  onItemClick: (id: string) => void;
  showIconsBox?: boolean;
};

const URLList: React.FC<URLListProps> = ({
  urls,
  onItemClick,
  showIconsBox,
}) => {
  const router = useRouter();
  const { handleDelete } = useUrls();
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  useEffect(() => {
    if (deleteItemId) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "visible";
    }
  }, [deleteItemId]);

  const handleDeleteClick = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setDeleteItemId(id);
  };

  const handleDeleteURL = () => {
    if (deleteItemId) {
      handleDelete(deleteItemId);
      setDeleteItemId(null);
    }
  };

  const handleClose = () => {
    setDeleteItemId(null);
  };

  return (
    <List>
      {urls.map((url) => (
        <ListItem
          key={url.id}
          onClick={() => !showIconsBox && onItemClick(url.id)}
          onMouseEnter={() => setHoveredItemId(url.id)}
          onMouseLeave={() => setHoveredItemId(null)}
          onTouchStart={() => setHoveredItemId(url.id)}
          onTouchEnd={() => setHoveredItemId(null)}
          button
          style={{ cursor: showIconsBox ? "default" : "pointer" }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" noWrap>
                {url.shortURL}
              </Typography>
            }
            secondary={
              <Typography variant="body2" noWrap color="textSecondary">
                {url.longURL}
              </Typography>
            }
          />

          {showIconsBox && hoveredItemId == url.id && (
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/edit/${url.id}`);
                }}
                color="primary"
                edge="end"
              >
                <EditIcon sx={{ color: blue[500] }} />
              </IconButton>

              <IconButton
                onClick={(event) => handleDeleteClick(event, url.id)}
                color="error"
                edge="end"
              >
                <DeleteIcon sx={{ color: red[500] }} />
              </IconButton>
            </Box>
          )}
        </ListItem>
      ))}

      <Modal
        open={deleteItemId ? true : false}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          bgcolor="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={3}
        >
          <Typography variant="h6" align="center" mb={2}>
            Are you sure you want to delete?
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2} width="100%">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDeleteURL} color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </List>
  );
};

export default URLList;
