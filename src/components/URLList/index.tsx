"use client";

import { URL_TYPE } from "@/types/url.types";
import { List, ListItem, ListItemText, Link } from "@mui/material";

export type URLListProps = {
  urls: Array<URL_TYPE>;
  onItemClick: (id: string) => void;
};

const URLList: React.FC<URLListProps> = ({ urls, onItemClick }) => {
  return (
    <List>
      {urls.map((url) => (
        <ListItem key={url.id} button onClick={() => onItemClick(url.id)}>
          <ListItemText primary={url.shortURL} secondary={url.longURL} />

          <Link
            href={`/edit/${url.id}`}
            color="primary"
            underline="hover"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            Edit
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default URLList;
