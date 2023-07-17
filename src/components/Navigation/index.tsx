"use client";

import { usePathname } from "next/navigation";
import { LinkOutlined } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Link from "next/link";
import { navigations } from "./navigations";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Link href="/" passHref>
                <Box display="flex" alignItems="center" flexGrow={1}>
                  <LinkOutlined />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: 1 }}
                  >
                    URL Shortener
                  </Typography>
                </Box>
              </Link>
            </Box>

            <Box>
              {navigations.map((navigation) => (
                <Link href={navigation.path} passHref key={navigation.id}>
                  <Button
                    style={{
                      border: `2px solid ${
                        pathname === navigation.path ? "white" : "transparent"
                      }`,
                    }}
                    color="inherit"
                    // variant={
                    //   pathname === navigation.path ? "contained" : "text"
                    // }
                    aria-label={`${navigation.name} Page Navigation`}
                  >
                    {navigation.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
