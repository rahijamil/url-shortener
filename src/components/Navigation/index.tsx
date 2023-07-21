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
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { navigations } from "./navigations";
import { useTheme } from "@mui/system";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";

export default function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() as string;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/serviceworker.js").then(
          function (registration) {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed:", err);
          }
        );
      });
    }
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const renderNavigation = () => (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      gap={1}
      alignItems="center"
      width={isMobile ? 200 : "auto"}
      paddingTop={isMobile ? "50px" : 0}
    >
      {navigations.map((navigation) => (
        <Box
          key={navigation.id}
          flex={1}
          minWidth={isMobile ? "184px" : "100px"}
        >
          <Link href={navigation.path} passHref>
            <Button
              fullWidth
              style={{
                border: `2px solid ${
                  pathname === navigation.path ||
                  (navigation.path === "/edit" && pathname.startsWith("/edit"))
                    ? isMobile
                      ? "royalblue"
                      : "white"
                    : "transparent"
                }`,
                justifyContent: "center",
              }}
              color="inherit"
              aria-label={`${navigation.name} Page Navigation`}
              onClick={() => setIsOpen(false)}
            >
              {navigation.name}
            </Button>
          </Link>
        </Box>
      ))}
    </Box>
  );

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
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  anchor={"right"}
                  open={isOpen}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  {renderNavigation()}
                </SwipeableDrawer>
              </>
            ) : (
              renderNavigation()
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
