import { useUser } from "@/context/UserContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" sx={{ top: 0 }} color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left - Home */}
        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
        </Box>

        {/* Right - User Dropdown */}
        <Box>
          {user ? (
            <>
              <IconButton aria-label="Profile Button" size="large" color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link href="/profile" passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>Profile</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/auth/logout" passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>Logout</a>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/auth/login" passHref legacyBehavior>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/signup" passHref legacyBehavior>
                <Button color="inherit">Sign Up</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
