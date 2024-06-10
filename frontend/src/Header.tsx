import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { LoadingIndicator, Logout, UserMenu } from "react-admin";
import { Link, matchPath, useLocation } from "react-router-dom";
import { MessageContext } from "./App";
import { useContext } from "react";

export default function Header() {
  const location = useLocation();
  const { message } = useContext(MessageContext);
  let currentPath = "/";
  if (matchPath("/contacts/*", location.pathname)) {
    currentPath = "/contacts";
  } else if (matchPath("/companies/*", location.pathname)) {
    currentPath = "/companies";
  } else if (matchPath("/deals/*", location.pathname)) {
    currentPath = "/deals";
  }

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                sx={{ marginRight: "1em", height: 30 }}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="Bosch Logo"
              />
              <Typography component="span" variant="h5">
                Atomic CRM
              </Typography>
            </Box>
            <Box>
              <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label={"Dashboard"} component={Link} to="/" value="/" />
                <Tab
                  label={"Contacts"}
                  component={Link}
                  to="/contacts"
                  value="/contacts"
                />
                <Tab
                  label={"Companies"}
                  component={Link}
                  to="/companies"
                  value="/companies"
                />
                <Tab
                  label={"Deals"}
                  component={Link}
                  to="/deals"
                  value="/deals"
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {message}
            </Box>
            <Box display="flex">
              <LoadingIndicator
                sx={{
                  "& .RaLoadingIndicator-loader": {
                    marginTop: 2,
                  },
                }}
              />
              <UserMenu>
                <Logout />
              </UserMenu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
