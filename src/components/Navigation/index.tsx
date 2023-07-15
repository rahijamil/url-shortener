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

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static">
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
              <Link href="/" passHref>
                <Button
                  color={pathname === "/" ? "primary" : "inherit"}
                  variant={pathname === "/" ? "contained" : "text"}
                  aria-label="Home Page Navigation"
                >
                  Home
                </Button>
              </Link>
              <Link href="/list" passHref>
                <Button
                  color={pathname === "/list" ? "primary" : "inherit"}
                  variant={pathname === "/list" ? "contained" : "text"}
                  aria-label="List Page Navigation"
                >
                  List
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
